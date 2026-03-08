"use client";

/**
 * FAQAccordion — 可重用的 FAQ 手風琴元件
 *
 * 設計原則：
 * - 完全解耦合：資料透過 props 傳入，不依賴任何 JSON 檔案
 * - 每頁 FAQ 獨立：避免全站重複內容，保護 SEO 排名
 * - Schema 注入：自動產生 FAQPage JSON-LD，只包含當頁顯示的問題
 * - 可配置：title / subtitle / CTA 均可由外部控制
 *
 * 使用方式：
 * <FAQAccordion items={myFaqs} title="常見" titleHighlight="問題" injectSchema />
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FAQAccordionProps } from "@/types/faq";

// ─── 預設值 ───────────────────────────────────────────────────────────────────

const DEFAULT_CTA = {
  heading: "準備好開始您的美肌之旅了嗎？",
  subheading: "預約免費 VISIA 第 7 代皮膚影像分析，專業團隊為您量身打造專屬方案。",
  primaryLabel: "立即預約",
  primaryHref: "/booking",
  secondaryLabel: "WhatsApp 查詢",
  secondaryHref: "https://wa.me/85253353313",
};

// ─── 主元件 ───────────────────────────────────────────────────────────────────

export default function FAQAccordion({
  items,
  title = "常見",
  titleHighlight = "問題",
  subtitle = "我們整理了客戶最常遇到的疑問，助您更了解 Peko Beauty 的專業服務。",
  badge = "Got Questions? We Have Answers",
  cta = DEFAULT_CTA,
  injectSchema = true,
  showFilter = false,
  className = "",
}: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ── FAQPage JSON-LD schema（只包含本元件渲染的問題） ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className={`py-24 md:py-32 bg-white relative overflow-hidden ${className}`}
      aria-label="常見問題"
    >
      {/* FAQPage JSON-LD Schema */}
      {injectSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* 背景 */}
      <div className="absolute inset-0 bg-[#FAFAFA] opacity-60 -z-10" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── 標題區 ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#C52B21] text-xs font-bold tracking-widest uppercase mb-6"
          >
            <HelpCircle size={14} aria-hidden="true" />
            {badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight mb-6"
          >
            {title}{" "}
            <span className="font-bold text-[#C52B21]">{titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-500 text-lg font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ── FAQ 列表 ── */}
        <div
          className="grid grid-cols-1 gap-3"
          role="list"
          aria-label="常見問題列表"
        >
          {items.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                role="listitem"
                className={`rounded-[28px] overflow-hidden transition-all duration-500 border ${
                  isOpen
                    ? "bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border-[#C52B21]/15"
                    : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
                }`}
              >
                {/* 問題按鈕 */}
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C52B21]/40 focus-visible:ring-inset"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    {/* Q 標記 */}
                    <div
                      aria-hidden="true"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                        isOpen
                          ? "bg-[#C52B21] text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <span className="text-xs font-bold">Q</span>
                    </div>

                    <div>
                      {faq.category && (
                        <span className="block text-[10px] font-bold text-[#C52B21] uppercase tracking-wider mb-1">
                          {faq.category}
                        </span>
                      )}
                      <span
                        className={`text-base md:text-lg font-bold transition-colors leading-tight ${
                          isOpen ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                  </div>

                  {/* 展開/收合圖示 */}
                  <div
                    aria-hidden="true"
                    className={`flex-shrink-0 ml-4 transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    {isOpen ? (
                      <Minus size={20} className="text-[#C52B21]" />
                    ) : (
                      <Plus size={20} className="text-slate-300" />
                    )}
                  </div>
                </button>

                {/* 答案摺疊區 */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-gray-600 text-base leading-relaxed font-light">
                        <div className="pt-4 border-t border-slate-100 flex gap-4">
                          {/* A 標記 */}
                          <div
                            aria-hidden="true"
                            className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5"
                          >
                            <span className="text-xs font-bold">A</span>
                          </div>

                          <div className="flex-1">
                            <p className="leading-relaxed">{faq.answer}</p>

                            {/* 內嵌 CTA */}
                            <div className="mt-6 p-5 bg-slate-50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div>
                                <p className="text-sm font-bold text-gray-900 mb-0.5">
                                  還有其他疑問？
                                </p>
                                <p className="text-xs text-gray-500">
                                  我們的專業團隊隨時為您解答
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-3 flex-shrink-0">
                                <Link
                                  href={cta.primaryHref}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C52B21] text-white rounded-full text-xs font-bold hover:bg-black transition-all"
                                >
                                  {cta.primaryLabel}
                                  <ArrowRight size={13} aria-hidden="true" />
                                </Link>
                                {cta.secondaryLabel && cta.secondaryHref && (
                                  <a
                                    href={cta.secondaryHref}
                                    target={
                                      cta.secondaryHref.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                    }
                                    rel={
                                      cta.secondaryHref.startsWith("http")
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-green-600 rounded-full text-xs font-bold hover:border-green-500 transition-all"
                                  >
                                    <MessageCircle size={13} aria-hidden="true" />
                                    {cta.secondaryLabel}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── 底部 CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-16 p-8 md:p-12 rounded-[3rem] text-center text-white relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #2D0A08 0%, #6B1E17 50%, #2D0A08 100%)",
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C52B21] blur-[120px] opacity-20 -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C52B21] blur-[100px] opacity-10 -ml-24 -mb-24 pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-light mb-3">
              {cta.heading.split("美肌之旅").length > 1 ? (
                <>
                  {cta.heading.split("美肌之旅")[0]}
                  <em className="not-italic font-bold">美肌之旅</em>
                  {cta.heading.split("美肌之旅")[1]}
                </>
              ) : (
                cta.heading
              )}
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              {cta.subheading}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={cta.primaryHref}
                className="w-full sm:w-auto px-10 py-4 bg-[#C52B21] text-white rounded-full font-bold hover:scale-105 transition-transform"
              >
                {cta.primaryLabel}
              </Link>
              {cta.secondaryLabel && cta.secondaryHref && (
                <a
                  href={cta.secondaryHref}
                  target={
                    cta.secondaryHref.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    cta.secondaryHref.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
                >
                  {cta.secondaryLabel}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
