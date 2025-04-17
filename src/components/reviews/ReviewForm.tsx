
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { User } from '@supabase/supabase-js';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  user: User | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, user }) => {
  const { toast } = useToast();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  
  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to leave a review",
        variant: "destructive",
      });
      return;
    }
    
    if (comment.trim().length === 0) {
      toast({
        title: "Review required",
        description: "Please enter a review comment",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(rating, comment);
    setComment('');
    setRating(5);
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
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
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full"
      />
      
      <div className="flex justify-between">
        <Button variant="outline" size="sm">
          <Image className="w-4 h-4 mr-2" />
          Add Photos
        </Button>
        
        <Button onClick={handleSubmit}>
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
