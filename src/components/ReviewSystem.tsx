
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ReviewSummary from './reviews/ReviewSummary';
import ReviewFilters from './reviews/ReviewFilters';
import ReviewForm from './reviews/ReviewForm';
import ReviewsList from './reviews/ReviewsList';
import { useReviewData } from './reviews/useReviewData';
import LoadingSpinner from './LoadingSpinner';

interface ReviewSystemProps {
  productId: string;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId }) => {
  const { user } = useAuth();
  const {
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
  } = useReviewData(productId);

  if (isLoading) {
    return <LoadingSpinner size="md" message="Loading reviews..." />;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error loading reviews: {error.message}</div>;
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      
      {/* Review Summary */}
      <ReviewSummary reviews={reviews} />
      
      {/* Filter and Sort */}
      <ReviewFilters 
        filter={filter}
        sort={sort}
        onFilterChange={setFilter}
        onSortChange={setSort}
      />
      
      {/* Write a review */}
      <ReviewForm onSubmit={handleAddReview} user={user} />
      
      {/* Reviews List */}
      <ReviewsList 
        reviews={filteredAndSortedReviews} 
        onMarkHelpful={handleHelpful} 
      />
    </div>
  );
};

export default ReviewSystem;
