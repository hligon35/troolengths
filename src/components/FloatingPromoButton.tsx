import React, { useState, useEffect } from 'react';
import { X, Tag, Gift } from 'lucide-react';

const FloatingPromoButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Show the floating button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 md:hidden">
      {/* Expanded Promo Card */}
      {isExpanded && (
        <div className="mb-2 bg-accent-coral text-white p-4 rounded-lg shadow-lg max-w-xs animate-slide-in-right">
          <button 
            onClick={handleClose}
            title="Close promo"
            className="absolute top-2 right-2 text-white hover:text-gray-200"
          >
            <X size={16} />
          </button>
          
          <div className="pr-6">
            <div className="flex items-center space-x-2 mb-2">
              <Gift size={20} />
              <span className="font-bold text-sm">Special Offer!</span>
            </div>
            <p className="text-sm mb-2">
              Get 20% off your first order + FREE shipping!
            </p>
            <p className="text-xs opacity-90 mb-3">
              Use code: WELCOME20
            </p>
            <button className="bg-white text-accent-coral font-semibold text-sm px-4 py-2 rounded hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleToggleExpanded}
        title="Toggle promo"
        className="bg-accent-coral text-white p-3 rounded-full shadow-lg hover:bg-red-500 transition-colors animate-pulse"
      >
        <Tag size={24} />
      </button>
    </div>
  );
};

export default FloatingPromoButton;