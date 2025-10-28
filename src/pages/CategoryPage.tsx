import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, List, SlidersHorizontal, Star, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { products, filterOptions } from '@/data/mockData';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  type FilterKey = 'lengths' | 'textures' | 'colors';

  const [filters, setFilters] = useState({
    priceRange: [0, 500] as [number, number],
    lengths: [] as string[],
    textures: [] as string[],
    colors: [] as string[],
  });

  const { addItem } = useCartStore();

  // Filter products based on category and filters
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => 
      category === 'all' || product.category === category
    );

    // Apply price filter
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Apply other filters
    if (filters.lengths.length > 0) {
      filtered = filtered.filter(product =>
        product.variants.some(variant => 
          variant.length && filters.lengths.includes(variant.length)
        )
      );
    }

    if (filters.textures.length > 0) {
      filtered = filtered.filter(product =>
        product.variants.some(variant => 
          variant.texture && filters.textures.includes(variant.texture)
        )
      );
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.variants.some(variant => 
          variant.color && filters.colors.includes(variant.color)
        )
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      case 'price-high':
        return filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      case 'rating':
        return filtered.sort((a, b) => b.averageRating - a.averageRating);
      case 'newest':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [category, filters, sortBy]);

  const handleFilterChange = (filterType: FilterKey, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const CategoryTitle = () => {
    const titles: Record<string, string> = {
      'wigs': 'Premium Wigs Collection',
      'bundles': 'Hair Bundles & Weaves',
      'closures': 'Lace Closures & Frontals',
      'colored-wigs': 'Colored Wigs Collection',
    };
    return titles[category || ''] || 'All Products';
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    
    const handleAddToCart = () => {
      if (product.variants.length > 0) {
        addItem(product, product.variants[0]);
      }
    };

    return (
      <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Sale Badge */}
          {product.salePrice && (
            <div className="absolute top-2 left-2 bg-accent-coral text-white px-2 py-1 rounded text-xs font-semibold">
              SALE
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
          >
            <Heart 
              size={16} 
              className={isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}
            />
          </button>
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 bg-primary-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
            >
              Quick Add
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.averageRating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.totalReviews})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.salePrice || product.price)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {/* Variants Info */}
          <div className="text-xs text-gray-500 space-y-1">
            {product.variants[0]?.length && (
              <p>Starting from {product.variants[0].length}</p>
            )}
            {product.variants[0]?.texture && (
              <p>{product.variants[0].texture}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <CategoryTitle />
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Length Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Length</h4>
                <div className="space-y-2">
                  {filterOptions.lengths.map(length => (
                    <label key={length} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.lengths.includes(length)}
                        onChange={() => handleFilterChange('lengths', length)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">{length}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Texture Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Texture</h4>
                <div className="space-y-2">
                  {filterOptions.textures.map(texture => (
                    <label key={texture} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.textures.includes(texture)}
                        onChange={() => handleFilterChange('textures', texture)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">{texture}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Color</h4>
                <div className="space-y-2">
                  {filterOptions.colors.map(color => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.colors.includes(color)}
                        onChange={() => handleFilterChange('colors', color)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-primary-500"
                >
                  <SlidersHorizontal size={20} />
                  <span>Filters</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-primary-500'}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-primary-500'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* No Products Message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products found with the selected filters.</p>
                <button
                  onClick={() => setFilters({
                    priceRange: [0, 500],
                    lengths: [],
                    textures: [],
                    colors: [],
                  })}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default CategoryPage;