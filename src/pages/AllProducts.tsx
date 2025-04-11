
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/mockData';
import { Search, SlidersHorizontal } from 'lucide-react';

const AllProducts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Extract unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-marcat-navy text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-white/80">Browse our full collection of men's fashion</p>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-marcat-gray">
            Showing <span className="font-semibold">{filteredProducts.length}</span> products
          </p>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-marcat-gray mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
              Clear filters
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProducts;
