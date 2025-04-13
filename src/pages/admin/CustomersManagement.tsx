
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
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const CustomersManagement = () => {
  // In a real app, this data would come from an API
  const customers = [
    { 
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      location: 'New York, USA',
      orders: 12,
      spent: '$459.25',
      lastOrder: '2025-04-08',
      status: 'Active'
    },
    { 
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      location: 'London, UK',
      orders: 8,
      spent: '$345.50',
      lastOrder: '2025-04-05',
      status: 'Active'
    },
    { 
      id: '3',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      location: 'Toronto, Canada',
      orders: 5,
      spent: '$182.75',
      lastOrder: '2025-03-28',
      status: 'Active'
    },
    { 
      id: '4',
      name: 'Lisa Brown',
      email: 'lisa@example.com',
      location: 'Sydney, Australia',
      orders: 3,
      spent: '$94.99',
      lastOrder: '2025-03-15',
      status: 'Active'
    },
    { 
      id: '5',
      name: 'Michael Davis',
      email: 'michael@example.com',
      location: 'Berlin, Germany',
      orders: 7,
      spent: '$276.30',
      lastOrder: '2025-04-01',
      status: 'Inactive'
    },
    { 
      id: '6',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      location: 'Paris, France',
      orders: 2,
      spent: '$59.98',
      lastOrder: '2025-02-20',
      status: 'Active'
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Customers</h1>
        <p className="text-gray-500 mb-8">Manage customer accounts and information</p>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Customer Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search customers..." className="pl-8" />
              </div>
              
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">All Regions</option>
                <option value="usa">United States</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="other">Other</option>
              </select>
              
              <div className="flex gap-2">
                <select className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="recent">Most Recent</option>
                  <option value="orders">Most Orders</option>
                  <option value="spent">Highest Spent</option>
                </select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{customer.spent}</TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Orders</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CustomersManagement;
