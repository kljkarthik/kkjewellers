import React from 'react';
import { motion } from 'framer-motion';

export const ScrollRevealText = ({ 
  text, 
  className = '', 
  as: Component = 'h2', 
  delay = 0,
  stagger = 0.05
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <Component className={className}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden pb-1">
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};

export default ScrollRevealText;
