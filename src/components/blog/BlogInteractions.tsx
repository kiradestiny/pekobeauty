"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// ─── Reading Progress Bar ─────────────────────────────────────────────────────
export const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #C52B21, #E84040, #C52B21)',
          backgroundSize: '200% 100%',
        }}
      />
      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[99] blur-sm opacity-60"
        style={{
          scaleX,
          backgroundColor: '#C52B21',
        }}
      />
    </>
  );
};

// ─── Back To Top ──────────────────────────────────────────────────────────────
export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      setIsVisible(scrollTop > 400);
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle progress
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center"
          aria-label="Back to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Background circle */}
          <div className="absolute inset-0 bg-white rounded-full shadow-xl border border-gray-100" />

          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            {/* Track */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="2.5"
            />
            {/* Progress */}
            <motion.circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="#C52B21"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transition={{ duration: 0.1 }}
            />
          </svg>

          {/* Arrow icon */}
          <ArrowUp size={16} className="relative z-10 text-[#C52B21]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ─── Floating Article CTA ─────────────────────────────────────────────────────
interface FloatingCTAProps {
  show: boolean;
  message: string;
  href: string;
  ctaText: string;
}

export const FloatingCTA = ({ show, message, href, ctaText }: FloatingCTAProps) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-5 border border-white/10 max-w-sm w-[calc(100%-2rem)]"
      >
        <p className="text-sm font-medium flex-1 leading-snug">{message}</p>
        <a
          href={href}
          className="flex-shrink-0 bg-[#C52B21] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#A3241B] transition-colors whitespace-nowrap"
        >
          {ctaText}
        </a>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Scroll Reveal Wrapper ────────────────────────────────────────────────────
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal = ({
  children,
  delay = 0,
  className,
  direction = 'up',
}: ScrollRevealProps) => {
  const variants = {
    up: { y: 30, opacity: 0 },
    down: { y: -30, opacity: 0 },
    left: { x: 30, opacity: 0 },
    right: { x: -30, opacity: 0 },
  };

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Cursor Spotlight (desktop only) ─────────────────────────────────────────
export const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[200] rounded-full hidden lg:block"
      animate={{
        x: pos.x - 200,
        y: pos.y - 200,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 50, mass: 0.1 }}
      style={{
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(197,43,33,0.04) 0%, transparent 70%)',
      }}
    />
  );
};
