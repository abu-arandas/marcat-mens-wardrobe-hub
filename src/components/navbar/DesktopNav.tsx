
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, LogIn, LogOut, Heart, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { User as UserType } from '@/types';

interface DesktopNavProps {
  user: UserType | null;
  isAdmin: boolean;
  itemCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleLogout: () => void;
  getUserName: () => string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  user,
  isAdmin,
  itemCount,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleLogout,
  getUserName
}) => {
  return (
    <div className="hidden md:flex items-center justify-between w-full">
      {/* Desktop Navigation Links */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-marcat-gray hover:text-marcat-navy font-medium">Home</Link>
        <Link to="/stores" className="text-marcat-gray hover:text-marcat-navy font-medium">Stores</Link>
        <Link to="/products" className="text-marcat-gray hover:text-marcat-navy font-medium">Products</Link>
        <Link to="/offers" className="text-marcat-gray hover:text-marcat-navy font-medium">Offers</Link>
        <Link to="/commission" className="text-marcat-gray hover:text-marcat-navy font-medium">Commission Products</Link>
      </div>
      
      {/* Search */}
      <div className="flex w-1/3">
        <form onSubmit={handleSearch} className="relative w-full">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </form>
      </div>
      
      {/* User controls */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {isAdmin ? (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin" className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {getUserName()}
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login" className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Login
            </Link>
          </Button>
        )}
        
        <Button variant="ghost" size="icon" asChild>
          <Link to="/wishlist" className="relative">
            <Heart className="h-5 w-5" />
          </Link>
        </Button>
        
        <Button variant="ghost" size="icon" asChild>
          <Link to="/cart" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {itemCount}
              </Badge>
            )}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
