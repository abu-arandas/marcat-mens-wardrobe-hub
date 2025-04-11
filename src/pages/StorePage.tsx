
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { stores, products } from '@/data/mockData';
import { Star, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';

const StorePage = () => {
  const { id } = useParams<{ id: string }>();
  const store = stores.find(s => s.id === id);
  const storeProducts = products.filter(p => p.storeId === id);
  
  if (!store) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Store Not Found</h2>
            <Link to="/" className="text-marcat-accent hover:underline">
              Return to Homepage
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Store Hero */}
        <div className="bg-gradient-to-r from-marcat-navy to-marcat-accent text-white">
          <div className="container mx-auto px-4 py-12">
            <Button variant="ghost" onClick={() => window.history.back()} className="mb-6 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                <div className="w-40 h-40 bg-white rounded-full p-2 shadow-lg">
                  <img 
                    src={store.logo} 
                    alt={store.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              <div className="md:w-3/4 md:pl-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{store.name}</h1>
                
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star 
                        key={idx} 
                        className="h-5 w-5" 
                        fill={idx < Math.floor(store.rating) ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">{store.rating.toFixed(1)}</span>
                  <span className="mx-2">•</span>
                  <span>{store.productCount} Products</span>
                </div>
                
                <p className="text-white/90 mb-6 max-w-2xl">{store.description}</p>
                
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>123 Fashion Street, Style City</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>contact@{store.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Store Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="offers">Special Offers</TabsTrigger>
                <TabsTrigger value="commission">Commission Products</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-marcat-gray">Sort by:</span>
                <select className="border rounded-md px-3 py-1 text-sm">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
            
            <TabsContent value="all">
              {storeProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {storeProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-marcat-gray">This store doesn't have any products yet.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="offers">
              {storeProducts.filter(p => p.isOffer).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {storeProducts.filter(p => p.isOffer).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No offers available</h3>
                  <p className="text-marcat-gray">This store doesn't have any special offers at the moment.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="commission">
              {storeProducts.filter(p => p.isCommission).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {storeProducts.filter(p => p.isCommission).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No commission products</h3>
                  <p className="text-marcat-gray">This store doesn't have any commission products at the moment.</p>
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

export default StorePage;
