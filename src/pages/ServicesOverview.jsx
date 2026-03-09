import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealText } from '../components/RevealText';
import ScrambleText from '../components/ScrambleText';
import HalftoneImage from '../components/HalftoneImage';
import './ServicesOverview.css';

const services = [
  { slug: 'engineering-technical-consulting', title: ['Engineering &', 'Technical Consulting'], desc: 'Expert advisory services for planning, feasibility studies, and system design across all engineering disciplines.', img: '/images/unsplash/services-eng.webp' },
  { slug: 'engineering-design-planning', title: ['Engineering', 'Design & Planning'], desc: 'Complete electrical, mechanical, structural, and civil engineering design for projects of any scale.', img: '/images/unsplash/services-design.webp' },
  { slug: 'infrastructure-smart-systems', title: ['Infrastructure &', 'Smart Systems'], desc: 'Utility networks, smart building systems, data centers, and renewable energy integration solutions.', img: '/images/unsplash/services-infra.webp' },
  { slug: 'project-construction-management', title: ['Project &', 'Construction Management'], desc: 'Planning, scheduling, supervision, and comprehensive project lifecycle control from start to finish.', img: '/images/unsplash/services-pm.webp' },
  { slug: 'testing-commissioning', title: ['Testing, Commissioning', '& Optimization'], desc: 'System audits, performance testing, safety compliance, and operational optimization for completed works.', img: '/images/unsplash/services-test.webp' }
];

const slowFadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
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
      transition={{ duration: 0.8 }}
      className="svcp"
    >
      {/* Hero area */}
      <section className="svcp__hero">
        <div className="svcp__hero-inner">
          <motion.div
            className="svcp__hero-header"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="svcp__label"><ScrambleText text="Our Services" /></span>
            <span className="svcp__label">[CCI.S]</span>
          </motion.div>

          <div className="svcp__hero-titles">
            <motion.h1
              className="svcp__hero-title"
              initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              A Versatile<br />
              Range of<br />
              Services
            </motion.h1>

            <motion.p
              className="svcp__hero-desc"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            >
              From concept to completion, Capital Consultancy delivers multidisciplinary engineering expertise — turning complex challenges into fully operational, sustainable projects.
            </motion.p>
          </div>

          <motion.div
            className="svcp__hero-image"
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1], delay: 0.8 }}
          >
            <HalftoneImage
              src="/images/unsplash/services-overview-hero.webp"
              alt="Engineering services overview"
              sizes="(max-width: 767px) 94vw, (max-width: 1199px) 72vw, 56vw"
              intrinsicWidth={1600}
              intrinsicHeight={900}
            />
          </motion.div>

          <motion.div
            className="svcp__hero-keywords"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p>Consulting</p>
            <p>Design</p>
            <p>Management</p>
            <p>Commissioning</p>
            <p>Infrastructure</p>
          </motion.div>
        </div>
      </section>

      {/* Service list */}
      <section className="svcp__list-section">
        <ul className="svc-list">
          {services.map((service, index) => (
            <motion.li
              key={index}
              className="svc-list__item"
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={slowFadeUp}
            >
              <span className="svc-list__num">{index + 1}</span>

              <div className="svc-list__img-wrap">
                <HalftoneImage
                  src={service.img}
                  alt={service.title.join(' ')}
                  sizes="(max-width: 767px) 90vw, (max-width: 1199px) 44vw, 28vw"
                  intrinsicWidth={1200}
                  intrinsicHeight={900}
                />
              </div>

              <div className="svc-list__content">
                <h3>
                  <span>{service.title[0]}</span><br />
                  <span>{service.title[1]}</span>
                </h3>
                <Link to={`/services/${service.slug}`} className="svc-list__read-more">
                  <ScrambleText text="View Details" />
                </Link>
              </div>

              <div className="svc-list__desc">
                <p>{service.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
};

export default ServicesOverview;
