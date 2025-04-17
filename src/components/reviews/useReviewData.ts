
import { useState, useMemo } from 'react';
import { Review } from '@/types';
import { useProductReviews, useAddReview, useMarkReviewHelpful } from '@/hooks/useReviews';
import { useToast } from "@/components/ui/use-toast";

export function useReviewData(productId: string) {
  const { data: reviewsData, isLoading, error } = useProductReviews(productId);
  const { mutate: addReviewMutation } = useAddReview(productId);
  const { mutate: markHelpfulMutation } = useMarkReviewHelpful(productId);
  const { toast } = useToast();
  
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('newest');
  
  const reviews = reviewsData || [];
  
  const filteredAndSortedReviews = useMemo(() => {
    // Apply filtering
    let result = [...reviews];
    
    if (filter === 'positive') {
      result = result.filter(r => r.rating >= 4);
    } else if (filter === 'negative') {
      result = result.filter(r => r.rating <= 2);
    } else if (filter === 'with-images') {
      result = result.filter(r => r.images && r.images.length > 0);
    }
    
    // Apply sorting
    if (sort === 'newest') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === 'helpful') {
      result.sort((a, b) => b.helpful - a.helpful);
    } else if (sort === 'highest') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'lowest') {
      result.sort((a, b) => a.rating - b.rating);
    }
    
    return result;
  }, [reviews, filter, sort]);

  const handleAddReview = (rating: number, comment: string) => {
    addReviewMutation({ rating, comment }, {
      onSuccess: () => {
        toast({
          title: "Review submitted",
          description: "Thank you for your feedback!",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to submit review",
          variant: "destructive",
        });
      }
    });
  };
  
  const handleHelpful = (reviewId: string) => {
    markHelpfulMutation(reviewId, {
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to mark review as helpful",
          variant: "destructive",
        });
      }
    });
  };
  
  return {
    reviews,
    filteredAndSortedReviews,
    filter,
    setFilter,
    sort,
    setSort,
    handleAddReview,
    handleHelpful,
    isLoading,
    error
  };
}
