"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, Target, Eye, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const tech = [
  {
    name: "Sylfirm X", cat: "矽谷電波", color: "#C52B21",
    badge: "凹凸洞終結者", icon: <Zap size={20} />,
    desc: "全球首創雙波微針射頻，修復基底膜，終結凹凸洞",
    features: ["雙波模式：連續波 + 脈衝波", "修復受損基底膜", "針對荷爾蒙斑及玫瑰痤瘡", "無需敷麻，舒適度高"],
    link: "/treatments/sylfirm-x",
    stat: "98%", statLabel: "客戶滿意度",
  },
  {
    name: "BTL Exion™", cat: "AI 膠原自生", color: "#8B5CF6",
    badge: "無痛提升", icon: <Activity size={20} />,
    desc: "全球唯一能自然激生透明質酸的技術，無痛提升輪廓",
    features: ["單極射頻 + 靶向超聲波", "自然激生透明質酸", "無痛無需敷麻", "即時見效，持久改善"],
    link: "/treatments/btl-exion",
    stat: "3x", statLabel: "透明質酸激增",
  },
  {
    name: "Ulfit HIFU", cat: "無痛 V 面拉提", color: "#0EA5E9",
    badge: "緊緻輪廓", icon: <Target size={20} />,
    desc: "第 4 代擴散式加熱技術，獨有圓形探頭靈活修飾輪廓",
    features: ["第 4 代擴散式加熱", "獨有圓形探頭設計", "無痛無需敷麻", "即時 V 面效果"],
    link: "/treatments/ulfit-hifu",
    stat: "1次", statLabel: "即見明顯效果",
  },
  {
    name: "VISIA 第 7 代", cat: "皮膚分析系統", color: "#10B981",
    badge: "科學診斷", icon: <Eye size={20} />,
    desc: "8 大維度精準分析，數據化美肌，讓效果清晰可見",
    features: ["8 大皮膚維度分析", "紫外線損傷偵測", "色素分佈精準識別", "建立個人皮膚檔案"],
    link: "/treatments",
    stat: "8項", statLabel: "皮膚維度分析",
  },
];

export default function AboutTech() {
  const [active, setActive] = useState(0);
  const current = tech[active];

  return (
    <section className="py-28 md:py-44 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDF8F5 0%, #FFFFFF 100%)' }}>
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #C52B21 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.6em] text-[#C52B21] uppercase block mb-6">
            Technology
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-[0.9]">
            頂尖醫美科技
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-[#9B9B9B] text-base font-light max-w-xl mx-auto">
            點擊探索每款儀器的獨特優勢
          </motion.p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tech.map((t, i) => (
            <motion.button key={i} onClick={() => setActive(i)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 overflow-hidden ${active === i ? 'text-white shadow-lg' : 'text-[#6B6B6B] bg-[#F5EDE9] hover:bg-[#EDD9D4]'}`}
              style={active === i ? { background: t.color, boxShadow: `0 10px 30px -5px ${t.color}60` } : {}}>
              <span className="relative z-10 flex items-center gap-2">
                <span style={{ color: active === i ? 'white' : t.color }}>{t.icon}</span>
                {t.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                  style={{ background: current.color }}>
                  {current.icon}
                </div>
                <div>
                  <span className="text-[9px] font-bold tracking-[0.4em] uppercase block mb-1" style={{ color: current.color }}>
                    {current.cat}
                  </span>
                  <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tight">{current.name}</h3>
                </div>
              </div>

              <p className="text-[#6B6B6B] text-lg leading-relaxed font-light mb-8">{current.desc}</p>

              <ul className="space-y-3 mb-10">
                {current.features.map((f, j) => (
                  <motion.li key={j}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.08 }}
                    className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${current.color}18` }}>
                      <Check size={12} style={{ color: current.color }} />
                    </div>
                    <span className="text-[#4A4A4A] text-sm font-medium">{f}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href={current.link}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-sm font-bold transition-all hover:scale-105"
                style={{ background: current.color, boxShadow: `0 15px 40px -8px ${current.color}50` }}>
                了解詳情 <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: Visual stat card */}
            <div className="relative">
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -3 }}
                style={{
                  transformStyle: "preserve-3d",
                  background: `linear-gradient(135deg, ${current.color}15 0%, ${current.color}05 100%)`,
                  border: `1px solid ${current.color}20`
                }}
                className="relative p-12 rounded-[40px] overflow-hidden"
              >
                {/* Big stat */}
                <div className="text-center mb-10">
                  <div className="text-7xl md:text-8xl font-black tracking-tighter mb-3" style={{ color: current.color }}>
                    {current.stat}
                  </div>
                  <p className="text-[#9B9B9B] text-sm font-bold tracking-widest uppercase">{current.statLabel}</p>
                </div>

                {/* Badge */}
                <div className="flex justify-center">
                  <span className="px-6 py-2.5 rounded-full text-white text-xs font-black tracking-widest uppercase"
                    style={{ background: current.color }}>
                    {current.badge}
                  </span>
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-10"
                  style={{ background: current.color }} />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-5"
                  style={{ background: current.color }} />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 hidden md:block"
              >
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">原廠認證</p>
                <p className="text-sm font-black text-gray-900">官方指定中心</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
