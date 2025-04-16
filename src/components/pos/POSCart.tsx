
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/components/ui/use-toast";
import POSCartItem from './POSCartItem';
import POSCartEmptyState from './POSCartEmptyState';

const POSCart: React.FC = () => {
  const { items, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        handleRemoveFromCart(index);
        return;
      }
      
      const item = items[index];
      const availableStock = item.selectedSize.quantity;
      
      if (newQuantity > availableStock) {
        toast({
          title: "Cannot update quantity",
          description: `Only ${availableStock} items available in stock`,
          variant: "destructive"
        });
        return;
      }
      
      updateQuantity(index, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Could not update quantity",
        variant: "destructive"
      });
    }
  };

  const handleRemoveFromCart = (index: number) => {
    try {
      removeFromCart(index);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast({
        title: "Error",
        description: "Could not remove item from cart",
        variant: "destructive"
      });
    }
  };

  return (
    <ScrollArea className="flex-1">
      {items.length === 0 ? (
        <POSCartEmptyState />
      ) : (
        <div className="p-4">
          {items.map((item, index) => (
            <POSCartItem 
              key={`${item.product.id}-${item.selectedColor.color}-${item.selectedSize.size}-${index}`}
              item={item}
              index={index}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default POSCart;
