"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scan, Database, Microscope, BarChart3, Target, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const visiaMetrics = [
  { label: "底層色斑", icon: Target, desc: "偵測肉眼看不見的潛在深層黑色素" },
  { label: "毛孔型態", icon: Scan, desc: "分析毛孔粗大原因，區分油脂或老化型" },
  { label: "紋理平滑", icon: BarChart3, desc: "精確測量肌膚細紋、幼紋的分佈深度" },
  { label: "紫外斑點", icon: ShieldCheck, desc: "評估長期日照導致的底層光老化損害" },
  { label: "底層炎症", icon: Microscope, desc: "RBX 技術顯現底層微血管擴張及炎症" },
  { label: "紫質細菌", icon: Database, desc: "分析毛囊內的細菌代謝物，預測暗瘡風險" },
];

/* ── Floating data tag ── */
const DataTag = ({
  label,
  value,
  color,
  className,
  delay,
}: {
  label: string;
  value: string;
  color: string;
  className?: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 12 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute z-20 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl border border-white/60 ${className}`}
    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)" }}
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", type: "tween" }}
    >
      <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">{label}</div>
      <div className={`text-base font-black ${color}`}>{value}</div>
    </motion.div>
  </motion.div>
);

/* ── Metric card ── */
const MetricCard = ({
  icon: Icon,
  label,
  desc,
  index,
}: {
  icon: React.ElementType;
  label: string;
  desc: string;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-4 rounded-2xl border transition-all duration-300 cursor-default"
      style={{
        borderColor: hovered ? "rgba(197,43,33,0.2)" : "rgba(226,232,240,0.6)",
        backgroundColor: hovered ? "rgba(255,245,245,0.8)" : "rgba(255,255,255,0.5)",
        boxShadow: hovered ? "0 8px 24px rgba(197,43,33,0.06)" : "none",
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          animate={{ color: hovered ? "#C52B21" : "#d1d5db", scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <Icon size={18} />
        </motion.div>
        <span className="text-sm font-bold text-gray-900 tracking-wide">{label}</span>
      </div>
      <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>

      {/* Indicator dot */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#C52B21]"
      />
    </motion.div>
  );
};

/* ── Main section ── */
const VisiaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-[#F8F8F8] relative overflow-hidden bg-noise"
    >
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-grid-pattern" />

      {/* Morphing blobs */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-rose-100/40 blur-[120px] blob-morph -z-10"
      />
      <div
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-pink-100/30 blur-[100px] blob-morph-slow -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Left: Visual (image + overlays) ── */}
          <div className="relative">
            {/* Main image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.14)] bg-white p-3 border border-white/50"
            >
              {/* Parallax image */}
              <div className="relative overflow-hidden rounded-[2rem]" style={{ height: "420px" }}>
                <motion.img
                  style={{ y: imgY }}
                  src="https://images.unsplash.com/photo-1576091160550-2173dad9998e?q=80&w=1000&auto=format&fit=crop"
                  alt="VISIA Skin Analysis"
                  className="w-full h-[110%] object-cover object-center"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Animated scan line */}
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[3px] z-20 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, #C52B21 20%, rgba(255,255,255,0.9) 50%, #C52B21 80%, transparent 100%)",
                    boxShadow: "0 0 20px rgba(197,43,33,0.6), 0 0 40px rgba(197,43,33,0.3)",
                  }}
                />

                {/* Scan corner markers */}
                {[
                  "top-4 left-4",
                  "top-4 right-4",
                  "bottom-4 left-4",
                  "bottom-4 right-4",
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`absolute ${pos} w-6 h-6 z-20 pointer-events-none`}
                  >
                    <div
                      className={`w-full h-full border-[#C52B21] ${
                        i === 0
                          ? "border-t-2 border-l-2"
                          : i === 1
                          ? "border-t-2 border-r-2"
                          : i === 2
                          ? "border-b-2 border-l-2"
                          : "border-b-2 border-r-2"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Data overlay card (top right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-10 right-8 bg-black/85 backdrop-blur-xl text-white p-5 rounded-2xl text-[10px] space-y-3 border border-white/10 shadow-2xl z-30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest">Live Analysis</span>
                </div>
                {[
                  { label: "Accuracy", value: "99.8%", color: "text-green-400" },
                  { label: "Database", value: "2.5M+", color: "text-white" },
                  { label: "Metrics", value: "14 pts", color: "text-blue-300" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between gap-6 items-center">
                    <span className="text-gray-400 uppercase tracking-widest">{row.label}</span>
                    <span className={`font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Floating data tags */}
            <DataTag
              label="透明質酸提升"
              value="+224%"
              color="text-[#C52B21]"
              className="-bottom-5 -left-6"
              delay={0.8}
            />
            <DataTag
              label="修復週期"
              value="4-6 次"
              color="text-indigo-600"
              className="-top-5 right-8 lg:right-0"
              delay={1.0}
            />

            {/* Background circles */}
            <div className="absolute -top-10 -left-10 w-48 h-48 border border-gray-200 rounded-full opacity-30 -z-10" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white rounded-full blur-3xl opacity-50 -z-10" />
          </div>

          {/* ── Right: Text content ── */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-[#C52B21] text-[10px] font-bold tracking-widest uppercase mb-6">
                <Zap size={11} />
                Step 01: Skin Source Decoding
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-gray-900 leading-[1.1] tracking-tight">
                肌源解碼：
                <br />
                <span className="font-bold">拒絕盲目美容</span>
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-5 h-1 bg-gradient-to-r from-[#C52B21] to-rose-300 rounded-full"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg text-gray-500 leading-relaxed font-light"
            >
              Peko Beauty 引入美國第 7 代{" "}
              <span className="text-gray-900 font-semibold">VISIA 專業智能皮膚分析儀</span>
              。透過多光譜成像與專利 RBX 技術，深入肌底 2 毫米，將隱藏的色斑、炎症、細菌無所遁形。
              <br />
              <br />
              <span className="text-gray-900 font-medium italic">
                「不先分析，何來精準治療？」
              </span>{" "}
              我們以科學數據為基礎，為您量身定制獨一無二的療程組合。
            </motion.p>

            {/* 6-metric grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {visiaMetrics.map((item, i) => (
                <MetricCard
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  desc={item.desc}
                  index={i}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-6"
            >
              <Link href="/booking">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center gap-5 px-10 py-5 rounded-full bg-gray-900 text-white font-bold overflow-hidden transition-all duration-500"
                  style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.18)" }}
                >
                  {/* Hover fill */}
                  <motion.div
                    className="absolute inset-0 bg-[#C52B21]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="relative z-10">預約免費 VISIA 深度分析</span>
                  <motion.div
                    className="relative z-10 bg-white/10 group-hover:bg-white/20 p-2 rounded-full transition-colors"
                    whileHover={{ rotate: 15 }}
                  >
                    <Scan size={18} className="text-white" />
                  </motion.div>
                </motion.button>
              </Link>

              <div className="flex items-center gap-3 mt-5 px-2">
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-red-500"
                />
                <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-medium">
                  每天名額僅限 3 位 · 朗豪坊店限定
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiaSection;
