import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * RouteTransitionProvider Component
 * 
 * Simplified wrapper that automatically uses React Router's useLocation hook
 * to trigger animations. Eliminates manual location prop passing.
 * 
 * Features:
 * - Automatic location detection from React Router
 * - Works seamlessly with Routes component
 * - Prevents layout shift with proper styling
 * - GPU-accelerated animations
 * 
 * Usage:
 * function App() {
 *   return (
 *     <Router>
 *       <Navbar />
 *       <RouteTransitionProvider>
 *         <Routes>
 *           <Route path="/" element={<HomePage />} />
 *           <Route path="/catalog" element={<CatalogPage />} />
 *         </Routes>
 *       </RouteTransitionProvider>
 *       <Footer />
 *     </Router>
 *   );
 * }
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

const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
};

/**
 * RouteTransitionProvider Component
 * 
 * Wraps Routes/children with automatic location-based animations.
 * No need to pass location prop - it's detected automatically.
 * 
 * @component
 * @param {React.ReactNode} children - Routes or page content to animate
 * @param {Object} [options] - Optional animation configuration
 * @param {Object} [options.variants] - Custom animation variants
 * @param {Object} [options.transition] - Custom transition config
 * @param {string} [options.mode] - AnimatePresence mode ('wait', 'sync', 'popLayout')
 * @returns {JSX.Element} Motion-wrapped Routes with automatic animations
 * 
 * @example
 * <RouteTransitionProvider
 *   options={{
 *     variants: customVariants,
 *     transition: { stiffness: 150, damping: 25 }
 *   }}
 * >
 *   <Routes>
 *     <Route path="/" element={<HomePage />} />
 *   </Routes>
 * </RouteTransitionProvider>
 */
const RouteTransitionProvider = ({ 
  children,
  options = {},
}) => {
  const { pathname } = useLocation();
  
  const {
    variants = pageVariants,
    transition = springTransition,
    mode = 'wait',
  } = options;

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transition}
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteTransitionProvider;
