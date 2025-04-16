
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import FeaturedSection from '@/components/FeaturedSection';
import { offerProducts } from '@/data/mockData';

const OffersSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-marcat-navy mb-4">Special Seasonal Offers</h2>
              <p className="text-marcat-gray mb-6">
                Enjoy exclusive discounts on premium menswear for a limited time. Refresh your wardrobe with the latest styles at special prices.
              </p>
              <Button 
                className="bg-marcat-accent hover:bg-marcat-navy text-white transition-all group"
                size="lg"
              >
                Shop All Offers
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative ml-auto hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=500&auto=format&fit=crop" 
                alt="Special Offers" 
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 bg-marcat-accent text-white py-2 px-4 rounded-lg">
                <p className="text-xl font-bold">Up to 40% Off</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Special Offers Products */}
        <FeaturedSection 
          title="Special Offers" 
          subtitle="Don't miss these limited-time deals"
          products={offerProducts}
          viewAllLink="/offers"
          viewAllText="View All Offers"
        />
      </div>
    </section>
  );
};

export default OffersSection;
