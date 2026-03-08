"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

/* ─── Reveal ─── */
const Reveal = ({ children, delay = 0, dir = 'up' }: {
  children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'scale';
}) => {
  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants[dir]}
    >
      {children}
    </motion.div>
  );
};

/* ─── Comparison rows ─── */
const comparisons = [
  { point: '療程前評估', peko: 'VISIA 8 維度科學掃描，客觀量化', others: '主觀望診或問卷估算' },
  { point: '治療計劃', peko: '基於皮膚週期，完整個人化方案', others: '單次消費，缺乏延續性' },
  { point: '儀器驗證', peko: '原廠序列號即場掃碼核實', others: '難以確認真偽' },
  { point: '銷售方式', peko: '零壓力，效果說話，口碑驅動', others: '優惠誘導，疲勞轟炸' },
  { point: '治療師', peko: '全女班，10 年+ 原廠認證', others: '流轉率高，水準參差' },
  { point: '私隱保障', peko: '獨立診療空間，一對一跟進', others: '共用環境，缺乏隱私' },
  { point: '療程後跟進', peko: '48 小時主動聯絡，數據對比', others: '療程後普遍缺乏跟進' },
];

/* ─── Stat card ─── */
const StatCard = ({ value, label, sub, delay }: { value: string; label: string; sub: string; delay: number }) => (
  <Reveal delay={delay} dir="scale">
    <div className="bg-white rounded-[20px] border border-[#F0E4E2] p-7 shadow-[0_4px_20px_-6px_rgba(197,43,33,0.08)]">
      <div className="font-playfair text-4xl font-black text-[#C52B21] mb-1">{value}</div>
      <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#2C1810] mb-1">{label}</div>
      <div className="text-xs text-[#9B9B9B] font-light">{sub}</div>
    </div>
  </Reveal>
);

