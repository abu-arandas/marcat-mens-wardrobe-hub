
import React from 'react';
import { Review } from '@/types';
import { Star } from "lucide-react";

interface ReviewSummaryProps {
  reviews: Review[];
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ reviews }) => {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold">
          {reviews.length > 0 ? averageRating.toFixed(1) : '0.0'}
        </div>
        <div className="flex text-yellow-500 mt-1">
          {[1, 2, 3, 4, 5].map(star => (
            <Star 
              key={star} 
              fill={star <= Math.round(averageRating) ? "currentColor" : "none"} 
              className="w-4 h-4" 
            />
          ))}
        </div>
        <div className="text-sm text-gray-500 mt-1">{reviews.length} reviews</div>
      </div>
      
      <div className="flex-1">
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map(star => {
            const count = reviews.filter(r => r.rating === star).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            
            return (
              <div key={star} className="flex items-center gap-2">
                <div className="text-sm w-8">{star} star</div>
                <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-yellow-500 h-full rounded-full" 
                    style={{ width: `${percentage}%` }} 
                  />
                </div>
                <div className="text-xs text-gray-500 w-10">{Math.round(percentage)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
