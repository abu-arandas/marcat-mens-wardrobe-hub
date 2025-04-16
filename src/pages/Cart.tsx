
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import ShoppingCart from '@/components/ShoppingCart';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <ShoppingCart 
        items={items} 
        onRemove={removeFromCart} 
        onUpdateQuantity={updateQuantity} 
      />
    </div>
  );
};

export default Cart;
