import raw from '../../data/mayvenn-products.json';
import type { Product, ProductVariant } from '@/types';

type RawSchema = {
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

const data = raw as RawSchema;

function toSlugCategory(categories: string[] | undefined): Product['category'] {
  const cats = (categories || []).map((c) => c.toLowerCase());
  if (cats.some((c) => c.includes('wig'))) return 'wigs';
  if (cats.some((c) => c.includes('bundle'))) return 'bundles';
  if (cats.some((c) => c.includes('closure'))) return 'closures';
  if (cats.some((c) => c.includes('frontal'))) return 'closures';
  return 'wigs';
}

function parsePrice(v?: string | number, fallback?: string | number): number {
  const s = (v ?? fallback);
  if (typeof s === 'number') return s;
  if (!s) return 0;
  const num = Number(String(s).replace(/[^0-9.]/g, ''));
  return Number.isFinite(num) ? num : 0;
}

export const scrapedProducts: Product[] = (data.products || []).map((p, idx) => {
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
    images: (p.images && p.images.length ? p.images : []).slice(0, 6),
    description: p.descriptionText || p.descriptionHtml || '',
    variants: [variant],
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
    inStock: true,
    tags: p.categories || [],
  } as Product;
});
