"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Layers, Scan, Cpu } from 'lucide-react';

const timeline = [
  {
    year: "2018", title: "品牌創立", icon: <Sparkles size={16} />, color: "#C52B21", lightBg: "#FFF5F4", border: "#FDDBD8",
    desc: "Peko Beauty 於旺角成立，以「始於肌源，忠於完美」為核心理念，致力提供專業醫學美容服務。",
  },
  {
    year: "2019", title: "技術引進", icon: <Cpu size={16} />, color: "#8B5CF6", lightBg: "#F5F3FF", border: "#DDD6FE",
    desc: "率先引進多款國際頂尖醫美儀器，成為香港首批獲得原廠官方認證的醫美中心之一。",
  },
  {
    year: "2020", title: "VISIA 數據化", icon: <Scan size={16} />, color: "#0284C7", lightBg: "#F0F9FF", border: "#BAE6FD",
    desc: "引進第 7 代 VISIA 皮膚分析系統，開啟數據化美肌時代，為每位客戶建立專屬皮膚檔案。",
  },
  {
    year: "2022", title: "旗艦店升級", icon: <Layers size={16} />, color: "#059669", lightBg: "#F0FDF4", border: "#A7F3D0",
    desc: "進駐朗豪坊辦公大樓，打造高私隱、全女班專業環境，提供更卓越的沉浸式美容體驗。",
  },
  {
    year: "2024", title: "業界領先", icon: <Award size={16} />, color: "#B8936A", lightBg: "#FBF5EE", border: "#E8D5B7",
    desc: "榮獲 BTL、Lutronic、Venus 等多項國際原廠頒發「官方指定合作中心」認證，確立業界領導地位。",
  },
];

export default function AboutTimeline() {
  return (
    <section className="py-28 md:py-44 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFDF9 0%, #FDF5F2 100%)' }}>

      {/* Decorative */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #C52B21 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8D5D3] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.6em] text-[#C52B21] uppercase block mb-5">
            Our Journey
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-[0.9] mb-5">
            品牌發展歷程
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6B6B6B] text-base font-light max-w-lg mx-auto">
            六年深耕，一步一腳印，讓數據與口碑成為最好的見證
          </motion.p>
        </div>

        {/* Desktop: alternating timeline */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-4 w-[1.5px]"
            style={{ background: 'linear-gradient(to bottom, #C52B21, #E8D5D3 60%, transparent)' }} />

          <div className="space-y-16">
            {timeline.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center gap-0 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content card */}
                <div className={`flex-1 ${i % 2 === 0 ? 'pr-14 text-right' : 'pl-14 text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="inline-block p-8 rounded-[28px] transition-all duration-400 group relative overflow-hidden shadow-[0_4px_24px_-6px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_40px_-8px_rgba(197,43,33,0.12)]"
                    style={{ background: item.lightBg, border: `1.5px solid ${item.border}` }}
                  >
                    {/* Year badge */}
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase block mb-3"
                      style={{ color: item.color }}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-black text-[#1A1A1A] tracking-tight mb-3">{item.title}</h3>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed font-light max-w-xs"
                      style={{ marginLeft: i % 2 === 0 ? 'auto' : 0 }}>
                      {item.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    className="w-13 h-13 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`, boxShadow: `0 4px 20px ${item.color}50` }}
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Empty side */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden space-y-5">
          {timeline.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md"
                  style={{ background: item.color }}>
                  {item.icon}
                </div>
                {i < timeline.length - 1 && (
                  <div className="w-[1.5px] flex-1 mt-3" style={{ background: `linear-gradient(to bottom, ${item.color}50, transparent)` }} />
                )}
              </div>
              <div className="pb-8 flex-1">
                <span className="text-[9px] font-black tracking-[0.45em] uppercase block mb-2" style={{ color: item.color }}>{item.year}</span>
                <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight mb-2">{item.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
