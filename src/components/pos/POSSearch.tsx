
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface POSSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const POSSearch: React.FC<POSSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search products..." 
        className="pl-8" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default POSSearch;
