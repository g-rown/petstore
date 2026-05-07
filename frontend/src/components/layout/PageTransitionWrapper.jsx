import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageTransitionWrapper Component
 * 
 * Provides a global page transition system using Framer Motion.
 * Automatically wraps route changes with smooth fade-up and fade-down animations.
 * 
 * Animation Behavior:
 * - Entrance: Fade-up from (opacity: 0, y: 20px) to (opacity: 1, y: 0)
 * - Exit: Fade out and move up from (opacity: 1, y: 0) to (opacity: 0, y: -20px)
 * - Spring animation: stiffness 100, damping 20 for organic feel
 * - No layout shift: Uses CSS transforms (GPU-accelerated)
 * 
 * Usage:
 * <PageTransitionWrapper location={pathname}>
 *   <Routes>
 *     {/* Your routes here */}
 *   </Routes>
 * </PageTransitionWrapper>
 */

/**
 * Animation variants for page transitions
 * Defines the start, middle, and end states for animations
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

/**
 * Spring transition configuration
 * Creates organic, bouncy feel instead of robotic linear motion
 * - type: 'spring' for physics-based animation
 * - stiffness: 100 (resistance to stretch)
 * - damping: 20 (energy dissipation)
 * - mass: 1 (object weight for spring physics)
 */
const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
};

/**
 * PageTransitionWrapper Component
 * 
 * Main wrapper component for page transitions.
 * Automatically handles enter/exit animations based on location changes.
 * 
 * @component
 * @param {React.ReactNode} children - The routes or content to animate (Routes/Outlet)
 * @param {string} [location] - Current location/pathname for triggering re-renders. 
 *                              Use location.pathname from useLocation() hook
 * @param {Object} [customVariants] - Optional custom animation variants
 * @param {Object} [customTransition] - Optional custom transition config
 * @returns {JSX.Element} Motion-wrapped children with AnimatePresence
 * 
 * @example
 * import { useLocation } from 'react-router-dom';
 * import PageTransitionWrapper from './PageTransitionWrapper';
 * 
 * function AppContent() {
 *   const { pathname } = useLocation();
 *   
 *   return (
 *     <PageTransitionWrapper location={pathname}>
 *       <Routes>
 *         <Route path="/" element={<HomePage />} />
 *         <Route path="/catalog" element={<CatalogPage />} />
 *       </Routes>
 *     </PageTransitionWrapper>
 *   );
 * }
 */
const PageTransitionWrapper = ({ 
  children, 
  location,
  customVariants,
  customTransition,
}) => {
  const variants = customVariants || pageVariants;
  const transition = customTransition || springTransition;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        // Key ensures new animation plays on every route change
        key={location}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transition}
        style={{
          // Prevent layout shifts during animation
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          // GPU acceleration with 3D transform
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;
