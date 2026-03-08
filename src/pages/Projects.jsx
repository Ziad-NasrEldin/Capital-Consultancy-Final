import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText } from '../components/RevealText';

const projects = [
  { name: 'Skyline Finance Center', sector: 'Commercial Buildings', location: 'Dubai, UAE', scope: 'HVAC & Plumbing Design', services: 'Engineering Design' },
  { name: 'National Health Hub', sector: 'Healthcare Facilities', location: 'Riyadh, KSA', scope: 'Full MEP Systems', services: 'Project Management' },
  { name: 'City Power Substation', sector: 'Energy & Power', location: 'Abu Dhabi, UAE', scope: 'Electrical Network Design', services: 'Infrastructure' },
  { name: 'Tech Park Phase 1', sector: 'Industrial Facilities', location: 'Doha, Qatar', scope: 'Smart Systems Integration', services: 'Engineering Design' },
  { name: 'Metropolitan Water Works', sector: 'Infrastructure & Utilities', location: 'Cairo, Egypt', scope: 'Water Network Planning', services: 'Consulting' },
  { name: 'Global Logistics Hub', sector: 'Industrial Facilities', location: 'Jeddah, KSA', scope: 'Value Engineering', services: 'Consulting' }
];

const Projects = () => {
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
          <RevealText text="Featured" delay={0.1} /><br />
          <RevealText text="Projects" delay={0.2} />
        </h1>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4px', backgroundColor: 'var(--primary-blue)', border: '2px solid var(--primary-blue)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
        >
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ backgroundColor: 'var(--white)', padding: '2rem', display: 'flex', flexDirection: 'column' }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div style={{
                width: '100%',
                aspectRatio: '4/3',
                backgroundColor: 'var(--primary-blue)',
                padding: '2px', // tiny gap for the parallax container to feel framed
                marginBottom: '2rem',
                overflow: 'hidden'
              }}>
                <motion.div style={{
                  width: '100%', height: '100%',
                  backgroundColor: 'var(--primary-blue)',
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                  scale: 1.1 // Give room for hover effect
                }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', marginBottom: '1rem' }}>{proj.name}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--primary-blue)', marginBottom: '0.5rem', opacity: 0.8 }}>
                Sector: {proj.sector}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--primary-blue)', marginBottom: '0.5rem', opacity: 0.8 }}>
                Location: {proj.location}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--primary-blue)', opacity: 0.8 }}>
                Scope: {proj.scope}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
