
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingBag, CreditCard, DollarSign, Printer, Save } from 'lucide-react';
import POSProductGrid from '@/components/pos/POSProductGrid';
import POSCart from '@/components/pos/POSCart';
import POSPaymentModal from '@/components/pos/POSPaymentModal';
import { Separator } from '@/components/ui/separator';

const POS: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'pants', name: 'Pants' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    clearCart();
    setShowPaymentModal(false);
    // In a real app, you would save the transaction to the database here
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Product Selection Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Point of Sale</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Order
            </Button>
            <Button variant="outline" size="sm">
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

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            <POSProductGrid 
              category={activeCategory === 'all' ? undefined : activeCategory}
              searchQuery={searchQuery}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Summary Panel */}
      <div className="w-[400px] bg-white border-l h-full flex flex-col">
        <div className="p-4 bg-marcat-navy text-white">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-semibold">Current Order</h2>
          </div>
        </div>
        
        <POSCart />
        
        <div className="mt-auto p-4 border-t">
          <div className="space-y-2">
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
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full" disabled={items.length === 0} onClick={() => clearCart()}>
              Clear
            </Button>
            <Button className="w-full" disabled={items.length === 0} onClick={handlePayment}>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay
            </Button>
          </div>
        </div>
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
