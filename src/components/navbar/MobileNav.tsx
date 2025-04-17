
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, LogIn, LogOut, Heart, LayoutDashboard, ShoppingBag, X } from 'lucide-react';
import { User as UserType } from '@/types';

interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  user: UserType | null;
  isAdmin: boolean;
  itemCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleLogout: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  user,
  isAdmin,
  itemCount,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleLogout
}) => {
  if (!isMenuOpen) return null;
  
  return (
    <div className="md:hidden mt-4 bg-white py-2">
      <div className="flex flex-col space-y-4">
        <Link to="/" className="block px-4 py-2 text-marcat-gray hover:bg-gray-100">Home</Link>
        <Link to="/stores" className="block px-4 py-2 text-marcat-gray hover:bg-gray-100">Stores</Link>
        <Link to="/products" className="block px-4 py-2 text-marcat-gray hover:bg-gray-100">Products</Link>
        <Link to="/offers" className="block px-4 py-2 text-marcat-gray hover:bg-gray-100">Offers</Link>
        <Link to="/commission" className="block px-4 py-2 text-marcat-gray hover:bg-gray-100">Commission Products</Link>
        
        <form onSubmit={handleSearch} className="relative px-4 pb-2">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <Search className="absolute left-7 top-2.5 h-5 w-5 text-gray-400" />
        </form>
        
        <div className="flex flex-col px-4 space-y-2">
          {user ? (
            <>
              {isAdmin ? (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Link>
          </Button>
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/cart" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Cart ({itemCount})
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
