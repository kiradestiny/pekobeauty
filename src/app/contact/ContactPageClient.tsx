"use client";

import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { Phone, MessageCircle, Map as MapIcon } from 'lucide-react';

import ContactHero from './components/ContactHero';
import ContactStats from './components/ContactStats';
import ContactCards from './components/ContactCards';
import ContactForm from './components/ContactForm';
import ContactMap from './components/ContactMap';
import ContactFAQ from './components/ContactFAQ';

/* ── Cursor Glow (desktop only) ── */
function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 hidden md:block rounded-full"
      style={{
        left: sx,
        top: sy,
        translateX: '-50%',
        translateY: '-50%',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(197,43,33,0.035) 0%, transparent 65%)',
      }}
    />
  );
}

/* ── Scroll Progress Bar ── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent">
      <motion.div
        style={{
          scaleX,
          transformOrigin: '0%',
          height: '100%',
          background: 'linear-gradient(90deg, #C52B21, #FF6B6B)',
        }}
      />
    </div>
  );
}

/* ── Form + Map combined section ── */
function ContactFormMapSection() {
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[48px] shadow-2xl shadow-gray-200/60 overflow-hidden border border-gray-50">
          <div className="grid lg:grid-cols-2">
            {/* Left: Form */}
            <ContactForm />

            {/* Right: Map */}
            <div className="relative min-h-[600px] bg-gray-50 group/map overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.282683182031!2d114.16753137602432!3d22.319356642055342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040090a0a0a0a1%3A0x1234567890abcdef!2sPeko%20Beauty!5e0!3m2!1szh-TW!2shk!4v1700000000000!5m2!1szh-TW!2shk"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover/map:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Floating pin */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #C52B21, #FF4444)',
                    boxShadow: '0 8px 32px rgba(197,43,33,0.5)',
                  }}
                >
                  <MapIcon size={22} />
                </div>
                <div
                  className="w-4 h-4 rounded-full mx-auto -mt-1 blur-sm opacity-40"
                  style={{ background: '#C52B21' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   MAIN CLIENT COMPONENT
════════════════════════════════════════════ */
export default function ContactPageClient() {
  return (
    <div className="bg-[#FCFBFA] min-h-screen overflow-x-hidden selection:bg-[#C52B21]/10 selection:text-[#C52B21]">

      {/* Global micro-interactions */}
      <CursorGlow />
      <ScrollProgressBar />

      {/* ① Immersive Hero with particle canvas + typewriter */}
      <ContactHero />

      {/* ② Stats counter bar */}
      <ContactStats />

      {/* ③ 3D tilt contact method cards */}
      <ContactCards />

      {/* ④ Inquiry form + Google Map */}
      <ContactFormMapSection />

      {/* ⑤ Interactive location + transport guide */}
      <ContactMap />

      {/* ⑥ FAQ accordion */}
      <ContactFAQ />

      {/* ⑧ Mobile sticky quick actions */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 flex gap-3">
        <motion.a
          href="https://wa.me/85253353313"
          whileTap={{ scale: 0.95 }}
          className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-white shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #C52B21, #FF4444)',
            boxShadow: '0 8px 32px rgba(197,43,33,0.4)',
          }}
        >
          <MessageCircle size={20} />
          WhatsApp
        </motion.a>
        <motion.a
          href="tel:+85226622092"
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-700 shadow-xl border border-gray-100"
        >
          <Phone size={20} />
        </motion.a>
        <motion.a
          href="#map"
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-700 shadow-xl border border-gray-100"
        >
          <MapIcon size={20} />
        </motion.a>
      </div>

    </div>
  );
}
