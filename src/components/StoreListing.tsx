
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface StoreListingProps {
  store: Store;
}

const StoreListing: React.FC<StoreListingProps> = ({ store }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/store/${store.id}`);
  };
  
  return (
    <Card 
      className="h-full overflow-hidden transition-transform hover:shadow-lg hover:scale-[1.02] cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img 
          src={store.logo} 
          alt={store.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-5">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-marcat-navy">{store.name}</h3>
          <div className="flex items-center bg-marcat-light px-2 py-1 rounded-md">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm font-medium">{store.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-marcat-gray text-sm mt-1 line-clamp-2">{store.description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between border-t mt-3">
        <Badge variant="outline" className="text-xs font-normal">
          {store.productCount} Products
        </Badge>
        <span className="text-sm text-marcat-accent hover:text-marcat-navy">
          Visit Store →
        </span>
      </CardFooter>
    </Card>
  );
};

export default StoreListing;
