import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center py-12"
    >
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center"
          >
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </motion.div>
          
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-6">{message}</p>
          
              <Button onClick={onRetry} className="bg-primary text-primary-foreground hover:bg-primary-dark">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};