
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

import NavbarLogo from './navbar/NavbarLogo';
import DesktopNav from './navbar/DesktopNav';
import MobileMenuButton from './navbar/MobileMenuButton';
import MobileNav from './navbar/MobileNav';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    signOut();
    navigate('/');
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const getUserName = () => {
    if (!user) return '';
    return user.name || user.user_metadata?.name || 'User';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavbarLogo />
          
          {/* Desktop Navigation */}
          <DesktopNav 
            user={user}
            isAdmin={isAdmin}
            itemCount={itemCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleLogout={handleLogout}
            getUserName={getUserName}
          />
          
          {/* Mobile menu button */}
          <MobileMenuButton 
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
          />
        </div>
        
        {/* Mobile Navigation */}
        <MobileNav
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          user={user}
          isAdmin={isAdmin}
          itemCount={itemCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleLogout={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
