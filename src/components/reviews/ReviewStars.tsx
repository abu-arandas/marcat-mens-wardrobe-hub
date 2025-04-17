
import React from 'react';
import { Star } from 'lucide-react';

interface ReviewStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ rating, size = 'md' }) => {
  const starSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  
  return (
    <div className="flex text-yellow-500">
      {[1, 2, 3, 4, 5].map(star => (
        <Star 
          key={star} 
          fill={star <= rating ? "currentColor" : "none"} 
          className={starSize} 
        />
      ))}
    </div>
  );
};

export default ReviewStars;
