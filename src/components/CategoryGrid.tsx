import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/mockData';

const CategoryGrid: React.FC = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
          ))}
        </div>

        {/* Featured Banner */}
        <div className="mt-12 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">New Customer Special</h3>
          <p className="text-lg mb-4">Get 20% off your first order with code WELCOME20</p>
          <Link
            to="/category/bundles"
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