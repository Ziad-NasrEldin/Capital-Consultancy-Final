import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const ServicesOverview = lazy(() => import('./pages/ServicesOverview'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Industries = lazy(() => import('./pages/Industries'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const AnimatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicesOverview />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Suspense>
    </Router>
  );
}

export default App;
