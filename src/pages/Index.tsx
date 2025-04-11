
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedSection from '@/components/FeaturedSection';
import { featuredProducts, offerProducts, commissionProducts, stores } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marcat-navy to-marcat-accent text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Men's Fashion Destination
              </h1>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Discover premium clothing from multiple stores, all in one place. Quality items with variety of colors, sizes, and styles.
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-white text-marcat-navy hover:bg-gray-100">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-marcat-navy">
                  Explore Stores
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="rounded-lg overflow-hidden shadow-lg transform -rotate-3">
                  <img 
                    src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=500&auto=format&fit=crop" 
                    alt="Men's Fashion" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-4 rotate-3">
                  <img 
                    src="https://images.unsplash.com/photo-1578681041175-9717c638d0cc?q=80&w=500&auto=format&fit=crop" 
                    alt="Men's Accessories" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg transform rotate-2">
                  <img 
                    src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=500&auto=format&fit=crop" 
                    alt="Men's Formal Wear" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg transform -translate-y-4 -rotate-2">
                  <img 
                    src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=500&auto=format&fit=crop" 
                    alt="Men's Casual Wear" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Stores */}
      <FeaturedSection 
        title="Featured Stores" 
        subtitle="Discover our top-rated men's clothing stores"
        stores={stores}
        viewAllLink="/stores"
      />
      
      {/* Featured Products */}
      <FeaturedSection 
        title="New Arrivals" 
        subtitle="Check out our latest men's fashion products"
        products={featuredProducts}
        viewAllLink="/products"
      />
      
      {/* Special Offer Banner */}
      <section className="bg-marcat-light py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1530735038726-a73fd6e6c31c?q=80&w=800&auto=format&fit=crop" 
                  alt="Special Offer" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="uppercase text-marcat-accent font-semibold tracking-wide text-sm">Limited Time</div>
                <h2 className="text-3xl font-bold text-marcat-navy mt-2">Mid-Season Sale</h2>
                <p className="mt-4 text-marcat-gray">
                  Enjoy up to 40% off on selected items from our premium collections. Upgrade your wardrobe with quality pieces at special prices.
                </p>
                <div className="mt-6">
                  <Button className="bg-marcat-accent hover:bg-marcat-navy">
                    Shop the Sale <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Special Offers Section */}
      <FeaturedSection 
        title="Special Offers" 
        subtitle="Don't miss these limited-time deals"
        products={offerProducts}
        viewAllLink="/offers"
        viewAllText="View All Offers"
      />
      
      {/* Commission Products */}
      <FeaturedSection 
        title="Commission Products" 
        subtitle="Exclusive products with special rewards for our partners"
        products={commissionProducts}
        viewAllLink="/commission"
        viewAllText="View All Commission Products"
      />
      
      {/* Features */}
      <section className="py-16 bg-marcat-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-marcat-navy mb-12">Why Choose Marcat?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-marcat-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-marcat-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-marcat-navy">Quality Guarantee</h3>
              <p className="text-marcat-gray">All our products undergo strict quality control to ensure premium standards.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-marcat-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-marcat-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-marcat-navy">Multiple Stores</h3>
              <p className="text-marcat-gray">Shop from various stores with different styles all in one platform.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-marcat-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-marcat-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-marcat-navy">Secure Payments</h3>
              <p className="text-marcat-gray">Your transactions are protected with state-of-the-art security systems.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-marcat-accent/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-marcat-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-marcat-navy">Customer Support</h3>
              <p className="text-marcat-gray">Our dedicated team is ready to assist you with any inquiries or concerns.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
