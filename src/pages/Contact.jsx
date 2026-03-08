import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RevealText } from '../components/RevealText';
import ScrambleText from '../components/ScrambleText';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectDetails: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    alert('Thank you! Your inquiry has been sent to our team.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ paddingTop: '8rem', backgroundColor: 'var(--primary-blue)', minHeight: '100vh', color: 'var(--white)' }}
    >
      <div className="container" style={{ paddingBottom: '6rem' }}>
        <motion.h1 
          style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginBottom: '4rem', lineHeight: 0.9, willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
        >
          <RevealText text="Get In" delay={0.7} /><br/>
          <RevealText text="Touch" delay={1} />
        </motion.h1>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '6rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, delay: 1, ease: [0.19, 1, 0.22, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3rem', willChange: 'transform, opacity' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', textTransform: 'uppercase', opacity: 0.7 }}>Email</h2>
              <a href="mailto:info@capitalconsultancy.com" style={{ fontSize: '1.5rem', textDecoration: 'underline', wordBreak: 'break-all' }}>
                info@capitalconsultancy.com
              </a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', textTransform: 'uppercase', opacity: 0.7 }}>Phone</h2>
              <a href="tel:+18001234567" style={{ fontSize: '1.5rem', textDecoration: 'underline' }}>
                +1 (800) 123-4567
              </a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', textTransform: 'uppercase', opacity: 0.7 }}>Office</h2>
              <p style={{ fontSize: '1.5rem', lineHeight: 1.5 }}>
                123 Engineering Blvd,<br/>Suite 400<br/>New York, NY 10001
              </p>
            </div>
            
            <div style={{ marginTop: '2rem', height: '300px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.5 }}>[ GOOGLE MAPS EMBED ]</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, delay: 1, ease: [0.19, 1, 0.22, 1] }}
            style={{ willChange: 'transform, opacity' }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Request Consultation</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', opacity: 0.8 }}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.3)', padding: '1rem 0', color: 'var(--white)', fontSize: '1.25rem', outline: 'none', transition: 'border-color var(--transition-default)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--white)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', opacity: 0.8 }}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.3)', padding: '1rem 0', color: 'var(--white)', fontSize: '1.25rem', outline: 'none', transition: 'border-color var(--transition-default)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--white)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="company" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', opacity: 0.8 }}>Company (Optional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.3)', padding: '1rem 0', color: 'var(--white)', fontSize: '1.25rem', outline: 'none', transition: 'border-color var(--transition-default)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--white)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="projectDetails" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', opacity: 0.8 }}>Project Details</label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  rows="4"
                  required
                  style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.3)', padding: '1rem 0', color: 'var(--white)', fontSize: '1.25rem', outline: 'none', resize: 'vertical', transition: 'border-color var(--transition-default)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--white)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                ></textarea>
              </div>

              <motion.button 
                type="submit" 
                style={{ alignSelf: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: '1rem', padding: '1.5rem 3rem', backgroundColor: 'var(--white)', color: 'var(--primary-blue)', border: '1px solid var(--white)', borderRadius: 0, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2rem', transition: 'background-color 0.15s cubic-bezier(0.4,0,0.2,1), color 0.15s cubic-bezier(0.4,0,0.2,1), border-color 0.15s cubic-bezier(0.4,0,0.2,1)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <ScrambleText text="Request Proposal" />
              </motion.button>

            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
