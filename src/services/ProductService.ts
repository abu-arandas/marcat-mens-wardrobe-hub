
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductColor } from "@/types";
import { mapSupabaseProductToProduct } from "@/utils/mappers";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors:product_colors(
        id, 
        color, 
        color_code,
        product_images:product_images(image_url),
        product_sizes:product_sizes(size, stock)
      )
    `);

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message);
  }

  return data.map(mapSupabaseProductToProduct);
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors:product_colors(
        id, 
        color, 
        color_code,
        product_images:product_images(image_url),
        product_sizes:product_sizes(size, stock)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw new Error(error.message);
  }

  return mapSupabaseProductToProduct(data);
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors:product_colors(
        id, 
        color, 
        color_code,
        product_images:product_images(image_url),
        product_sizes:product_sizes(size, stock)
      )
    `)
    .eq('category', category);

  if (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw new Error(error.message);
  }

  return data.map(mapSupabaseProductToProduct);
};

export const fetchOfferProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors:product_colors(
        id, 
        color, 
        color_code,
        product_images:product_images(image_url),
        product_sizes:product_sizes(size, stock)
      )
    `)
    .eq('is_offer', true);

  if (error) {
    console.error("Error fetching offer products:", error);
    throw new Error(error.message);
  }

  return data.map(mapSupabaseProductToProduct);
};

export const fetchCommissionProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors:product_colors(
        id, 
        color, 
        color_code,
        product_images:product_images(image_url),
        product_sizes:product_sizes(size, stock)
      )
    `)
    .eq('is_commission', true);

  if (error) {
    console.error("Error fetching commission products:", error);
    throw new Error(error.message);
  }

  return data.map(mapSupabaseProductToProduct);
};
