"use client";

import React, { useRef, useState, useCallback, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";

const treatments = [
  {
    title: "BTL Exion™ 面+眼+頸",
    subtitle: "激生 +224% 透明質酸",
    description:
      "全球唯一利用 AI 智能控溫，激發身體自然產生 +224% 透明質酸及 +47% 膠原。",
    stat: "+224%",
    statLabel: "透明質酸提升",
    tags: ["無痛無創", "即時飽滿", "AI 控溫"],
    trialPrice: "680",
    href: "/treatments/btl-exion",
    accentColor: "from-rose-400 to-[#C52B21]",
    glowColor: "rgba(197,43,33,0.15)",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Sylfirm X 矽谷電波",
    subtitle: "凹凸洞與荷爾蒙斑專家",
    description:
      "第 2 代雙波微針射頻，專利技術修復基底膜，從根源解決凹凸洞、紅印及色斑。",
    stat: "4-6hr",
    statLabel: "極速退紅恢復",
    tags: ["修復基底膜", "收細毛孔", "原廠正貨"],
    trialPrice: "1,880",
    href: "/treatments/sylfirm-x",
    accentColor: "from-purple-400 to-indigo-500",
    glowColor: "rgba(129,140,248,0.15)",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "XE LHA Peel 玻璃肌",
    subtitle: "第四代鹼性煥膚",
    description:
      "邊煥膚邊填充的 Fill & Peel 概念，零脫皮，即時呈現玻璃肌發光效果。",
    stat: "100%",
    statLabel: "零脫皮發光感",
    tags: ["深層清潔", "暗瘡印", "敏感肌適用"],
    trialPrice: "980",
    href: "/treatments/lha-peel",
    accentColor: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52,211,153,0.15)",
    image:
      "https://images.unsplash.com/photo-1570172619992-052267ad7c3f?q=80&w=800&auto=format&fit=crop",
  },
];

/* ──────────────────────────────────────────
   3-D Tilt Card
   ────────────────────────────────────────── */
function TiltCard({
  item,
  index,
}: {
  item: (typeof treatments)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, mx: 50, my: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0→1
    const y = (e.clientY - rect.top) / rect.height; // 0→1
    setTilt({
      rotX: -(y - 0.5) * 14,
      rotY: (x - 0.5) * 14,
      mx: x * 100,
      my: y * 100,
    });
  }, []);

  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => {
    setHovered(false);
    setTilt({ rotX: 0, rotY: 0, mx: 50, my: 50 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.15,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          transform: hovered
            ? `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(1.03,1.03,1.03)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
          transition: hovered
            ? "transform 0.12s ease, box-shadow 0.3s ease"
            : "transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.55s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: hovered
            ? `0 35px 70px -15px rgba(0,0,0,0.14), 0 0 0 1px rgba(197,43,33,0.07), 0 0 40px ${item.glowColor}`
            : "0 10px 40px -15px rgba(0,0,0,0.06)",
        }}
        className="relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 cursor-none"
      >
        {/* ── Spotlight glow that follows cursor ── */}
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-[2.5rem] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 220px at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.18), transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* ── Image area ── */}
        <div className="relative h-72 overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Subtitle chip */}
          <motion.div
            animate={{ y: hovered ? -3 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-5 left-5 z-10"
          >
            <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.14em] text-gray-900 shadow-sm border border-white/50 uppercase">
              {item.subtitle}
            </span>
          </motion.div>

          {/* Stat badge — elevates on tilt (translateZ trick) */}
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1, y: hovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-5 right-5 z-10"
          >
            <div
              className={`bg-gradient-to-br ${item.accentColor} text-white p-4 rounded-[1.4rem] shadow-xl`}
              style={{ boxShadow: hovered ? `0 12px 28px ${item.glowColor}` : undefined }}
            >
              <div className="text-2xl font-bold leading-none tracking-tighter">
                {item.stat}
              </div>
              <div className="text-[10px] font-medium opacity-90 mt-1 uppercase tracking-wider">
                {item.statLabel}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Content area ── */}
        <div className="p-9 relative z-10">
          <motion.h3
            animate={{ color: hovered ? "#C52B21" : "#111827" }}
            transition={{ duration: 0.25 }}
            className="text-2xl font-bold mb-3"
          >
            {item.title}
          </motion.h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-7 font-light line-clamp-2">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 transition-colors duration-300 group-hover:border-rose-100"
              >
                <Check size={11} className="text-[#C52B21]" />
                {tag}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-7 border-t border-gray-100">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase tracking-[0.2em] font-bold mb-1">
                Trial Offer
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-bold text-gray-900">HK$</span>
                <span className="text-3xl font-bold text-gray-900 tracking-tighter">
                  {item.trialPrice}
                </span>
              </div>
            </div>

            <Link href={item.href}>
              <motion.div
                animate={{
                  backgroundColor: hovered ? "#C52B21" : "transparent",
                  borderColor: hovered ? "#C52B21" : "#e5e7eb",
                  color: hovered ? "#ffffff" : "#6b7280",
                  scale: hovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="w-14 h-14 rounded-full flex items-center justify-center border shadow-sm"
                style={{
                  boxShadow: hovered
                    ? "0 8px 24px rgba(197,43,33,0.3)"
                    : undefined,
                }}
              >
                <ArrowUpRight size={22} />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* ── Animated bottom border ── */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] rounded-full"
          style={{
            background: `linear-gradient(90deg, #C52B21, #f472b6)`,
            boxShadow: "0 0 8px rgba(197,43,33,0.5)",
          }}
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Section
   ────────────────────────────────────────── */
export default function TreatmentShowcase() {
  return (
    <section className="py-32 bg-white relative overflow-hidden bg-noise">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#F9F9F9_0%,transparent_70%)] -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10" />

      {/* Morphing blobs */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 bg-rose-100/30 blur-3xl blob-morph -z-10"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-100/20 blur-3xl blob-morph-slow -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#C52B21] text-xs font-bold tracking-widest uppercase mb-6"
          >
            <Sparkles size={13} />
            Professional Treatments
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight"
          >
            皇牌療程 · <span className="font-bold text-[#C52B21]">肌源解碼</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-xl mx-auto text-gray-400 font-light text-base leading-relaxed"
          >
            每項療程均採用國際認可原廠儀器，由全女班治療師一對一主理
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 h-[2px] bg-gradient-to-r from-[#C52B21] to-rose-300 mx-auto rounded-full"
          />
        </div>

        {/* 3D Tilt cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {treatments.map((item, index) => (
            <TiltCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">
            所有療程均採用原廠正貨儀器，由全女班治療師主理
          </p>
          <Link
            href="/treatments"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-widest text-gray-900 hover:text-[#C52B21] transition-colors group"
          >
            查看所有醫美療程
            <span className="relative overflow-hidden h-px w-8 bg-gray-900 group-hover:bg-[#C52B21] transition-colors">
              <motion.span
                className="absolute inset-y-0 left-0 bg-[#C52B21]"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
