
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ShoppingBag, Plus, Minus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const ShoppingCart: React.FC = () => {
  const { items, itemCount, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-marcat-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 p-4">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-gray-500 text-center mt-2">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="mt-6">
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto pr-2">
              {items.map((item, index) => {
                const displayImage = item.selectedColor.images[0];
                const price = item.product.discountPrice || item.product.price;
                
                return (
                  <div key={`${item.product.id}-${item.selectedColor.color}-${item.selectedSize.size}`} className="py-3">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                        <img 
                          src={displayImage} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover rounded" 
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link to={`/product/${item.product.id}`} className="font-medium hover:text-marcat-accent">
                            {item.product.name}
                          </Link>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(index)} className="h-6 w-6">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          {item.selectedColor.color} / {item.selectedSize.size}
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 rounded-none" 
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 rounded-none" 
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="font-medium">
                            ${(price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < items.length - 1 && <Separator className="mt-3" />}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-auto pt-4 border-t">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-2">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <SheetFooter className="flex-col gap-2 mt-4">
                <Button className="w-full">Proceed to Checkout</Button>
                <div className="flex justify-between w-full">
                  <Link to="/products">
                    <Button variant="outline" size="sm">Continue Shopping</Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={clearCart}>Clear Cart</Button>
                </div>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
