
import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

interface POSOrderSummaryProps {
  handlePayment: () => void;
  clearCart: () => void;
}

const POSOrderSummary: React.FC<POSOrderSummaryProps> = ({ handlePayment, clearCart }) => {
  const { items, totalPrice } = useCart();
  
  const taxAmount = totalPrice * 0.08;
  const finalTotal = totalPrice * 1.08;

  return (
    <CardFooter className="mt-auto p-4 border-t bg-white flex-col">
      <div className="space-y-2 w-full">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3 w-full">
        <Button 
          variant="outline" 
          className="w-full" 
          disabled={items.length === 0} 
          onClick={() => clearCart()}
        >
          Clear
        </Button>
        <Button 
          className="w-full bg-slate-800 hover:bg-slate-900" 
          disabled={items.length === 0} 
          onClick={handlePayment}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Pay
        </Button>
      </div>
    </CardFooter>
  );
};

export default POSOrderSummary;
