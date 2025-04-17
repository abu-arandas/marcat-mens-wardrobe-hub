
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedSection from '@/components/FeaturedSection';
import OffersSection from '@/components/home/OffersSection';
import CommissionSection from '@/components/home/CommissionSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import { useAllStores } from '@/hooks/useStores';
import { useAllProducts, useOfferProducts, useCommissionProducts } from '@/hooks/useProducts';
import LoadingSpinner from '@/components/LoadingSpinner';

const Index: React.FC = () => {
  const { data: stores, isLoading: storesLoading } = useAllStores();
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const { data: offerProducts, isLoading: offersLoading } = useOfferProducts();
  const { data: commissionProducts, isLoading: commissionLoading } = useCommissionProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      
      {storesLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" message="Loading stores..." />
        </div>
      ) : (
        <FeaturedSection
          title="Featured Stores"
          subtitle="Discover incredible shops with unique products"
          stores={stores?.slice(0, 4)}
          viewAllLink="/stores"
        />
      )}

      {productsLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" message="Loading products..." />
        </div>
      ) : (
        <FeaturedSection
          title="New Arrivals"
          subtitle="Check out our latest products"
          products={products?.slice(0, 8)}
          viewAllLink="/products"
        />
      )}
      
      {offersLoading ? (
        <div className="py-10" />
      ) : (
        <OffersSection products={offerProducts} />
      )}
      
      {commissionLoading ? (
        <div className="py-10" />
      ) : (
        <CommissionSection products={commissionProducts} />
      )}
      
      <NewsletterSection />
    </div>
  );
};

export default Index;
