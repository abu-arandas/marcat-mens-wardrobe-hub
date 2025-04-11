
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { commissionProducts } from '@/data/mockData';
import { ArrowRight, DollarSign, Users } from 'lucide-react';

const Commission = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-600 to-marcat-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <div className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-3">
                <DollarSign className="w-4 h-4 inline mr-1" /> Partner Program
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Commission Products</h1>
              <p className="text-lg opacity-90 mb-6 max-w-xl">
                Earn rewards by selling our partner products. Join our commission program and
                start earning while helping customers find their perfect style.
              </p>
              <div className="flex gap-4">
                <Button className="bg-white text-green-600 hover:bg-gray-100">
                  Join Partner Program
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1651760656484-178a03999228?q=80&w=400&auto=format&fit=crop" 
                alt="Commission program" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <section className="py-14 bg-marcat-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-marcat-navy mb-12">
            How Commission Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-marcat-navy">1. Join the Program</h3>
              <p className="text-marcat-gray">
                Sign up to become a partner and gain access to our commission products catalog.
                Complete a simple verification process to get started.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-marcat-navy">2. Promote Products</h3>
              <p className="text-marcat-gray">
                Share your unique referral links or showcase products directly to your audience,
                friends, and social networks.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-marcat-navy">3. Earn Commission</h3>
              <p className="text-marcat-gray">
                Earn up to 15% commission on every successful sale. Commissions are tracked automatically
                and paid out monthly.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button className="bg-green-600 hover:bg-green-700">
              Apply to Partner Program <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Commission Products */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-marcat-navy mb-6">Available Commission Products</h2>
        {commissionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {commissionProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No commission products available</h3>
            <p className="text-marcat-gray">Check back soon for new commission opportunities!</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Commission;
