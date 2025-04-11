
import React, { useState } from 'react';
import { Review } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star, ThumbsUp, Image } from "lucide-react";
import { format } from 'date-fns';

// Mock reviews - in a real app, these would come from a backend
const mockReviews: Review[] = [
  {
    id: '1',
    userId: '101',
    userName: 'Jane Smith',
    productId: '1',
    rating: 5,
    comment: 'This product exceeded my expectations! The quality is excellent and it arrived ahead of schedule. Would definitely purchase again.',
    date: '2023-10-10',
    helpful: 12
  },
  {
    id: '2',
    userId: '102',
    userName: 'Michael Johnson',
    productId: '1',
    rating: 4,
    comment: 'Great product overall. The only reason I\'m deducting a star is because the color was slightly different than shown in the images. Otherwise, very satisfied with my purchase.',
    date: '2023-09-28',
    helpful: 8
  },
  {
    id: '3',
    userId: '103',
    userName: 'Emily Davis',
    productId: '1',
    rating: 3,
    comment: 'It\'s decent for the price. Shipping was quick but the build quality could be better.',
    date: '2023-09-15',
    helpful: 3,
    images: ['/placeholder.svg', '/placeholder.svg']
  }
];

interface ReviewSystemProps {
  productId: string;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(mockReviews.filter(r => r.productId === productId));
  const [newReview, setNewReview] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('newest');
  
  const handleAddReview = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to leave a review",
        variant: "destructive",
      });
      return;
    }
    
    if (newReview.trim().length === 0) {
      toast({
        title: "Review required",
        description: "Please enter a review comment",
        variant: "destructive",
      });
      return;
    }
    
    const review: Review = {
      id: `review-${Date.now()}`,
      userId: user.id,
      userName: user.name || user.email,
      productId,
      rating,
      comment: newReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };
    
    setReviews(prev => [review, ...prev]);
    setNewReview('');
    setRating(5);
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };
  
  const handleHelpful = (reviewId: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to mark reviews as helpful",
        variant: "destructive",
      });
      return;
    }
    
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 } 
          : review
      )
    );
    
    toast({
      title: "Marked as helpful",
      description: "Thank you for your feedback!",
    });
  };
  
  // Apply filtering and sorting
  let filteredReviews = [...reviews];
  
  if (filter === 'positive') {
    filteredReviews = filteredReviews.filter(r => r.rating >= 4);
  } else if (filter === 'negative') {
    filteredReviews = filteredReviews.filter(r => r.rating <= 2);
  } else if (filter === 'with-images') {
    filteredReviews = filteredReviews.filter(r => r.images && r.images.length > 0);
  }
  
  if (sort === 'newest') {
    filteredReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sort === 'helpful') {
    filteredReviews.sort((a, b) => b.helpful - a.helpful);
  } else if (sort === 'highest') {
    filteredReviews.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'lowest') {
    filteredReviews.sort((a, b) => a.rating - b.rating);
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      
      {/* Review Summary */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">
            {reviews.length > 0 
              ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
              : '0.0'}
          </div>
          <div className="flex text-yellow-500 mt-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                fill={star <= Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) ? "currentColor" : "none"} 
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
      
      {/* Filter and Sort */}
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            All Reviews
          </Button>
          <Button 
            variant={filter === 'positive' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('positive')}
          >
            Positive
          </Button>
          <Button 
            variant={filter === 'negative' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('negative')}
          >
            Negative
          </Button>
          <Button 
            variant={filter === 'with-images' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('with-images')}
          >
            With Images
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select 
            className="text-sm rounded border p-1"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="helpful">Most Helpful</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>
      
      {/* Write a review */}
      <div className="p-4 border rounded-lg space-y-4">
        <h3 className="font-semibold">Write a Review</h3>
        <div className="flex items-center gap-2">
          <span>Your rating:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <button 
                key={star} 
                onClick={() => setRating(star)} 
                className="focus:outline-none"
              >
                <Star 
                  fill={star <= rating ? "#F59E0B" : "none"} 
                  stroke={star <= rating ? "#F59E0B" : "currentColor"} 
                  className="w-5 h-5 cursor-pointer" 
                />
              </button>
            ))}
          </div>
        </div>
        
        <Textarea
          placeholder="Share your experience with this product..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          rows={4}
          className="w-full"
        />
        
        <div className="flex justify-between">
          <Button variant="outline" size="sm">
            <Image className="w-4 h-4 mr-2" />
            Add Photos
          </Button>
          
          <Button onClick={handleAddReview}>
            Submit Review
          </Button>
        </div>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No reviews match your current filters.
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{review.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.userName}</div>
                    <div className="flex text-yellow-500">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          fill={star <= review.rating ? "currentColor" : "none"} 
                          className="w-3 h-3" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(review.date), 'MMM d, yyyy')}
                </div>
              </div>
              
              <div className="text-gray-700">{review.comment}</div>
              
              {/* Review images */}
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
                  onClick={() => handleHelpful(review.id)}
                  className="text-gray-500 text-xs"
                >
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  Helpful ({review.helpful})
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
