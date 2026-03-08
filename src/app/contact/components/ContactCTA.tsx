"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Calendar } from 'lucide-react';

const BRAND = "#C52B21";

export default function ContactCTA() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0.7, 1], [0, -60]);

  return (
    <section className="pb-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-[56px] overflow-hidden"
          style={{ minHeight: 480 }}
        >
          {/* Parallax background image */}
          <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000"
              alt="Clinic"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/70 to-gray-900/90" />
          </motion.div>

          {/* Animated glow orbs */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(197,43,33,0.25) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[80px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(197,43,33,0.2) 0%, transparent 70%)' }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-[11px] font-bold tracking-[0.3em] uppercase text-white/60">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C52B21] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C52B21]" />
                </span>
                開始您的美肌之旅
              </span>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight tracking-tight">
                開啟您的{' '}
                <span className="font-serif italic" style={{ color: BRAND }}>美肌之旅</span>
              </h2>

              <p className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                現在預約首次 VISIA 皮膚分析，讓我們為您制定專屬的美容方案。
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.me/85253353313"
                  target="_blank" rel="noreferrer"
                  className="group relative px-10 py-5 rounded-2xl font-bold tracking-[0.15em] text-white flex items-center justify-center gap-3 overflow-hidden transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND}, #FF4444)`,
                    boxShadow: '0 20px 60px rgba(197,43,33,0.5)',
                  }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <MessageCircle size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                  WhatsApp 預約
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/booking"
                  className="group px-10 py-5 rounded-2xl font-bold tracking-[0.15em] text-gray-900 bg-white flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-xl"
                >
                  <Calendar size={22} className="group-hover:rotate-6 transition-transform duration-300" />
                  線上預約系統
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
