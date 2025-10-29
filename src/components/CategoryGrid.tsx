import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '@/hooks/useCatalog';

const CategoryGrid: React.FC = () => {
  const { products, loading } = useCatalog();

  // Build dynamic category tiles from real product data
  const tiles = useMemo(() => {
    const list = products || [];
    // Count products per category
    const counts = new Map<string, number>();
    for (const p of list) {
      const key = (p.category || 'uncategorized').toLowerCase();
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    // Preferred categories first
    const preferred = ['wigs', 'bundles', 'closures'];
    const preferredItems = preferred
      .filter((k) => counts.has(k))
      .map((k) => ({ slug: k, count: counts.get(k)! }));
    // Then the rest by descending count
    const rest = Array.from(counts.entries())
      .filter(([k]) => !preferred.includes(k))
      .sort((a, b) => b[1] - a[1])
      .map(([slug, count]) => ({ slug, count }));
    const final = [...preferredItems, ...rest].slice(0, 8);
    // For each category, pick a representative product image
    const result = final.map(({ slug, count }) => {
      const prod = list.find((p) => p.category.toLowerCase() === slug && p.images && p.images.length > 0);
      const image = prod?.images?.[0] || '/favicon.svg';
      const name = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return {
        id: slug,
        name,
        slug,
        image,
        description: `${count} product${count === 1 ? '' : 's'}`,
      };
    });
    return result;
  }, [products]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of hair extensions, wigs, and accessories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {(loading ? [] : tiles).map((category, i, arr) => {
            const groupIdx = i % 5;
            const total = arr.length;
            const lastGroupStart = Math.floor((total - 1) / 5) * 5;
            const isInLastGroup = i >= lastGroupStart;
            const remainder = total % 5 || 5; // 1..5

            // Defaults for brick pattern
            let lgSpan = 'lg:col-span-2';
            let lgStart = '';

            if (groupIdx < 3) {
              // Top row of group -> 3 tiles, each 2 columns
              lgSpan = 'lg:col-span-2';
            } else if (groupIdx === 3) {
              // Bottom row, first tile
              lgSpan = 'lg:col-span-2';
              lgStart = 'lg:col-start-2'; // center under top row
            } else {
              // Bottom row, second tile
              lgSpan = 'lg:col-span-2';
              lgStart = 'lg:col-start-4'; // center under top row
            }

            // Adjust for last partial group to keep items centered
            if (isInLastGroup) {
              if (remainder === 1) {
                // Single tile centered
                if (groupIdx === 0) {
                  lgSpan = 'lg:col-span-2';
                  lgStart = 'lg:col-start-3';
                }
              } else if (remainder === 2) {
                // Two tiles centered
                if (groupIdx === 0) {
                  lgSpan = 'lg:col-span-2';
                  lgStart = 'lg:col-start-2';
                } else if (groupIdx === 1) {
                  lgSpan = 'lg:col-span-2';
                  lgStart = 'lg:col-start-4';
                }
              }
            }

            const spanClass = `md:col-span-2 ${lgSpan} ${lgStart}`.trim();
            return (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${spanClass}`}
            >
              <div className="aspect-square relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Category Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm opacity-90">
                    {category.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary-500 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        {/* Featured Banner */}
        <div className="mt-12 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">New Customer Special</h3>
          <p className="text-lg mb-4">Get 20% off your first order with code WELCOME20</p>
          <Link
            to="/category/all"
            className="inline-block bg-white text-primary-500 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;