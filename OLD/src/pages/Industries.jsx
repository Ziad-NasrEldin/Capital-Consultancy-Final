import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RevealText } from '../components/RevealText';

const industries = [
  { title: 'Infrastructure & Utilities', desc: 'Engineering consulting for large-scale infrastructure and public utilities projects.' },
  { title: 'Commercial Buildings', desc: 'System design and engineering for offices, malls, and mixed-use developments.' },
  { title: 'Industrial Facilities', desc: 'Engineering planning and infrastructure support for manufacturing and industrial operations.' },
  { title: 'Healthcare Facilities', desc: 'Engineering systems designed for hospitals and medical centers.' },
  { title: 'Government & Public Sector', desc: 'Consulting and engineering support for public projects and national infrastructure.' },
  { title: 'Energy & Power', desc: 'Design and consulting for power generation, renewable energy systems, and distribution networks.' }
];

const Industries = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '8rem', paddingBottom: '6rem', backgroundColor: 'var(--mercury)', minHeight: '100vh' }}
    >
      <div className="container">
        <h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', color: 'var(--primary-blue)', marginBottom: '4rem', lineHeight: 0.9 }}>
          <RevealText text="Industries" delay={0.1} /><br/>
          <RevealText text="Served" delay={0.2} />
        </h1>
        
        <motion.div 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2px', backgroundColor: 'var(--primary-blue)', border: '1px solid var(--primary-blue)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
        >
          {industries.map((ind, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ backgroundColor: 'var(--white)', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '350px' }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'rgba(25, 37, 170, 0.1)', marginBottom: 'auto' }}>
                0{i + 1}
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', color: 'var(--primary-blue)', marginBottom: '1rem' }}>{ind.title}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--primary-blue)', opacity: 0.8, lineHeight: 1.5 }}>
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Industries;
