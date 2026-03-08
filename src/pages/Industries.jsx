import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Industries.css';

const BLUE = '#aa2a19';
const WHITE = '#ffffff';
const MERCURY = '#e8e6e0';

const industries = [
  { title: 'Infrastructure & Utilities', desc: 'Engineering consulting for large-scale infrastructure and public utilities projects.' },
  { title: 'Commercial Buildings', desc: 'System design and engineering for offices, malls, and mixed-use developments.' },
  { title: 'Industrial Facilities', desc: 'Engineering planning and infrastructure support for manufacturing and industrial operations.' },
  { title: 'Healthcare Facilities', desc: 'Engineering systems designed for hospitals and medical centers.' },
  { title: 'Government & Public Sector', desc: 'Consulting and engineering support for public projects and national infrastructure.' },
  { title: 'Energy & Power', desc: 'Design and consulting for power generation, renewable energy systems, and distribution networks.' }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.19, 1, 0.22, 1], delay: 1.0 + i * 0.08 }
  })
};

const Industries = () => {
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="industries-page"
      style={{ backgroundColor: MERCURY, minHeight: '100vh' }}
    >
      <div className="container">
        <div style={{ overflow: 'hidden', marginBottom: '4rem' }}>
          <motion.h1
            className="industries-heading"
            style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', color: BLUE, lineHeight: 0.9 }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
          >
            Industries<br />Served
          </motion.h1>
        </div>

        {/* header row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${BLUE}`,
            paddingTop: '1.1rem',
            paddingBottom: '1.1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: BLUE,
            marginBottom: '0'
          }}
        >
          <span>Industries Served</span>
          <span>{industries.length} sectors</span>
        </motion.div>

        {/* card grid */}
        <div className="industries-grid">
          {industries.map((ind, i) => {
            const isHovered = hovered === i;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="industries-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `1px solid ${BLUE}`,
                  borderRight: `1px solid ${BLUE}`,
                  cursor: 'default',
                  backgroundColor: WHITE
                }}
              >
                {/* animated bg fill — slides up from bottom */}
                <motion.div
                  animate={{ clipPath: isHovered ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                  transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                  style={{ position: 'absolute', inset: 0, backgroundColor: BLUE, zIndex: 0 }}
                />

                {/* arrow button — scales in from top-right */}
                <motion.div
                  animate={{ scale: isHovered ? 1 : 0 }}
                  initial={{ scale: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1], delay: isHovered ? 0.08 : 0 }}
                  style={{
                    position: 'absolute', top: 0, right: 0,
                    width: '4.5rem', height: '4.5rem',
                    backgroundColor: MERCURY,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transformOrigin: 'top right',
                    zIndex: 2,
                    borderLeft: `1px solid ${BLUE}`,
                    borderBottom: `1px solid ${BLUE}`
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="square">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7,7 17,7 17,17" />
                  </svg>
                </motion.div>

                {/* number */}
                <motion.div
                  animate={{ color: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(170,42,25,0.22)' }}
                  transition={{ duration: 0.35 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2.2rem',
                    lineHeight: 1,
                    position: 'relative',
                    zIndex: 1,
                    userSelect: 'none'
                  }}
                >
                  0{i + 1}
                </motion.div>

                {/* text content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <motion.h3
                    animate={{ color: isHovered ? WHITE : BLUE }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', marginBottom: '0.9rem', lineHeight: 1.15, fontWeight: 600 }}
                  >
                    {ind.title}
                  </motion.h3>
                  <motion.p
                    animate={{ color: isHovered ? 'rgba(255,255,255,0.65)' : `rgba(170,42,25,0.75)` }}
                    transition={{ duration: 0.3 }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', lineHeight: 1.65, letterSpacing: '0.04em' }}
                  >
                    {ind.desc}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Industries;
