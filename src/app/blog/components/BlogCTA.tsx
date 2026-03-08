"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Award, Star, Users } from 'lucide-react';

// ─── Trust Badge ──────────────────────────────────────────────────────────────
interface TrustBadgeProps {
  icon: React.ElementType;
  label: string;
  desc: string;
  delay?: number;
}

const TrustBadge = ({ icon: Icon, label, desc, delay = 0 }: TrustBadgeProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center gap-2 group"
  >
    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow mb-1">
      <Icon size={20} className="text-[#C52B21]" />
    </div>
    <div className="font-bold text-gray-900 text-sm">{label}</div>
    <div className="text-xs text-gray-400 text-center leading-relaxed">{desc}</div>
  </motion.div>
);

// ─── Floating Orb ─────────────────────────────────────────────────────────────
const FloatingOrb = ({ className }: { className?: string }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// ─── Main BlogCTA ─────────────────────────────────────────────────────────────
const BlogCTA = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const trustBadges = [
    { icon: Users, label: '專業團隊', desc: '全女班資深顧問', delay: 0.1 },
    { icon: Award, label: '原廠正貨', desc: '100% 儀器認證', delay: 0.2 },
    { icon: Shield, label: '明碼實價', desc: '絕無隱藏收費', delay: 0.3 },
    { icon: Star, label: '口碑保證', desc: '過萬真實案例', delay: 0.4 },
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-32 relative"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50 rounded-[60px] overflow-hidden -z-10">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <FloatingOrb className="w-96 h-96 bg-red-100/40 top-0 left-1/4" />
          <FloatingOrb className="w-64 h-64 bg-rose-100/30 bottom-0 right-1/4" />
        </motion.div>
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#C52B21 1px, transparent 1px), linear-gradient(90deg, #C52B21 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="py-20 px-8 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#C52B21] text-xs font-bold mb-8 shadow-sm border border-red-50"
        >
          <CheckCircle2 size={13} /> 專業 • 安全 • 有效
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
        >
          開啟您的{' '}
          <span className="relative inline-block">
            <span className="text-[#C52B21]">科學美學</span>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-[#C52B21]/30 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </span>{' '}
          之旅
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          我們相信，美麗不應是盲目的嘗試，而是基於數據與專業的精準修復。
          <br className="hidden md:block" />
          立即預約您的專屬皮膚分析。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
        >
          <Link
            href="/booking"
            className="group relative px-10 py-5 bg-[#C52B21] text-white font-bold rounded-2xl overflow-hidden flex items-center justify-center gap-2 shadow-xl shadow-red-200/50 hover:shadow-red-300/60 transition-shadow"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">立即預約諮詢</span>
            <motion.div
              className="relative"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </Link>

          <Link
            href="/treatments"
            className="px-10 py-5 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            瀏覽所有療程
          </Link>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-16">
          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustBadges.map((badge) => (
              <TrustBadge key={badge.label} {...badge} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default BlogCTA;
