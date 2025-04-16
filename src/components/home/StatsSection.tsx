
import React from 'react';
import FeaturedSection from '@/components/FeaturedSection';
import { stores } from '@/data/mockData';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-marcat-navy mb-3">Premium Partner Stores</h2>
          <p className="text-marcat-gray max-w-2xl mx-auto">
            Curated selections from top menswear retailers, all in one destination
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { number: "20+", label: "Premium Stores" },
            { number: "5,000+", label: "Quality Products" },
            { number: "15k+", label: "Happy Customers" },
            { number: "99%", label: "Satisfaction Rate" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-4xl font-bold text-marcat-accent mb-2">{stat.number}</h3>
              <p className="text-marcat-gray">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Featured Stores */}
        <FeaturedSection 
          title="Featured Stores" 
          subtitle="Discover our top-rated men's clothing stores"
          stores={stores}
          viewAllLink="/stores"
        />
      </div>
    </section>
  );
};

export default StatsSection;
