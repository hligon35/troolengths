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

function normalizeWord(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

function pluralize(word: string): string {
  if (word.endsWith('s')) return word;
  if (word.endsWith('y')) return word.slice(0, -1) + 'ies';
  if (word.endsWith('al')) return word + 's';
  if (word.endsWith('ure')) return word + 's';
  return word + 's';
}

function inferCategoryFromName(name?: string): Product['category'] {
  const fallback = 'wigs';
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  let last = parts[parts.length - 1] || '';
  last = normalizeWord(last);
  if (!last) return fallback;
  // Map common synonyms to desired slugs
  if (last.includes('wig')) return 'wigs';
  if (last.includes('bundle')) return 'bundles';
  if (last.includes('closure')) return 'closures';
  if (last.includes('frontal')) return 'frontals';
  if (last.includes('clip')) return 'clip-ins';
  if (last.includes('ponytail')) return 'ponytails';
  if (last === 'lace') return 'closures';
  // Default: pluralize the last word as a slug
  return pluralize(last) as Product['category'];
}

function inferLength(name?: string): string | undefined {
  if (!name) return undefined;
  const m = name.match(/(\d{2})\s*(?:"|in|inch|inches)\b/i);
  if (m) return `${m[1]}"`;
  // Ranges like 16-18"
  const r = name.match(/(\d{2})\s*[-–]\s*(\d{2})\s*(?:"|in|inch|inches)/i);
  if (r) return `${r[1]}"`;
  return undefined;
}

function inferTexture(text?: string): string | undefined {
  const s = (text || '').toLowerCase();
  const textures = [
    'kinky straight', 'body wave', 'deep wave', 'loose wave', 'water wave', 'loose deep', 'curly', 'straight'
  ];
  for (const t of textures) {
    if (s.includes(t)) return t.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }
  return undefined;
}

function inferColor(text?: string): string | undefined {
  const s = (text || '').toLowerCase();
  const colors = [
    'natural black', 'burgundy', 'blonde', '613', '1b', 'dark brown', 'medium brown', 'light brown', 'red', 'blue', 'purple'
  ];
  for (const c of colors) {
    if (s.includes(c)) {
      if (c === '613') return '613 Blonde';
      if (c === '1b') return '1B Natural Black';
      return c.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    }
  }
  return undefined;
}

function inferLaceType(text?: string): string | undefined {
  const s = (text || '').toLowerCase();
  const sizes = ['13x4', '13x6', '4x4', '5x5', '6x6', '360'];
  for (const size of sizes) {
    if (s.includes(size)) {
      if (s.includes('frontal')) return `${size.toUpperCase()} Lace Front`;
      if (s.includes('closure')) return `${size.toUpperCase()} Closure`;
      return `${size.toUpperCase()} Lace`;
    }
  }
  if (s.includes('frontal')) return 'Frontal';
  if (s.includes('closure')) return 'Closure';
  return undefined;
}

function inferDensity(text?: string): string | undefined {
  const m = (text || '').match(/(\d{3})%/);
  if (m) return `${m[1]}%`;
  return undefined;
}

function parsePrice(v?: string | number, fallback?: string | number): number {
  const s = v ?? fallback;
  if (typeof s === 'number') return s;
  if (!s) return 0;
  const num = Number(String(s).replace(/[^0-9.]/g, ''));
  return Number.isFinite(num) ? num : 0;
}

function mapToProducts(data: CatalogRecord): Product[] {
  const raw = (data.products || []);
  // Deduplicate raw records by handle or last path segment of URL
  const seenRaw = new Set<string>();
  const uniqueRaw = raw.filter((p) => {
    let key = p.handle?.toLowerCase();
    if (!key) {
      try {
        const u = new URL(p.url);
        const parts = u.pathname.split('/').filter(Boolean);
        key = parts[parts.length - 1]?.toLowerCase();
      } catch {
        key = p.url?.toLowerCase() || Math.random().toString(36).slice(2);
      }
    }
    if (seenRaw.has(key!)) return false;
    seenRaw.add(key!);
    return true;
  });

  const mapped = uniqueRaw.map((p, idx) => {
    const id = p.handle || `prod-${idx}`;
    const name = p.title || p.handle || 'Product';
    const price = parsePrice(p.price, p.offers && p.offers[0]?.price);
    const hint = [name, ...(p.categories || []), p.descriptionText || ''].join(' ');
    const length = inferLength(hint);
    const texture = inferTexture(hint);
    const color = inferColor(hint);
    const laceType = inferLaceType(hint);
    const density = inferDensity(hint);
    const variant: ProductVariant = {
      id: `${id}-default`,
      price,
      inStock: true,
      sku: p.sku || `${id}-SKU`,
      ...(length ? { length } : {}),
      ...(texture ? { texture } : {}),
      ...(color ? { color } : {}),
      ...(laceType ? { laceType } : {}),
      ...(density ? { density } : {}),
    };
    const category = inferCategoryFromName(name);
    return {
      id,
      name,
      slug: id,
      category,
      price,
      images: (p.images && p.images.length ? p.images : []).slice(0, 8),
      description: p.descriptionText || p.descriptionHtml || '',
      variants: [variant],
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
      inStock: true,
      tags: [category, ...(p.categories || [])],
    } as Product;
  });

  // Final dedupe by slug to avoid any lingering duplicates
  const seen = new Set<string>();
  return mapped.filter((p) => {
    const key = p.slug.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
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
