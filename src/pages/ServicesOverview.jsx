import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RevealText } from '../components/RevealText';

const services = [
  { slug: 'engineering-technical-consulting', title: 'Engineering & Technical Consulting', desc: 'Expert advisory services for planning and development.' },
  { slug: 'engineering-design-planning', title: 'Engineering Design & Planning', desc: 'Electrical, mechanical, structural, and system design.' },
  { slug: 'infrastructure-smart-systems', title: 'Infrastructure & Smart Systems', desc: 'Smart systems, data centers, and renewable energy integration.' },
  { slug: 'project-construction-management', title: 'Project & Construction Management', desc: 'Planning, scheduling, and comprehensive site supervision.' },
  { slug: 'testing-commissioning', title: 'Testing, Commissioning & Optimization', desc: 'System audits, safety compliance, and performance optimization.' }
];

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const ServicesOverview = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="services-page" 
      style={{ paddingTop: '8rem', minHeight: '100vh', backgroundColor: 'var(--mercury)' }}
    >
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', color: 'var(--primary-blue)', lineHeight: 0.9 }}>
            <RevealText text="Our" delay={0} /><br/>
            <RevealText text="Services" delay={0.1} />
          </h1>
        </div>

        <motion.div 
          className="services-list" 
          style={{ borderTop: '2px solid var(--primary-blue)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={staggerItem} style={{ borderBottom: '1px solid rgba(25, 37, 170, 0.2)' }}>
              <Link to={`/services/${service.slug}`} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                alignItems: 'center',
                padding: '3rem 0',
                textDecoration: 'none',
                transition: 'all var(--transition-default)'
              }} className="service-row">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--primary-blue)' }} className="sr-num">
                  0{index + 1}
                </div>
                <div>
                  <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '0.5rem', color: 'var(--primary-blue)' }} className="sr-title">
                    {service.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--primary-blue)' }} className="sr-desc">
                    {service.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary-blue)' }} className="sr-action">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '0.5rem 1rem', border: '1px solid rgba(25, 37, 170, 0.2)' }}>
                    VIEW DETAILS
                  </span>
                  <ArrowRight />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Inline styles for hover effect */}
      <style dangerouslySetInnerHTML={{__html: `
        .service-row:hover { background-color: var(--primary-blue) !important; padding-left: 1rem !important; padding-right: 1rem !important; }
        .service-row:hover .sr-num, .service-row:hover .sr-title, .service-row:hover .sr-desc, .service-row:hover .sr-action { color: var(--white) !important; }
        .service-row:hover span { border-color: rgba(255,255,255,0.4) !important; }
      `}} />
    </motion.div>
  );
};

export default ServicesOverview;
