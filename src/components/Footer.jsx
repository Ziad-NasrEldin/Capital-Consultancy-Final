import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrambleText from './ScrambleText';

const linkStyle = {
  color: 'var(--white)',
  textDecoration: 'none',
  display: 'block',
  lineHeight: 1,
};

const dimLinkStyle = {
  ...linkStyle,
  color: 'rgba(255,255,255,0.9)',
};

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer style={{
      backgroundColor: 'var(--primary-blue)',
      color: 'var(--white)',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8125rem',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}>

      {/* ── Main grid: 3 zones separated by 2 vertical lines ── */}
      <div className="footer-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
        minHeight: '460px',
      }}>

        {/* ─── ZONE 1 — Logo ─── */}
        <div className="footer-zone footer-zone--logo" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 3.5rem',
        }}>
          <svg width="200" height="200" viewBox="0 0 160 160" style={{ opacity: 0.92 }}>
            <circle cx="80" cy="80" r="66" fill="none" stroke="currentColor" strokeWidth="10" />
            <line x1="0" y1="80" x2="160" y2="80" stroke="currentColor" strokeWidth="5" />
            <line x1="80" y1="0" x2="80" y2="160" stroke="currentColor" strokeWidth="5" />
            <circle cx="80" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="8" />
          </svg>
        </div>

        {/* Divider 1 */}
        <div className="footer-divider" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* ─── ZONE 2 — Navigation + FAQ mid + Social bottom ─── */}
        <div className="footer-zone" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '3.5rem 3.5rem',
        }}>
          {/* Top: primary nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Link to="/about" style={linkStyle}><ScrambleText text="About" /></Link>
            <Link to="/services" style={linkStyle}><ScrambleText text="Services" /></Link>
            <Link to="/projects" style={linkStyle}><ScrambleText text="Projects" /></Link>
            <Link to="/" style={linkStyle}><ScrambleText text="Clients" /></Link>
          </div>

          {/* Mid: FAQ */}
          <div>
            <Link to="/" style={linkStyle}><ScrambleText text="FAQ" /></Link>
          </div>

          {/* Bottom: social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <a href="#" style={linkStyle}><ScrambleText text="Facebook" /></a>
            <a href="#" style={linkStyle}><ScrambleText text="Instagram" /></a>
            <a href="#" style={linkStyle}><ScrambleText text="LinkedIn" /></a>
            <a href="#" style={linkStyle}><ScrambleText text="X" /></a>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="footer-divider" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* ─── ZONE 3 — Company links + Newsletter + Legal ─── */}
        <div className="footer-zone" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '3.5rem 3.5rem',
        }}>
          {/* Top: company nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Link to="/" style={linkStyle}><ScrambleText text="Culture & Careers" /></Link>
            <Link to="/" style={linkStyle}><ScrambleText text="Blog" /></Link>
            <Link to="/contact" style={linkStyle}><ScrambleText text="Contact" /></Link>
          </div>

          {/* Mid: newsletter */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'rgba(255,255,255,0.95)',
              fontSize: '0.75rem',
              marginBottom: '1rem',
            }}>
              <span>Stay in Touch</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
              <a href="tel:+12127320556" style={{ color: 'var(--white)', textDecoration: 'none' }}>+1-212-732-0556</a>
            </div>
            <form onSubmit={handleSubscribe}>
              <div style={{
                display: 'flex',
                border: '1px solid rgba(255,255,255,0.3)',
                maxWidth: '300px',
              }}>
                <input
                  type="email"
                  placeholder="Your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--white)',
                    padding: '0.7rem 1rem',
                    fontSize: '0.8125rem',
                    outline: 'none',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderLeft: '1px solid rgba(255,255,255,0.3)',
                    color: 'var(--white)',
                    padding: '0.7rem 1rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  →
                </button>
              </div>
            </form>
          </div>

          {/* Bottom: legal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <Link to="/" style={dimLinkStyle}><ScrambleText text="Privacy Policy" /></Link>
            <Link to="/" style={dimLinkStyle}><ScrambleText text="Terms and Conditions" /></Link>
            <div style={{ color: 'rgba(255,255,255,0.85)', marginTop: '0.5rem' }}>Made by Mavoid</div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom" style={{
        borderTop: '1px solid rgba(255,255,255,0.15)',
        padding: '1.25rem 3.5rem',
        fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.85)',
        letterSpacing: '0.06em',
      }}>
        © 2026. Capital Consultancy Inc. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
