
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '@/types';

interface POSCartItemProps {
  item: CartItem;
  index: number;
  handleUpdateQuantity: (index: number, newQuantity: number) => void;
  handleRemoveFromCart: (index: number) => void;
}

const POSCartItem: React.FC<POSCartItemProps> = ({
  item,
  index,
  handleUpdateQuantity,
  handleRemoveFromCart
}) => {
  const displayImage = item.selectedColor?.images?.[0] || '/placeholder.svg';
  const price = item.product.discountPrice || item.product.price;
  
  return (
    <div 
      className="flex items-center py-3 border-b last:border-b-0"
    >
      <div className="w-14 h-14 bg-gray-100 rounded flex-shrink-0 mr-3 overflow-hidden">
        <img
          src={displayImage}
          alt={item.product.name}
          className="w-full h-full object-cover rounded"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg'; // Fallback image
          }}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
        <div className="text-xs text-gray-500 flex items-center">
          <span>{item.selectedColor.color} / {item.selectedSize.size}</span>
          {item.selectedSize.quantity < 10 && (
            <span className="ml-2 text-amber-600 text-[10px]">
              ({item.selectedSize.quantity} left)
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center mx-2">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 border-gray-200" 
          onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 border-gray-200"
          onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
          disabled={item.quantity >= item.selectedSize.quantity}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="w-16 text-right mr-2 font-medium text-sm">
        ${(price * item.quantity).toFixed(2)}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600"
        onClick={() => handleRemoveFromCart(index)}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default POSCartItem;
