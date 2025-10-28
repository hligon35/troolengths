import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Wigs',
    slug: 'wigs',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=500&fit=crop',
    description: 'Premium quality wigs in various styles and colors'
  },
  {
    id: '2',
    name: 'Bundles',
    slug: 'bundles',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&h=500&fit=crop',
    description: 'High-quality hair bundles for weaving'
  },
  {
    id: '3',
    name: 'Closures',
    slug: 'closures',
    image: 'https://images.unsplash.com/photo-1559599238-1c65c3ad976b?w=500&h=500&fit=crop',
    description: 'Lace closures and frontals for natural looks'
  },
  {
    id: '4',
    name: 'Colored Wigs',
    slug: 'colored-wigs',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
    description: 'Vibrant colored wigs for bold styles'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Brazilian Straight Hair Bundle',
    slug: 'brazilian-straight-hair-bundle',
    category: 'bundles',
    price: 89.99,
    salePrice: 69.99,
    images: [
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559599238-1c65c3ad976b?w=800&h=800&fit=crop'
    ],
    description: 'Premium Brazilian straight hair bundle made from 100% virgin human hair. Soft, silky texture that can be styled and colored.',
    variants: [
      {
        id: 'v1',
        length: '16"',
        texture: 'Straight',
        color: 'Natural Black',
        price: 89.99,
        salePrice: 69.99,
        inStock: true,
        sku: 'BSH-16-NB'
      },
      {
        id: 'v2',
        length: '18"',
        texture: 'Straight',
        color: 'Natural Black',
        price: 99.99,
        salePrice: 79.99,
        inStock: true,
        sku: 'BSH-18-NB'
      },
      {
        id: 'v3',
        length: '20"',
        texture: 'Straight',
        color: 'Natural Black',
        price: 109.99,
        salePrice: 89.99,
        inStock: true,
        sku: 'BSH-20-NB'
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Sarah M.',
        rating: 5,
        comment: 'Amazing quality! The hair is so soft and looks natural.',
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop'],
        createdAt: '2024-01-15',
        verified: true
      }
    ],
    averageRating: 4.8,
    totalReviews: 156,
    inStock: true,
    tags: ['virgin hair', 'brazilian', 'straight', 'bundle']
  },
  {
    id: '2',
    name: 'Lace Front Wig - Body Wave',
    slug: 'lace-front-wig-body-wave',
    category: 'wigs',
    price: 199.99,
    salePrice: 149.99,
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&h=800&fit=crop'
    ],
    description: 'Stunning lace front wig with body wave texture. Pre-plucked hairline and baby hairs for the most natural look.',
    variants: [
      {
        id: 'v4',
        length: '16"',
        texture: 'Body Wave',
        laceType: '13x4 Lace Front',
        density: '150%',
        color: 'Natural Black',
        price: 199.99,
        salePrice: 149.99,
        inStock: true,
        sku: 'LFW-16-BW-150'
      },
      {
        id: 'v5',
        length: '18"',
        texture: 'Body Wave',
        laceType: '13x4 Lace Front',
        density: '150%',
        color: 'Natural Black',
        price: 229.99,
        salePrice: 179.99,
        inStock: true,
        sku: 'LFW-18-BW-150'
      }
    ],
    reviews: [
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Jessica L.',
        rating: 5,
        comment: 'Perfect fit and the lace melts beautifully! Highly recommend.',
        createdAt: '2024-01-20',
        verified: true
      }
    ],
    averageRating: 4.9,
    totalReviews: 89,
    inStock: true,
    tags: ['lace front', 'body wave', 'wig', 'pre-plucked']
  },
  {
    id: '3',
    name: '4x4 Lace Closure - Straight',
    slug: '4x4-lace-closure-straight',
    category: 'closures',
    price: 79.99,
    salePrice: 59.99,
    images: [
      'https://images.unsplash.com/photo-1559599238-1c65c3ad976b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop'
    ],
    description: '4x4 lace closure made from premium virgin hair. Perfect for completing your weave install.',
    variants: [
      {
        id: 'v6',
        length: '14"',
        texture: 'Straight',
        laceType: '4x4 Closure',
        color: 'Natural Black',
        price: 79.99,
        salePrice: 59.99,
        inStock: true,
        sku: 'LC-14-ST-4X4'
      },
      {
        id: 'v7',
        length: '16"',
        texture: 'Straight',
        laceType: '4x4 Closure',
        color: 'Natural Black',
        price: 89.99,
        salePrice: 69.99,
        inStock: true,
        sku: 'LC-16-ST-4X4'
      }
    ],
    reviews: [],
    averageRating: 4.7,
    totalReviews: 42,
    inStock: true,
    tags: ['lace closure', 'straight', '4x4', 'virgin hair']
  },
  {
    id: '4',
    name: 'Colored Lace Front Wig - Burgundy',
    slug: 'colored-lace-front-wig-burgundy',
    category: 'colored-wigs',
    price: 249.99,
    salePrice: 189.99,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop'
    ],
    description: 'Bold burgundy colored lace front wig. Perfect for making a statement with vibrant color.',
    variants: [
      {
        id: 'v8',
        length: '16"',
        texture: 'Straight',
        laceType: '13x4 Lace Front',
        density: '150%',
        color: 'Burgundy',
        price: 249.99,
        salePrice: 189.99,
        inStock: true,
        sku: 'CLW-16-ST-BUR'
      },
      {
        id: 'v9',
        length: '18"',
        texture: 'Straight',
        laceType: '13x4 Lace Front',
        density: '150%',
        color: 'Burgundy',
        price: 279.99,
        salePrice: 219.99,
        inStock: false,
        sku: 'CLW-18-ST-BUR'
      }
    ],
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Maya K.',
        rating: 4,
        comment: 'Love the color! The hair quality is great but the lace could be better.',
        createdAt: '2024-01-25',
        verified: true
      }
    ],
    averageRating: 4.5,
    totalReviews: 23,
    inStock: true,
    tags: ['colored wig', 'burgundy', 'lace front', 'straight']
  }
];

export const filterOptions = {
  lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'],
  textures: ['Straight', 'Body Wave', 'Deep Wave', 'Curly', 'Kinky Straight'],
  laceTypes: ['13x4 Lace Front', '13x6 Lace Front', '4x4 Closure', '5x5 Closure', '360 Lace'],
  densities: ['130%', '150%', '180%', '200%'],
  colors: ['Natural Black', 'Dark Brown', 'Medium Brown', 'Light Brown', 'Blonde', 'Burgundy', 'Red', 'Blue', 'Purple'],
  priceRange: [0, 500] as [number, number]
};