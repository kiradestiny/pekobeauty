"use client";
import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

const BRAND      = '#C52B21';
const BRAND_DARK = '#2C1810';

export default function ContactHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowX = useSpring(0, { stiffness: 50, damping: 30 });
  const glowY = useSpring(0, { stiffness: 50, damping: 30 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    glowX.set(e.clientX);
    glowY.set(e.clientY);
  }, [glowX, glowY]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden"
      style={{
        minHeight: '88vh',
        background: 'linear-gradient(160deg, #FEFCF8 0%, #FBF4F1 55%, #F5E8E4 100%)',
      }}
    >
      {/* Subtle ambient blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 900, height: 700,
            background: 'radial-gradient(ellipse, rgba(197,43,33,0.06) 0%, transparent 65%)',
            filter: 'blur(90px)',
            top: '-10%', right: '-5%',
          }}
          animate={{ x: ['0%', '4%', '0%'], y: ['0%', '8%', '0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 560, height: 480,
            background: 'radial-gradient(ellipse, rgba(255,215,208,0.18) 0%, transparent 60%)',
            filter: 'blur(70px)',
            bottom: '5%', left: '15%',
          }}
          animate={{ x: ['0%', '-5%', '0%'], y: ['0%', '-6%', '0%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Mouse glow */}
      <motion.div
        className="fixed pointer-events-none z-0 rounded-full"
        style={{
          width: 380, height: 380,
          x: glowX, y: glowY,
          translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(197,43,33,0.06) 0%, transparent 68%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 pt-40 pb-32"
      >
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}>
          <div className="w-7 h-px" style={{ background: `${BRAND}80` }} />
          <span style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.55em', textTransform: 'uppercase',
            color: `${BRAND}90`,
          }}>
            Contact
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-10" style={{ perspective: 1000 }}>
          <motion.h1
            className="font-playfair"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              fontWeight: 300,
              lineHeight: 1.04,
              color: BRAND_DARK,
              letterSpacing: '-0.01em',
            }}
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            與我們
          </motion.h1>
          <motion.h1
            className="font-playfair italic"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
              backgroundImage: `linear-gradient(125deg, ${BRAND} 0%, #E83525 60%, ${BRAND} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            聯絡。
          </motion.h1>
        </div>

        {/* Subline */}
        <motion.p
          style={{
            fontSize: 15,
            color: 'rgba(90,70,65,0.60)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            lineHeight: 1,
            maxWidth: 340,
          }}
          className="mb-14"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}>
          專業顧問團隊，隨時候命。
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}>

          <motion.a
            href="https://wa.me/85253353313"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full text-white"
            style={{
              padding: '14px 36px',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.38em', textTransform: 'uppercase',
              background: `linear-gradient(135deg, ${BRAND}, #E0392D)`,
              boxShadow: '0 12px 36px -6px rgba(197,43,33,0.36)',
              textDecoration: 'none',
            }}
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
            <MessageCircle size={14} />
            WhatsApp
          </motion.a>

          <motion.a
            href="#contact-form"
            onClick={e => {
              e.preventDefault();
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 rounded-full"
            style={{
              padding: '14px 30px',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.38em', textTransform: 'uppercase',
              border: '1px solid rgba(197,43,33,0.20)',
              color: 'rgba(140,58,48,0.78)',
              background: 'rgba(255,255,255,0.50)',
              backdropFilter: 'blur(12px)',
              textDecoration: 'none', cursor: 'pointer',
            }}
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
            <Send size={13} />
            發送訊息
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom divider */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(197,43,33,0.14) 25%, rgba(197,43,33,0.14) 75%, transparent)' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1.1, ease: 'easeInOut' }}
      />
    </section>
  );
}
