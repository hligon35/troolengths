import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Link } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Thank you! 🎉</h1>
        <p className="text-gray-700 mb-6">
          Your payment was successful. You’ll receive an email confirmation shortly.
        </p>
        <div className="space-x-3">
          <Link to="/" className="btn-primary inline-block">Continue Shopping</Link>
          <Link to="/category/all" className="btn-accent-peach inline-block">Browse All</Link>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default SuccessPage;
