
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-marcat-navy text-white p-6">
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h2>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => navigate('/orders')}
                >
                  My Orders
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => navigate('/wishlist')}
                >
                  My Wishlist
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => navigate('/settings')}
                >
                  Account Settings
                </Button>
                
                <Button
                  variant="destructive"
                  className="w-full justify-start text-left"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
