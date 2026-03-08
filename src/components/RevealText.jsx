import React from 'react';
import { motion } from 'framer-motion';

export const RevealText = ({ text, delay = 0, style, className }) => {
  // Split text by lines (e.g., using <br/> tags via splitting, or manually)
  // For simplicity, we splits by space for words or renders as a single block that slips up.
  // We'll mask the entire block and slide it up.
  
  return (
    <div style={{ overflow: 'hidden', display: 'inline-block' }} className={className}>
      <motion.div
        initial={{ y: '120%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1], delay }}
        style={{ ...style, willChange: 'transform' }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export const RevealLines = ({ children, delay = 0, className }) => {
  return (
    <div style={{ overflow: 'hidden' }} className={className}>
      <motion.div
        initial={{ y: '120%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1], delay }}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </div>
  );
};
