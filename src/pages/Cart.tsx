
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { createOrder } from '@/services/OrderService';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, calculateTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const total = calculateTotal();

  const handleQuantityChange = (itemIndex: number, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      updateQuantity(itemIndex, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: 'Login required',
        description: 'Please log in to complete your purchase.',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    try {
      setProcessing(true);
      const orderId = await createOrder(items, total);
      
      clearCart();
      
      toast({
        title: 'Order placed!',
        description: `Your order #${orderId.substring(0, 8)} has been placed successfully.`
      });
      
      navigate('/orders');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout failed',
        description: error instanceof Error ? error.message : 'There was a problem processing your order.',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <Card className="text-center py-16">
          <CardContent className="flex flex-col items-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => {
                const colorImage = item.selectedColor.images[0];
                
                return (
                  <div key={index} className="flex gap-4 py-4 border-b last:border-b-0">
                    <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={colorImage} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="font-semibold">
                          ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-3">
                        <p>Color: {item.selectedColor.color}</p>
                        <p>Size: {item.selectedSize.size}</p>
                        {item.product.discountPrice && (
                          <p className="text-marcat-accent">
                            Sale: ${item.product.discountPrice.toFixed(2)} 
                            <span className="line-through ml-2 text-gray-400">
                              ${item.product.price.toFixed(2)}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <button 
                            className="w-8 h-8 flex items-center justify-center border rounded-l"
                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <Input
                            type="number"
                            className="w-12 h-8 text-center px-0 border-y border-x-0 rounded-none"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                            min={1}
                            max={10}
                          />
                          <button 
                            className="w-8 h-8 flex items-center justify-center border rounded-r"
                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                          >
                            +
                          </button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFromCart(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                      
                      {item.selectedSize.quantity < 5 && (
                        <div className="flex items-center mt-2 text-yellow-600 text-sm">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Only {item.selectedSize.quantity} left in stock
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCheckout} 
                className="w-full" 
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
