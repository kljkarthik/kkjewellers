import React from 'react';
import { motion } from 'framer-motion';

export const GoldAccentText = ({ children, className = '' }) => {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`inline-block text-gold-400 font-semibold cursor-pointer transition-colors hover:text-gold-300 drop-shadow-[0_0_12px_rgba(191,167,106,0.4)] ${className}`}
    >
      {children}
    </motion.span>
  );
};

export default GoldAccentText;
