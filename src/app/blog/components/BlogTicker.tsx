"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rss, ArrowRight } from 'lucide-react';

const tickerItems = [
  { label: 'IN-DEPTH', text: 'Sylfirm X 矽谷電波：為何它能成為修復界的新寵？', href: '/blog/sylfirm-x-guide' },
  { label: 'SCIENCE', text: 'VISIA 智能分析如何預測你 5 年後的肌膚狀態', href: '/blog/visia-skin-analysis' },
  { label: 'REAL STORY', text: '告別 10 年荷爾蒙斑：複合治療方案的雙重打擊', href: '/blog/real-case-pigmentation' },
  { label: 'GUIDE', text: '膠原蛋白流失怎麼辦？2025 最新增生技術全解析', href: '/blog/collagen-boost-2025' },
  { label: 'Q&A', text: '三分鐘了解女性私密修復 360 的安全性與成效', href: '/blog/intimate-care-faq' },
];

// Duplicate items for seamless loop
const allItems = [...tickerItems, ...tickerItems];

const ArticleTypePill = ({ label }: { label: string }) => {
  const colorMap: Record<string, string> = {
    'IN-DEPTH': 'bg-indigo-600 text-white',
    'SCIENCE': 'bg-teal-600 text-white',
    'REAL STORY': 'bg-[#C52B21] text-white',
    'GUIDE': 'bg-amber-500 text-white',
    'Q&A': 'bg-purple-600 text-white',
    'EXCLUSIVE': 'bg-gray-900 text-white',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black tracking-widest uppercase ${colorMap[label] ?? 'bg-gray-700 text-white'}`}>
      {label}
    </span>
  );
};

const BlogTicker = () => {
  return (
    <div className="bg-gray-950 border-b border-gray-800 overflow-hidden">
      <div className="flex items-center">
        {/* Static label */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-[#C52B21] px-4 py-2.5 h-full z-10">
          <Rss size={12} className="text-white" />
          <span className="text-white text-[10px] font-black tracking-[0.15em] uppercase whitespace-nowrap">
            最新
          </span>
          <ArrowRight size={10} className="text-white/70" />
        </div>

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {allItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-3 px-6 py-2.5 whitespace-nowrap group hover:bg-white/5 transition-colors"
              >
                <ArticleTypePill label={item.label} />
                <span className="text-[11px] text-gray-300 font-medium group-hover:text-white transition-colors">
                  {item.text}
                </span>
                {/* Separator */}
                <span className="text-gray-700 text-xs select-none">·</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogTicker;
