"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, MessageCircle, CalendarCheck } from 'lucide-react';
import { BRAND_RED } from './offersData';

// ─── Animated Orb ─────────────────────────────────────────────────────────────
const Orb = ({
  size,
  color,
  x,
  y,
  delay = 0,
}: {
  size: number;
  color: string;
  x: string;
  y: string;
  delay?: number;
}) => (
  <motion.div
    aria-hidden="true"
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, left: x, top: y, background: color }}
    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OffersConsultBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <motion.section
      ref={ref}
      style={{ scale }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      aria-label="預約諮詢"
      className="mb-20 relative overflow-hidden rounded-[48px]"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #fff5f5 0%, #fff0f0 40%, #fef2f2 100%)`,
        }}
      />

      {/* Decorative orbs */}
      <Orb size={300} color={`${BRAND_RED}20`} x="-5%" y="-30%" delay={0} />
      <Orb size={200} color={`${BRAND_RED}15`} x="70%" y="40%" delay={1.5} />
      <Orb size={150} color="#1A6B8A18" x="40%" y="-20%" delay={0.8} />

      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${BRAND_RED} 1px, transparent 1px),
                            linear-gradient(90deg, ${BRAND_RED} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Parallax inner content */}
      <motion.div style={{ y }} className="relative z-10 p-10 md:p-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              aria-hidden="true"
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${BRAND_RED}, #8B0000)` }}
            >
              <Sparkles size={24} className="text-white" />
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              不知道哪款療程
              <br />
              <span style={{ color: BRAND_RED }}>最適合您？</span>
            </h3>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
              每個人的膚質都是獨一無二的。我們的專業顧問會先為您進行{' '}
              <span className="font-bold text-gray-700">VISIA 皮膚分析</span>，
              根據數據為您推薦最精準的方案。
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
              {['免費 VISIA 分析', '專業顧問諮詢', '無壓力環境', '全女班服務'].map(f => (
                <span
                  key={f}
                  className="text-xs px-3 py-1.5 rounded-full font-medium border"
                  style={{
                    color: BRAND_RED,
                    borderColor: `${BRAND_RED}40`,
                    background: `${BRAND_RED}08`,
                  }}
                >
                  ✓ {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-col gap-4 w-full lg:w-auto lg:min-w-[260px]">
            {/* Primary: WhatsApp */}
            <motion.a
              href="https://wa.me/85253353313?text=%E6%88%91%E6%83%B3%E9%A0%90%E7%B4%84%E5%B0%88%E6%A5%AD%E7%9A%AE%E8%86%9A%E8%AB%AE%E8%A9%A2"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              aria-label="透過 WhatsApp 預約免費皮膚諮詢（新視窗開啟）"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-sm overflow-hidden shadow-xl"
              style={{ background: `linear-gradient(135deg, ${BRAND_RED}, #8B0000)` }}
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              />
              <MessageCircle size={16} aria-hidden="true" className="relative z-10" />
              <span className="relative z-10">WhatsApp 預約諮詢</span>
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </motion.a>

            {/* Secondary: Online booking */}
            <motion.a
              href="/booking"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              aria-label="前往線上預約系統"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm border-2 transition-all"
              style={{
                color: BRAND_RED,
                borderColor: `${BRAND_RED}50`,
                background: 'white',
              }}
            >
              <CalendarCheck size={16} aria-hidden="true" />
              線上預約系統
            </motion.a>

            <p className="text-center text-[11px] text-gray-400">
              * 免費諮詢 · 無需購買 · 無 Hard Sell
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
