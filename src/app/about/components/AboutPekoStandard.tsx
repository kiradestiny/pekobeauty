"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, ShieldCheck, Package, Heart } from 'lucide-react';

const standards = [
  {
    num: '01',
    icon: <LineChart size={24} strokeWidth={1.5} />,
    en: 'Precision & Data-Driven',
    title: '精準醫療，數據驅動',
    color: '#C52B21',
    bg: '#FFF5F4',
    border: '#FDDBD8',
    body: '摒棄傳統「望診」或主觀推銷。我們引入醫療級 VISIA 8 維度科學分析，以 AI 數據為唯一指引，為每一吋肌膚制定精準、可追蹤的修復方案。',
    points: ['VISIA 第 7 代 8 維度皮膚掃描', 'AI 配對最優化療程組合', '療程前後數據對比追蹤'],
  },
  {
    num: '02',
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    en: 'Absolute Transparency & Ethics',
    title: '絕對透明，零壓營商',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    body: '我們推崇「零壓美學」。承諾絕不採取任何疲勞轟炸或隱藏收費的銷售手段。我們的業績，完全交由真實的療程效果與口碑來驅動。',
    points: ['明碼實價，無隱藏收費', '絕無追加推銷或疲勞轟炸', '效果與口碑是唯一業績指標'],
  },
  {
    num: '03',
    icon: <Package size={24} strokeWidth={1.5} />,
    en: 'Strict Supply Chain & Authenticity',
    title: '嚴格供應鏈，原廠溯源',
    color: '#B8936A',
    bg: '#FBF5EE',
    border: '#E8D5B7',
    body: '視安全為企業生命線。全線儀器及探頭均來自全球頂尖醫美供應商。我們實行「即場核實」制度，確保每一發能量都源自 100% 原廠正貨，杜絕任何安全隱患。',
    points: ['原廠序列號即場掃碼核實', 'BTL / Lutronic / Venus 官方認可', '絕不使用充線或翻新探頭'],
  },
  {
    num: '04',
    icon: <Heart size={24} strokeWidth={1.5} />,
    en: 'High Privacy & Human-Centric',
    title: '尊尚私隱，以人為本',
    color: '#059669',
    bg: '#F0FDF4',
    border: '#A7F3D0',
    body: '設立高隱私度的全女班專業團隊與獨立診療空間。我們提供的不僅是療程，更是一個讓您安心傾訴、徹底放鬆的專屬淨土。',
    points: ['全女班治療師，10 年+ 認證經驗', '獨立診療房間，絕對私隱', '一對一跟進，零旁人打擾'],
  },
];

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

export default function AboutPekoStandard() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="peko-standard"
      className="py-28 md:py-44 relative overflow-hidden bg-white"
    >
      {/* Subtle warm tint */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(197,43,33,0.03) 0%, transparent 50%)' }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-end mb-24">
          <Reveal dir="left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[1px] bg-[#C52B21]" />
                <span className="text-[9px] font-bold tracking-[0.6em] text-[#C52B21] uppercase">
                  Corporate Standards
                </span>
              </div>
              <h2 className="font-playfair font-black text-[#2C1810] leading-[1.05]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}>
                Peko<br />
                企業治理基準
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <p className="text-[#5A4A44] text-base md:text-lg leading-[1.9] font-light mb-6">
                四大堅守，是 Peko Beauty 對每一位客戶的莊嚴承諾，亦是我們衡量自身行為的最高準則。
              </p>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-[#C52B21]/40" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#B0887E] uppercase">Four Pillars of Commitment</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Standards grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {standards.map((s, i) => (
            <Reveal key={i} delay={i * 0.09} dir="scale">
              <motion.div
                onHoverStart={() => setActive(i)}
                onHoverEnd={() => setActive(null)}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="group relative rounded-[28px] p-8 flex flex-col h-full cursor-default border transition-all duration-400"
                style={{
                  background: active === i ? s.bg : '#FAFAF8',
                  borderColor: active === i ? s.border : '#EDE4E0',
                  boxShadow: active === i ? `0 16px 48px -12px ${s.color}20` : 'none',
                }}
              >
                {/* Number */}
                <div className="font-playfair text-[3.5rem] font-black leading-none mb-4 transition-colors duration-300"
                  style={{ color: active === i ? s.color : '#E0D8D4', opacity: active === i ? 1 : 0.7 }}>
                  {s.num}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{
                    background: active === i ? `${s.color}18` : '#F0E8E4',
                    color: active === i ? s.color : '#8B6B63',
                  }}>
                  {s.icon}
                </div>

                {/* EN label */}
                <p className="text-[9px] font-bold tracking-[0.4em] uppercase mb-3 transition-colors duration-300"
                  style={{ color: active === i ? s.color : '#B0887E' }}>
                  {s.en}
                </p>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-[#2C1810] leading-snug mb-4">
                  {s.title}
                </h3>

                {/* Body */}
                <p className="text-[#6B6B6B] text-sm leading-relaxed font-light flex-1 mb-6">
                  {s.body}
                </p>

                {/* Points */}
                <AnimatePresence>
                  {active === i && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden space-y-2"
                    >
                      {s.points.map((pt, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.07 }}
                          className="flex items-center gap-2 text-xs font-medium"
                          style={{ color: s.color }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
                          {pt}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* Bottom accent line */}
                <motion.div
                  animate={{ scaleX: active === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full origin-left"
                  style={{ background: s.color }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
