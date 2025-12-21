import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  gradient = false,
  glass = false,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -5 } : {}}
      className={cn(
        'rounded-xl p-6 transition-all duration-300',
        {
          'glass': glass,
          'bg-dark-800 border border-dark-700': !glass && !gradient,
          'bg-gradient-to-br from-dark-800 to-dark-900 border border-primary-500/20': gradient,
          'card-hover cursor-pointer': hover,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;