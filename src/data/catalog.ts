import type { Product, ProductVariant } from '@/types';

// Runtime loader that prefers fetching from public/data, with a fallback to dynamic import of the repo JSON
const BASE_URL: string = ((import.meta as any).env && (import.meta as any).env.BASE_URL) || '/';
const CATALOG_URL = `${BASE_URL}data/mayvenn-products.json`;

export type CatalogRecord = {
  source: string;
  scrapedAt: string;
  count: number;
  products: Array<{
    url: string;
    handle?: string;
    title?: string;
    descriptionText?: string;
    descriptionHtml?: string;
    images?: string[];
    price?: string | number;
    currency?: string;
    sku?: string;
    brand?: string;
    offers?: Array<{ price?: string | number; priceCurrency?: string; availability?: string; sku?: string }>;
    categories?: string[];
  }>;
};

function toSlugCategory(categories: string[] | undefined): Product['category'] {
  const cats = (categories || []).map((c) => c.toLowerCase());
  if (cats.some((c) => c.includes('wig'))) return 'wigs';
  if (cats.some((c) => c.includes('bundle'))) return 'bundles';
  if (cats.some((c) => c.includes('closure'))) return 'closures';
  if (cats.some((c) => c.includes('frontal'))) return 'closures';
  return 'wigs';
}

function parsePrice(v?: string | number, fallback?: string | number): number {
  const s = v ?? fallback;
  if (typeof s === 'number') return s;
  if (!s) return 0;
  const num = Number(String(s).replace(/[^0-9.]/g, ''));
  return Number.isFinite(num) ? num : 0;
}

function mapToProducts(data: CatalogRecord): Product[] {
  return (data.products || []).map((p, idx) => {
    const id = p.handle || `prod-${idx}`;
    const name = p.title || p.handle || 'Product';
    const price = parsePrice(p.price, p.offers && p.offers[0]?.price);
    const variant: ProductVariant = {
      id: `${id}-default`,
      price,
      inStock: true,
      sku: p.sku || `${id}-SKU`,
    };
    return {
      id,
      name,
      slug: id,
      category: toSlugCategory(p.categories),
      price,
      images: (p.images && p.images.length ? p.images : []).slice(0, 8),
      description: p.descriptionText || p.descriptionHtml || '',
      variants: [variant],
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
      inStock: true,
      tags: p.categories || [],
    } as Product;
  });
}

let cache: { when: number; products: Product[] } | null = null;

export async function loadCatalog(): Promise<Product[]> {
  if (cache && Date.now() - cache.when < 5 * 60 * 1000) return cache.products;
  try {
    const res = await fetch(CATALOG_URL, { headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const json = (await res.json()) as CatalogRecord;
      const products = mapToProducts(json);
      cache = { when: Date.now(), products };
      return products;
    }
    // fall through to dynamic import if not found in public
  } catch {}

  // Fallback: bundle-time JSON (keeps the site working even if public copy is missing)
  try {
    const mod = await import('../../data/mayvenn-products.json');
    const products = mapToProducts(mod as unknown as CatalogRecord);
    cache = { when: Date.now(), products };
    return products;
  } catch (e) {
    console.error('Failed to load catalog JSON', e);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await loadCatalog();
  return products.find((p) => p.slug === slug);
}
