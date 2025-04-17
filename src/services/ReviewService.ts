
import { supabase } from "@/integrations/supabase/client";
import { Review } from "@/types";
import { mapSupabaseReviewToReview } from "@/utils/mappers";

export const fetchReviewsByProductId = async (productId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles:profiles(name)
    `)
    .eq('product_id', productId);

  if (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    throw new Error(error.message);
  }

  return data.map(mapSupabaseReviewToReview);
};

export const addReview = async (
  productId: string, 
  rating: number, 
  comment: string
): Promise<Review> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User must be logged in to add a review");
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      product_id: productId,
      user_id: user.id,
      rating,
      comment
    })
    .select(`
      *,
      profiles:profiles(name)
    `)
    .single();

  if (error) {
    console.error("Error adding review:", error);
    throw new Error(error.message);
  }

  return mapSupabaseReviewToReview(data);
};

export const updateHelpfulCount = async (reviewId: string): Promise<void> => {
  // Since we don't have a helpful count in our schema yet, this is a placeholder
  // In a real implementation, you would update a helpful_count field
  console.log(`Updating helpful count for review ${reviewId}`);
};
