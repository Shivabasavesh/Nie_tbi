import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, description, align = 'left' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <h2 className="text-3xl font-bold text-nie-navy mb-4">{title}</h2>
      <div className={`h-1 w-16 bg-nie-orange mb-6 ${align === 'center' ? 'mx-auto' : ''}`}></div>
      {description && <p className={`text-text-body text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>}
    </motion.div>
  );
};

export default SectionHeader;
