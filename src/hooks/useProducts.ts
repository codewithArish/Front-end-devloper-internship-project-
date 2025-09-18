import { useState, useEffect } from 'react';
import { Product, ProductsResponse, ProductFilters, SortOption } from '@/types/product';

const API_BASE = 'https://dummyjson.com/products';

export const useProducts = (filters: ProductFilters = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const { category, sort, page = 1, limit = 12 } = filters;
  const skip = (page - 1) * limit;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = API_BASE;
        
        if (category) {
          url = `${API_BASE}/category/${category}`;
        }
        
        url += `?limit=${limit}&skip=${skip}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ProductsResponse = await response.json();
        
        let sortedProducts = data.products;
        
        // Apply client-side sorting
        if (sort) {
          sortedProducts = sortProducts(data.products, sort);
        }
        
        setProducts(sortedProducts);
        setTotal(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sort, page, limit, skip]);

  return { products, loading, error, total, totalPages: Math.ceil(total / limit) };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};

const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
};