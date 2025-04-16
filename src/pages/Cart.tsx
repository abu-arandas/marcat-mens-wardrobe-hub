
import React from 'react';
import ShoppingCart from '@/components/ShoppingCart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center text-marcat-navy hover:text-marcat-accent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shopping
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        <ShoppingCart />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
