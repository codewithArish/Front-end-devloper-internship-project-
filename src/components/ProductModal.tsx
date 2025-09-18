import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const discount = product.discountPercentage > 0;
  const originalPrice = discount ? product.price / (1 - product.discountPercentage / 100) : product.price;
  const savings = discount ? originalPrice - product.price : 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Section */}
              <div className="lg:w-1/2 relative bg-secondary">
                <div className="relative aspect-square lg:aspect-auto lg:h-full">
                  <motion.img
                    key={currentImageIndex}
                    src={product.images[currentImageIndex] || product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {product.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-primary w-6' 
                            : 'bg-background/50 hover:bg-background/70'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                {discount && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-4 left-4 bg-red-600 text-white"
                  >
                    -{Math.round(product.discountPercentage)}% OFF
                  </Badge>
                )}
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {product.category}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {product.brand}
                      </Badge>
                    </div>
                    
                    <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-sm">(128 reviews)</span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {product.stock > 0 ? (
                          <span className={product.stock < 10 ? 'text-warning' : 'text-success'}>
                            {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
                          </span>
                        ) : (
                          <span className="text-destructive">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {discount && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {discount && (
                      <div className="text-success font-medium">
                        You save ${savings.toFixed(2)}!
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary-dark h-12" 
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      
                      <Button variant="outline" size="icon" className="h-12 w-12">
                        <Heart className="w-4 h-4" />
                      </Button>
                      
                      <Button variant="outline" size="icon" className="h-12 w-12">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Add to Wishlist
                    </Button>
                  </div>

                  {/* Product Details */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Product Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Brand:</div>
                      <div className="font-medium capitalize">{product.brand}</div>
                      
                      <div className="text-muted-foreground">Category:</div>
                      <div className="font-medium capitalize">{product.category}</div>
                      
                      <div className="text-muted-foreground">Stock:</div>
                      <div className="font-medium">{product.stock} units</div>
                      
                      <div className="text-muted-foreground">SKU:</div>
                      <div className="font-medium">PRD-{product.id.toString().padStart(6, '0')}</div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};