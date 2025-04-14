
import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Globe, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedSection from '@/components/FeaturedSection';
import { featuredProducts, offerProducts, commissionProducts, stores } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section with Enhanced Design */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-4">
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-blue-600 text-sm font-medium tracking-wide">
                <Zap className="w-4 h-4 mr-2" />
                Premium Men's Fashion Hub
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-marcat-navy leading-tight">
                Elevate Your <span className="text-marcat-accent">Style</span> for Every Occasion
              </h1>
              <p className="text-lg text-marcat-gray opacity-80 leading-relaxed max-w-xl">
                Discover curated premium menswear collections from top stores, all in one place. Quality meets style for the modern gentleman.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-marcat-accent hover:bg-marcat-navy transition-colors duration-300 text-white group"
                >
                  Shop Collection 
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
              <div className="flex items-center space-x-6 pt-2">
                {['Free Shipping', 'Easy Returns', 'Quality Guarantee'].map((item) => (
                  <div key={item} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-marcat-accent mr-2" />
                    <span className="text-sm text-marcat-gray">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-3 gap-3 h-[500px]">
                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden transform -rotate-2 shadow-xl hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop" 
                    alt="Fashion Style 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden transform rotate-2 shadow-lg hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1578681041175-9717c638d0cc?q=80&w=300&auto=format&fit=crop" 
                    alt="Fashion Style 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden transform rotate-3 shadow-lg hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=300&auto=format&fit=crop" 
                    alt="Fashion Style 3" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-50 rounded-full p-2">
                    <TrendingUp className="h-6 w-6 text-marcat-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-marcat-gray">Trending Now</p>
                    <p className="font-medium text-marcat-navy">Summer Collection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Design Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-bl-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-tr-full opacity-50"></div>
      </section>
      
      {/* Stores Section with Stats */}
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
      
      {/* Enhanced Features Section */}
      <section className="bg-gradient-to-br from-marcat-navy to-marcat-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Marcat Experience</h2>
            <p className="max-w-2xl mx-auto opacity-90">
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
              <div key={title} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors group">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="opacity-80">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Special Offers with Call-to-action */}
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
      
      {/* Commission Products */}
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
      
      {/* Newsletter Section */}
      <section className="py-16 bg-marcat-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated with Marcat</h2>
            <p className="mb-8 opacity-80">
              Subscribe to our newsletter for exclusive offers, new arrivals, and styling tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg text-marcat-navy focus:outline-none focus:ring-2 focus:ring-marcat-accent"
              />
              <Button 
                className="bg-marcat-accent hover:bg-white hover:text-marcat-accent text-white transition-colors"
                size="lg"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
