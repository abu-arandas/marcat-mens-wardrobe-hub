
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchReviewsByProductId, addReview, updateHelpfulCount } from '@/services/ReviewService';

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => fetchReviewsByProductId(productId),
    enabled: !!productId
  });
};

export const useAddReview = (productId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ rating, comment }: { rating: number; comment: string }) => 
      addReview(productId, rating, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', productId]
      });
    }
  });
};

export const useMarkReviewHelpful = (productId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reviewId: string) => updateHelpfulCount(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', productId]
      });
    }
  });
};
