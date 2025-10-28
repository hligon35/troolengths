import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoryGrid from '@/components/CategoryGrid';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import FloatingPromoButton from '@/components/FloatingPromoButton';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroBanner />
        <CategoryGrid />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingPromoButton />
    </div>
  );
};

export default HomePage;