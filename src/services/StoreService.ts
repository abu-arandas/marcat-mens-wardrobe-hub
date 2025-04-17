
import { supabase } from "@/integrations/supabase/client";
import { Store } from "@/types";
import { mapSupabaseStoreToStore } from "@/utils/mappers";

export const fetchStores = async (): Promise<Store[]> => {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      *,
      products:products(count)
    `);

  if (error) {
    console.error("Error fetching stores:", error);
    throw new Error(error.message);
  }

  return data.map(mapSupabaseStoreToStore);
};

export const fetchStoreById = async (id: string): Promise<Store> => {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      *,
      products:products(count)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching store with id ${id}:`, error);
    throw new Error(error.message);
  }

  return mapSupabaseStoreToStore(data);
};

export const fetchStoresByOwner = async (ownerId: string): Promise<Store[]> => {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      *,
      products:products(count)
    `)
    .eq('owner_id', ownerId);

  if (error) {
    console.error(`Error fetching stores for owner ${ownerId}:`, error);
    throw new Error(error.message);
  }

  return data.map(mapSupabaseStoreToStore);
};
