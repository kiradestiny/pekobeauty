"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import faqsData from '@/data/faqs.json';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");

  const categories = useMemo(() => {
    const cats = ["全部", ...new Set(faqsData.map(faq => faq.category))];
    return cats;
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqsData.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "全部" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // 生成 JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 背景裝飾 */}
      <div className="absolute inset-0 bg-[#FAFAFA] opacity-50 -z-10" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#C52B21] text-xs font-bold tracking-widest uppercase mb-6"
          >
            <HelpCircle size={14} />
            Got Questions? We Have Answers
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight mb-6"
          >
            常見 <span className="font-bold text-[#C52B21]">問題</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-500 text-lg font-light leading-relaxed"
          >
            我們整理了客戶最常遇到的疑問，希望能幫助您更了解 Peko Beauty 的專業服務。
          </motion.p>
        </div>

        {/* 搜尋與篩選互動區 */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="搜尋您的疑問（例如：安全、預約、Sylfirm...）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#C52B21]/20 focus:border-[#C52B21] outline-none transition-all"
              suppressHydrationWarning
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-[#C52B21] text-white shadow-lg shadow-red-200" 
                    : "bg-white text-gray-600 border border-slate-100 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode='popLayout'>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-3xl overflow-hidden transition-all duration-500 border ${
                    activeIndex === index 
                      ? "bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border-slate-200" 
                      : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                        activeIndex === index ? "bg-[#C52B21] text-white" : "bg-slate-50 text-slate-400"
                      }`}>
                        <span className="text-xs font-bold">Q</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-[#C52B21] uppercase tracking-wider mb-1">{faq.category}</span>
                        <span className={`text-base md:text-lg font-bold transition-colors leading-tight ${
                          activeIndex === index ? "text-gray-900" : "text-gray-700"
                        }`}>{faq.question}</span>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${activeIndex === index ? "rotate-180" : ""}`}>
                      {activeIndex === index ? (
                        <Minus size={20} className="text-[#C52B21]" />
                      ) : (
                        <Plus size={20} className="text-slate-300" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 md:px-8 pb-8 text-gray-600 text-base leading-relaxed font-light">
                          <div className="pt-4 border-t border-slate-50 flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
                              <span className="text-xs font-bold">A</span>
                            </div>
                            <div>
                              {faq.answer}
                              <div className="mt-8 p-6 bg-slate-50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                  <p className="text-sm font-bold text-gray-900 mb-1">還有其他疑問？</p>
                                  <p className="text-xs text-gray-500">我們的專業團隊隨時為您解答</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                  <Link 
                                    href="/booking"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C52B21] text-white rounded-full text-xs font-bold hover:bg-black transition-all"
                                  >
                                    立即預約諮詢 <ArrowRight size={14} />
                                  </Link>
                                  <a 
                                    href="https://wa.me/85253353313"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-green-600 rounded-full text-xs font-bold hover:border-green-600 transition-all"
                                  >
                                    WhatsApp 查詢 <MessageCircle size={14} />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200"
              >
                <p className="text-gray-500">找不到相關問題，請嘗試其他關鍵字或直接聯絡我們。</p>
                <Link href="/contact" className="text-[#C52B21] font-bold mt-4 inline-block">聯絡我們</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 底部轉換區 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-[3rem] text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2D0A08 0%, #6B1E17 50%, #2D0A08 100%)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C52B21] blur-[120px] opacity-20 -mr-32 -mt-32" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-light mb-6">準備好開啟您的 <span className="font-bold italic">美肌之旅</span> 了嗎？</h3>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">現在預約即可享免費 VISIA 第 7 代皮膚影像分析，由專業團隊為您量身打造專屬方案。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/booking"
                className="w-full sm:w-auto px-10 py-4 bg-[#C52B21] text-white rounded-full font-bold hover:scale-105 transition-transform"
              >
                立即預約
              </Link>
              <Link 
                href="/offers"
                className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                查看最新優惠
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
