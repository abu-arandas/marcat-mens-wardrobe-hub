
import { useQuery } from '@tanstack/react-query';
import { fetchStores, fetchStoreById, fetchStoresByOwner } from '@/services/StoreService';

export const useAllStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores
  });
};

export const useStore = (id: string) => {
  return useQuery({
    queryKey: ['store', id],
    queryFn: () => fetchStoreById(id),
    enabled: !!id
  });
};

export const useStoresByOwner = (ownerId: string) => {
  return useQuery({
    queryKey: ['stores', 'owner', ownerId],
    queryFn: () => fetchStoresByOwner(ownerId),
    enabled: !!ownerId
  });
};
