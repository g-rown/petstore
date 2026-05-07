import { useMemo } from 'react';

/**
 * usePageTransition Hook
 * 
 * Provides configurable page transition animations.
 * Allows customization of animation behavior while maintaining defaults.
 * 
 * @param {Object} options - Configuration options
 * @param {number} [options.stiffness=100] - Spring stiffness (higher = faster)
 * @param {number} [options.damping=20] - Spring damping (higher = less bounce)
 * @param {number} [options.mass=1] - Object mass for spring physics
 * @param {number} [options.initialY=20] - Initial Y offset on enter (pixels)
 * @param {number} [options.exitY=-20] - Exit Y offset (pixels)
 * @param {string} [options.mode='wait'] - AnimatePresence mode ('wait', 'sync', 'popLayout')
 * @returns {Object} Configuration object with variants and transition
 * 
 * @example
 * const { variants, transition } = usePageTransition({
 *   stiffness: 150,
 *   damping: 25,
 *   initialY: 30,
 *   exitY: -30,
 * });
 * 
 * return (
 *   <PageTransitionWrapper 
 *     customVariants={variants}
 *     customTransition={transition}
 *   >
 *     {children}
 *   </PageTransitionWrapper>
 * );
 */
const usePageTransition = (options = {}) => {
  const {
    stiffness = 100,
    damping = 20,
    mass = 1,
    initialY = 20,
    exitY = -20,
    mode = 'wait',
  } = options;

  // Memoize to prevent unnecessary recalculations
  const config = useMemo(() => {
    // Animation variants
    const variants = {
      initial: {
        opacity: 0,
        y: initialY,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
      exit: {
        opacity: 0,
        y: exitY,
      },
    };

    // Spring transition
    const transition = {
      type: 'spring',
      stiffness,
      damping,
      mass,
    };

    return {
      variants,
      transition,
      mode,
    };
  }, [stiffness, damping, mass, initialY, exitY, mode]);

  return config;
};

export default usePageTransition;
