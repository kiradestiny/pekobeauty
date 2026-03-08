"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone, Sparkles, Clock, Star } from 'lucide-react';
import Link from 'next/link';

export default function AboutCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const perks = [
    { icon: <Star size={14} />, text: '首次 VISIA 分析免費' },
    { icon: <Clock size={14} />, text: '治療師 1 對 1 跟進' },
    { icon: <Sparkles size={14} />, text: '無消費壓力' },
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      {/* Elegant rose gradient background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #2D0A08 0%, #5C1A14 30%, #8B2C22 60%, #6B1E17 80%, #1A0604 100%)',
          }}
        />
        {/* Soft texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {/* Luminous radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(197,43,33,0.25) 0%, transparent 65%)' }} />
        {/* Corner glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,147,106,0.12) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(197,43,33,0.1) 0%, transparent 70%)' }} />
      </motion.div>

      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C52B21]/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={14} className="text-[#E8C4B8]" />
            </motion.div>
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-white/50">
              開始您的肌膚蛻變之旅
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.88]">
            從根源出發<br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #F5B8A8 0%, #E88888 50%, #F5B8A8 100%)' }}>
              讓美麗延續
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/55 font-light mb-14 max-w-2xl mx-auto leading-relaxed">
            立即預約 VISIA 皮膚分析，讓資深專家為您制定專屬方案。<br className="hidden md:block" />
            數據說話，還您肌膚本來的質感。
          </p>

          {/* Perks row */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/8 border border-white/12"
              >
                <span className="text-[#F5B8A8]">{p.icon}</span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-white/60">{p.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href="/booking"
                className="inline-flex items-center gap-3 px-11 py-5 bg-white text-[#C52B21] rounded-full font-black text-xs tracking-[0.4em] uppercase shadow-[0_20px_50px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_28px_60px_-8px_rgba(0,0,0,0.4)] transition-all">
                立即預約專家諮詢
                <ArrowUpRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <a href="https://wa.me/85253353313" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-11 py-5 bg-transparent text-white border border-white/25 rounded-full font-bold text-xs tracking-[0.4em] uppercase hover:bg-white/10 hover:border-white/40 transition-all">
                <Phone size={15} />
                WhatsApp 諮詢
              </a>
            </motion.div>
          </div>

          {/* Location info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/6 border border-white/10"
          >
            <MapPin size={13} className="text-[#F5B8A8]" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/35">
              旺角朗豪坊辦公大樓 · Peko Beauty 旗艦中心
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
