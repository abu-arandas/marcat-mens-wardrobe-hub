
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '@/types';
import { useToast } from "@/components/ui/use-toast";

interface WishlistContextType {
  items: Product[];
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const { toast } = useToast();
  
  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('marcatWishlist');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('marcatWishlist', JSON.stringify(items));
  }, [items]);
  
  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };
  
  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setItems(prev => [...prev, product]);
      toast({
        title: "Added to wishlist",
        description: `${product.name} added to your wishlist`,
      });
    }
  };
  
  const removeFromWishlist = (productId: string) => {
    setItems(prev => {
      const filtered = prev.filter(item => item.id !== productId);
      toast({
        title: "Removed from wishlist",
        description: "Product removed from your wishlist",
      });
      return filtered;
    });
  };
  
  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };
  
  return (
    <WishlistContext.Provider 
      value={{ 
        items, 
        isInWishlist, 
        addToWishlist, 
        removeFromWishlist, 
        clearWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
