import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, PenLine } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isLightMode = location.pathname !== '/';
  const [isHiding, setIsHiding] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Split text into individual letter spans for typewriter effect
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter" style={{ '--letter-index': index }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsHiding(true);
      } else {
        // Scrolling up
        setIsHiding(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Global vertical gridlines to define the 50% and 75% columns */}
      <div className={`global-grid-lines ${isLightMode ? 'light-mode-grid' : ''}`}>
        <div className="grid-line line-50"></div>
        <div className="grid-line line-75"></div>
      </div>

      <header className={`site-header ${isLightMode ? 'light-mode' : ''} ${isHiding ? 'hiding' : ''}`}>
        {/* Left block: Logo */}
        <div className="header-logo-container">
          <Link to="/" className="logo-box">
            <Target size={20} />
            <span>CAPITAL CONSULTANCY</span>
          </Link>
        </div>

        {/* Right block: Navigation and Action */}
        <div className="header-nav-container">
          <div className="nav-col width-50">
            {/* Empty for the 0-50% area, but nav links are at 50% and 75% */}
          </div>
          <div className="nav-col-content" style={{ left: '50%' }}>
            <nav className="nav-group">
              <Link to="/about" className="nav-link" data-link-index="0">{splitText('ABOUT')}</Link>
              <Link to="/services" className="nav-link" data-link-index="1">{splitText('SERVICES')}</Link>
              <Link to="/projects" className="nav-link" data-link-index="2">{splitText('PROJECTS')}</Link>
              <Link to="/clients" className="nav-link" data-link-index="3">{splitText('CLIENTS')}</Link>
            </nav>
          </div>
          <div className="nav-col-content" style={{ left: '75%' }}>
            <nav className="nav-group">
              <Link to="/culture" className="nav-link" data-link-index="4">{splitText('CAREERS')}</Link>
              <Link to="/blog" className="nav-link" data-link-index="5">{splitText('BLOG')}</Link>
              <Link to="/contact" className="nav-link" data-link-index="6">{splitText('CONTACT')}</Link>
            </nav>
          </div>
          <div className="header-action">
            <Link to="/contact" className="contact-btn-corner">
              <PenLine size={20} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
