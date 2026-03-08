import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, Compass, Layers, Briefcase, CheckCircle } from 'lucide-react';
import { RevealText, RevealLines } from '../components/RevealText';
import './Home.css';

const fadeUpVariant = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="home-page"
    >
      {/* SECTION 1 - HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-exact-grid">
            <div className="hero-grid-main">
              <h1 className="hero-huge-text">
                <div style={{ overflow: 'hidden' }}>
                  <motion.span 
                    style={{ display: 'inline-block' }}
                    initial={{ y: '120%' }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  >
                    Capital
                  </motion.span>
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <motion.span 
                    style={{ display: 'inline-block' }}
                    initial={{ y: '120%' }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  >
                    Consultants
                  </motion.span>
                </div>
              </h1>
            </div>

            <div className="hero-grid-side">
              <div style={{ overflow: 'hidden', position: 'relative', zIndex: 10 }}>
                <motion.p 
                  className="hero-sub"
                  initial={{ y: '120%', opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                >
                  Answering all of your<br/>building codes and<br/>engineering needs.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-halftone-container">
          <motion.img 
            src="/hero-bg.png" 
            alt="Capital Consultancy Engineering Structure" 
            className="hh-img"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: 'easeOut' }}
          />
          <div className="hh-dots"></div>
        </div>
      </section>

      {/* SECTION 2 - KEY SERVICES */}
      <section className="services-overview container section-padding">
        <motion.div
          className="section-header"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2><RevealText text="Range of Services" /></h2>
          <p>Comprehensive engineering solutions for every project phase.</p>
        </motion.div>

        <div className="services-list">
          {[
            { title: "Engineering & Technical Consulting", icon: <Compass size={32} />, desc: "Expert advisory services for planning and development." },
            { title: "Engineering Design & Planning", icon: <Layers size={32} />, desc: "Complete electrical, mechanical, and structural design." },
            { title: "Infrastructure & Smart Systems", icon: <Settings size={32} />, desc: "Utility networks, smart systems, and power generation." },
            { title: "Project & Construction Management", icon: <Briefcase size={32} />, desc: "Planning, supervision, and full project lifecycle control." },
            { title: "Testing & Commissioning", icon: <CheckCircle size={32} />, desc: "System audits, optimization, and safety compliance." }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUpVariant}
              style={{ padding: 0 }}
            >
              <Link to={`/services/service-${index + 1}`} className="service-card">
                <div className="service-card-num">0{index + 1}</div>
                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
                <div className="service-card-action">
                  <span className="read-more">READ MORE</span>
                  <ArrowRight />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3 - INDUSTRIES SERVED */}
      <section className="industries-section">
        <div className="container section-padding">
          <motion.h2
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            Industries Served
          </motion.h2>

          <motion.div
            className="grid grid-cols-3 industries-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {['Infrastructure & Utilities', 'Commercial Buildings', 'Industrial Facilities', 'Healthcare Facilities', 'Government & Public Sector', 'Energy & Power'].map((industry, i) => (
              <motion.div key={i} className="industry-card" variants={staggerItem}>
                <h3>{industry}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - WHY CHOOSE US */}
      <section className="why-choose-us container section-padding">
        <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 className="massive-text">
              <RevealText text="A Versatile" delay={0} />
              <RevealText text="Approach" delay={0.1} />
            </h2>
          </div>
          <motion.div
            className="why-list-wrapper"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.p variants={fadeUpVariant} className="lead">Why Choose Capital Consultancy?</motion.p>
            <ul className="why-list">
              <motion.li variants={fadeUpVariant}>Multidisciplinary engineering expertise</motion.li>
              <motion.li variants={fadeUpVariant}>Proven project management capabilities</motion.li>
              <motion.li variants={fadeUpVariant}>Focus on efficient and sustainable solutions</motion.li>
              <motion.li variants={fadeUpVariant}>Strong collaboration with contractors and developers</motion.li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 - FEATURED PROJECTS */}
      <section className="featured-projects container section-padding">
        <div className="flex-between">
          <motion.h2 variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Featured Projects
          </motion.h2>
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link to="/projects" className="btn btn-primary">View All Projects</Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-3 projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {[
            { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80', title: 'Skyline Finance Center' },
            { img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80', title: 'National Health Hub' },
            { img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80', title: 'City Power Substation' }
          ].map((item, i) => (
            <motion.div className="project-card" key={i} variants={staggerItem}>
              <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', marginBottom: '1.5rem', backgroundColor: 'var(--primary-blue)' }}>
                <motion.img 
                  src={item.img} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="project-info">
                <h3>{item.title}</h3>
                <p>Location, Sector</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 6 - CTA */}
      <motion.section
        className="cta-section bg-blue text-center section-padding"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2>
            <RevealText text="Start Your Project" delay={0} />
            <br />
            <RevealText text="With Confidence" delay={0.1} />
          </h2>
          <br />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/contact" className="btn" style={{ backgroundColor: 'var(--white)', color: 'var(--primary-blue)' }}>
              Request Consultation
            </Link>
          </motion.div>
        </div>
        <div className="blueprint-overlay"></div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
