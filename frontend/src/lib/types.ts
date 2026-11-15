export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  stock: number;
  rating: number;
  rating_count: number;
  image_url: string;
  badge: string;
  category_id: number;
  category_name?: string;
  ai_badge: string;
  ai_summary?: string;
  ai_features_highlight: string[];
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface Review {
  id: number;
  product_id: number;
  user_name: string;
  rating: number;
  title: string;
  content: string;
  verified_purchase: boolean;
  sentiment: string;
  created_at: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface CartData {
  items: CartItem[];
  count: number;
  subtotal: number;
  prime_discount: number;
  estimated_tax: number;
  total: number;
  free_shipping: boolean;
}

export interface AISynthesis {
  summary: string;
  pros: string[];
  cons: string[];
  sentiment_distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  ai_rating_confidence: string;
}
