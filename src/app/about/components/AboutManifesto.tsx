"use client";
import React from 'react';
import { motion } from 'framer-motion';

/* ─── Paragraph reveal ─── */
const ParaReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function AboutManifesto() {
  return (
    <section
      id="manifesto"
      className="relative py-32 md:py-52 overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #2C1810 0%, #1A0A06 50%, #2C1810 100%)' }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(197,43,33,0.15) 0%, transparent 65%)' }} />

      {/* Vertical rule - left */}
      <div className="absolute left-[clamp(24px,6vw,100px)] top-0 bottom-0 w-[1px] opacity-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #C52B21 20%, #C52B21 80%, transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-20 lg:gap-32">

          {/* Left: Section label (sticky on desktop) */}
          <div className="lg:sticky lg:top-40 lg:self-start">
            <ParaReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[1px] bg-[#C52B21]" />
                <span className="text-[9px] font-bold tracking-[0.6em] text-[#C52B21] uppercase">
                  Brand Manifesto
                </span>
              </div>
              <h2 className="font-playfair text-white leading-tight mb-3"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontStyle: 'italic' }}>
                誕生於<br />對純粹的<br />渴求
              </h2>
              <p className="text-white/30 text-xs font-light leading-relaxed mt-4">
                Born out of the<br />desire for purity
              </p>
            </ParaReveal>
          </div>

          {/* Right: Manifesto body */}
          <div className="space-y-10">
            {/* Opening quote */}
            <ParaReveal delay={0.1}>
              <div className="relative pl-8 border-l-2 border-[#C52B21]/50">
                <p className="font-playfair text-white/90 leading-relaxed"
                  style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)' }}>
                  「在瞬息萬變的醫美市場中，我們看見了太多的過度推銷、資訊不對稱與盲目消費。」
                </p>
              </div>
            </ParaReveal>

            {/* Para 1 */}
            <ParaReveal delay={0.18}>
              <p className="text-white/60 text-base md:text-lg leading-[2] font-light">
                2025 年，<span className="text-white font-medium">Peko Beauty 正式成立</span>。
                我們沒有傳統醫美行業的舊包袱，只有一個清晰而堅定的信念：
              </p>
            </ParaReveal>

            {/* Core belief - pullout */}
            <ParaReveal delay={0.26}>
              <div className="py-8 px-0">
                <p className="font-playfair text-white leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)' }}>
                  把顧客的皮膚健康與心理感受，
                  <span className="text-[#E8A090] italic"> 永遠放在生意之前。</span>
                </p>
              </div>
            </ParaReveal>

            {/* Para 2 */}
            <ParaReveal delay={0.34}>
              <p className="text-white/60 text-base md:text-lg leading-[2] font-light">
                我們深信，真正的美麗必須建立在<span className="text-white font-medium">科學數據</span>與
                <span className="text-white font-medium">身心放鬆</span>的基礎上。
                Peko Beauty 不是一間普通的美容院，
              </p>
            </ParaReveal>

            {/* Identity statement */}
            <ParaReveal delay={0.42}>
              <div className="inline-flex items-start gap-4">
                <div className="mt-2 w-8 h-[1px] bg-[#C52B21] shrink-0" />
                <p className="font-playfair text-white text-xl md:text-2xl leading-snug">
                  我們是您專屬的<br />
                  <em className="text-[#E8A090]">「肌膚健康管理智庫」</em>
                </p>
              </div>
            </ParaReveal>

            {/* Divider */}
            <ParaReveal delay={0.5}>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex-1 h-[1px] bg-white/10" />
                <span className="text-white/20 text-xs tracking-widest">Peko Beauty · 2025</span>
                <div className="flex-1 h-[1px] bg-white/10" />
              </div>
            </ParaReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
