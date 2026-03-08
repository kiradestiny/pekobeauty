"use client";

import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #C52B21 0%, #f472b6 40%, #fb923c 70%, #C52B21 100%)',
        backgroundSize: '200% 100%',
        boxShadow: '0 0 8px rgba(197,43,33,0.6)',
      }}
    />
  );
}
