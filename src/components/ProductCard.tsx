import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

export const ProductCard = ({ product, index, onClick }: ProductCardProps) => {
  const discount = product.discountPercentage > 0;
  const originalPrice = discount ? product.price / (1 - product.discountPercentage / 100) : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="product-card h-full overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <motion.img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
            loading="lazy"
          />
          
          {discount && (
            <Badge 
              variant="destructive" 
              className="absolute top-3 left-3 bg-red-600 text-white"
            >
              -{Math.round(product.discountPercentage)}%
            </Badge>
          )}
          
          {product.stock < 10 && product.stock > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute top-3 right-3 bg-warning text-warning-foreground"
            >
              Only {product.stock} left
            </Badge>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
          >
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-dark">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </motion.div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {discount && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <span className="capitalize">{product.brand}</span>
            <span className="capitalize">{product.category}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};