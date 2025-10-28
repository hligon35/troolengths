import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import type { Product, ProductVariant } from '@/types';
import { loadCatalog } from '@/data/catalog';
import { useCartStore } from '@/store/cartStore';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    loadCatalog()
      .then((items) => {
        if (!mounted) return;
        const found = items.find((p) => p.slug === slug);
        setProduct(found || null);
        setSelectedVariant(found?.variants?.[0] ?? null);
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || 'Failed to load product');
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  const price = useMemo(() => {
    if (!product) return 0;
    return product.salePrice || selectedVariant?.price || product.price;
  }, [product, selectedVariant]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    addItem(product, selectedVariant);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-16">Loading product…</div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">{error}</div>
        ) : !product ? (
          <div className="text-center py-16">Product not found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {product.images[activeImage] ? (
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-[28rem] object-cover"
                  />
                ) : (
                  <div className="w-full h-[28rem] flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {product.images.slice(0, 10).map((img, idx) => (
                    <button
                      key={idx}
                      className={`border rounded overflow-hidden ${idx === activeImage ? 'ring-2 ring-primary-500' : ''}`}
                      onClick={() => setActiveImage(idx)}
                      aria-label={`View image ${idx + 1}`}
                      title={`View image ${idx + 1}`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              {/* Brand placeholder intentionally omitted; not present on Product type */}

              <div className="flex items-center space-x-3 mb-6">
                <div className="text-2xl font-bold">${price.toFixed(2)}</div>
                {product.salePrice && (
                  <div className="text-gray-500 line-through">${product.price.toFixed(2)}</div>
                )}
              </div>

              {/* Variant placeholder (length/texture/color not always present) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4 mb-6">
                  {/* If length options exist */}
                  {product.variants.some(v => v.length) && (
                    <div>
                      <div className="font-medium mb-2">Length</div>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((v) => (
                          <button
                            key={v.id}
                            className={`px-3 py-2 text-sm rounded border ${selectedVariant?.id === v.id ? 'bg-primary-500 text-white border-primary-500' : 'bg-white'}`}
                            onClick={() => setSelectedVariant(v)}
                            title={`Select length ${v.length ?? ''}`}
                          >
                            {v.length ?? 'Default'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                className="btn-primary w-full sm:w-auto"
                onClick={handleAddToCart}
                title="Add to cart"
              >
                Add to Cart
              </button>

              {/* Description */}
              {product.description && (
                <div className="mt-8 prose max-w-none">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetailPage;
