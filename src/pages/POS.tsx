
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import POSCart from '@/components/pos/POSCart';
import POSHeader from '@/components/pos/POSHeader';
import POSSearch from '@/components/pos/POSSearch';
import POSCategoryTabs from '@/components/pos/POSCategoryTabs';
import POSOrderSummary from '@/components/pos/POSOrderSummary';
import POSPaymentModal from '@/components/pos/POSPaymentModal';
import { useToast } from "@/components/ui/use-toast";

const POS: React.FC = () => {
  const { items, clearCart } = useCart();
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Product Selection Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-4">
        <POSHeader 
          handleSaveOrder={handleSaveOrder}
          handlePrintReceipt={handlePrintReceipt}
        />

        <POSSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <POSCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
        />
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
        
        <POSOrderSummary 
          handlePayment={handlePayment}
          clearCart={clearCart}
        />
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <POSPaymentModal 
          total={items.reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0) * 1.08} 
          onClose={() => setShowPaymentModal(false)} 
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default POS;
