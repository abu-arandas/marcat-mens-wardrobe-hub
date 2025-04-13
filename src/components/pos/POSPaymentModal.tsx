
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign, Smartphone } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface POSPaymentModalProps {
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

const POSPaymentModal: React.FC<POSPaymentModalProps> = ({ total, onClose, onComplete }) => {
  const [paymentTab, setPaymentTab] = useState('cash');
  const [cashAmount, setCashAmount] = useState<string>(total.toFixed(2));
  const { toast } = useToast();
  
  const handleCashPayment = () => {
    const cashValue = parseFloat(cashAmount);
    
    if (isNaN(cashValue)) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid cash amount",
        variant: "destructive"
      });
      return;
    }
    
    if (cashValue < total) {
      toast({
        title: "Insufficient payment",
        description: `The cash amount is less than the total (${total.toFixed(2)})`,
        variant: "destructive"
      });
      return;
    }
    
    const change = cashValue - total;
    
    toast({
      title: "Payment successful",
      description: `Change: $${change.toFixed(2)}`,
    });
    
    onComplete();
  };
  
  const handleCardPayment = () => {
    // In a real app, this would integrate with a payment processor
    toast({
      title: "Card payment approved",
      description: `Amount: $${total.toFixed(2)}`,
    });
    
    onComplete();
  };
  
  const handleMobilePayment = () => {
    // In a real app, this would integrate with a mobile payment system
    toast({
      title: "Mobile payment complete",
      description: `Amount: $${total.toFixed(2)}`,
    });
    
    onComplete();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment - ${total.toFixed(2)}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="cash" value={paymentTab} onValueChange={setPaymentTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="cash">
              <DollarSign className="h-4 w-4 mr-2" />
              Cash
            </TabsTrigger>
            <TabsTrigger value="card">
              <CreditCard className="h-4 w-4 mr-2" />
              Card
            </TabsTrigger>
            <TabsTrigger value="mobile">
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cash" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cash-amount">Cash Amount</Label>
              <Input
                id="cash-amount"
                placeholder="0.00"
                type="number"
                step="0.01"
                min={total}
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
              />
            </div>
            
            {parseFloat(cashAmount) >= total && (
              <div className="px-4 py-2 bg-gray-100 rounded">
                <div className="flex justify-between">
                  <span>Change</span>
                  <span>${(parseFloat(cashAmount) - total).toFixed(2)}</span>
                </div>
              </div>
            )}
            
            <Button className="w-full" onClick={handleCashPayment}>
              Complete Cash Payment
            </Button>
          </TabsContent>
          
          <TabsContent value="card" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="**** **** **** ****" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="***" />
              </div>
            </div>
            
            <Button className="w-full" onClick={handleCardPayment}>
              Process Card Payment
            </Button>
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-4 text-center">
            <div className="p-8 bg-gray-100 rounded-lg mx-auto max-w-[200px]">
              <div className="text-5xl">📱</div>
              <p className="mt-4 text-sm text-gray-600">Scan with your mobile device</p>
            </div>
            
            <Button className="w-full" onClick={handleMobilePayment}>
              Complete Mobile Payment
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default POSPaymentModal;
