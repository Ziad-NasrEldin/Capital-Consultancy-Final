import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RevealText } from '../components/RevealText';
import ScrambleText from '../components/ScrambleText';

const servicesData = {
  'engineering-technical-consulting': {
    title: 'Engineering & Technical Consulting',
    intro: 'Capital Consultancy provides expert advisory services to support clients during the planning and development stages of complex engineering projects.',
    list: [
      'Feasibility Studies',
      'Technical Due Diligence',
      'Infrastructure Planning',
      'Value Engineering',
      'Energy & Sustainability Consulting'
    ]
  },
  'engineering-design-planning': {
    title: 'Engineering Design & Planning',
    intro: 'Comprehensive electrical, mechanical, and structural design for safe, efficient, and innovative facilities.',
    list: [
      'Electrical Systems Design',
      'Mechanical Systems (HVAC, Plumbing)',
      'Structural Engineering',
      'Lighting Design',
      'ICT & Telecommunications Systems',
      'Building Management Systems (BMS)'
    ]
  },
  'infrastructure-smart-systems': {
    title: 'Infrastructure & Smart Systems',
    intro: 'Designing advanced infrastructure and smart systems for modern utilities, data centers, and power generation networks.',
    list: [
      'Utility Networks Design',
      'Smart Infrastructure Systems',
      'Data Center Infrastructure',
      'Renewable Energy Integration',
      'Power Generation & Distribution',
      'Water & Waste Management Systems'
    ]
  },
  'project-construction-management': {
    title: 'Project & Construction Management',
    intro: 'End-to-end management ensuring your project is completed on time, within budget, and to the highest quality standards.',
    list: [
      'Project Planning & Scheduling',
      'Construction Supervision',
      'Contract Administration',
      'Procurement Support',
      'Cost Control & Budget Management',
      'Quality Assurance'
    ]
  },
  'testing-commissioning': {
    title: 'Testing, Commissioning & Optimization',
    intro: 'Ensuring all systems perform efficiently and safely through rigorous audits, testing, and continuous maintenance consulting.',
    list: [
      'System Testing & Commissioning',
      'Performance Optimization',
      'System Audits',
      'Safety Compliance',
      'Maintenance Strategy Consulting'
    ]
  }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData[slug] || servicesData['engineering-technical-consulting'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      style={{ paddingTop: '10rem', paddingBottom: '8rem', minHeight: '100vh' }}
      className="service-detail-page"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <Link to="/services" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', display: 'inline-block' }}>
            ← <ScrambleText text="ALL SERVICES" />
          </Link>
        </motion.div>
        
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', color: 'var(--primary-blue)', marginBottom: '2rem', willChange: 'transform, opacity' }}>
          <RevealText text={service.title} delay={0.6} />
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1, ease: [0.19, 1, 0.22, 1] }}
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', color: 'var(--primary-blue)', maxWidth: '900px', lineHeight: 1.3, marginBottom: '4rem', willChange: 'transform, opacity' }}
        >
          {service.intro}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          style={{ borderTop: '2px solid var(--primary-blue)', paddingTop: '3rem' }}
        >
          <h2 style={{ fontSize: '2rem', color: 'var(--primary-blue)', marginBottom: '2rem' }}>Services Included</h2>
          <motion.ul 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="service-detail-list"
            style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {service.list.map((item, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '1rem', 
                  color: 'var(--primary-blue)',
                  padding: '2rem',
                  border: '1px solid rgba(var(--primary-rgb), 0.2)',
                  backgroundColor: 'var(--white)',
                  textTransform: 'uppercase',
                  willChange: 'transform, opacity'
                }}
              >
                <div style={{ fontSize: '2rem', color: 'rgba(var(--primary-rgb), 0.2)', marginBottom: '1rem' }}>0{index + 1}</div>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
