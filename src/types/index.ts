
export interface Store {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  productCount: number;
}

export interface ProductSize {
  size: string;
  quantity: number;
}

export interface ProductColor {
  color: string;
  colorCode: string;
  images: string[];
  sizes: ProductSize[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  storeId: string;
  storeName: string;
  colors: ProductColor[];
  category: string;
  tags: string[];
  rating: number;
  isCommission: boolean;
  isOffer: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  quantity: number;
}
