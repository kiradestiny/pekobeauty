"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ITEMS = [
  { text: "100% 原廠正貨" },
  { text: "BTL Exion™ 認證中心" },
  { text: "Sylfirm X 正版授權" },
  { text: "全女班治療師" },
  { text: "美國 VISIA 第 7 代" },
  { text: "朗豪坊 40 樓" },
  { text: "絕無 Hard Sell" },
  { text: "VISIA 數據化追蹤" },
  { text: "私密空間保障" },
  { text: "Google 評分 4.9 ★" },
  { text: "非入侵性技術" },
  { text: "5,000+ 滿意客戶" },
];

function Strip({ reversed = false }: { reversed?: boolean }) {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-5 shrink-0">
          <span className="text-[11px] font-semibold tracking-[0.22em] text-gray-500 uppercase whitespace-nowrap">
            {item.text}
          </span>
          <span
            className="text-[7px] shrink-0"
            style={{ color: "#C52B21", opacity: 0.6 }}
          >
            ✦
          </span>
        </span>
      ))}
    </>
  );
}

interface MarqueeStripProps {
  className?: string;
  /** Seconds per full loop (default 35) */
  speed?: number;
  /** Show a second reversed row (default false) */
  doubleRow?: boolean;
}

export default function MarqueeStrip({
  className = "",
  speed = 35,
  doubleRow = false,
}: MarqueeStripProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`overflow-hidden relative border-y border-gray-100 bg-[#FAFAFA] ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

      {/* Row 1 — left-moving */}
      <div className="py-[14px] flex overflow-hidden">
        <motion.div
          className="flex gap-5 min-w-max"
          animate={paused ? {} : { x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
          style={paused ? { animationPlayState: "paused" } : {}}
        >
          <Strip />
          <Strip />
        </motion.div>
      </div>

      {/* Row 2 — right-moving (optional) */}
      {doubleRow && (
        <div className="py-[14px] flex overflow-hidden border-t border-gray-100/80">
          <motion.div
            className="flex gap-5 min-w-max"
            animate={paused ? {} : { x: ["-50%", "0%"] }}
            transition={{
              x: {
                duration: speed * 1.2,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
          >
            <Strip reversed />
            <Strip reversed />
          </motion.div>
        </div>
      )}
    </div>
  );
}