export default function AboutScience() {
  return (
    <section
      id="science"
      className="py-28 md:py-44 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDF8F5 0%, #FFFDF9 100%)' }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #E8D5D3, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* ── Part 1: Section header + stats ── */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-center mb-28">
          {/* Left */}
          <div>
            <Reveal dir="left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[1px] bg-[#C52B21]" />
                <span className="text-[9px] font-bold tracking-[0.6em] text-[#C52B21] uppercase">
                  The Science of Beauty
                </span>
              </div>
              <h2 className="font-playfair font-black text-[#2C1810] leading-[1.05] mb-7"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
                讓數據說話，<br />
                <em className="not-italic text-[#C52B21]">拒絕無效消費</em>
              </h2>
              <p className="text-[#5A4A44] text-base leading-[1.95] font-light mb-8">
                每一套 Peko Beauty 的專屬方案，均建基於深度的皮膚圖譜分析。
                我們追蹤療程前後的數據變化，確保每一次投資，都能轉化為肉眼可見的真實蛻變。
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#C52B21] text-white rounded-full font-bold text-[11px] tracking-[0.35em] uppercase shadow-[0_8px_28px_-6px_rgba(197,43,33,0.4)] hover:shadow-[0_14px_40px_-6px_rgba(197,43,33,0.5)] hover:-translate-y-0.5 transition-all"
              >
                免費 VISIA 分析
                <ArrowUpRight size={13} />
              </Link>
            </Reveal>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard value="8項" label="皮膚維度分析" sub="VISIA 第 7 代精準掃描" delay={0.1} />
            <StatCard value="100%" label="原廠正貨保證" sub="即場序列號核實" delay={0.18} />
            <StatCard value="0%" label="Hard Sell 比率" sub="效果是唯一推銷工具" delay={0.26} />
            <StatCard value="48h" label="療程後主動跟進" sub="數據對比，追蹤修復" delay={0.34} />
          </div>
        </div>

        {/* ── Part 2: VISIA feature strip ── */}
        <Reveal delay={0.1}>
          <div className="rounded-[32px] overflow-hidden border border-[#F0E4E2] mb-20 shadow-[0_8px_40px_-12px_rgba(197,43,33,0.08)]"
            style={{ background: 'linear-gradient(135deg, #FFF5F4 0%, #FFFDF9 100%)' }}>
            <div className="grid sm:grid-cols-8 divide-y sm:divide-y-0 sm:divide-x divide-[#F0E4E2]">
              {[
                { label: '色斑分佈', en: 'Spots' },
                { label: '紫外線損傷', en: 'UV Spots' },
                { label: '紅血絲', en: 'Brown Spots' },
                { label: '毛孔狀況', en: 'Pores' },
                { label: '皮膚紋理', en: 'Texture' },
                { label: '油分水分', en: 'Wrinkles' },
                { label: '膚色均勻度', en: 'Evenness' },
                { label: '皮下色素', en: 'Porphyrins' },
              ].map((item, i) => (
                <div key={i} className="text-center py-5 px-3">
                  <div className="text-[8px] font-bold tracking-[0.3em] text-[#C52B21] uppercase mb-1">{item.en}</div>
                  <div className="text-[11px] font-bold text-[#2C1810]">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#F0E4E2] px-8 py-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#C52B21] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#8B6B63] uppercase">
                VISIA 第 7 代 · 8 維度醫療級皮膚圖譜分析系統
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── Part 3: Comparison table ── */}
        <div>
          <Reveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#C52B21]/40" />
                <span className="text-[9px] font-bold tracking-[0.6em] text-[#C52B21] uppercase">The Difference</span>
                <div className="h-[1px] w-12 bg-[#C52B21]/40" />
              </div>
              <h3 className="font-playfair font-black text-[#2C1810] text-3xl md:text-4xl leading-tight">
                我們同其他美容院，<br />
                <em className="not-italic text-[#C52B21]">有咩不同？</em>
              </h3>
            </div>
          </Reveal>

          <Reveal delay={0.1} dir="scale">
            <div className="rounded-[28px] overflow-hidden border border-[#F0E4E2] shadow-[0_8px_50px_-12px_rgba(197,43,33,0.1)]">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_1.1fr_1.1fr] bg-[#FAFAF8]">
                <div className="p-4 pl-7 border-b border-r border-[#F0E4E2]">
                  <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-[#9B9B9B]">比較項目</span>
                </div>
                <div className="p-4 border-b border-r border-[#F0E4E2] bg-[#FFF5F4]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C52B21]" />
                    <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#C52B21]">Peko Beauty</span>
                  </div>
                </div>
                <div className="p-4 border-b border-[#F0E4E2]">
                  <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#9B9B9B]">一般美容院</span>
                </div>
              </div>

              {/* Data rows */}
              {comparisons.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`grid grid-cols-[1fr_1.1fr_1.1fr] border-b border-[#F0E4E2] last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFAF8]'}`}
                >
                  <div className="p-4 pl-7 border-r border-[#F0E4E2] flex items-center">
                    <span className="text-sm font-bold text-[#4A4A4A]">{row.point}</span>
                  </div>
                  <div className="p-4 border-r border-[#F0E4E2] bg-[#FFF5F4]/50 flex items-center gap-2.5">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#C52B21] flex items-center justify-center">
                      <Check size={11} strokeWidth={3} className="text-white" />
                    </div>
                    <span className="text-sm text-[#1A1A1A] font-medium leading-snug">{row.peko}</span>
                  </div>
                  <div className="p-4 flex items-center gap-2.5">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#F0E4E2] flex items-center justify-center">
                      <X size={11} strokeWidth={3} className="text-[#B0867F]" />
                    </div>
                    <span className="text-sm text-[#9B9B9B] font-light leading-snug">{row.others}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* CTA below table */}
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <p className="text-[#6B6B6B] text-sm font-light mb-5">
                親身體驗才是最好的比較。首次 VISIA 皮膚分析，讓數據告訴您答案。
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2.5 px-9 py-4 bg-[#2C1810] text-white rounded-full font-bold text-[11px] tracking-[0.35em] uppercase hover:bg-[#C52B21] transition-all duration-300 shadow-[0_8px_28px_-6px_rgba(44,24,16,0.3)] hover:shadow-[0_12px_40px_-6px_rgba(197,43,33,0.4)]"
              >
                立即預約免費分析
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
