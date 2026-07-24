import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import ToastProvider from './components/system/ToastProvider';
import { SessionProvider } from './components/system/SessionProvider';
import AuthGuard from './components/layout/AuthGuard';
import AdminLayout from './components/layout/AdminLayout';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AnnouncementBanner from './components/AnnouncementBanner';
import ScrollToTop from './components/ScrollToTop';

// Lazy load public pages
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const FocusAreas = lazy(() => import('./pages/public/FocusAreas'));
const WhatWeOffer = lazy(() => import('./pages/public/WhatWeOffer'));
const WhoCanApply = lazy(() => import('./pages/public/WhoCanApply'));
const Apply = lazy(() => import('./pages/public/Apply'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Leadership = lazy(() => import('./pages/public/Leadership'));
const Programs = lazy(() => import('./pages/public/Programs'));
const Infrastructure = lazy(() => import('./pages/public/Infrastructure'));
const SocialCause = lazy(() => import('./pages/public/SocialCause'));
const Achievements = lazy(() => import('./pages/public/Achievements'));
const Gallery = lazy(() => import('./pages/public/Gallery'));
const Partners = lazy(() => import('./pages/public/Partners'));
const Mentors = lazy(() => import('./pages/public/Mentors'));
const FAQ = lazy(() => import('./pages/public/FAQ'));
const Alumni = lazy(() => import('./pages/public/Alumni'));
const Media = lazy(() => import('./pages/public/Media'));
const Policy = lazy(() => import('./pages/public/Policy'));
const Investors = lazy(() => import('./pages/public/Investors'));
const ThankYou = lazy(() => import('./pages/public/ThankYou'));
const NotFound = lazy(() => import('./pages/public/NotFound'));
const News = lazy(() => import('./pages/public/News'));
const NewsDetail = lazy(() => import('./pages/public/NewsDetail'));
const Blogs = lazy(() => import('./pages/public/Blogs'));
const BlogDetail = lazy(() => import('./pages/public/BlogDetail'));
const Startups = lazy(() => import('./pages/public/Startups'));
const Donate = lazy(() => import('./pages/public/Donate'));

import Admin from './pages/admin/Admin';

const queryClient = new QueryClient();

// AOS — re-init on every route change
function AOSHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    AOS.init({ duration: 600, once: false, offset: 80 });
    AOS.refresh();
  }, [pathname]);
  return null;
}

// Lenis smooth scroll — desktop only, reset scroll on route change
function SmoothScroll() {
  const lenisRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (window.innerWidth < 640) return; // Mobile: no Lenis

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let active = true;
    function raf(time) {
      if (!active) return;
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      active = false;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  return null;
}

// Page transitions
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

function AnimatedRoutes() {
  const location = useLocation();
  // Check if admin route to avoid public layout and page transitions
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes location={location} key={location.pathname}>
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    );
  }

  // Public Routes wrapped in layout
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <Suspense fallback={
        <div style={{ minHeight: '100dvh', background: '#060E24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid #E8ECF8', borderTop: '3px solid #2E5FD9', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        </div>
      }>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Home /></motion.div>} />
            <Route path="/about" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><About /></motion.div>} />
            <Route path="/focus-areas" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><FocusAreas /></motion.div>} />
            <Route path="/what-we-offer" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><WhatWeOffer /></motion.div>} />
            <Route path="/who-can-apply" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><WhoCanApply /></motion.div>} />
            <Route path="/apply" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Apply /></motion.div>} />
            <Route path="/contact" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Contact /></motion.div>} />
            <Route path="/leadership" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Leadership /></motion.div>} />
            <Route path="/programs" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Programs /></motion.div>} />
            <Route path="/infrastructure" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Infrastructure /></motion.div>} />
            <Route path="/social-cause" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><SocialCause /></motion.div>} />
            <Route path="/achievements" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Achievements /></motion.div>} />
            <Route path="/gallery" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Gallery /></motion.div>} />
            <Route path="/partners" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Partners /></motion.div>} />
            <Route path="/mentors" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Mentors /></motion.div>} />
            <Route path="/faq" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><FAQ /></motion.div>} />
            <Route path="/alumni" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Alumni /></motion.div>} />
            <Route path="/media" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Media /></motion.div>} />
            <Route path="/policy" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Policy /></motion.div>} />
            <Route path="/investors" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Investors /></motion.div>} />
            <Route path="/thank-you" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ThankYou /></motion.div>} />
            <Route path="/news" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><News /></motion.div>} />
            <Route path="/news/:slug" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><NewsDetail /></motion.div>} />
            <Route path="/blogs" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Blogs /></motion.div>} />
            <Route path="/blogs/:slug" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><BlogDetail /></motion.div>} />
            <Route path="/blog" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Blogs /></motion.div>} />
            <Route path="/blog/:slug" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><BlogDetail /></motion.div>} />
            <Route path="/startups" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Startups /></motion.div>} />
            <Route path="/donate" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Donate /></motion.div>} />
            <Route path="*" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><NotFound /></motion.div>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
      <ScrollToTop />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <BrowserRouter>
            <AOSHandler />
            <SmoothScroll />
            <ToastProvider />
            <LoadingScreen />
            <AnimatedRoutes />
          </BrowserRouter>
        </SessionProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
