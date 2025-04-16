
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const POSCartEmptyState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
      <p className="text-gray-600 font-medium text-lg">Cart is empty</p>
      <p className="text-gray-400 text-sm mt-1 max-w-xs">
        Add products from the catalog to begin checkout
      </p>
    </div>
  );
};

export default POSCartEmptyState;
