"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, UserCheck, Calendar, Activity, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const cases = [
  {
    category: "凹凸洞 & 肌底重建",
    title: "多年頑固凹凸洞顯著平滑",
    treatment: "Sylfirm X 矽谷電波",
    duration: "4 次療程",
    data: "紋理平滑度提升 68%",
    description: "針對車廂型凹凸洞，透過 PW 模式修復受損基底膜，令皮膚自我填補凹陷位。",
    imageBefore: "https://images.unsplash.com/photo-1596755389378-7d0d244b611e?q=80&w=800&auto=format&fit=crop",
    imageAfter: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
    highlight: "修復基底"
  },
  {
    category: "色斑 & 泛紅改善",
    title: "荷爾蒙斑與微絲血管退紅",
    treatment: "Hollywood Spectra + VISIA 追蹤",
    duration: "6 次療程",
    data: "底層色斑指數下降 42%",
    description: "利用 Gold Toning 模式針對性處理異常血管，同時減少黑色素活躍度，解決反黑問題。",
    imageBefore: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop",
    imageAfter: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800&auto=format&fit=crop",
    highlight: "精準去斑"
  },
  {
    category: "輪廓提升 & 緊緻",
    title: "下顎線重塑與蘋果肌提拉",
    treatment: "BTL Exion™ 膠原槍",
    duration: "3 次療程",
    data: "透明質酸自生 +224%",
    description: "AI 智能控制能量，精準加熱真皮層，實現非入侵性的即時飽滿感與長期緊緻。",
    imageBefore: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    imageAfter: "https://images.unsplash.com/photo-1515377666659-817276738c67?q=80&w=800&auto=format&fit=crop",
    highlight: "膠原自生"
  }
];

const ComparisonSlider = ({ before, after }: { before: string; after: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && e.type !== 'touchmove') return;
    
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-80 w-full overflow-hidden cursor-ew-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After Image (Base) */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-gray-300 rounded-full" />
            <div className="w-0.5 h-3 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-20 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
        BEFORE
      </div>
      <div className="absolute bottom-4 right-4 z-20 bg-[#C52B21]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
        AFTER
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const brandRed = "#C52B21";

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#C52B21] text-xs font-bold tracking-widest uppercase mb-6"
            >
              <Sparkles size={14} />
              Success Stories
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight"
            >
              真實蛻變 · <span className="font-bold text-[#C52B21]">數據見證</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-gray-500 text-lg font-light leading-relaxed"
            >
              所有案例均為 Peko Beauty 客戶真實效果。我們透過 VISIA 分析儀紀錄每一步的進度，
              確保療程成效可視化、可量化，讓您的每一分投入都清晰可見。
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex gap-8 bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-slate-100 shadow-inner"
          >
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-gray-900">5,000+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold">滿意客戶</div>
            </div>
            <div className="w-px h-12 bg-slate-200 self-center" />
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-[#C52B21]">83%</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold">用家親證有效</div>
            </div>
          </motion.div>
        </div>

        {/* Case Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-red-900/5 transition-all duration-500 group"
              style={{ 
                boxShadow: 'inset 0 0 20px rgba(226, 232, 240, 0.2)'
              }}
            >
              {/* Image Compare Slider */}
              <ComparisonSlider before={item.imageBefore} after={item.imageAfter} />

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[10px] font-bold tracking-widest text-red-400 uppercase">{item.category}</div>
                  <div className="px-3 py-1 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 border border-slate-100">
                    {item.highlight}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-[#C52B21] transition-colors">{item.title}</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                      <Calendar size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">療程週期</span>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{item.duration}</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-2xl bg-red-50 border border-red-100">
                    <div className="flex items-center gap-1.5 text-red-400 mb-1">
                      <Activity size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">改善指標</span>
                    </div>
                    <span className="text-sm font-bold text-[#C52B21]">{item.data}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-8 font-light">
                  {item.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                      <ShieldCheck size={14} className="text-green-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">療程：{item.treatment}</span>
                  </div>
                  
                  <Link 
                    href="/booking"
                    className="w-full py-4 rounded-2xl bg-gray-900 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#C52B21] transition-all duration-300 group/btn"
                  >
                    獲取同款方案
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Call */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative rounded-[3rem] bg-red-50 p-12 overflow-hidden border border-red-100"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/50 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">想看看您的皮膚在 4 週後的轉變嗎？</h3>
              <p className="text-gray-500 font-light">立即預約 VISIA 皮膚分析，由專業團隊為您制定專屬肌源解碼方案。</p>
            </div>
            <Link 
              href="/booking"
              className="px-10 py-5 rounded-full bg-[#C52B21] text-white font-bold text-lg shadow-xl shadow-red-900/20 hover:scale-105 transition-transform flex items-center gap-3"
            >
              立即預約分析
              <TrendingUp size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
