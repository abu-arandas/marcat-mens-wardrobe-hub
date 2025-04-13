
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus } from 'lucide-react';

const POSCart: React.FC = () => {
  const { items, updateQuantity, removeFromCart } = useCart();

  return (
    <ScrollArea className="flex-1">
      {items.length === 0 ? (
        <div className="h-full flex items-center justify-center p-4">
          <p className="text-gray-500 text-center">No items in cart</p>
        </div>
      ) : (
        <div className="p-4">
          {items.map((item, index) => {
            const displayImage = item.selectedColor.images[0];
            const price = item.product.discountPrice || item.product.price;
            
            return (
              <div 
                key={`${item.product.id}-${item.selectedColor.color}-${item.selectedSize.size}-${index}`}
                className="flex items-center py-2 border-b last:border-b-0"
              >
                <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 mr-3">
                  <img
                    src={displayImage}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                  <div className="text-xs text-gray-500 truncate">
                    {item.selectedColor.color} / {item.selectedSize.size}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6" 
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="w-16 text-right mr-2 font-medium">
                  ${(price * item.quantity).toFixed(2)}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-500"
                  onClick={() => removeFromCart(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </ScrollArea>
  );
};

export default POSCart;
