
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import StorePage from "./pages/StorePage";
import NotFound from "./pages/NotFound";
import AllProducts from "./pages/AllProducts";
import AllStores from "./pages/AllStores";
import Offers from "./pages/Offers";
import Commission from "./pages/Commission";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/store/:id" element={<StorePage />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/stores" element={<AllStores />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/commission" element={<Commission />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
