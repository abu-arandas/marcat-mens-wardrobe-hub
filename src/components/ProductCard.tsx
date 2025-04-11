
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Get first color's first image as default display image
  const displayImage = product.colors[0]?.images[0] || '';
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <Link to={`/product/${product.id}`} className="block no-underline">
      <Card className="h-full overflow-hidden transition-transform hover:shadow-lg hover:scale-[1.02]">
        <div className="relative h-60 overflow-hidden bg-gray-100">
          <img 
            src={displayImage} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          
          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
            onClick={handleWishlist}
          >
            <Heart 
              className={`h-4 w-4 ${inWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
            />
          </Button>
          
          {/* Badges for special products */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isOffer && (
              <Badge className="bg-marcat-warning text-black">OFFER</Badge>
            )}
            {product.isCommission && (
              <Badge className="bg-marcat-success">COMMISSION</Badge>
            )}
          </div>
        </div>
        
        <CardContent className="pt-4">
          <div className="flex justify-between">
            <span className="text-sm text-marcat-accent">{product.storeName}</span>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
              <span className="text-xs">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-marcat-navy mt-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center mt-1">
            {product.discountPrice ? (
              <>
                <span className="font-bold text-marcat-accent">${product.discountPrice.toFixed(2)}</span>
                <span className="text-gray-400 line-through ml-2 text-sm">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold text-marcat-navy">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Color options preview */}
          <div className="flex mt-2 space-x-1">
            {product.colors.map((color, idx) => (
              <div 
                key={idx} 
                className="w-4 h-4 rounded-full border border-gray-300" 
                style={{ backgroundColor: color.colorCode }}
                title={color.color}
              />
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 border-t mt-3">
          <div className="w-full flex justify-between items-center">
            <Badge variant="outline" className="text-xs font-normal">
              {product.category}
            </Badge>
            <span className="text-sm text-marcat-accent hover:text-marcat-navy">
              View Details →
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
