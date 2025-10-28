import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const CartDrawer: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getSubtotal 
  } = useCartStore();

  if (!isOpen) return null;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={closeCart}
      />
      
      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart ({items.length})</h2>
            <button 
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button 
                  onClick={closeCart}
                  className="btn-primary"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex space-x-3 p-3 border rounded-lg">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                      <div className="text-xs text-gray-500 space-y-1">
                        {item.variant.length && <p>Length: {item.variant.length}</p>}
                        {item.variant.color && <p>Color: {item.variant.color}</p>}
                        {item.variant.texture && <p>Texture: {item.variant.texture}</p>}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="p-1 hover:bg-gray-100 rounded text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {formatPrice((item.variant.salePrice || item.variant.price) * item.quantity)}
                      </div>
                      {item.variant.salePrice && (
                        <div className="text-xs text-gray-500 line-through">
                          {formatPrice(item.variant.price * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Upsell Banner */}
              <div className="bg-accent-honey bg-opacity-20 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-800">
                  🚚 Add ${(99 - getSubtotal()).toFixed(2)} more for FREE shipping!
                </p>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="font-semibold">Subtotal:</span>
                <span className="text-lg font-bold">{formatPrice(getSubtotal())}</span>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2">
                <button className="w-full btn-primary">
                  Checkout
                </button>
                <button className="w-full btn-accent-peach">
                  Buy with PayPal
                </button>
                <button 
                  onClick={closeCart}
                  className="w-full text-center py-2 text-primary-500 hover:text-primary-600 font-medium"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-xs text-center text-gray-600 pt-2 border-t">
                <div>
                  <div className="font-medium">100% Human Hair</div>
                </div>
                <div>
                  <div className="font-medium">Free Shipping</div>
                </div>
                <div>
                  <div className="font-medium">30-Day Returns</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;