
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Button 
} from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const OrdersManagement = () => {
  // In a real app, this data would come from an API
  const orders = [
    { 
      id: '1001', 
      customer: 'John Doe', 
      email: 'john@example.com',
      date: '2025-04-10', 
      product: 'Cat Tree Deluxe', 
      amount: '$129.99', 
      status: 'Completed' 
    },
    { 
      id: '1002', 
      customer: 'Jane Smith', 
      email: 'jane@example.com',
      date: '2025-04-09', 
      product: 'Premium Cat Food (3 items)', 
      amount: '$45.50', 
      status: 'Processing' 
    },
    { 
      id: '1003', 
      customer: 'Robert Johnson', 
      email: 'robert@example.com',
      date: '2025-04-08', 
      product: 'Interactive Toy', 
      amount: '$24.99', 
      status: 'Shipped' 
    },
    { 
      id: '1004', 
      customer: 'Sarah Wilson', 
      email: 'sarah@example.com',
      date: '2025-04-08', 
      product: 'Scratching Post', 
      amount: '$34.95', 
      status: 'Pending' 
    },
    { 
      id: '1005', 
      customer: 'Michael Brown', 
      email: 'michael@example.com',
      date: '2025-04-07', 
      product: 'Cat Carrier', 
      amount: '$49.99', 
      status: 'Completed' 
    },
    { 
      id: '1006', 
      customer: 'Emily Davis', 
      email: 'emily@example.com',
      date: '2025-04-07', 
      product: 'Cat Bed', 
      amount: '$39.95', 
      status: 'Shipped' 
    },
    { 
      id: '1007', 
      customer: 'David Miller', 
      email: 'david@example.com',
      date: '2025-04-06', 
      product: 'Grooming Kit', 
      amount: '$19.99', 
      status: 'Completed' 
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>
        <p className="text-gray-500 mb-8">View and manage all customer orders on the platform.</p>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Order Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-8" />
              </div>
              
              <div className="flex gap-2">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="pending">Pending</option>
                </select>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Amount</option>
                  <option value="lowest">Lowest Amount</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
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
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of <span className="font-medium">42</span> entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersManagement;
