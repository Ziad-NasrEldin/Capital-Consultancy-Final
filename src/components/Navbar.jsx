import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, PenLine } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isLightMode = location.pathname !== '/';

  return (
    <>
      {/* Global vertical gridlines to define the 50% and 75% columns */}
      <div className={`global-grid-lines ${isLightMode ? 'light-mode-grid' : ''}`}>
        <div className="grid-line line-50"></div>
        <div className="grid-line line-75"></div>
      </div>

      <header className={`site-header ${isLightMode ? 'light-mode' : ''}`}>
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
              <Link to="/about">ABOUT</Link>
              <Link to="/services">SERVICES</Link>
              <Link to="/projects">PROJECTS</Link>
              <Link to="/clients">CLIENTS</Link>
            </nav>
          </div>
          <div className="nav-col-content" style={{ left: '75%' }}>
            <nav className="nav-group">
              <Link to="/culture">CULTURE & CAREERS</Link>
              <Link to="/blog">BLOG</Link>
              <Link to="/contact">CONTACT</Link>
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
