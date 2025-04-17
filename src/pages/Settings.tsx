import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || user?.user_metadata?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    
    try {
      // Update profile using the context method
      await updateProfile({ name });
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error instanceof Error ? error.message : "An error occurred while updating your profile."
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Error",
        description: "New passwords don't match. Please try again."
      });
      setIsChangingPassword(false);
      return;
    }
    
    // Simulate password change
    setTimeout(() => {
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully."
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-marcat-navy mb-8">Account Settings</h1>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="w-full border-b border-gray-200">
              <TabsTrigger value="profile" className="flex-1 py-3">Profile Information</TabsTrigger>
              <TabsTrigger value="security" className="flex-1 py-3">Security</TabsTrigger>
              <TabsTrigger value="preferences" className="flex-1 py-3">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="pt-4">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="mt-1 text-sm text-gray-500">Email cannot be changed.</p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isUpdatingProfile}
                    className="bg-marcat-accent hover:bg-marcat-navy transition-colors"
                  >
                    {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="pt-4">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isChangingPassword}
                    className="bg-marcat-accent hover:bg-marcat-navy transition-colors"
                  >
                    {isChangingPassword ? 'Updating...' : 'Change Password'}
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="pt-4">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { id: 'email_orders', label: 'Order status updates via email' },
                    { id: 'email_offers', label: 'Special offers and discounts' },
                    { id: 'email_new', label: 'New product arrivals' },
                    { id: 'email_news', label: 'Marcat newsletter' }
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <span>{pref.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-marcat-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-marcat-accent"></div>
                      </label>
                    </div>
                  ))}
                  
                  <Button 
                    className="mt-4 bg-marcat-accent hover:bg-marcat-navy transition-colors"
                    onClick={() => {
                      toast({
                        title: "Preferences Updated",
                        description: "Your notification preferences have been saved."
                      });
                    }}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
