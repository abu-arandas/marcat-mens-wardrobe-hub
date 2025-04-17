
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Store,
  Settings,
  BarChart4,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Stores', href: '/admin/stores', icon: Store },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart4 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const getUserName = () => {
    if (!user) return 'Admin';
    return user.name || user.user_metadata?.name || 'Admin';
  };

  const getUserInitial = () => {
    const name = getUserName();
    return name.charAt(0) || 'A';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 hidden md:block ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4">
            {!collapsed && <span className="text-xl font-bold text-marcat-navy">Marcat Admin</span>}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={collapsed ? 'mx-auto' : ''}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>
          <Separator />
          
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                const ItemIcon = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-md ${
                        isActive
                          ? 'bg-marcat-accent text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      } ${collapsed ? 'justify-center' : ''}`}
                    >
                      <ItemIcon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <Link to="/" className={`flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${collapsed ? 'justify-center' : ''}`}>
              <LogOut className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Back to Site</span>}
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </Button>
          <span className="text-xl font-bold text-marcat-navy">Marcat Admin</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${getUserName()}`} />
            <AvatarFallback>{getUserInitial()}</AvatarFallback>
          </Avatar>
        </header>
        
        {/* Mobile navigation overlay */}
        {mobileMenuOpen && (
          <div className="absolute inset-0 bg-black/50 z-50" onClick={toggleMobileMenu}>
            <div className="bg-white w-64 h-full" onClick={(e) => e.stopPropagation()}>
              <div className="h-16 flex items-center px-4 border-b border-gray-200">
                <span className="text-xl font-bold text-marcat-navy">Marcat Admin</span>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="ml-auto">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="py-4">
                <ul className="space-y-1 px-2">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const ItemIcon = item.icon;
                    
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`flex items-center px-3 py-2 rounded-md ${
                            isActive
                              ? 'bg-marcat-accent text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={toggleMobileMenu}
                        >
                          <ItemIcon className="h-5 w-5" />
                          <span className="ml-3">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              
              <div className="p-4 border-t border-gray-200">
                <Link 
                  to="/" 
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-3">Back to Site</span>
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop header */}
        <header className="bg-white border-b border-gray-200 hidden md:flex h-16 items-center px-6">
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Logged in as <span className="font-medium">{getUserName()}</span>
            </span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${getUserName()}`} />
              <AvatarFallback>{getUserInitial()}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
