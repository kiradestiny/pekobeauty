"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, TrendingUp, CalendarDays } from 'lucide-react';

// ─── Stat Item ────────────────────────────────────────────────────────────────
const StatItem = ({
  value,
  label,
  icon: Icon,
  delay,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center gap-3 group"
  >
    <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm flex-shrink-0">
      <Icon size={15} className="text-[#C52B21]" />
    </div>
    <div>
      <div className="text-base font-black text-gray-900 leading-none">{value}</div>
      <div className="text-[11px] text-gray-400 font-medium mt-0.5">{label}</div>
    </div>
  </motion.div>
);

// ─── Publication Date ─────────────────────────────────────────────────────────
const PublicationDate = () => {
  const [dateStr, setDateStr] = useState('');
  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString('zh-HK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);
  return <span>{dateStr}</span>;
};

// ─── Main BlogHero ─────────────────────────────────────────────────────────── 
const BlogHero = () => {
  return (
    <section className="pt-10 pb-14 md:pt-14 md:pb-20">

      {/* ── Publication Masthead Strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8 md:mb-10"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.18em] uppercase text-[#C52B21]">
            <span className="w-3 h-3 bg-[#C52B21] rounded-sm flex-shrink-0" />
            Peko Beauty Journal
          </span>
          <span className="h-3 w-px bg-gray-200" />
          <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase hidden sm:inline">
            Vol. 1 · Issue 12
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
          <CalendarDays size={11} />
          <PublicationDate />
        </div>
      </motion.div>

      {/* ── Thin rule ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="h-px bg-gray-200 mb-10 md:mb-12 origin-left"
      />

      {/* ── Main Headline ── */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end">

        {/* Left: Headline */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-[11px] font-black tracking-[0.2em] uppercase text-[#C52B21] mb-5"
          >
            — Science · Beauty · Wellness
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-950 leading-[0.95] tracking-tight mb-6"
          >
            THE{' '}
            <span className="text-[#C52B21]">SCIENCE</span>
            <br />
            OF BEAUTY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm"
          >
            由 Peko 編輯團隊撰寫的深度醫美解析，助您基於科學做出最精準的美麗決策。
          </motion.p>
        </div>

        {/* Right: Stats + Divider */}
        <div className="space-y-6">

          {/* Editorial quote */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="pl-5 border-l-4 border-[#C52B21]"
          >
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "美麗不應該是盲目的嘗試，而是基於數據與科學的精準修復。"
            </p>
            <p className="text-[11px] text-gray-400 font-bold mt-2 uppercase tracking-wider">
              — Peko Beauty Editorial Team
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-5 pt-2"
          >
            <StatItem value="5,000+" label="訂閱讀者" icon={Users} delay={0.45} />
            <StatItem value="50+" label="深度文章" icon={BookOpen} delay={0.5} />
            <StatItem value="4.9 / 5" label="讀者評分" icon={TrendingUp} delay={0.55} />
            <StatItem value="每週" label="定期更新" icon={CalendarDays} delay={0.6} />
          </motion.div>

          {/* Feature categories row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {[
              { label: 'IN-DEPTH', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
              { label: 'SCIENCE', color: 'bg-teal-50 text-teal-700 border-teal-100' },
              { label: 'REAL STORY', color: 'bg-red-50 text-[#C52B21] border-red-100' },
              { label: 'GUIDE', color: 'bg-amber-50 text-amber-700 border-amber-100' },
              { label: 'Q&A', color: 'bg-purple-50 text-purple-700 border-purple-100' },
            ].map((badge) => (
              <span
                key={badge.label}
                className={`text-[9px] font-black px-2.5 py-1 rounded border tracking-widest ${badge.color}`}
              >
                {badge.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom rule ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="h-px bg-gray-200 mt-10 md:mt-12 origin-left"
      />

    </section>
  );
};

export default BlogHero;
