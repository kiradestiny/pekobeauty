"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Microscope, UserRoundCheck, Gem, ArrowRight } from 'lucide-react';

const Reveal = ({ children, delay = 0, dir = "up" }: {
  children: React.ReactNode; delay?: number; dir?: "up" | "scale";
}) => {
  const map = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} variants={map[dir]}>
      {children}
    </motion.div>
  );
};

const FlipCard = ({ front, back }: { front: React.ReactNode; back: React.ReactNode }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="relative w-full h-full cursor-pointer" style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }} className="relative w-full h-full">
        <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0">{front}</div>
        <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} className="absolute inset-0">{back}</div>
      </motion.div>
    </div>
  );
};

const dna = [
  {
    icon: <Microscope size={34} strokeWidth={1.2} />, color: "#C52B21",
    title: "肌源解碼方案", sub: "AI-Powered Analysis",
    desc: "獨家 AI 皮膚分析系統，結合 VISIA 第 7 代數據，為客人配對多款國際儀器，制定個人化治療方案。",
    detail: "透過 VISIA 影像分析，精準識別皮膚底層問題，包括紫外線損傷、毛孔狀況、色素分佈等 8 大維度，確保每個療程都有科學依據。",
    points: ["8 大維度皮膚分析", "AI 配對最佳療程", "個人化治療計劃"],
  },
  {
    icon: <ShieldCheck size={34} strokeWidth={1.2} />, color: "#8B5CF6",
    title: "拒絕單次無效消費", sub: "Result-Oriented",
    desc: "強調皮膚修復週期，提供具延續性的療程組合，確保治療效果持久，反對盲目單次消費。",
    detail: "皮膚修復需要時間與科學方法。每個療程計劃都基於皮膚週期設計，讓效果層層遞進，而非一次性的表面修飾。",
    points: ["基於皮膚週期設計", "效果層層遞進", "拒絕盲目推銷"],
  },
  {
    icon: <Gem size={34} strokeWidth={1.2} />, color: "#F59E0B",
    title: "原廠正貨保證", sub: "100% Authentic",
    desc: "所有儀器及探頭均為原廠認證，絕不使用充線或山寨貨，確保安全與效果。",
    detail: "每台儀器均附有原廠序列號及認證文件，客人可現場掃碼核實。我們是 BTL、Lutronic、Venus 等品牌的官方指定合作中心。",
    points: ["原廠序列號可核實", "BTL 官方指定中心", "Lutronic 認證合作"],
  },
  {
    icon: <UserRoundCheck size={34} strokeWidth={1.2} />, color: "#10B981",
    title: "高私隱全女班", sub: "All-Female Team",
    desc: "設有獨立房間，私密療程由全女班專業團隊一對一跟進，給予您最安心的空間。",
    detail: "全女班治療師均持有國際認證，平均擁有超過 10 年臨床經驗，讓您在最舒適的環境中完成療程。",
    points: ["獨立私密房間", "全女班治療師", "10 年+ 臨床經驗"],
  },
];

export default function AboutDNA() {
  return (
    <section id="brand-dna" className="py-28 md:py-44 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FDF8F5 100%)' }}>
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #C52B21 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <Reveal>
            <span className="text-[10px] font-bold tracking-[0.6em] text-[#C52B21] uppercase block mb-5">Brand DNA</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-[0.9]">四大核心承諾</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-[#9B9B9B] text-base font-light max-w-xl mx-auto">
              懸停卡片，探索我們每項承諾背後的深層理念
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dna.map((d, i) => (
            <Reveal key={i} delay={i * 0.1} dir="scale">
              <div className="h-[360px]">
                <FlipCard
                  front={
                    <div className="h-full p-8 rounded-[32px] bg-white border border-[#F0E4E2] flex flex-col justify-between group hover:shadow-[0_12px_40px_-8px_rgba(197,43,33,0.1)] transition-shadow duration-500">
                      <div>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                          style={{ background: `${d.color}18`, color: d.color }}>
                          {d.icon}
                        </div>
                        <p className="text-[9px] font-bold tracking-[0.4em] uppercase mb-3" style={{ color: d.color }}>{d.sub}</p>
                        <h3 className="text-xl font-black text-[#1A1A1A] tracking-tight mb-4">{d.title}</h3>
                        <p className="text-[#6B6B6B] text-sm leading-relaxed font-light">{d.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold" style={{ color: d.color }}>
                        <span>了解更多</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  }
                  back={
                    <div className="h-full p-8 rounded-[32px] flex flex-col justify-between text-white"
                      style={{ background: `linear-gradient(135deg, ${d.color}ee 0%, ${d.color}99 100%)` }}>
                      <div>
                        <p className="text-[9px] font-bold tracking-[0.4em] uppercase mb-4 text-white/60">{d.sub}</p>
                        <h3 className="text-xl font-black tracking-tight mb-4">{d.title}</h3>
                        <p className="text-white/80 text-sm leading-relaxed font-light mb-6">{d.detail}</p>
                      </div>
                      <ul className="space-y-2">
                        {d.points.map((pt, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs font-bold text-white/90">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
