import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  Truck,
  RotateCcw,
  Award
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-accent-honey bg-opacity-20 rounded-full flex items-center justify-center">
                <Award className="text-accent-honey" size={24} />
              </div>
              <h3 className="font-semibold">100% Human Hair</h3>
              <p className="text-sm text-gray-400">Premium virgin hair quality</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-accent-honey bg-opacity-20 rounded-full flex items-center justify-center">
                <Truck className="text-accent-honey" size={24} />
              </div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-gray-400">On orders over $99</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-accent-honey bg-opacity-20 rounded-full flex items-center justify-center">
                <RotateCcw className="text-accent-honey" size={24} />
              </div>
              <h3 className="font-semibold">30-Day Returns</h3>
              <p className="text-sm text-gray-400">Hassle-free returns</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-accent-honey bg-opacity-20 rounded-full flex items-center justify-center">
                <Shield className="text-accent-honey" size={24} />
              </div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-sm text-gray-400">SSL encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary-300 mb-4">Troo Lengths</h3>
            <p className="text-gray-400 mb-4">
              Your trusted destination for premium quality hair extensions, wigs, and accessories. 
              Enhancing natural beauty with authentic, luxurious hair products.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>1-800-TROO-HAIR</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>support@troolengths.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>123 Beauty Blvd, Style City, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/category/wigs" className="hover:text-primary-300 transition-colors">Wigs</Link></li>
              <li><Link to="/category/bundles" className="hover:text-primary-300 transition-colors">Hair Bundles</Link></li>
              <li><Link to="/category/closures" className="hover:text-primary-300 transition-colors">Closures & Frontals</Link></li>
              <li><Link to="/category/colored-wigs" className="hover:text-primary-300 transition-colors">Colored Wigs</Link></li>
              <li><Link to="/sale" className="hover:text-primary-300 transition-colors">Sale Items</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-primary-300 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contact" className="hover:text-primary-300 transition-colors">Contact Us</Link></li>
              <li><Link to="/size-guide" className="hover:text-primary-300 transition-colors">Size Guide</Link></li>
              <li><Link to="/care-instructions" className="hover:text-primary-300 transition-colors">Care Instructions</Link></li>
              <li><Link to="/shipping-info" className="hover:text-primary-300 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-primary-300 transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="hover:text-primary-300 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
            
            <h5 className="font-medium mb-2">Newsletter</h5>
            <p className="text-sm text-gray-400 mb-3">Subscribe for exclusive offers and hair tips</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-md transition-colors" title="Subscribe">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Troo Lengths. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-primary-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary-300 transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-primary-300 transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;