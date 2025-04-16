
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Printer } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface POSHeaderProps {
  handleSaveOrder: () => void;
  handlePrintReceipt: () => void;
}

const POSHeader: React.FC<POSHeaderProps> = ({ handleSaveOrder, handlePrintReceipt }) => {
  return (
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
  );
};

export default POSHeader;
