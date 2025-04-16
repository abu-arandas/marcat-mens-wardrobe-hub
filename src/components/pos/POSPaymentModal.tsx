
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
import { CreditCard, DollarSign, Smartphone, Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface POSPaymentModalProps {
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

const POSPaymentModal: React.FC<POSPaymentModalProps> = ({ total, onClose, onComplete }) => {
  const [paymentTab, setPaymentTab] = useState('cash');
  const [cashAmount, setCashAmount] = useState<string>(total.toFixed(2));
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });
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
        description: `The cash amount is less than the total ($${total.toFixed(2)})`,
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    const change = cashValue - total;
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful",
        description: `Change: $${change.toFixed(2)}`,
      });
      onComplete();
    }, 1000);
  };
  
  const handleCardPayment = () => {
    // Basic validation
    if (!cardDetails.number.trim() || !cardDetails.expiry.trim() || !cardDetails.cvv.trim()) {
      toast({
        title: "Incomplete card details",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (cardDetails.number.replace(/\s/g, '').length < 13) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid card number",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // In a real app, this would integrate with a payment processor
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Card payment approved",
        description: `Amount: $${total.toFixed(2)}`,
      });
      onComplete();
    }, 1500);
  };
  
  const handleMobilePayment = () => {
    setIsProcessing(true);
    
    // In a real app, this would integrate with a mobile payment system
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Mobile payment complete",
        description: `Amount: $${total.toFixed(2)}`,
      });
      onComplete();
    }, 1200);
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    // Add space every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    // Format as MM/YY
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Payment - ${total.toFixed(2)}</DialogTitle>
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
              <div className="px-4 py-3 bg-gray-100 rounded">
                <div className="flex justify-between">
                  <span>Change</span>
                  <span className="font-medium">${(parseFloat(cashAmount) - total).toFixed(2)}</span>
                </div>
              </div>
            )}
            
            <Button 
              className="w-full" 
              onClick={handleCashPayment}
              disabled={isProcessing || parseFloat(cashAmount) < total || isNaN(parseFloat(cashAmount))}
            >
              {isProcessing ? 'Processing...' : 'Complete Cash Payment'}
            </Button>
          </TabsContent>
          
          <TabsContent value="card" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input 
                id="card-number" 
                placeholder="**** **** **** ****" 
                value={cardDetails.number}
                onChange={(e) => setCardDetails({
                  ...cardDetails,
                  number: formatCardNumber(e.target.value)
                })}
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input 
                  id="expiry" 
                  placeholder="MM/YY" 
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({
                    ...cardDetails,
                    expiry: formatExpiry(e.target.value)
                  })}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv" 
                  placeholder="***" 
                  type="password" 
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({
                    ...cardDetails,
                    cvv: e.target.value.replace(/\D/g, '').substring(0, 4)
                  })}
                  maxLength={4}
                />
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleCardPayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Process Card Payment'}
            </Button>
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-4 text-center">
            <div className="p-8 bg-gray-100 rounded-lg mx-auto max-w-[200px]">
              <div className="text-6xl">📱</div>
              <p className="mt-4 text-sm text-gray-600">Scan with your mobile device</p>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleMobilePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Complete Mobile Payment'}
              {isProcessing && <span className="ml-2 animate-spin">◌</span>}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default POSPaymentModal;
