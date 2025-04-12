
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';

const ProductsManagement = () => {
  // In a real app, this data would come from an API
  const products = [
    { 
      id: '1', 
      name: 'Cat Tree Deluxe', 
      category: 'Furniture', 
      price: '$129.99',
      stock: 24,
      store: 'PetLuxe'
    },
    { 
      id: '2', 
      name: 'Premium Cat Food', 
      category: 'Food', 
      price: '$15.50',
      stock: 56,
      store: 'Healthy Paws'
    },
    { 
      id: '3', 
      name: 'Interactive Toy', 
      category: 'Toys', 
      price: '$24.99',
      stock: 38,
      store: 'Happy Pets'
    },
    { 
      id: '4', 
      name: 'Scratching Post', 
      category: 'Furniture', 
      price: '$34.95',
      stock: 17,
      store: 'PetLuxe'
    },
    { 
      id: '5', 
      name: 'Cat Carrier', 
      category: 'Accessories', 
      price: '$49.99',
      stock: 12,
      store: 'Travel Pets'
    },
    { 
      id: '6', 
      name: 'Cat Bed', 
      category: 'Furniture', 
      price: '$39.95',
      stock: 29,
      store: 'Cozy Creatures'
    },
    { 
      id: '7', 
      name: 'Grooming Kit', 
      category: 'Health & Care', 
      price: '$19.99',
      stock: 41,
      store: 'Pet Salon'
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-500">Manage all products across the marketplace</p>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Product
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Product Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-8" />
              </div>
              
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">All Categories</option>
                <option value="furniture">Furniture</option>
                <option value="food">Food</option>
                <option value="toys">Toys</option>
                <option value="accessories">Accessories</option>
                <option value="health">Health & Care</option>
              </select>
              
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">All Stores</option>
                <option value="petluxe">PetLuxe</option>
                <option value="healthypaws">Healthy Paws</option>
                <option value="happypets">Happy Pets</option>
                <option value="travelpets">Travel Pets</option>
                <option value="cozycreatures">Cozy Creatures</option>
                <option value="petsalon">Pet Salon</option>
              </select>
              
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="newest">Newest First</option>
                <option value="price_high">Price: High to Low</option>
                <option value="price_low">Price: Low to High</option>
                <option value="stock_low">Stock: Low to High</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        product.stock > 20 ? 'bg-green-100 text-green-800' :
                        product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} in stock
                      </span>
                    </TableCell>
                    <TableCell>{product.store}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">Delete</Button>
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

export default ProductsManagement;
