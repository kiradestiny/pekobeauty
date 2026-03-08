"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

/* ─── Reveal ─── */
const Reveal = ({ children, delay = 0, dir = 'up' }: {
  children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'right';
}) => {
  const variants = {
    up: { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants[dir]}
    >
      {children}
    </motion.div>
  );
};

export default function AboutFounderLetter() {
  return (
    <section
      id="founder-letter"
      className="py-28 md:py-44 relative overflow-hidden bg-white"
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #C52B21 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #E8D5D3, transparent)' }} />

      {/* Large quotation mark decoration */}
      <div className="absolute -top-4 left-[clamp(24px,8vw,120px)] font-playfair text-[18rem] font-black text-[#C52B21]/[0.04] leading-none select-none pointer-events-none">
        "
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-[5fr_4fr] gap-16 lg:gap-24 items-center">

          {/* Left: Letter content */}
          <div>
            <Reveal dir="left">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-[1px] bg-[#C52B21]" />
                <span className="text-[9px] font-bold tracking-[0.6em] text-[#C52B21] uppercase">
                  A Letter From The Team
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} dir="left">
              <h2 className="font-playfair font-black text-[#2C1810] leading-[1.1] mb-10"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                致每一位<br />
                <em className="not-italic text-[#C52B21]">追求真實美</em>的您
              </h2>
            </Reveal>

            {/* Letter body */}
            <div className="space-y-6 mb-12">
              <Reveal delay={0.18} dir="left">
                <div className="relative pl-6 border-l-2 border-[#F0E4E2] hover:border-[#C52B21] transition-colors duration-500">
                  <Quote size={16} className="text-[#C52B21]/40 mb-3" />
                  <p className="text-[#5A4A44] text-base md:text-lg leading-[2] font-light">
                    我們集合了平均擁有 <span className="text-[#2C1810] font-semibold">10 年以上經驗</span>的資深全女班團隊，
                    選擇在 2025 年這個時間點重新出發，
                    是因為我們想證明：
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.26} dir="left">
                <div className="py-4 pl-6">
                  <p className="font-playfair text-[#2C1810] leading-snug"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}>
                    醫學美容可以很<span className="text-[#C52B21]">專業、很科學</span>，<br />
                    同時也可以很有<span className="text-[#C52B21]">溫度、很誠實</span>。
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.34} dir="left">
                <div className="pl-6 border-l-2 border-[#F0E4E2]">
                  <p className="text-[#5A4A44] text-base leading-[2] font-light">
                    歡迎來到 Peko Beauty，體驗醫美應有的模樣。
                    我們在這裡，陪伴您見證肌膚最真實的蛻變。
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Signature */}
            <Reveal delay={0.44} dir="left">
              <div className="flex items-center gap-6">
                <div className="h-[1px] w-12 bg-[#C52B21]/40" />
                <div>
                  {/* Handwriting-style signature using Playfair italic */}
                  <p className="font-playfair italic text-[#C52B21] text-xl mb-0.5">
                    Peko Beauty 管理團隊
                  </p>
                  <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#9B9B9B]">
                    Professional Management Team · 2025
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Image panel */}
          <Reveal delay={0.12} dir="right">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-[36px] overflow-hidden aspect-[4/5] relative shadow-[0_24px_80px_-16px_rgba(44,24,16,0.15)]">
                <img
                  src="/images/peko-beauty-reception-desk-mong-kok.jpg"
                  alt="Peko Beauty 專業診療環境"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800';
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.55) 0%, rgba(44,24,16,0.05) 50%, transparent 100%)' }} />

                {/* Bottom text — mobile only (desktop uses floating badge instead) */}
                <div className="md:hidden absolute bottom-7 left-8 right-8">
                  <p className="font-playfair text-white text-base font-bold mb-3 drop-shadow">專業 · 細膩 · 誠信</p>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                    <p className="text-white/80 text-[10px] font-semibold tracking-[0.18em] whitespace-nowrap">旺角朗豪坊辦公大樓 · 全私密診療空間</p>
                  </div>
                </div>
              </div>

              {/* Floating credential badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-[22px] p-6 shadow-[0_12px_48px_-8px_rgba(197,43,33,0.18)] border border-[#F0E4E2] hidden md:block"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', type: 'tween' }}
                >
                  <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#9B9B9B] mb-2">官方認可</p>
                  <p className="text-sm font-black text-[#2C1810] mb-3">原廠指定合作中心</p>
                  <div className="flex gap-3 text-[10px] font-black text-[#8B6B63]/60 tracking-widest">
                    <span>BTL</span>
                    <span>·</span>
                    <span>LUTRONIC</span>
                    <span>·</span>
                    <span>VENUS</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute -top-5 -right-5 bg-[#C52B21] text-white rounded-[18px] p-5 shadow-[0_8px_30px_-4px_rgba(197,43,33,0.45)] hidden md:block"
              >
                <p className="font-playfair text-2xl font-black leading-none">10+</p>
                <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/70 mt-1">年平均經驗</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
