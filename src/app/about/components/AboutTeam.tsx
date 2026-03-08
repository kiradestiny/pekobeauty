"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';

const Reveal = ({ children, delay = 0, dir = "up" }: {
  children: React.ReactNode; delay?: number; dir?: "up" | "left" | "right";
}) => {
  const map = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} variants={map[dir]}>
      {children}
    </motion.div>
  );
};

const credentials = [
  { title: "國際專業認證", desc: "100% 治療師持有國際專業美容及醫美認證，技術水準達國際標準。" },
  { title: "原廠技術培訓", desc: "定期接受原廠技術升級培訓，掌握全球最新儀器操作標準。" },
  { title: "極致私隱守護", desc: "全女班一對一服務，獨立私密房間，提供最安心的療程空間。" },
  { title: "絕無 Hard Sell", desc: "效果為本，明碼實價。不靠強迫推銷，只靠口碑與數據留住客戶。" },
];

export default function AboutTeam() {
  return (
    <section className="py-28 md:py-44 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FDF8F5 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left */}
          <div>
            <Reveal>
              <span className="text-[10px] font-bold tracking-[0.6em] text-[#C52B21] uppercase block mb-6">Expert Team</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-8 leading-[0.9] tracking-tighter">
                資深專家領軍<br />
                <span className="italic font-serif font-normal text-[#C52B21]">全女班頂尖團隊</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#6B6B6B] text-base mb-10 leading-relaxed font-light">
                我們的治療師團隊平均擁有超過{' '}
                <span className="text-[#1A1A1A] font-bold">10 年以上</span>{' '}
                的醫美臨床經驗，均通過國際原廠的嚴格考核與技術認證。
              </p>
            </Reveal>

            <div className="space-y-6">
              {credentials.map((item, i) => (
                <Reveal key={i} delay={0.3 + i * 0.08}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex gap-5 group"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-2xl bg-[#FFF5F4] border border-[#FDDBD8] flex items-center justify-center text-[#C52B21] group-hover:bg-[#C52B21] group-hover:text-white transition-all duration-300">
                      <Check size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-[#1A1A1A] mb-1 tracking-tight">{item.title}</h4>
                        <p className="text-[#6B6B6B] text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: Image + badge */}
          <Reveal dir="right">
            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] relative group">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                  alt="Peko Beauty 專業團隊"
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <p className="text-2xl font-black mb-3 tracking-tight">專業 · 細膩 · 誠信</p>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    每一位治療師都是您的專屬皮膚管理專家，陪伴您見證肌膚的蛻變。
                  </p>
                </div>
              </div>

              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-8 -left-8 bg-white p-7 rounded-[28px] shadow-[0_8px_40px_-8px_rgba(197,43,33,0.15)] border border-[#F0E4E2] hidden md:block"
              >
                <div className="flex items-center gap-4 mb-4">
                  <ShieldCheck className="text-[#C52B21]" size={28} />
                  <div>
                    <p className="text-[9px] font-bold text-[#9B9B9B] uppercase tracking-widest">認證機構</p>
                    <p className="text-base font-black text-[#1A1A1A]">官方指定合作中心</p>
                  </div>
                </div>
                <div className="flex gap-4 opacity-50">
                  <span className="text-xs font-black text-[#6B4A47]">BTL</span>
                  <span className="text-xs font-black text-[#6B4A47]">LUTRONIC</span>
                  <span className="text-xs font-black text-[#6B4A47]">VENUS</span>
                </div>
              </motion.div>

              {/* Floating stat */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-[#C52B21] text-white p-6 rounded-[24px] shadow-xl hidden md:block"
              >
                <p className="text-3xl font-black">10+</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-white/70 mt-1">年臨床經驗</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx global>{`
        .font-serif { font-family: 'Georgia', 'Times New Roman', serif; }
      `}</style>
    </section>
  );
}
