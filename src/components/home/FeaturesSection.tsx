
import React from 'react';
import { ShieldCheck, Globe, TrendingUp, Zap } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
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
  ];

  return (
    <section className="bg-gradient-to-br from-marcat-navy to-marcat-accent py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The Marcat Experience</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            We've reimagined online shopping to provide a seamless, exciting experience for modern men.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
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
  );
};

export default FeaturesSection;
