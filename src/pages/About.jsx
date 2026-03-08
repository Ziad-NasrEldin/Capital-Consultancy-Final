import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RevealText } from '../components/RevealText';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '8rem', backgroundColor: 'var(--mercury)', minHeight: '100vh', color: 'var(--primary-blue)' }}
    >
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginBottom: '4rem', lineHeight: 0.9 }}>
          <RevealText text="About" delay={0.1} /><br/>
          <RevealText text="Us" delay={0.2} />
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderTop: '2px solid var(--primary-blue)', paddingTop: '2rem' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Company Overview</h2>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Capital Consultancy provides multidisciplinary engineering consulting, system design, and project management services. Since our founding, we have consistently delivered excellence across infrastructure, commercial, and industrial projects worldwide.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ borderTop: '2px solid var(--primary-blue)', paddingTop: '2rem' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Mission & Vision</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', textTransform: 'uppercase', opacity: 0.7, marginBottom: '0.5rem' }}>Our Mission</h3>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.5 }}>
                  To design and manage innovative, sustainable engineering solutions that transform the built environment and empower communities.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', textTransform: 'uppercase', opacity: 0.7, marginBottom: '0.5rem' }}>Our Vision</h3>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.5 }}>
                  To be the global benchmark for engineering excellence, driving the future of smart infrastructure and sustainable design.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            style={{ borderTop: '2px solid var(--primary-blue)', paddingTop: '2rem' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Core Values</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.25rem' }}>
              <li><strong>Integrity:</strong> Uncompromising ethical standards.</li>
              <li><strong>Innovation:</strong> Forward-thinking technical solutions.</li>
              <li><strong>Excellence:</strong> Highest quality in every detail.</li>
              <li><strong>Sustainability:</strong> Building for tomorrow.</li>
              <li><strong>Collaboration:</strong> True partnerships with our clients.</li>
            </ul>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
};

export default About;
