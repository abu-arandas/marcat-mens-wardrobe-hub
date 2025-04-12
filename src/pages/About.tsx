
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-marcat-navy mb-6">About Marcat</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              Marcat is a premium men's fashion marketplace that connects customers with the best clothing stores around the world. Our curated platform brings together unique collections from multiple retailers, offering a seamless shopping experience.
            </p>
            
            <h2 className="text-2xl font-semibold text-marcat-navy mt-10 mb-4">Our Vision</h2>
            <p className="mb-6">
              We believe that every man deserves access to high-quality fashion that fits their unique style. Our vision is to create the most comprehensive and user-friendly marketplace for men's clothing, where customers can discover new brands and stores can reach a wider audience.
            </p>
            
            <h2 className="text-2xl font-semibold text-marcat-navy mt-10 mb-4">Our Story</h2>
            <p className="mb-6">
              Founded in 2023, Marcat began with a simple observation: men were struggling to find quality clothing without having to visit multiple stores or websites. Our founders, with backgrounds in fashion retail and e-commerce technology, came together to create a solution that would make shopping for men's fashion easier and more enjoyable.
            </p>
            
            <h2 className="text-2xl font-semibold text-marcat-navy mt-10 mb-4">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-xl mb-3">Curated Selection</h3>
                <p>Every product on our platform is carefully vetted for quality, style, and value. We work directly with stores to ensure only the best items make it to our marketplace.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-xl mb-3">Multi-Store Shopping</h3>
                <p>Browse products from multiple retailers in one place, with a unified checkout experience that makes purchasing from different stores simple and convenient.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-xl mb-3">Partner Program</h3>
                <p>Our unique commission structure benefits both customers and stores, creating a sustainable ecosystem that rewards quality and customer satisfaction.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-xl mb-3">Style Guidance</h3>
                <p>Beyond just selling clothes, we provide style advice and recommendations tailored to your preferences and needs.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-marcat-navy mt-10 mb-4">Join Us</h2>
            <p className="mb-6">
              Whether you're a customer looking for quality men's fashion or a store wanting to reach new customers, we invite you to be part of the Marcat community. Together, we're redefining how men shop for clothing.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
