
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { offerProducts } from '@/data/mockData';
import { ArrowRight, Tag } from 'lucide-react';

const Offers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-marcat-accent to-marcat-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <div className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-3">
                <Tag className="w-4 h-4 inline mr-1" /> Limited Time Offers
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Special Offers</h1>
              <p className="text-lg opacity-90 mb-6 max-w-xl">
                Discover our curated selection of discounted men's fashion items. 
                High-quality products at unbeatable prices for a limited time.
              </p>
              <Button className="bg-white text-marcat-accent hover:bg-gray-100">
                Shop All Offers
              </Button>
            </div>
            <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -right-6 bg-yellow-400 text-marcat-navy font-bold rounded-full w-16 h-16 flex items-center justify-center transform rotate-12">
                  40% OFF
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=400&auto=format&fit=crop" 
                  alt="Special offers" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Offers Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Featured Offer */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-marcat-navy mb-6">Featured Offer</h2>
          <div className="bg-marcat-light rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1617127365821-525aba53de82?q=80&w=800&auto=format&fit=crop" 
                  alt="Mid-season sale" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="text-marcat-accent font-semibold mb-2">WEEKEND SPECIAL</div>
                <h3 className="text-3xl font-bold mb-4">Buy 2 Get 1 Free</h3>
                <p className="mb-6 text-marcat-gray">
                  Purchase any two items from our premium collection and get a third item absolutely free. 
                  Choose from a wide range of shirts, trousers, and accessories.
                </p>
                <Button className="bg-marcat-accent hover:bg-marcat-navy">
                  View Details <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* All Offer Products */}
        <h2 className="text-2xl font-bold text-marcat-navy mb-6">All Special Offers</h2>
        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {offerProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No offers available</h3>
            <p className="text-marcat-gray">Check back soon for new special offers!</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Offers;
