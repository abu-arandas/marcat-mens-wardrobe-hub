
import { Product, ProductColor, ProductSize, Review, Store } from "@/types";

// Helper function to map Supabase product sizes to our ProductSize type
const mapSupabaseProductSizes = (sizes: any[]): ProductSize[] => {
  return sizes.map(size => ({
    size: size.size,
    quantity: size.stock
  }));
};

// Helper function to map Supabase product colors to our ProductColor type
export const mapSupabaseProductColors = (colors: any[]): ProductColor[] => {
  return colors.map(color => ({
    color: color.color,
    colorCode: color.color_code,
    images: color.product_images.map((img: any) => img.image_url),
    sizes: mapSupabaseProductSizes(color.product_sizes)
  }));
};

// Map a Supabase product to our Product type
export const mapSupabaseProductToProduct = (product: any): Product => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    discountPrice: product.discount_price,
    description: product.description || '',
    storeId: product.store_id,
    storeName: product.store_name,
    colors: mapSupabaseProductColors(product.product_colors),
    category: product.category,
    tags: [], // We don't have tags in our schema yet
    rating: product.rating,
    isCommission: product.is_commission,
    isOffer: product.is_offer
  };
};

// Map a Supabase store to our Store type
export const mapSupabaseStoreToStore = (store: any): Store => {
  return {
    id: store.id,
    name: store.name,
    logo: store.logo_url || '/placeholder.svg',
    description: store.description || '',
    rating: store.rating,
    productCount: store.products?.length || 0
  };
};

// Map a Supabase review to our Review type
export const mapSupabaseReviewToReview = (review: any): Review => {
  return {
    id: review.id,
    userId: review.user_id,
    userName: review.profiles?.name || 'Anonymous',
    productId: review.product_id,
    rating: review.rating,
    comment: review.comment || '',
    date: review.created_at,
    helpful: 0, // We don't have helpful count in our schema yet
    images: [] // We don't have review images in our schema yet
  };
};
