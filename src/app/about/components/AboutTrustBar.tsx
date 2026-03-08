"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users2, Star, Zap, BadgeCheck, Heart, Sparkles } from 'lucide-react';

const items = [
  { icon: <ShieldCheck size={13} />, text: "100% 原廠正貨" },
  { icon: <Award size={13} />, text: "30+ 國際認證" },
  { icon: <Users2 size={13} />, text: "5,000+ 服務人次" },
  { icon: <Star size={13} />, text: "99% 客戶滿意度" },
  { icon: <Zap size={13} />, text: "BTL 官方指定中心" },
  { icon: <BadgeCheck size={13} />, text: "Lutronic 認證合作" },
  { icon: <Heart size={13} />, text: "全女班專業團隊" },
  { icon: <Sparkles size={13} />, text: "10 年+ 臨床經驗" },
];

export default function AboutTrustBar() {
  const doubled = [...items, ...items];

  return (
    <div className="py-5 bg-[#FDF0EE] border-y border-[#F0D6D3] overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FDF0EE] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FDF0EE] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex gap-10 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 text-[#8A5A57] hover:text-[#C52B21] transition-colors">
            <span className="text-[#C52B21] opacity-70">{item.icon}</span>
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase">{item.text}</span>
            <span className="text-[#D9B8B5] ml-4">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
