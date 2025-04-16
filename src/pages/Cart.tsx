
import React from 'react';
import ShoppingCart from '@/components/ShoppingCart';

const Cart: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <ShoppingCart />
    </div>
  );
};

export default Cart;
