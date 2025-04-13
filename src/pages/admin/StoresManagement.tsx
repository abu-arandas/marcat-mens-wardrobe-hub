
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
import { Filter, PlusCircle, Search, Star } from 'lucide-react';

const StoresManagement = () => {
  // In a real app, this data would come from an API
  const stores = [
    { 
      id: '1', 
      name: 'PetLuxe', 
      owner: 'Jane Cooper',
      email: 'jane@petluxe.com',
      products: 24,
      rating: 4.8,
      status: 'Active',
      joined: '2024-01-15'
    },
    { 
      id: '2', 
      name: 'Healthy Paws', 
      owner: 'Michael Johnson',
      email: 'michael@healthypaws.com',
      products: 18,
      rating: 4.5,
      status: 'Active',
      joined: '2024-02-03'
    },
    { 
      id: '3', 
      name: 'Happy Pets', 
      owner: 'Robert Williams',
      email: 'robert@happypets.com',
      products: 15,
      rating: 4.2,
      status: 'Active',
      joined: '2024-02-20'
    },
    { 
      id: '4', 
      name: 'Travel Pets', 
      owner: 'Emily Brown',
      email: 'emily@travelpets.com',
      products: 12,
      rating: 4.0,
      status: 'Active', 
      joined: '2024-03-05'
    },
    { 
      id: '5', 
      name: 'Cozy Creatures', 
      owner: 'David Wilson',
      email: 'david@cozycreatures.com',
      products: 29,
      rating: 4.7,
      status: 'Active',
      joined: '2024-01-10'
    },
    { 
      id: '6', 
      name: 'Pet Salon', 
      owner: 'Sarah Miller',
      email: 'sarah@petsalon.com',
      products: 9,
      rating: 3.9,
      status: 'Under Review',
      joined: '2024-03-25'
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Stores</h1>
            <p className="text-gray-500">Manage vendor stores on the marketplace</p>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Store
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Store Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search stores..." className="pl-8" />
              </div>
              
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Under Review</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">Rating (Any)</option>
                <option value="4plus">4+ Stars</option>
                <option value="3plus">3+ Stars</option>
                <option value="2plus">2+ Stars</option>
              </select>
              
              <div className="flex gap-2">
                <select className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="products_high">Most Products</option>
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
                  <TableHead>Store</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell>
                      <div>
                        <div>{store.owner}</div>
                        <div className="text-sm text-muted-foreground">{store.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{store.products}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{store.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        store.status === 'Active' ? 'bg-green-100 text-green-800' :
                        store.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {store.status}
                      </span>
                    </TableCell>
                    <TableCell>{store.joined}</TableCell>
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
      </div>
    </AdminLayout>
  );
};

export default StoresManagement;
