"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Clock, Users, Award, Zap, Heart } from 'lucide-react';
import { BRAND_RED, trustPoints } from './offersData';

// ─── Icon Map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck size={32} aria-hidden="true" />,
  Clock: <Clock size={32} aria-hidden="true" />,
  Users: <Users size={32} aria-hidden="true" />,
  Award: <Award size={32} aria-hidden="true" />,
  Zap: <Zap size={32} aria-hidden="true" />,
  Heart: <Heart size={32} aria-hidden="true" />,
};

// ─── Trust Card ───────────────────────────────────────────────────────────────
const TrustCard = ({
  icon,
  title,
  description,
  stat,
  statLabel,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative bg-white/5 border border-white/10 rounded-[32px] p-8 overflow-hidden h-full"
      >
        {/* Hover glow */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${BRAND_RED}20 0%, transparent 70%)`,
          }}
        />

        {/* Top: Icon + Stat */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon circle */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, ${BRAND_RED}30, ${BRAND_RED}10)` }}
          >
            <span style={{ color: BRAND_RED }}>{ICON_MAP[icon]}</span>
          </motion.div>

          {/* Stat badge */}
          <div className="text-right">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.4, type: 'spring', stiffness: 300 }}
              className="text-3xl font-black text-white"
              aria-label={`${stat} ${statLabel}`}
            >
              {stat}
            </motion.div>
            <div className="text-xs text-white/40 mt-0.5">{statLabel}</div>
          </div>
        </div>

        {/* Content */}
        <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>

        {/* Bottom accent line */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.6, duration: 0.5 }}
          className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full origin-left"
          style={{ background: `linear-gradient(90deg, ${BRAND_RED}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
};

// ─── Marquee Strip ────────────────────────────────────────────────────────────
const certifications = [
  'FDA 認證',
  'CE 認證',
  '原廠正貨',
  '持牌治療師',
  '全女班操作',
  '明碼實價',
  '無 Hard Sell',
  'VISIA 分析',
  '科學數據',
  '安全第一',
];

const CertMarquee = () => (
  <div
    className="overflow-hidden py-4 border-t border-b border-white/10 my-12"
    aria-label="認證與承諾"
  >
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="flex gap-8 whitespace-nowrap"
      aria-hidden="true"
    >
      {[...certifications, ...certifications].map((c, i) => (
        <span key={i} className="flex items-center gap-2 text-sm text-white/40 font-medium">
          <span style={{ color: BRAND_RED }}>✦</span>
          {c}
        </span>
      ))}
    </motion.div>
    {/* Accessible text version (hidden visually) */}
    <span className="sr-only">{certifications.join(' · ')}</span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OffersTrustSection() {
  return (
    <section
      className="relative bg-gray-950 rounded-[48px] p-10 md:p-16 overflow-hidden mb-20"
      aria-label="我們的承諾"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: BRAND_RED }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: '#1A6B8A' }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4 border"
          style={{
            color: BRAND_RED,
            borderColor: `${BRAND_RED}40`,
            background: `${BRAND_RED}10`,
          }}
        >
          <Award size={12} aria-hidden="true" />
          OUR PROMISE
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">我們的承諾</h2>
        <p className="text-white/40 text-sm max-w-xl mx-auto">
          每一項承諾都是我們對您的保證，讓您在最安心的環境下體驗醫美。
        </p>
      </motion.div>

      {/* Trust Cards */}
      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {trustPoints.map((tp, i) => (
          <TrustCard key={tp.title} {...tp} index={i} />
        ))}
      </div>

      {/* Marquee */}
      <CertMarquee />

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
      >
        <p className="text-white/30 text-sm mb-6">
          超過 3,000+ 位客戶的信任，是我們最大的動力
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="https://wa.me/85253353313"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            aria-label="透過 WhatsApp 立即預約體驗（新視窗開啟）"
            className="px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl"
            style={{ background: `linear-gradient(135deg, ${BRAND_RED}, #8B0000)` }}
          >
            立即預約體驗
          </motion.a>
          <motion.a
            href="/about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            aria-label="了解更多關於 Peko Beauty"
            className="px-8 py-3.5 rounded-2xl font-bold text-sm border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
          >
            了解更多關於我們
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
