
import React from 'react';
import FeaturedSection from '@/components/FeaturedSection';
import { commissionProducts } from '@/data/mockData';

const CommissionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <FeaturedSection 
          title="Commission Products" 
          subtitle="Exclusive products with special rewards for our partners"
          products={commissionProducts}
          viewAllLink="/commission"
          viewAllText="View All Commission Products"
        />
      </div>
    </section>
  );
};

export default CommissionSection;
