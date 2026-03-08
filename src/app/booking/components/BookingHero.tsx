"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BookingHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 輕微 parallax，讓標題隨滾動上移產生深度感
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-[#0c0c0c] min-h-[320px] md:min-h-[360px] flex items-center justify-center"
    >
      {/* ── 背景：極簡徑向光暈，營造高端立體感 ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* 中心光源 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/8 rounded-full blur-[100px]" />
        {/* 細節角落光 */}
        <div className="absolute top-0 right-1/4 w-[200px] h-[200px] bg-accent/4 rounded-full blur-[80px]" />
      </div>

      {/* ── 噪點紋理疊加（增加質感，opacity 極低）── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      {/* ── 主要內容 ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        {/* eyebrow — 極細字母間距，體現精緻感 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/35 text-[11px] font-medium tracking-[0.3em] uppercase mb-6 md:mb-8"
        >
          Peko Beauty &nbsp;·&nbsp; 旺角
        </motion.p>

        {/* 主標題 — 字重與字型大小是唯一視覺重心 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.6rem,8vw,5rem)] font-bold leading-[1.1] tracking-tight"
        >
          <span className="text-white">預約您的</span>
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #C52B21 0%, #e05a52 60%, #C52B21 100%)",
              backgroundSize: "200% auto",
              animation: "shimmer 4s linear infinite",
            }}
          >
            美肌療程
          </span>
        </motion.h1>

        {/* 細分隔線 — 簡約裝飾 */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 md:mt-8 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"
        />
      </motion.div>

      {/* ── 底部漸層過渡（與表單區段自然銜接）── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0c0c0c 0%, transparent 100%)' }}
        aria-hidden="true"
      />
    </div>
  );
}
