import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Sparkles } from 'lucide-react';
import { Product, SortOption } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductModal } from '@/components/ProductModal';
import { FilterBar } from '@/components/FilterBar';
import { Pagination } from '@/components/Pagination';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('title-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { products, loading, error, total, totalPages } = useProducts({
    category: selectedCategory === 'all' ? '' : selectedCategory,
    sort: sortOption,
    page: currentPage,
    limit: 12,
  });

  const { categories, loading: categoriesLoading } = useCategories();

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOption, searchQuery]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSortOption('title-asc');
    setCurrentPage(1);
    setSearchQuery('');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary text-primary-foreground py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Product Showcase Explorer</span>
          </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Discover <span className="text-primary animate-pulse-glow">Amazing</span> Products
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto"
            >
              Explore our curated collection of premium products with seamless browsing, 
              advanced filtering, and detailed product information.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/20 backdrop-blur-sm border-primary/30 placeholder:text-foreground/70 text-foreground"
                />
              </div>
              <Button variant="secondary" size="icon" className="bg-primary text-primary-foreground hover:bg-primary-dark">
                <Search className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-8"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">{total}</span>
            <span className="text-muted-foreground">Products</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">{categories.length}</Badge>
            <span className="text-muted-foreground">Categories</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-success text-success-foreground border-primary">
              Free Shipping
            </Badge>
            <span className="text-muted-foreground">Available</span>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          sortOption={sortOption}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortOption}
          onClearFilters={handleClearFilters}
          totalProducts={total}
        />

        {/* Product Grid */}
        <div className="mt-8">
          <ProductGrid
            products={products}
            loading={loading}
            onProductClick={handleProductClick}
          />
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Index;
