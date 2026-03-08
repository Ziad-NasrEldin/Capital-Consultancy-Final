import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--primary-blue)',
      color: 'var(--white)',
      padding: '4rem 5%',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.875rem'
    }}>
      <div className="grid grid-cols-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '2rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem', color: 'var(--white)' }}>
            CAPITAL CONSULTANCY
          </h2>
          <p style={{ maxWidth: '300px', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            Engineering the Future, Delivering Excellence.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/industries">Industries</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)' }}>
        <span>&copy; {new Date().getFullYear()} Capital Consultancy</span>
        <span>All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
