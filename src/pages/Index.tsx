
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import OffersSection from '@/components/home/OffersSection';
import CommissionSection from '@/components/home/CommissionSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import FeaturedSection from '@/components/FeaturedSection';
import { featuredProducts } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <HeroSection />
      <StatsSection />
      
      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FeaturedSection 
            title="New Arrivals" 
            subtitle="Check out our latest men's fashion products"
            products={featuredProducts}
            viewAllLink="/products"
          />
        </div>
      </section>
      
      <FeaturesSection />
      <OffersSection />
      <CommissionSection />
      <NewsletterSection />
      
      <Footer />
    </div>
  );
};

export default Index;
