
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreListing from '@/components/StoreListing';
import { Button } from '@/components/ui/button';
import { stores } from '@/data/mockData';
import { Search } from 'lucide-react';

const AllStores = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-marcat-navy text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">All Stores</h1>
          <p className="text-white/80">Explore our curated collection of men's fashion stores</p>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search stores..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Results count */}
        <div className="mb-6 text-center">
          <p className="text-marcat-gray">
            Showing <span className="font-semibold">{filteredStores.length}</span> stores
          </p>
        </div>
        
        {/* Stores Grid */}
        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStores.map(store => (
              <StoreListing key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No stores found</h3>
            <p className="text-marcat-gray mb-4">Try adjusting your search criteria</p>
            <Button onClick={() => setSearchQuery('')}>
              Clear search
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AllStores;
