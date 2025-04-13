
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Product } from '@/types';

// In a real app, this would come from an API or context
import { products } from '@/data/mockData';

interface POSProductGridProps {
  category?: string;
  searchQuery: string;
}

const POSProductGrid: React.FC<POSProductGridProps> = ({ category, searchQuery }) => {
  const { addToCart } = useCart();
  
  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = !category || product.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    try {
      // For POS simplicity, we always add the first color and size option
      const firstColor = product.colors[0];
      const firstSize = firstColor.sizes[0];
      
      addToCart(product, firstColor, firstSize, 1);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pb-4">
      {filteredProducts.map(product => (
        <Card key={product.id} className="overflow-hidden">
          <div className="h-32 bg-gray-100 relative">
            <img 
              src={product.colors[0].images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg'; // Fallback to placeholder image
              }}
            />
            {product.discountPrice && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>
          <CardContent className="p-3">
            <div className="mb-2">
              <h3 className="font-medium text-sm truncate">{product.name}</h3>
              <div className="flex items-center justify-between mt-1">
                <div className="text-sm">
                  {product.discountPrice ? (
                    <>
                      <span className="text-red-500 font-medium">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-gray-400 line-through ml-1">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>${product.price.toFixed(2)}</span>
                  )}
                </div>
                <Button size="sm" variant="ghost" onClick={() => handleAddToCart(product)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default POSProductGrid;
