
import React from 'react';
import { Button } from '@/components/ui/button';

const NewsletterSection: React.FC = () => {
  return (
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
  );
};

export default NewsletterSection;
