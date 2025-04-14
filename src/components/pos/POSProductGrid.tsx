
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle } from 'lucide-react';
import { Product } from '@/types';
import { useToast } from "@/components/ui/use-toast";

// In a real app, this would come from an API or context
import { products } from '@/data/mockData';

interface POSProductGridProps {
  category?: string;
  searchQuery: string;
}

const POSProductGrid: React.FC<POSProductGridProps> = ({ category, searchQuery }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = !category || category === 'all' || product.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    try {
      if (!product.colors || product.colors.length === 0 || !product.colors[0].sizes || product.colors[0].sizes.length === 0) {
        toast({
          title: "Cannot add product",
          description: "Product is missing color or size information",
          variant: "destructive"
        });
        return;
      }

      // For POS simplicity, we always add the first color and size option
      const firstColor = product.colors[0];
      const firstSize = firstColor.sizes[0];
      
      addToCart(product, firstColor, firstSize, 1);
      
      toast({
        title: "Added to cart",
        description: `${product.name} added to cart`,
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast({
        title: "Error",
        description: "Could not add product to cart",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pb-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-36 bg-gray-100 relative">
              <img 
                src={product.colors?.[0]?.images?.[0] || '/placeholder.svg'} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg'; // Fallback to placeholder image
                }}
              />
              {product.discountPrice && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                  Sale
                </span>
              )}
            </div>
            <CardContent className="p-3">
              <div>
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <p className="text-xs text-gray-500 truncate">{product.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm">
                    {product.discountPrice ? (
                      <>
                        <span className="text-red-500 font-medium">${product.discountPrice.toFixed(2)}</span>
                        <span className="text-gray-400 line-through ml-1 text-xs">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleAddToCart(product)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
          <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-gray-500 font-medium">No products found</p>
          <p className="text-gray-400 text-sm">Try a different search term or category</p>
        </div>
      )}
    </div>
  );
};

export default POSProductGrid;
