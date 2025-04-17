
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  ShoppingBag, 
  Users, 
  Store, 
  TrendingUp,
  Activity,
  AlertCircle 
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  const getUserName = () => {
    if (!user) return 'Admin';
    return user.name || user.user_metadata?.name || 'Admin';
  };
  
  // These would be fetched from an API in a real application
  const recentOrders = [
    { id: '1', customer: 'John Doe', product: 'Cat Tree Deluxe', amount: '$129.99', status: 'Completed' },
    { id: '2', customer: 'Jane Smith', product: 'Premium Cat Food', amount: '$45.50', status: 'Processing' },
    { id: '3', customer: 'Robert Johnson', product: 'Interactive Toy', amount: '$24.99', status: 'Shipped' },
    { id: '4', customer: 'Sarah Wilson', product: 'Scratching Post', amount: '$34.95', status: 'Pending' },
  ];

  const alerts = [
    { id: '1', message: 'Inventory low for Premium Cat Food', level: 'warning' },
    { id: '2', message: '3 new vendor applications pending review', level: 'info' },
    { id: '3', message: 'Monthly sales report ready', level: 'success' },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-gray-500 mb-8">Welcome back, {getUserName()}!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">+180 new users this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Stores</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">+3 new stores this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">+0.4% from last week</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest transactions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Link to="/admin/orders" className="text-sm text-blue-600 hover:text-blue-800">View all orders →</Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Alerts</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-3 rounded-md flex items-start space-x-2 ${
                      alert.level === 'warning' ? 'bg-amber-50 text-amber-700' :
                      alert.level === 'info' ? 'bg-blue-50 text-blue-700' :
                      'bg-green-50 text-green-700'
                    }`}
                  >
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="text-sm">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
