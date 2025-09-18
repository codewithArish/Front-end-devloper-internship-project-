import { motion } from 'framer-motion';
import { Filter, SortAsc } from 'lucide-react';
import { Category, SortOption } from '@/types/product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  sortOption: SortOption;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  totalProducts: number;
}

const sortOptions = [
  { value: 'price-asc' as SortOption, label: 'Price: Low to High' },
  { value: 'price-desc' as SortOption, label: 'Price: High to Low' },
  { value: 'title-asc' as SortOption, label: 'Name: A to Z' },
  { value: 'title-desc' as SortOption, label: 'Name: Z to A' },
];

export const FilterBar = ({
  categories,
  selectedCategory,
  sortOption,
  onCategoryChange,
  onSortChange,
  onClearFilters,
  totalProducts,
}: FilterBarProps) => {
  const hasActiveFilters = selectedCategory !== '' && selectedCategory !== 'all';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-secondary rounded-xl border border-border shadow-sm"
    >
      {/* Results Count */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
        </span>
        {hasActiveFilters && (
          <Badge variant="secondary" className="ml-2">
            Filtered
          </Badge>
        )}
      </div>

      <div className="flex flex-1" />

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                <span className="capitalize">{category.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Sort:</span>
        </div>
        
        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="ml-2"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </motion.div>
  );
};