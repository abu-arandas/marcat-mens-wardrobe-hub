
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Mock orders data
const orders = [
  {
    id: 'ORD-12345',
    date: '2025-03-15',
    status: 'delivered',
    total: 129.99,
    items: [
      { id: 'p1', name: 'Premium Cotton T-Shirt', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&auto=format' },
      { id: 'p2', name: 'Slim Fit Chino Pants', price: 69.99, quantity: 1, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&auto=format' }
    ]
  },
  {
    id: 'ORD-12346',
    date: '2025-04-02',
    status: 'shipped',
    total: 89.99,
    items: [
      { id: 'p3', name: 'Denim Jacket', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&auto=format' }
    ]
  },
  {
    id: 'ORD-12347',
    date: '2025-04-10',
    status: 'processing',
    total: 159.97,
    items: [
      { id: 'p4', name: 'Leather Boots', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=200&auto=format' },
      { id: 'p5', name: 'Wool Socks', price: 14.99, quantity: 2, image: 'https://images.unsplash.com/photo-1586350977771-2a1dc0c8d999?w=200&auto=format' }
    ]
  }
];

// Helper function to format status
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'processing':
      return { icon: Clock, color: 'bg-yellow-100 text-yellow-800', label: 'Processing' };
    case 'shipped':
      return { icon: Truck, color: 'bg-blue-100 text-blue-800', label: 'Shipped' };
    case 'delivered':
      return { icon: CheckCircle, color: 'bg-green-100 text-green-800', label: 'Delivered' };
    case 'cancelled':
      return { icon: AlertCircle, color: 'bg-red-100 text-red-800', label: 'Cancelled' };
    default:
      return { icon: Package, color: 'bg-gray-100 text-gray-800', label: status.charAt(0).toUpperCase() + status.slice(1) };
  }
};

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Orders = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-marcat-navy mb-2">My Orders</h1>
          <p className="text-marcat-gray mb-6">View and track your orders</p>
          
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="w-full max-w-md mx-auto">
              <TabsTrigger value="all" className="flex-1">All Orders</TabsTrigger>
              <TabsTrigger value="processing" className="flex-1">Processing</TabsTrigger>
              <TabsTrigger value="shipped" className="flex-1">Shipped</TabsTrigger>
              <TabsTrigger value="delivered" className="flex-1">Delivered</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const status = getStatusInfo(order.status);
                  const StatusIcon = status.icon;
                  
                  return (
                    <Card key={order.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <h3 className="font-semibold text-lg">{order.id}</h3>
                              <span className="mx-3 text-gray-300">|</span>
                              <span className="text-marcat-gray">{formatDate(order.date)}</span>
                            </div>
                            <Badge className={`${status.color}`}>
                              <StatusIcon className="w-4 h-4 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <p className="text-sm text-marcat-gray mb-1">Order Total:</p>
                            <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4 mt-4">
                          <p className="text-sm text-marcat-gray mb-3">Items:</p>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center">
                                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-marcat-gray text-sm">
                                    ${item.price.toFixed(2)} x {item.quantity}
                                  </p>
                                </div>
                                <div className="font-semibold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-6 space-x-3">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/order/${order.id}`)}>
                            View Details
                          </Button>
                          {order.status === 'delivered' && (
                            <Button variant="outline" size="sm">
                              Write Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                  <p className="text-marcat-gray mb-6">When you place orders, they will appear here.</p>
                  <Button onClick={() => navigate('/products')}>
                    Start Shopping
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="processing" className="space-y-6">
              {orders.filter(o => o.status === 'processing').map((order) => {
                const status = getStatusInfo(order.status);
                const StatusIcon = status.icon;
                
                return (
                  <Card key={order.id} className="overflow-hidden">
                    {/* Similar content to "all" tab but filtered */}
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <span className="mx-3 text-gray-300">|</span>
                            <span className="text-marcat-gray">{formatDate(order.date)}</span>
                          </div>
                          <Badge className={`${status.color}`}>
                            <StatusIcon className="w-4 h-4 mr-1" />
                            {status.label}
                          </Badge>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <p className="text-sm text-marcat-gray mb-1">Order Total:</p>
                          <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <p className="text-sm text-marcat-gray mb-3">Items:</p>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-marcat-gray text-sm">
                                  ${item.price.toFixed(2)} x {item.quantity}
                                </p>
                              </div>
                              <div className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/order/${order.id}`)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
              
              {orders.filter(o => o.status === 'processing').length === 0 && (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No processing orders</h3>
                  <p className="text-marcat-gray">You don't have any orders being processed at the moment.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shipped" className="space-y-6">
              {/* Similar content to "processing" tab but for shipped orders */}
              {orders.filter(o => o.status === 'shipped').length === 0 && (
                <div className="text-center py-12">
                  <Truck className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No shipped orders</h3>
                  <p className="text-marcat-gray">You don't have any orders in transit at the moment.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="delivered" className="space-y-6">
              {/* Similar content to "processing" tab but for delivered orders */}
              {orders.filter(o => o.status === 'delivered').length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No delivered orders</h3>
                  <p className="text-marcat-gray">You don't have any delivered orders yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
