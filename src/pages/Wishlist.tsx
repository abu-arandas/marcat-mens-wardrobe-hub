
import React from 'react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleAddToCart = (product: any) => {
    // Add to cart with default color and size
    const defaultColor = product.colors[0];
    const defaultSize = defaultColor.sizes[0];
    addToCart(product, defaultColor, defaultSize, 1);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Heart className="mr-2 h-6 w-6 text-marcat-accent" />
            My Wishlist
          </h1>
          {items.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearWishlist} className="flex items-center">
              <Trash className="mr-2 h-4 w-4" />
              Clear Wishlist
            </Button>
          )}
        </div>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-md mb-6">
              You haven't added any products to your wishlist yet. Browse our catalog and save your favorite items here.
            </p>
            <Button asChild>
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-6">{items.length} item(s) in your wishlist</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map(product => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <Button 
                    className="absolute bottom-4 right-4 flex items-center shadow-md"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
