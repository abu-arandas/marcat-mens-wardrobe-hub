
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, CheckCircle, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
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
  );
};

export default HeroSection;
