
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/types";

export const createOrder = async (items: CartItem[], totalAmount: number): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User must be logged in to create an order");
  }

  // Create the order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      status: 'pending'
    })
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw new Error(orderError.message);
  }

  // Create order items
  const orderItems = items.map(item => ({
    order_id: orderData.id,
    product_id: item.product.id,
    product_name: item.product.name,
    color: item.selectedColor.color,
    size: item.selectedSize.size,
    quantity: item.quantity,
    unit_price: item.product.discountPrice || item.product.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    throw new Error(itemsError.message);
  }

  return orderData.id;
};

export const fetchUserOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User must be logged in to fetch orders");
  }

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items:order_items(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error(error.message);
  }

  return data;
};
