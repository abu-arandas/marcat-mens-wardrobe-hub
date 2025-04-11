
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product, ProductColor, ProductSize } from '@/types';
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addToCart: (product: Product, color: ProductColor, size: ProductSize, quantity: number) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  removeFromCart: (itemIndex: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('marcatCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('marcatCart', JSON.stringify(items));
  }, [items]);
  
  // Calculate total price and item count
  const totalPrice = items.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + (price * item.quantity);
  }, 0);
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  const addToCart = (product: Product, color: ProductColor, size: ProductSize, quantity: number) => {
    setItems(prevItems => {
      // Check if the item already exists in the cart with same color and size
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && 
               item.selectedColor.color === color.color && 
               item.selectedSize.size === size.size
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} added to your shopping cart`,
        });
        
        return [...prevItems, { product, selectedColor: color, selectedSize: size, quantity }];
      }
    });
  };
  
  const updateQuantity = (itemIndex: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemIndex);
      return;
    }
    
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemIndex].quantity = quantity;
      return updatedItems;
    });
  };
  
  const removeFromCart = (itemIndex: number) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      const removedItem = updatedItems[itemIndex];
      
      toast({
        title: "Removed from cart",
        description: `${removedItem.product.name} removed from your shopping cart`,
      });
      
      updatedItems.splice(itemIndex, 1);
      return updatedItems;
    });
  };
  
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        itemCount, 
        totalPrice, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
