
import { useQuery } from '@tanstack/react-query';
import { 
  fetchProducts, 
  fetchProductById, 
  fetchProductsByCategory,
  fetchOfferProducts,
  fetchCommissionProducts 
} from '@/services/ProductService';

export const useAllProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category
  });
};

export const useOfferProducts = () => {
  return useQuery({
    queryKey: ['products', 'offers'],
    queryFn: fetchOfferProducts
  });
};

export const useCommissionProducts = () => {
  return useQuery({
    queryKey: ['products', 'commission'],
    queryFn: fetchCommissionProducts
  });
};
