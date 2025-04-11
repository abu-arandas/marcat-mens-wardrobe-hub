
import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedSection from '@/components/FeaturedSection';
import { featuredProducts, offerProducts, commissionProducts, stores } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-white">
      <Navbar />
      
      {/* Hero Section with Enhanced Design */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 md:px-8">
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-blue-600 text-sm tracking-wide">
                <Zap className="w-4 h-4 mr-2" />
                New Arrivals Just Dropped
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-marcat-navy leading-tight">
                Elevate Your Style, <br />Effortlessly
              </h1>
              <p className="text-lg text-marcat-gray opacity-80 leading-relaxed">
                Discover premium menswear from multiple stores. Curated collections that blend quality, comfort, and contemporary design.
              </p>
              <div className="flex space-x-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-marcat-accent hover:bg-marcat-navy transition-colors duration-300 group"
                >
                  Shop Now 
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-marcat-navy text-marcat-navy hover:bg-marcat-navy hover:text-white transition-colors duration-300"
                >
                  Explore Stores
                </Button>
              </div>
            </div>
            
            <div className="hidden md:grid grid-cols-2 gap-6 relative">
              {[
                "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1578681041175-9717c638d0cc?q=80&w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=500&auto=format&fit=crop"
              ].map((src, index) => (
                <div 
                  key={src} 
                  className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                    index % 2 === 0 ? '-rotate-3' : 'rotate-3'
                  }`}
                >
                  <img 
                    src={src} 
                    alt={`Fashion Style ${index + 1}`} 
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
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
      
      {/* Enhanced Features Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-marcat-navy mb-4">Why Choose Marcat?</h2>
            <p className="text-marcat-gray max-w-2xl mx-auto">
              We've reimagined online shopping to provide a seamless, exciting experience for modern men.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "Verified Quality", 
                description: "Every product is carefully vetted for premium standards." 
              },
              { 
                icon: Globe, 
                title: "Multiple Stores", 
                description: "Shop from various curated stores in one platform." 
              },
              { 
                icon: TrendingUp, 
                title: "Latest Trends", 
                description: "Stay ahead with constantly updated fashion collections." 
              },
              { 
                icon: Zap, 
                title: "Fast Delivery", 
                description: "Quick and reliable shipping across the country." 
              }
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all group">
                <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:bg-marcat-accent transition-colors">
                  <Icon className="w-8 h-8 text-marcat-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-marcat-navy text-center">{title}</h3>
                <p className="text-marcat-gray text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Special Offers */}
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
      
      <Footer />
    </div>
  );
};

export default Index;

