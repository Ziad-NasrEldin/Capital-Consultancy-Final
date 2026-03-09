import React from 'react';

const MOTION_ONLY_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'whileInView',
  'whileHover',
  'whileTap',
  'whileDrag',
  'variants',
  'transition',
  'viewport',
  'layout',
  'layoutId',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragTransition',
  'transformTemplate',
  'onAnimationStart',
  'onAnimationComplete',
]);

function stripMotionProps(props) {
  const next = {};
  for (const key in props) {
    if (!MOTION_ONLY_PROPS.has(key)) {
      next[key] = props[key];
    }
  }
  return next;
}

const motionCache = new Map();

function createMotionTag(tagName) {
  if (motionCache.has(tagName)) return motionCache.get(tagName);

  const Component = React.forwardRef(function MotionLiteTag(props, ref) {
    const sanitized = stripMotionProps(props);
    return React.createElement(tagName, { ...sanitized, ref }, props.children);
  });

  motionCache.set(tagName, Component);
  return Component;
}

export const motion = new Proxy(
  {},
  {
    get: (_, tagName) => createMotionTag(tagName),
  },
);

export function AnimatePresence({ children }) {
  return React.createElement(React.Fragment, null, children);
}

export function MotionConfig({ children }) {
  return React.createElement(React.Fragment, null, children);
}

export function useReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
