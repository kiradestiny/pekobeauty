"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Skip on subsequent visits within the same session
    if (typeof window !== "undefined" && sessionStorage.getItem("pb-visited")) {
      setIsLoading(false);
      return;
    }

    let current = 0;
    const tick = () => {
      // Organic increment: fast at start, slow near 100
      const remaining = 100 - current;
      const step = Math.max(1, remaining * 0.12 + Math.random() * 8);
      current = Math.min(current + step, 97);
      setProgress(current);

      if (current < 97) {
        setTimeout(tick, 80 + Math.random() * 80);
      } else {
        // Final burst to 100
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("pb-visited", "true");
          }, 450);
        }, 300);
      }
    };

    const startDelay = setTimeout(tick, 100);
    return () => clearTimeout(startDelay);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient glow pulse */}
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(197,43,33,0.18), transparent)",
            }}
          />

          {/* Secondary aurora ring */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.04]"
            style={{
              background:
                "conic-gradient(from 0deg, #C52B21, #f472b6, #fb7185, #C52B21)",
            }}
          />

          {/* Brand logo */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center select-none"
          >
            <div className="flex items-baseline gap-3 justify-center">
              <span className="text-[2.8rem] font-extralight tracking-[0.18em] text-gray-900 leading-none">
                PEKO
              </span>
              <span className="text-[2.8rem] font-black tracking-[0.12em] text-[#C52B21] leading-none">
                BEAUTY
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-3 h-px bg-gradient-to-r from-transparent via-[#C52B21]/40 to-transparent mx-auto w-48"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-3 text-[9px] tracking-[0.65em] text-gray-400 uppercase font-light"
            >
              肌源解碼 · 朗豪坊
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-52 flex flex-col items-center gap-3"
          >
            <div className="w-full h-[1px] bg-gray-100 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #C52B21 0%, #f472b6 50%, #C52B21 100%)",
                  backgroundSize: "200% 100%",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                animate={{ x: ["-100%", "500%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                style={{ left: `${progress - 10}%` }}
              />
            </div>

            <div className="text-[10px] text-gray-300 tracking-[0.45em] tabular-nums font-light">
              {String(Math.min(Math.floor(progress), 100)).padStart(2, "0")} %
            </div>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gray-200/60" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-gray-200/60" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-gray-200/60" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gray-200/60" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
