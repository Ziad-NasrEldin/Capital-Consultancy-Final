import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RevealText } from '../components/RevealText';
import { optimizeImageUrl, buildUnsplashSrcSet } from '../utils/imageUrl';

const projects = [
  { name: 'Skyline Finance Center', img: '/images/unsplash/project-skyline.webp', sector: 'Commercial Buildings', location: 'Dubai, UAE', scope: 'HVAC & Plumbing Design', services: 'Engineering Design' },
  { name: 'National Health Hub', img: '/images/unsplash/project-health.webp', sector: 'Healthcare Facilities', location: 'Riyadh, KSA', scope: 'Full MEP Systems', services: 'Project Management' },
  { name: 'City Power Substation', img: '/images/unsplash/project-power.webp', sector: 'Energy & Power', location: 'Abu Dhabi, UAE', scope: 'Electrical Network Design', services: 'Infrastructure' },
  { name: 'Tech Park Phase 1', img: '/images/unsplash/services-test.webp', sector: 'Industrial Facilities', location: 'Doha, Qatar', scope: 'Smart Systems Integration', services: 'Engineering Design' },
  { name: 'Metropolitan Water Works', img: '/images/unsplash/project-health.webp', sector: 'Infrastructure & Utilities', location: 'Cairo, Egypt', scope: 'Water Network Planning', services: 'Consulting' },
  { name: 'Global Logistics Hub', img: '/images/unsplash/project-logistics.webp', sector: 'Industrial Facilities', location: 'Jeddah, KSA', scope: 'Value Engineering', services: 'Consulting' }
];

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Random delays for mosaic effect
  const randomDelays = [0.1, 0.4, 0.2, 0.6, 0.3, 0.5];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ paddingTop: '8rem', paddingBottom: '6rem', backgroundColor: 'var(--mercury)', minHeight: '100vh' }}
    >
      <div className="container">
        <motion.h1 
          style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', color: 'var(--primary-blue)', marginBottom: '4rem', lineHeight: 0.9, willChange: 'transform, opacity' }}
          initial={{ opacity: 0, scale: 0.85, y: 80 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
        >
          <RevealText text="Featured" delay={0.7} /><br/>
          <RevealText text="Projects" delay={1} />
        </motion.h1>

        <motion.div 
          className="projects-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4px', backgroundColor: 'var(--primary-blue)', border: '2px solid var(--primary-blue)' }}
        >
          {projects.map((proj, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.3, ease: [0.19, 1, 0.22, 1], delay: 1.2 + randomDelays[i] }}
              style={{ backgroundColor: 'var(--white)', padding: '2rem', display: 'flex', flexDirection: 'column', willChange: 'transform, opacity' }}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div style={{ 
                width: '100%', 
                backgroundColor: 'var(--primary-blue)',
                padding: '2px', // tiny gap for the parallax container to feel framed
                marginBottom: '2rem',
                aspectRatio: '16 / 10',
                overflow: 'hidden'
              }}>
                <img
                  src={proj.img}
                  srcSet={`${proj.img.replace('.webp', '.avif')} 1x, ${proj.img} 1x`}
                  sizes="(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 30vw"
                  alt={proj.name}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
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
