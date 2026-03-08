'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const concerns = [
  {
    id: "acne-scars",
    title: "凹凸洞 / 暗瘡印",
    symptoms: ["冰錐型凹陷", "滾輪型凹陷", "色素沉澱", "毛孔粗大"],
    solution: "Sylfirm X 矽谷電波",
    link: "/treatments/sylfirm-x",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    id: "sagging",
    title: "皮膚鬆弛 / 下垂",
    symptoms: ["蘋果肌下垂", "法令紋加深", "輪廓線模糊", "眼皮下垂"],
    solution: "Ulfit HIFU / Thermage",
    link: "/treatments/ulfit-hifu",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: "pigmentation",
    title: "色斑 / 荷爾蒙斑",
    symptoms: ["雀斑", "太陽斑", "荷爾蒙斑", "膚色暗啞"],
    solution: "Sylfirm X / 皮秒激光",
    link: "/treatments/sylfirm-x",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: "wrinkles",
    title: "皺紋 / 細紋",
    symptoms: ["魚尾紋", "抬頭紋", "眉心紋", "頸紋"],
    solution: "BTL Exion™ / Botox",
    link: "/treatments/btl-exion",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export default function PainPointsSection() {
  return (
    <section className="py-20 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-5%] w-[30vw] h-[30vw] bg-pink-100 rounded-full blur-[80px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30vw] h-[30vw] bg-blue-50 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-sm font-bold tracking-widest uppercase mb-3 block"
          >
            Your Skin Concerns
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-6"
          >
            針對您的<span className="text-[#C52B21]">肌膚痛點</span>
            <br className="md:hidden" /> 提供專屬方案
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg max-w-2xl mx-auto"
          >
            我們深知每個肌膚問題都獨一無二。選擇您的困擾，讓我們為您推薦最適合的醫學美容療程。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {concerns.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center text-[#C52B21] group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-[#C52B21] transition-colors">
                {item.title}
              </h3>

              <div className="mb-6 flex-grow">
                <ul className="space-y-2">
                  {item.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-[#C52B21] transition-colors" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="text-xs text-muted mb-2 font-medium">推薦方案</p>
                <Link href={item.link} className="flex items-center justify-between group/link">
                  <span className="font-bold text-sm text-gray-800 group-hover/link:text-[#C52B21] transition-colors">
                    {item.solution}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/link:bg-[#C52B21] group-hover/link:text-white transition-all">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
        >
            <Link href="/concerns" className="inline-flex items-center justify-center px-8 py-3 border border-gray-200 rounded-full text-muted hover:text-white hover:bg-[#C52B21] hover:border-[#C52B21] transition-all duration-300">
                探索更多肌膚問題
            </Link>
        </motion.div>
      </div>
    </section>
  );
}
