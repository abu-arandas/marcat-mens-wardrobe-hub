
import React from 'react';
import { Review } from '@/types';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { format } from 'date-fns';
import ReviewStars from './ReviewStars';

interface ReviewsListProps {
  reviews: Review[];
  onMarkHelpful: (reviewId: string) => void;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews, onMarkHelpful }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No reviews match your current filters.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map(review => (
        <div key={review.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{review.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.userName}</div>
                <ReviewStars rating={review.rating} size="sm" />
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {format(new Date(review.date), 'MMM d, yyyy')}
            </div>
          </div>
          
          <div className="text-gray-700">{review.comment}</div>
          
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto py-2">
              {review.images.map((image, idx) => (
                <img 
                  key={idx} 
                  src={image} 
                  alt={`Review image ${idx + 1}`} 
                  className="h-16 w-16 object-cover rounded border"
                />
              ))}
            </div>
          )}
          
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onMarkHelpful(review.id)}
              className="text-gray-500 text-xs"
            >
              <ThumbsUp className="w-3 h-3 mr-1" />
              Helpful ({review.helpful})
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
