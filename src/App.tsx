
import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import LoadingSpinner from "./components/LoadingSpinner";
import Index from "./pages/Index";

// Create a client with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Lazy-loaded components for performance
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const StorePage = lazy(() => import("./pages/StorePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const AllStores = lazy(() => import("./pages/AllStores"));
const Offers = lazy(() => import("./pages/Offers"));
const Commission = lazy(() => import("./pages/Commission"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Orders = lazy(() => import("./pages/Orders"));
const Settings = lazy(() => import("./pages/Settings"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const OrdersManagement = lazy(() => import("./pages/admin/OrdersManagement"));
const ProductsManagement = lazy(() => import("./pages/admin/ProductsManagement"));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <LoadingSpinner size="lg" message="Loading page..." />
  </div>
);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/store/:id" element={<StorePage />} />
                      <Route path="/products" element={<AllProducts />} />
                      <Route path="/stores" element={<AllStores />} />
                      <Route path="/offers" element={<Offers />} />
                      <Route path="/commission" element={<Commission />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                      
                      {/* Admin routes */}
                      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                      <Route path="/admin/orders" element={<AdminRoute><OrdersManagement /></AdminRoute>} />
                      <Route path="/admin/products" element={<AdminRoute><ProductsManagement /></AdminRoute>} />
                      
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
