import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RevealText, RevealLines } from '../components/RevealText';
import HalftoneImage from '../components/HalftoneImage';
import ScrambleText from '../components/ScrambleText';
import './Home.css';

const fadeUpVariant = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// Premium slow fade-in for text content
const textFadeInVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.4, 
      ease: [0.2, 0.8, 0.2, 1] // Smooth, luxury easing curve
    } 
  }
};

// Slow fade in with subtle upward motion for elegance
const slowFadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.3, 
      ease: [0.2, 0.8, 0.2, 1]
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 // Increased for more graceful stagger
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1] } }
};

const Home = () => {
  const heroRef = useRef(null);
  const rafRef = useRef(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [industryHovered, setIndustryHovered] = useState(null);
  const cursorState = useRef({
    x: 50,
    y: 50,
    targetX: 50,
    targetY: 50,
    opacity: 0,
    targetOpacity: 0,
  });

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return undefined;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      const state = cursorState.current;
      state.x = lerp(state.x, state.targetX, 0.1);
      state.y = lerp(state.y, state.targetY, 0.1);
      state.opacity = lerp(state.opacity, state.targetOpacity, 0.12);

      heroEl.style.setProperty('--hero-cursor-x', `${state.x.toFixed(2)}%`);
      heroEl.style.setProperty('--hero-cursor-y', `${state.y.toFixed(2)}%`);
      heroEl.style.setProperty('--hero-boost-opacity', `${state.opacity.toFixed(3)}`);

      const stillMoving =
        Math.abs(state.x - state.targetX) > 0.02 ||
        Math.abs(state.y - state.targetY) > 0.02 ||
        Math.abs(state.opacity - state.targetOpacity) > 0.01;

      if (stillMoving) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const ensureTick = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      cursorState.current.targetX = ((e.clientX - rect.left) / rect.width) * 100;
      cursorState.current.targetY = ((e.clientY - rect.top) / rect.height) * 100;
      cursorState.current.targetOpacity = 0.95;
      ensureTick();
    };

    const onEnter = onMove;

    const onLeave = () => {
      cursorState.current.targetOpacity = 0;
      ensureTick();
    };

    heroEl.addEventListener('mousemove', onMove);
    heroEl.addEventListener('mouseenter', onEnter);
    heroEl.addEventListener('mouseleave', onLeave);

    return () => {
      heroEl.removeEventListener('mousemove', onMove);
      heroEl.removeEventListener('mouseenter', onEnter);
      heroEl.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="home-page"
    >
      {/* SECTION 1 - HERO */}
      <section className="hero" ref={heroRef}>
        <motion.div
          className="hero-bg-media"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <HalftoneImage
            className="hero-halftone-full"
            src="https://images.unsplash.com/photo-1465804575741-338df8554e02?auto=format&fit=crop&q=80"
            alt="Large-scale engineering structure"
            heroInteractive
          />
        </motion.div>

        <motion.div
          className="blueprint-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* ── hero grid ── */}
        <div className="hero-grid">

          {/* decorative vertical lines, desktop only */}
          <div className="hero-line-wrap" style={{ gridArea: 'line1' }} aria-hidden="true">
            <motion.div className="hero-line-bar"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="hero-line-wrap" style={{ gridArea: 'line2' }} aria-hidden="true">
            <motion.div className="hero-line-bar hero-line-bar--short"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="hero-line-wrap" style={{ gridArea: 'line3' }} aria-hidden="true">
            <motion.div className="hero-line-bar hero-line-bar--from-bottom"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="hero-line-wrap hero-line-stub" style={{ gridArea: 'line4' }} aria-hidden="true">
            <motion.div className="hero-line-bar"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="hero-line-wrap hero-line-stub" style={{ gridArea: 'line5' }} aria-hidden="true">
            <motion.div className="hero-line-bar"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* tagline */}
          <motion.div className="hero-tagline"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>Engineering<br />excellence for<br />complex systems.</p>
          </motion.div>

          {/* title line 1 */}
          <motion.span className="hero-title hero-title-1"
            initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Capital
          </motion.span>

          {/* title line 2 */}
          <motion.span className="hero-title hero-title-2"
            initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Consultancy
          </motion.span>

          {/* Mobile-only CTA buttons */}
          <motion.div
            className="hero-cta-mobile"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/services" className="hero-cta-mobile__btn hero-cta-mobile__btn--primary">
              <ScrambleText text="Our Services" />
            </Link>
            <Link to="/projects" className="hero-cta-mobile__btn hero-cta-mobile__btn--outline">
              <ScrambleText text="View Projects" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2 - SERVICES SHOWCASE */}
      <section className="svc-showcase">
        {/* Header bar */}
        <div className="svc-showcase__header">
          <motion.span
            className="svc-showcase__label"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            <ScrambleText text="Our Services" />
          </motion.span>
          <motion.span
            className="svc-showcase__label"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            [CCI.2]
          </motion.span>
        </div>

        {/* Main grid area */}
        <div className="svc-showcase__grid">
          {/* Vertical line */}
          <motion.div
            className="svc-showcase__vline"
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Description – top right */}
          <motion.div
            className="svc-showcase__desc svc-showcase__desc--top"
            variants={slowFadeUpVariant} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
          >
            <p>Navigating complex engineering challenges can seem like an insurmountable task for developers, contractors, and project owners.</p>
          </motion.div>

          {/* Title row: "A" left, "Versatile" right */}
          <div className="svc-showcase__title-row">
            <motion.span
              className="svc-showcase__title-a"
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              A
            </motion.span>
            <motion.span
              className="svc-showcase__title-versatile"
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Versatile
            </motion.span>
          </div>

          {/* Image block with overlapping titles */}
          <div className="svc-showcase__image-block">
            <motion.div
              className="svc-showcase__image-wrap"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <HalftoneImage
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                alt="Engineering services"
                heroInteractive
                className="hero-halftone-full"
              />
            </motion.div>

            {/* "Range of" overlapping top-left of the image */}
            <motion.span
              className="svc-showcase__title-range"
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Range of
            </motion.span>
            {/* Mercury overlay — clipped to image area */}
            <motion.span
              className="svc-showcase__title-range--overlay"
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Range of
            </motion.span>

            {/* "Services" overlapping bottom-right of the image */}
            <motion.span
              className="svc-showcase__title-services"
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              Services
            </motion.span>

            {/* Keywords to the right of image */}
            <motion.div
              className="svc-showcase__keywords"
              variants={slowFadeUpVariant} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
            >
              <p>Consulting</p>
              <p>Design</p>
              <p>Management</p>
              <p>Commissioning</p>
            </motion.div>
          </div>

          {/* Description – bottom right */}
          <motion.div
            className="svc-showcase__desc svc-showcase__desc--bottom"
            variants={slowFadeUpVariant} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
          >
            <p>From concept to completion, Capital Consultancy guides every step — turning blueprints into fully operational projects.</p>
          </motion.div>
        </div>

        {/* Service list rows */}
        <ul className="svc-list" onMouseLeave={() => setHoveredService(null)}>
          {[
            { slug: 'engineering-technical-consulting', title: ['Engineering &', 'Technical Consulting'], desc: 'Expert advisory services for planning, feasibility studies, and system design across all disciplines.', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80' },
            { slug: 'engineering-design-planning', title: ['Engineering', 'Design & Planning'], desc: 'Complete electrical, mechanical, structural, and civil engineering design for projects of any scale.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80' },
            { slug: 'infrastructure-smart-systems', title: ['Infrastructure &', 'Smart Systems'], desc: 'Utility networks, smart building systems, data centers, and renewable energy integration solutions.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80' },
            { slug: 'project-construction-management', title: ['Project &', 'Construction Management'], desc: 'Planning, scheduling, supervision, and comprehensive project lifecycle control from start to finish.', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80' },
            { slug: 'testing-commissioning', title: ['Testing, Commissioning', '& Optimization'], desc: 'System audits, performance testing, safety compliance, and operational optimization for completed works.', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80' }
          ].map((service, index) => {
            const isActive = hoveredService === index;
            return (
            <motion.li
              key={index}
              className="svc-list__item"
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={slowFadeUpVariant}
              onMouseEnter={() => setHoveredService(index)}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {/* animated background fill */}
              <motion.div
                animate={{ clipPath: isActive ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)' }}
                initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--primary-blue)', zIndex: 0, pointerEvents: 'none' }}
              />
              <motion.span
                className="svc-list__num"
                animate={{ color: isActive ? 'var(--white)' : 'var(--primary-blue)' }}
                transition={{ duration: 0.3 }}
                style={{ position: 'relative', zIndex: 1 }}
              >{index + 1}</motion.span>

              <div className="svc-list__img-wrap" style={{ position: 'relative', zIndex: 1 }}>
                <HalftoneImage
                  src={service.img}
                  alt={service.title.join(' ')}
                />
              </div>

              <div className="svc-list__content" style={{ position: 'relative', zIndex: 1 }}>
                <motion.h3
                  animate={{ color: isActive ? 'var(--white)' : 'var(--primary-blue)' }}
                  transition={{ duration: 0.3 }}
                >
                  <span>{service.title[0]}</span><br />
                  <span>{service.title[1]}</span>
                </motion.h3>
                <motion.div
                  animate={{ color: isActive ? 'var(--white)' : 'var(--primary-blue)', borderColor: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(var(--primary-rgb), 0.3)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/services/${service.slug}`} className="svc-list__read-more" style={{ color: 'inherit', borderColor: 'inherit' }}>
                    <ScrambleText text="Read More" />
                  </Link>
                </motion.div>
              </div>

              <div className="svc-list__desc" style={{ position: 'relative', zIndex: 1 }}>
                <motion.p
                  animate={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)' }}
                  transition={{ duration: 0.3 }}
                >{service.desc}</motion.p>
              </div>
            </motion.li>
          );})}
        </ul>
      </section>

      {/* SECTION 3 - INDUSTRIES SERVED */}
      <section style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.05)', padding: '6rem 0' }}>
        <div className="container">
          {/* header row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #aa2a19',
              paddingTop: '1.1rem',
              paddingBottom: '1.1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#aa2a19',
              marginBottom: '0'
            }}
          >
            <span>Industries Served</span>
            <span>6 sectors</span>
          </motion.div>

          {/* card grid */}
          <div className="home-industries-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderLeft: '1px solid #aa2a19',
            borderBottom: '1px solid #aa2a19'
          }}>
            {[
              { title: 'Infrastructure & Utilities', desc: 'Engineering consulting for large-scale infrastructure and public utilities projects.' },
              { title: 'Commercial Buildings', desc: 'System design and engineering for offices, malls, and mixed-use developments.' },
              { title: 'Industrial Facilities', desc: 'Engineering planning and infrastructure support for manufacturing and industrial operations.' },
              { title: 'Healthcare Facilities', desc: 'Engineering systems designed for hospitals and medical centers.' },
              { title: 'Government & Public Sector', desc: 'Consulting and engineering support for public projects and national infrastructure.' },
              { title: 'Energy & Power', desc: 'Design and consulting for power generation, renewable energy systems, and distribution networks.' }
            ].map((ind, i) => {
              const isHovered = industryHovered === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1], delay: i * 0.08 }}
                  onMouseEnter={() => setIndustryHovered(i)}
                  onMouseLeave={() => setIndustryHovered(null)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '2.5rem 2rem',
                    minHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #aa2a19',
                    borderRight: '1px solid #aa2a19',
                    cursor: 'default',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {/* animated bg fill */}
                  <motion.div
                    animate={{ clipPath: isHovered ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                    style={{ position: 'absolute', inset: 0, backgroundColor: '#aa2a19', zIndex: 0 }}
                  />

                  {/* arrow button */}
                  <motion.div
                    animate={{ scale: isHovered ? 1 : 0 }}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1], delay: isHovered ? 0.08 : 0 }}
                    style={{
                      position: 'absolute', top: 0, right: 0,
                      width: '4.5rem', height: '4.5rem',
                      backgroundColor: '#e8e6e0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transformOrigin: 'top right',
                      zIndex: 2,
                      borderLeft: '1px solid #aa2a19',
                      borderBottom: '1px solid #aa2a19'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aa2a19" strokeWidth="2" strokeLinecap="square">
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
                      animate={{ color: isHovered ? '#ffffff' : '#aa2a19' }}
                      transition={{ duration: 0.3 }}
                      style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', marginBottom: '0.9rem', lineHeight: 1.15, fontWeight: 600 }}
                    >
                      {ind.title}
                    </motion.h3>
                    <motion.p
                      animate={{ color: isHovered ? 'rgba(255,255,255,0.65)' : 'rgba(170,42,25,0.75)' }}
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
      </section>



      {/* SECTION 5 - FEATURED PROJECTS */}
      <section className="featured-projects container section-padding">
        <div className="flex-between">
          <motion.h2 
            variants={slowFadeUpVariant}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: '-150px' }}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            variants={slowFadeUpVariant}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: '-150px' }}
          >
            <Link to="/projects" className="btn btn-primary btn-inline"><ScrambleText text="View All Projects" /></Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-3 projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {[
            { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80' },
            { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80' },
            { img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80' }
          ].map((item, i) => (
            <motion.div className="project-card" key={i} variants={slowFadeUpVariant}>
              <div className="project-image-placeholder" style={{ padding: '2px', backgroundColor: 'var(--primary-blue)', marginBottom: '1.5rem' }}>
                 <HalftoneImage src={item.img} alt={`Project Alpha ${i}`} />
              </div>
              <div className="project-info">
                <h3>Project Alpha {i + 1}</h3>
                <p>Location, Sector</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 6 - CTA */}
      <motion.section 
        className="cta-section bg-blue text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-150px' }}
        transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0' }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.h2 variants={slowFadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <RevealText text="Start Your Project" delay={0} />
            <br />
            <RevealText text="With Confidence" delay={0.1} />
          </motion.h2>
          <br />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
          >
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: '900',
                fontFamily: 'var(--font-heading)',
                color: 'var(--white)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                borderBottom: '3px solid rgba(255,255,255,0.4)',
                paddingBottom: '0.15em',
                transition: 'border-color 0.3s',
              }}
            >
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
