
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Marcat',
    siteDescription: 'Your one-stop marketplace for pet products',
    supportEmail: 'support@marcat.com',
    contactPhone: '+1 (555) 123-4567',
    enableRegistration: true,
    maintenanceMode: false
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    adminAlerts: true,
    lowStockAlerts: true,
    securityAlerts: true
  });

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value
    });
  };

  const handleSwitchChange = (name: string, value: boolean, settingsType: 'general' | 'notification') => {
    if (settingsType === 'general') {
      setGeneralSettings({
        ...generalSettings,
        [name]: value
      });
    } else {
      setNotificationSettings({
        ...notificationSettings,
        [name]: value
      });
    }
  };

  const saveSettings = (type: string) => {
    // In a real app, this would call an API to save the settings
    toast({
      title: "Settings saved",
      description: `${type} settings have been updated successfully.`
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
        <p className="text-gray-500 mb-8">Configure marketplace settings and preferences</p>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="api">API Access</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic marketplace settings and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName" 
                      name="siteName"
                      value={generalSettings.siteName} 
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input 
                      id="supportEmail" 
                      name="supportEmail"
                      type="email" 
                      value={generalSettings.supportEmail} 
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea 
                    id="siteDescription" 
                    name="siteDescription"
                    value={generalSettings.siteDescription} 
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input 
                      id="contactPhone" 
                      name="contactPhone"
                      value={generalSettings.contactPhone} 
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableRegistration" className="text-base">Enable User Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to register on the platform
                      </p>
                    </div>
                    <Switch 
                      id="enableRegistration" 
                      checked={generalSettings.enableRegistration}
                      onCheckedChange={(checked) => handleSwitchChange('enableRegistration', checked, 'general')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode" className="text-base">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Disable the site for maintenance
                      </p>
                    </div>
                    <Switch 
                      id="maintenanceMode" 
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => handleSwitchChange('maintenanceMode', checked, 'general')}
                    />
                  </div>
                </div>
                
                <Button onClick={() => saveSettings('General')}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure email and system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable email notifications system-wide
                      </p>
                    </div>
                    <Switch 
                      id="emailNotifications" 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked, 'notification')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="orderUpdates" className="text-base">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Send notifications for order status changes
                      </p>
                    </div>
                    <Switch 
                      id="orderUpdates" 
                      checked={notificationSettings.orderUpdates}
                      onCheckedChange={(checked) => handleSwitchChange('orderUpdates', checked, 'notification')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails" className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Send promotional content to users
                      </p>
                    </div>
                    <Switch 
                      id="marketingEmails" 
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => handleSwitchChange('marketingEmails', checked, 'notification')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="adminAlerts" className="text-base">Admin Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for important admin events
                      </p>
                    </div>
                    <Switch 
                      id="adminAlerts" 
                      checked={notificationSettings.adminAlerts}
                      onCheckedChange={(checked) => handleSwitchChange('adminAlerts', checked, 'notification')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="lowStockAlerts" className="text-base">Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when product inventory is low
                      </p>
                    </div>
                    <Switch 
                      id="lowStockAlerts" 
                      checked={notificationSettings.lowStockAlerts}
                      onCheckedChange={(checked) => handleSwitchChange('lowStockAlerts', checked, 'notification')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="securityAlerts" className="text-base">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about security-related events
                      </p>
                    </div>
                    <Switch 
                      id="securityAlerts" 
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={(checked) => handleSwitchChange('securityAlerts', checked, 'notification')}
                    />
                  </div>
                </div>
                
                <Button onClick={() => saveSettings('Notification')}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security options for your marketplace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorAuth" className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require administrators to use 2FA
                      </p>
                    </div>
                    <Switch id="twoFactorAuth" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="passwordPolicy" className="text-base">Strong Password Policy</Label>
                      <p className="text-sm text-muted-foreground">
                        Enforce complex password requirements
                      </p>
                    </div>
                    <Switch id="passwordPolicy" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="60" />
                  </div>
                </div>
                
                <Button onClick={() => saveSettings('Security')}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage API credentials and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-medium mb-1">API Key</h3>
                    <p className="mb-2 text-muted-foreground text-sm">Use this key to authenticate API requests</p>
                    <div className="flex">
                      <Input readOnly defaultValue="sk_live_51N8wqBGIVyx***********************" className="font-mono" />
                      <Button className="ml-2" variant="outline">Copy</Button>
                      <Button className="ml-2" variant="outline">Regenerate</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input id="webhookUrl" placeholder="https://yourdomain.com/api/webhook" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableApi" className="text-base">Enable API Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow external applications to access your marketplace data
                      </p>
                    </div>
                    <Switch id="enableApi" defaultChecked />
                  </div>
                </div>
                
                <Button onClick={() => saveSettings('API')}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
