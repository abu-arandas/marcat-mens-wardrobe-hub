
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Star, ShoppingBag, Heart, Truck, ArrowLeft, Share2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Link to="/" className="text-marcat-accent hover:underline">
              Return to Homepage
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const selectedColor = product.colors[selectedColorIndex];
  const currentImage = selectedColor.images[selectedImageIndex];
  
  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };
  
  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    const selectedSizeObj = selectedColor.sizes.find(s => s.size === selectedSize);
    
    if (!selectedSizeObj) {
      toast({
        title: "Invalid size selection",
        description: "The selected size is not available",
        variant: "destructive"
      });
      return;
    }
    
    addToCart(product, selectedColor, selectedSizeObj, quantity);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleWishlist = () => {
    const isInList = isInWishlist(product.id);
    
    if (isInList) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
      .catch((error) => {
        console.error('Error sharing', error);
        toast({
          title: "Sharing failed",
          description: "Could not share this product",
          variant: "destructive"
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard",
      });
    }
  };
  
  const selectedSizeData = selectedColor.sizes.find(s => s.size === selectedSize);
  const isOutOfStock = selectedSize ? (selectedSizeData?.quantity || 0) <= 0 : false;
  const lowStock = selectedSize ? (selectedSizeData?.quantity || 0) <= 5 && (selectedSizeData?.quantity || 0) > 0 : false;
  const inWishlist = isInWishlist(product.id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container">
          <div className="flex items-center text-sm text-marcat-gray mb-6">
            <Link to="/" className="hover:text-marcat-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/products?category=${product.category.toLowerCase()}`} className="hover:text-marcat-accent">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-marcat-gray">{product.name}</span>
          </div>
          
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center text-marcat-navy hover:text-marcat-accent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={currentImage} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {selectedColor.images.map((image, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square bg-gray-100 rounded cursor-pointer border-2 ${
                      idx === selectedImageIndex ? "border-marcat-accent" : "border-transparent"
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Link to={`/store/${product.storeId}`} className="text-marcat-accent hover:text-marcat-navy">
                  {product.storeName}
                </Link>
                {(product.isOffer || product.isCommission) && (
                  <div className="ml-4 flex space-x-2">
                    {product.isOffer && (
                      <span className="bg-marcat-warning/20 text-marcat-warning px-2 py-0.5 rounded-full text-xs font-medium">
                        Special Offer
                      </span>
                    )}
                    {product.isCommission && (
                      <span className="bg-marcat-success/20 text-marcat-success px-2 py-0.5 rounded-full text-xs font-medium">
                        Commission Product
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-marcat-navy mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="font-semibold mr-1">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-marcat-gray mx-2">•</span>
                <span className="text-marcat-gray">{product.category}</span>
              </div>
              
              <div className="mb-6">
                {product.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-marcat-accent">${product.discountPrice.toFixed(2)}</span>
                    <span className="ml-3 text-gray-400 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-2 bg-marcat-warning/20 text-marcat-warning px-2 py-0.5 rounded-full text-xs font-medium">
                      {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-marcat-navy">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-marcat-gray mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Color: <span className="text-marcat-accent">{selectedColor.color}</span></h3>
                <div className="flex space-x-2">
                  {product.colors.map((color, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setSelectedColorIndex(idx);
                        setSelectedImageIndex(0);
                        setSelectedSize('');
                      }}
                      className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                        idx === selectedColorIndex 
                          ? 'ring-2 ring-offset-2 ring-marcat-accent' 
                          : 'ring-1 ring-gray-300'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: color.colorCode }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Size:</h3>
                  <Button variant="link" className="text-marcat-accent p-0 h-auto">Size Guide</Button>
                </div>
                
                <RadioGroup value={selectedSize} onValueChange={handleSizeSelection} className="flex flex-wrap gap-2">
                  {selectedColor.sizes.map((sizeOption) => (
                    <div key={sizeOption.size}>
                      <RadioGroupItem
                        value={sizeOption.size}
                        id={`size-${sizeOption.size}`}
                        className="sr-only peer"
                        disabled={sizeOption.quantity <= 0}
                      />
                      <Label
                        htmlFor={`size-${sizeOption.size}`}
                        className={`
                          flex h-10 w-10 items-center justify-center rounded-md border border-marcat-gray text-sm font-medium
                          peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-disabled:bg-gray-100
                          ${selectedSize === sizeOption.size ? 'bg-marcat-navy text-white border-marcat-navy' : 'bg-white text-marcat-gray hover:bg-gray-100'}
                          cursor-pointer
                        `}
                      >
                        {sizeOption.size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                {selectedSize && (
                  <div className="mt-2">
                    {isOutOfStock && (
                      <span className="text-red-500 text-sm">Out of stock</span>
                    )}
                    {lowStock && (
                      <span className="text-marcat-warning text-sm">Only {selectedSizeData?.quantity} left in stock</span>
                    )}
                    {!isOutOfStock && !lowStock && (
                      <span className="text-marcat-success text-sm">In stock</span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold mb-2">Quantity:</h3>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                  >
                    <span className="text-xl font-bold">-</span>
                  </Button>
                  <span className="mx-4 w-10 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange('increase')}
                    disabled={isOutOfStock || selectedSize === ''}
                  >
                    <span className="text-xl font-bold">+</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="flex-grow bg-marcat-navy hover:bg-marcat-accent flex items-center justify-center" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || selectedSize === ''}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex items-center justify-center"
                  onClick={handleWishlist}
                >
                  <Heart className={`mr-2 h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
                  {inWishlist ? "Remove from Wishlist" : "Wishlist"}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hidden sm:flex items-center justify-center"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-marcat-accent mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-semibold">Delivery</h4>
                    <p className="text-sm text-marcat-gray mt-1">Free shipping on orders over $50</p>
                    <p className="text-sm text-marcat-gray">Estimated delivery: 3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-6 border rounded-b-lg">
                <h3 className="font-semibold text-lg mb-3">Product Description</h3>
                <p className="text-marcat-gray mb-4">{product.description}</p>
                <p className="text-marcat-gray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                  Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                  rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
                  non est bibendum non venenatis nisl tempor.
                </p>
              </TabsContent>
              <TabsContent value="details" className="p-6 border rounded-b-lg">
                <h3 className="font-semibold text-lg mb-3">Product Details</h3>
                <ul className="space-y-2 text-marcat-gray">
                  <li><strong>Category:</strong> {product.category}</li>
                  <li><strong>Store:</strong> {product.storeName}</li>
                  <li><strong>Material:</strong> Premium Quality</li>
                  <li><strong>Care:</strong> Machine wash with like colors</li>
                  <li>
                    <strong>Tags:</strong> {product.tags.join(', ')}
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="p-6 border rounded-b-lg">
                <div className="flex items-center mb-4">
                  <h3 className="font-semibold text-lg">Customer Reviews</h3>
                  <div className="ml-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    <Star className="h-5 w-5 text-yellow-500" fill="currentColor" strokeOpacity="0.5" />
                    <span className="ml-2 font-medium">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-marcat-gray italic">No reviews yet. Be the first to leave a review!</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
