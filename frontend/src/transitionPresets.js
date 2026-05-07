/**
 * Page Transition Presets
 * 
 * Pre-configured animation sets for different transition styles.
 * Use these presets or as reference for creating custom animations.
 */

/**
 * Smooth Spring Preset (Default)
 * Organic bouncy feel, great for general use
 */
export const SMOOTH_SPRING = {
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 1,
  },
};

/**
 * Quick Spring Preset
 * Faster, snappier animations with less bounce
 */
export const QUICK_SPRING = {
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  transition: {
    type: 'spring',
    stiffness: 150,
    damping: 25,
    mass: 0.8,
  },
};

/**
 * Bouncy Spring Preset
 * Playful, bouncy animations with more spring
 */
export const BOUNCY_SPRING = {
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  transition: {
    type: 'spring',
    stiffness: 80,
    damping: 15,
    mass: 1.2,
  },
};

/**
 * Smooth Tween Preset
 * Linear, predictable animations using duration-based timing
 */
export const SMOOTH_TWEEN = {
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  transition: {
    type: 'tween',
    duration: 0.4,
    ease: 'easeInOut',
  },
};

/**
 * Fast Tween Preset
 * Quick, snappy duration-based animations
 */
export const FAST_TWEEN = {
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  transition: {
    type: 'tween',
    duration: 0.25,
    ease: 'easeOut',
  },
};

/**
 * Fade Only Preset
 * Simple fade without vertical movement
 */
export const FADE_ONLY = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  },
};

/**
 * Scale & Fade Preset
 * Combines scale and fade for modern effect
 */
export const SCALE_FADE = {
  variants: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  },
};

/**
 * Slide Right Preset
 * Slides in from right, exits to left
 */
export const SLIDE_RIGHT = {
  variants: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  },
};

/**
 * Slide Left Preset
 * Slides in from left, exits to right
 */
export const SLIDE_LEFT = {
  variants: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  },
};

/**
 * Rotate & Fade Preset
 * Combines rotation with fade for dynamic effect
 */
export const ROTATE_FADE = {
  variants: {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 5 },
  },
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  },
};

/**
 * Get preset by name
 * @param {string} presetName - Name of the preset
 * @returns {Object} Preset configuration object
 * 
 * @example
 * const preset = getPreset('QUICK_SPRING');
 */
export const getPreset = (presetName) => {
  const presets = {
    SMOOTH_SPRING,
    QUICK_SPRING,
    BOUNCY_SPRING,
    SMOOTH_TWEEN,
    FAST_TWEEN,
    FADE_ONLY,
    SCALE_FADE,
    SLIDE_RIGHT,
    SLIDE_LEFT,
    ROTATE_FADE,
  };

  return presets[presetName] || SMOOTH_SPRING;
};

/**
 * List all available presets
 * @returns {string[]} Array of preset names
 */
export const listPresets = () => {
  return [
    'SMOOTH_SPRING',
    'QUICK_SPRING',
    'BOUNCY_SPRING',
    'SMOOTH_TWEEN',
    'FAST_TWEEN',
    'FADE_ONLY',
    'SCALE_FADE',
    'SLIDE_RIGHT',
    'SLIDE_LEFT',
    'ROTATE_FADE',
  ];
};
