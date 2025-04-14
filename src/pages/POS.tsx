
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingBag, CreditCard, Printer, Save, ReceiptText } from 'lucide-react';
import POSProductGrid from '@/components/pos/POSProductGrid';
import POSCart from '@/components/pos/POSCart';
import POSPaymentModal from '@/components/pos/POSPaymentModal';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast";

const POS: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'pants', name: 'Pants' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const handlePayment = () => {
    if (items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Add items to cart before proceeding to payment",
        variant: "destructive"
      });
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    clearCart();
    setShowPaymentModal(false);
    toast({
      title: "Transaction complete",
      description: "Order has been processed successfully",
    });
  };

  const handleSaveOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Add items to cart before saving order",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Order saved",
      description: `Order saved as draft #${Math.floor(Math.random() * 10000)}`,
    });
  };

  const handlePrintReceipt = () => {
    if (items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Add items to cart before printing receipt",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Receipt printing",
      description: "Receipt sent to printer",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Product Selection Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold">Point of Sale</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSaveOrder}>
              <Save className="h-4 w-4 mr-2" />
              Save Order
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrintReceipt}>
              <Printer className="h-4 w-4 mr-2" />
              Print Receipt
            </Button>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Card className="flex-1 overflow-hidden border-gray-200">
          <CardHeader className="p-0">
            <Tabs defaultValue="all" value={activeCategory} className="w-full">
              <TabsList className="w-full h-auto justify-start overflow-x-auto bg-gray-50 p-1 rounded-none border-b">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="py-1.5 px-3 text-sm"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="m-0 p-4 overflow-y-auto max-h-[calc(100vh-280px)]">
                <POSProductGrid 
                  category={activeCategory}
                  searchQuery={searchQuery}
                />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>

      {/* Order Summary Panel */}
      <div className="w-full md:w-[380px] bg-white border-l shadow-sm h-full flex flex-col">
        <CardHeader className="py-3 px-4 bg-slate-800 text-white">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            <CardTitle className="text-lg">Current Order</CardTitle>
          </div>
        </CardHeader>
        
        <POSCart />
        
        <CardFooter className="mt-auto p-4 border-t bg-white flex-col">
          <div className="space-y-2 w-full">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%)</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${(totalPrice * 1.08).toFixed(2)}</span>
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
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <POSPaymentModal 
          total={totalPrice * 1.08} 
          onClose={() => setShowPaymentModal(false)} 
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default POS;
