export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc';

export interface ProductFilters {
  category?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
}