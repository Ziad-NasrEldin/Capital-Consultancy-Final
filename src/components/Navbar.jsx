import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, PenLine, X } from 'lucide-react';
import ScrambleText from './ScrambleText';
import './Navbar.css';

// TypewriterLink component that splits text into characters and animates based on scroll
const TypewriterLink = ({ to, children, scrollProgress, linkIndex, totalLinks, isRightSection = false }) => {
  const text = typeof children === 'string' ? children : children.toString();
  const chars = text.split('');
  
  // Calculate stagger delay based on link position (bottom to top)
  const reversedIndex = totalLinks - 1 - linkIndex;
  const sectionOffset = isRightSection ? 0.35 : 0;
  const baseLinkDelay = reversedIndex * 0.2 + sectionOffset;
  
  // OVERALL LINK FADE: when entire link becomes invisible
  const linkFadeStart = baseLinkDelay;
  const linkFadeEnd = baseLinkDelay + 0.45; // Extend beyond last character fade
  
  let linkOpacity = 1;
  if (scrollProgress >= linkFadeStart) {
    const linkFadeProgress = Math.min((scrollProgress - linkFadeStart) / (linkFadeEnd - linkFadeStart), 1);
    linkOpacity = Math.max(0, 1 - linkFadeProgress);
  }
  
  // Remove from DOM when fully invisible
  if (linkOpacity <= 0) {
    return null;
  }
  
  return (
    <Link 
      to={to} 
      className="typewriter-link"
      style={{
        opacity: linkOpacity,
        visibility: linkOpacity > 0 ? 'visible' : 'hidden',
        pointerEvents: scrollProgress > 0.05 ? 'none' : 'auto'
      }}
    >
      {chars.map((char, i) => {
        // CHARACTER-LEVEL ANIMATION
        const charDelay = i * 0.08;
        const totalDelay = baseLinkDelay + charDelay;
        
        const fadeStart = totalDelay;
        const fadeEnd = fadeStart + 0.35;
        
        let charOpacity = 1;
        let translateX = 0;
        
        if (scrollProgress > fadeStart) {
          const fadeProgress = Math.min((scrollProgress - fadeStart) / (fadeEnd - fadeStart), 1);
          const easedProgress = fadeProgress < 0.5 
            ? 2 * fadeProgress * fadeProgress 
            : -1 + (4 - 2 * fadeProgress) * fadeProgress;
          
          charOpacity = Math.max(0, 1 - easedProgress);
          translateX = -60 * easedProgress;
        }
        
        return (
          <span
            key={i}
            className="typewriter-char"
            style={{
              opacity: charOpacity,
              transform: `translateX(${translateX}px)`,
              display: 'inline-block'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </Link>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Normalize scroll progress: 0 at top, 1 at 400px scrolled
      const progress = Math.min(window.scrollY / 400, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();

    media.addEventListener('change', syncMobile);
    return () => media.removeEventListener('change', syncMobile);
  }, []);

  return (
    <>
      <motion.header 
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="navbar-section navbar-section-left">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <span className="circle-slash"></span>
            </div>
            <ScrambleText text="CAPITAL CONSULTANCY INC." />
          </Link>
        </div>

        <div className="navbar-section navbar-section-center">
          <nav className="navbar-center-links" aria-label="Primary navigation">
            <TypewriterLink to="/about" scrollProgress={scrollProgress} linkIndex={0} totalLinks={4}>ABOUT</TypewriterLink>
            <TypewriterLink to="/services" scrollProgress={scrollProgress} linkIndex={1} totalLinks={4}>SERVICES</TypewriterLink>
            <TypewriterLink to="/projects" scrollProgress={scrollProgress} linkIndex={2} totalLinks={4}>PROJECTS</TypewriterLink>
            <TypewriterLink to="/industries" scrollProgress={scrollProgress} linkIndex={3} totalLinks={4}>CLIENTS</TypewriterLink>
          </nav>
        </div>

        <div className="navbar-section navbar-section-right">
          <div className="navbar-right-content">
            <nav className="navbar-right-links" aria-label="Secondary navigation">
              <TypewriterLink to="/about" scrollProgress={scrollProgress} linkIndex={1} totalLinks={2} isRightSection={true}>CAREERS</TypewriterLink>
              <TypewriterLink to="/contact" scrollProgress={scrollProgress} linkIndex={0} totalLinks={2} isRightSection={true}>CONTACT</TypewriterLink>
            </nav>

            <div className="navbar-actions">
              <button 
                className="menu-btn" 
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  opacity: isMobile ? 1 : (scrollProgress > 0 ? Math.pow(scrollProgress, 0.7) : 0),
                  transform: isMobile ? 'translateX(0)' : `translateX(${-50 + scrollProgress * 50}px)`,
                  pointerEvents: isMobile ? 'auto' : (scrollProgress > 0.05 ? 'auto' : 'none'),
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
                <ScrambleText text="MENU" />
              </button>
              <Link to="/contact" className="contact-btn" aria-label="Contact">
                <PenLine size={16} />
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Side Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.64, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Side Panel */}
            <motion.nav 
              className="side-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.96, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="menu-content">
                <div className="menu-main-links">
                  {[
                    { name: 'About', path: '/about' },
                    { name: 'Services', path: '/services' },
                    { name: 'Projects', path: '/projects' },
                    { name: 'Clients', path: '/industries' }
                  ].map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: 0.32 + (i * 0.12), duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <Link to={link.path} onClick={() => setMenuOpen(false)}>{link.name}</Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="menu-footer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.96, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="menu-section">
                    <h3>COMPANY</h3>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>Careers</Link>
                    <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                  </div>

                  <div className="menu-section">
                    <h3>STAY IN TOUCH</h3>
                    <a href="tel:1-212-732-0555">1-212-732-0555</a>
                    <a href="mailto:contact@capitalconsultancy.com">contact@capitalconsultancy.com</a>
                    <p>237 West 35th Street, Suite 12A<br />New York, New York 10001</p>
                  </div>
                </motion.div>
              </div>

              <button className="menu-close" onClick={() => setMenuOpen(false)}>
                CLOSE
              </button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
