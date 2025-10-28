export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'wigs' | 'bundles' | 'closures' | 'colored-wigs';
  price: number;
  salePrice?: number;
  images: string[];
  description: string;
  variants: ProductVariant[];
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  inStock: boolean;
  tags: string[];
}

export interface ProductVariant {
  id: string;
  length?: string;
  texture?: string;
  laceType?: string;
  density?: string;
  color?: string;
  price: number;
  salePrice?: number;
  inStock: boolean;
  sku: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  images?: string[];
  createdAt: string;
  verified: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface FilterOptions {
  lengths: string[];
  textures: string[];
  laceTypes: string[];
  densities: string[];
  colors: string[];
  priceRange: [number, number];
}