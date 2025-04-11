
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-marcat-navy">MARCAT</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-marcat-gray hover:text-marcat-navy font-medium">Home</Link>
            <Link to="/stores" className="text-marcat-gray hover:text-marcat-navy font-medium">Stores</Link>
            <Link to="/offers" className="text-marcat-gray hover:text-marcat-navy font-medium">Offers</Link>
            <Link to="/commission" className="text-marcat-gray hover:text-marcat-navy font-medium">Commission Products</Link>
          </div>
          
          {/* Search */}
          <div className="hidden md:flex w-1/3">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* User controls */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-marcat-accent rounded-full text-xs text-white font-bold flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white py-2">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="block px-4 py-2 text-marcat-gray hover:bg-gray-100">Home</Link>
              <Link to="/stores" className="block px-4 py-2 text-marcat-gray hover:bg-gray-100">Stores</Link>
              <Link to="/offers" className="block px-4 py-2 text-marcat-gray hover:bg-gray-100">Offers</Link>
              <Link to="/commission" className="block px-4 py-2 text-marcat-gray hover:bg-gray-100">Commission Products</Link>
              
              <div className="relative px-4 pb-2">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
                <Search className="absolute left-7 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex justify-between px-4">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
                <Button variant="outline" size="sm">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Cart (0)
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
