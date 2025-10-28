#!/usr/bin/env -S node --enable-source-maps
/**
 * prodScrubber - Scrape Mayvenn shop for product images and descriptions
 *
 * IMPORTANT: Before using, review and comply with the target website's
 * Terms of Service and robots.txt. Use reasonable rate limits.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import axios from 'axios';
import * as cheerio from 'cheerio';
import pLimit from 'p-limit';

const BASE = 'https://shop.mayvenn.com';
const OUT_DIR = path.resolve(process.cwd(), 'data');
const OUT_FILE = path.join(OUT_DIR, 'mayvenn-products.json');

// Simple sleep utility
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Basic polite headers
const http = axios.create({
  baseURL: BASE,
  timeout: 20000,
  headers: {
    'User-Agent': 'TrooLengthsScrubber/1.0 (+https://github.com/hligon35/troolengths)'
  },
  // Follow redirects
  maxRedirects: 5,
});

export type ScrapedProduct = {
  url: string;
  handle?: string;
  title?: string;
  descriptionText?: string;
  descriptionHtml?: string;
  images: string[];
  price?: string | number;
  currency?: string;
  sku?: string;
  brand?: string;
  offers?: Array<{
    price?: string | number;
    priceCurrency?: string;
    availability?: string;
    sku?: string;
  }>;
  categories?: string[];
};

// Extract absolute URL
const abs = (href: string) => (href.startsWith('http') ? href : `${BASE}${href.startsWith('/') ? '' : '/'}${href}`);

async function fetchHtml(url: string) {
  const { data } = await http.get(url);
  return cheerio.load(data);
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

// Parse JSON-LD blocks for Product data if available
function parseJsonLdProduct($: cheerio.CheerioAPI): Partial<ScrapedProduct> {
  const scripts = $('script[type="application/ld+json"]').toArray();
  for (const s of scripts) {
    try {
      const txt = $(s).contents().text();
      const json = JSON.parse(txt);
      // Could be an array or single object
      const items = Array.isArray(json) ? json : [json];
      for (const item of items) {
        if (item['@type'] === 'Product') {
          const images = ([] as string[]).concat(item.image || []).map(String);
          const offers = item.offers
            ? (Array.isArray(item.offers) ? item.offers : [item.offers]).map((o: any) => ({
                price: o.price ?? o.priceSpecification?.price,
                priceCurrency: o.priceCurrency,
                availability: o.availability,
                sku: o.sku,
              }))
            : undefined;
          return {
            title: item.name,
            descriptionHtml: item.description,
            images,
            price: item.offers?.price ?? item.offers?.priceSpecification?.price,
            currency: item.offers?.priceCurrency,
            brand: item.brand?.name || item.brand,
            sku: item.sku,
            offers,
          };
        }
      }
    } catch {}
  }
  return {};
}

// Fallback parsers if no JSON-LD
function parseFallbackProduct($: cheerio.CheerioAPI): Partial<ScrapedProduct> {
  const title = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content');
  const descMeta = $('meta[name="description"]').attr('content');
  const descriptionText = descMeta || $('main, #MainContent').find('p, .rte').first().text().trim();
  const images = unique(
    [
      ...$('meta[property="og:image"]').map((_, el) => $(el).attr('content')).get(),
      ...$('img').map((_, el) => $(el).attr('src') || $(el).attr('data-src')).get(),
    ]
      .filter(Boolean)
      .map((x) => String(x))
      .filter((x) => /cdn\./.test(x) || x.startsWith('http'))
  );
  return { title, descriptionText, images };
}

async function getCollectionLinks(): Promise<string[]> {
  const $ = await fetchHtml('/');
  const links = $('a[href^="/collections/"]').map((_, el) => $(el).attr('href')).get();
  return unique(links).map(abs);
}

async function getProductLinksFromCollection(url: string, limitPerCollection = 50): Promise<string[]> {
  const products: string[] = [];
  let nextUrl: string | null = url;
  while (nextUrl && products.length < limitPerCollection) {
    const $ = await fetchHtml(nextUrl.replace(BASE, ''));
    // Typical Shopify grid links
    const pageLinks = $('a[href*="/products/"]').map((_, el) => $(el).attr('href')).get();
    for (const l of pageLinks) {
      if (l && /\/products\//.test(l)) products.push(abs(l));
    }
    // Find rel=next
    const next = $('link[rel="next"]').attr('href') || $('a[rel="next"]').attr('href');
    nextUrl = next ? abs(next) : null;
    if (nextUrl) await sleep(500); // be polite between pages
  }
  return unique(products);
}

async function parseProduct(url: string): Promise<ScrapedProduct | null> {
  try {
    const $ = await fetchHtml(url.replace(BASE, ''));

    const ld = parseJsonLdProduct($);
    const fb = parseFallbackProduct($);
    const title = ld.title || fb.title;
    if (!title) {
      return null; // not a product page
    }

    const descriptionHtml = ld.descriptionHtml || undefined;
    const descriptionText = fb.descriptionText || cheerio.load(descriptionHtml || '')('body').text().trim();

    const images = unique([...(ld.images || []), ...(fb.images || [])]);

    // Derive a handle from URL
    const handleMatch = url.match(/\/products\/([^/?#]+)/);
    const handle = handleMatch ? handleMatch[1] : undefined;

    // Heuristic categories from breadcrumbs/links
    const categories = unique(
      $('a[href^="/collections/"]').map((_, el) => $(el).text().trim()).get().filter(Boolean)
    );

    const prod: ScrapedProduct = {
      url,
      handle,
      title,
      descriptionHtml,
      descriptionText,
      images,
      price: ld.price,
      currency: ld.currency,
      sku: ld.sku,
      brand: ld.brand,
      offers: ld.offers,
      categories,
    };

    return prod;
  } catch (err) {
    console.warn('Failed to parse product', url, (err as Error).message);
    return null;
  }
}

async function main() {
  // CLI args
  const maxCollections = Number(process.env.COLLECTIONS || 5);
  const maxPerCollection = Number(process.env.PER_COLLECTION || 40);
  const maxConcurrency = Number(process.env.CONCURRENCY || 3);

  console.log(`Scraping with settings -> collections: ${maxCollections}, perCollection: ${maxPerCollection}, concurrency: ${maxConcurrency}`);

  await fs.mkdir(OUT_DIR, { recursive: true });

  const collectionLinks = (await getCollectionLinks()).slice(0, maxCollections);
  console.log(`Found ${collectionLinks.length} collection links`);

  const productLinksSets = await Promise.all(
    collectionLinks.map((cl) => getProductLinksFromCollection(cl, maxPerCollection))
  );
  const productLinks = unique(productLinksSets.flat());
  console.log(`Discovered ${productLinks.length} product links`);

  const limit = pLimit(maxConcurrency);
  const results: ScrapedProduct[] = [];

  await Promise.all(
    productLinks.map((url, idx) =>
      limit(async () => {
        if (idx % 10 === 0) console.log(`Parsing ${idx + 1}/${productLinks.length}`);
        const prod = await parseProduct(url);
        if (prod) results.push(prod);
        await sleep(400); // be polite between pages
      })
    )
  );

  // Sort by title for stability
  results.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

  await fs.writeFile(OUT_FILE, JSON.stringify({
    source: BASE,
    scrapedAt: new Date().toISOString(),
    count: results.length,
    products: results,
  }, null, 2));

  console.log(`Saved ${results.length} products -> ${OUT_FILE}`);
}

// Execute immediately when run via node/tsx
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
