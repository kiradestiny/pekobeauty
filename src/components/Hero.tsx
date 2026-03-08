"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────
   Floating Sparkle Particles — beauty / luxury feel
───────────────────────────────────────── */
const SPARKLES = Array.from({ length: 14 }, (_, i) => {
  const seed = i * 137.508;
  return {
    id: i,
    x: (seed * 7.3) % 100,
    y: (seed * 3.7) % 100,
    size: 1.5 + (i % 3) * 1.2,
    opacity: 0.18 + (i % 4) * 0.12,
    duration: 5 + (i % 5) * 2.5,
    delay: (i % 7) * 0.8,
    drift: -12 + (i % 6) * 5,
  };
});

/* ─────────────────────────────────────────
   Luxury Decorative Lines SVG
───────────────────────────────────────── */
const LuxuryLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-10"
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
  >
    {/* ── Top-left corner bracket (outer) ── */}
    <motion.path
      d="M 48 36 L 48 140 M 48 36 L 200 36"
      stroke="rgba(255,255,255,0.38)"
      strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    />
    {/* Top-left inner bracket — brand red */}
    <motion.path
      d="M 58 46 L 58 96 M 58 46 L 128 46"
      stroke="rgba(197,43,33,0.55)"
      strokeWidth="0.7"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.0, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
    />
    {/* Top-left accent dot */}
    <motion.circle
      cx="48" cy="36" r="2"
      fill="rgba(197,43,33,0.8)"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    />

    {/* ── Top-center thin horizontal rule ── */}
    <motion.line
      x1="580" y1="48" x2="860" y2="48"
      stroke="rgba(255,255,255,0.10)"
      strokeWidth="0.5"
      strokeDasharray="4 8"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      style={{ transformOrigin: "580px 48px" }}
      transition={{ duration: 1.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
    />

    {/* ── Top-right brand red accent line ── */}
    <motion.line
      x1="1160" y1="52" x2="1392" y2="52"
      stroke="rgba(197,43,33,0.55)"
      strokeWidth="0.8"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      style={{ transformOrigin: "1160px 52px" }}
      transition={{ duration: 1.0, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
    {/* Top-right corner bracket */}
    <motion.path
      d="M 1392 36 L 1392 130 M 1392 36 L 1260 36"
      stroke="rgba(255,255,255,0.22)"
      strokeWidth="0.8"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />

    {/* ── Right-side vertical accent line ── */}
    <motion.line
      x1="1380" y1="160" x2="1380" y2="520"
      stroke="rgba(255,255,255,0.13)"
      strokeWidth="0.7"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2.0, delay: 1.0, ease: "easeOut" }}
    />
    {/* Right-side small tick marks */}
    {[220, 320, 420].map((y, i) => (
      <motion.line
        key={y}
        x1="1372" y1={y} x2="1388" y2={y}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.6"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: `1380px ${y}px` }}
        transition={{ duration: 0.5, delay: 1.6 + i * 0.15 }}
      />
    ))}

    {/* ── Bottom-right corner bracket ── */}
    <motion.path
      d="M 1392 864 L 1392 760 M 1392 864 L 1250 864"
      stroke="rgba(255,255,255,0.22)"
      strokeWidth="0.8"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
    />

    {/* ── Bottom-left horizontal rule ── */}
    <motion.line
      x1="48" y1="828" x2="560" y2="828"
      stroke="rgba(255,255,255,0.20)"
      strokeWidth="0.7"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      style={{ transformOrigin: "48px 828px" }}
      transition={{ duration: 1.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
    />
    {/* Bottom-left accent dot */}
    <motion.circle
      cx="48" cy="828" r="2.5"
      fill="rgba(197,43,33,0.75)"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.65 }}
    />
    {/* Bottom-left secondary short line */}
    <motion.line
      x1="48" y1="838" x2="200" y2="838"
      stroke="rgba(197,43,33,0.25)"
      strokeWidth="0.5"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      style={{ transformOrigin: "48px 838px" }}
      transition={{ duration: 0.8, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
    />

    {/* ── Centre-left vertical accent (mid-height) ── */}
    <motion.line
      x1="48" y1="200" x2="48" y2="560"
      stroke="rgba(255,255,255,0.08)"
      strokeWidth="0.6"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.8, delay: 1.2, ease: "easeOut" }}
    />

    {/* ── Diagonal shimmer accent ── */}
    <motion.line
      x1="0" y1="900" x2="280" y2="620"
      stroke="rgba(255,255,255,0.05)"
      strokeWidth="0.5"
      animate={{ opacity: [0, 0.07, 0] }}
      transition={{ duration: 5, delay: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* ── Cross-hair detail near top-left ── */}
    <motion.path
      d="M 48 180 L 60 180 M 54 174 L 54 186"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="0.7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.8 }}
    />
  </svg>
);

/* ─────────────────────────────────────────
   Animated shimmer sweep (beauty salon feel)
───────────────────────────────────────── */
const ShimmerSweep = () => (
  <motion.div
    className="absolute inset-0 z-[3] pointer-events-none"
    style={{
      background:
        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)",
    }}
    animate={{ x: ["-100%", "200%"] }}
    transition={{ duration: 6, delay: 2, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
  />
);

/* ─────────────────────────────────────────
   Character-by-character stagger (CJK)
───────────────────────────────────────── */
const CharReveal = ({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) => {
  const chars = Array.from(text);
  return (
    <span className={`inline-flex ${className}`}>
      {chars.map((char, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, rotateX: 30 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.06,
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ─────────────────────────────────────────
   Main Hero Component
───────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const bgX = useTransform(springX, [-0.5, 0.5], ["-1.2%", "1.2%"]);
  const bgY = useTransform(springY, [-0.5, 0.5], ["-1.2%", "1.2%"]);

  const orbX = useTransform(springX, [-0.5, 0.5], ["-24px", "24px"]);
  const orbY = useTransform(springY, [-0.5, 0.5], ["-16px", "16px"]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "620px", background: "#1a0a0a" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Parallax Background Image ── */}
      <motion.div
        className="absolute inset-[-4%] origin-center"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1.02 }}
        style={{ x: bgX, y: bgY }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          style={{ y: scrollY, opacity: scrollOpacity }}
          className="w-full h-full"
        >
          <img
            src="/images/peko-beauty-reception-desk-mong-kok.jpg"
            alt="Peko Beauty 朗豪坊接待大廳"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.95) saturate(0.92) contrast(1.02)" }}
          />
        </motion.div>
      </motion.div>

      {/* ── Gradient Overlays — minimal, bright ── */}
      {/* Left text-legibility gradient */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,4,4,0.75) 0%, rgba(10,4,4,0.45) 28%, rgba(10,4,4,0.08) 52%, rgba(10,4,4,0.0) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(10,4,4,0.60) 0%, rgba(10,4,4,0.15) 18%, transparent 40%)",
        }}
      />
      {/* Top vignette — very light */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,4,4,0.25) 0%, transparent 14%)",
        }}
      />

      {/* ── Warm rose-gold ambient glow (beauty salon) ── */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none z-[2]"
        style={{
          x: orbX,
          y: orbY,
          background:
            "radial-gradient(circle, rgba(220,80,60,0.10) 0%, rgba(197,43,33,0.05) 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      {/* Right-side warm glow */}
      <motion.div
        className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,200,160,0.06) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, 18, -10, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Bottom center warm glow */}
      <motion.div
        className="absolute bottom-0 left-[20%] w-[600px] h-[300px] pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(197,43,33,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Floating Sparkles ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {SPARKLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background:
                p.id % 3 === 0
                  ? "rgba(255,220,200,0.9)"
                  : p.id % 3 === 1
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(220,100,80,0.7)",
              opacity: p.opacity,
              boxShadow:
                p.id % 4 === 0
                  ? `0 0 ${p.size * 3}px rgba(255,200,180,0.6)`
                  : "none",
            }}
            animate={{
              y: [0, p.drift, 0],
              x: [0, p.drift * 0.4, 0],
              opacity: [p.opacity, p.opacity * 2.5, p.opacity],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Shimmer sweep animation ── */}
      <ShimmerSweep />

      {/* ── Luxury decorative lines ── */}
      <LuxuryLines />

      {/* ── Floating petal / bloom shapes (beauty feel) ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none z-[3]"
          style={{
            right: `${12 + i * 8}%`,
            top: `${20 + i * 15}%`,
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(255,200,180,0.5)",
            boxShadow: "0 0 8px rgba(255,180,160,0.6)",
          }}
          animate={{
            y: [0, -30 - i * 10, 0],
            x: [0, 8 - i * 4, 0],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 6 + i * 2,
            delay: i * 1.5 + 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Main Content ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-14 sm:pb-20 px-8 sm:px-12 lg:px-20 max-w-4xl">

        {/* Location chip */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 mb-6 w-fit"
        >
          {/* Animated line */}
          <motion.span
            className="h-[1px] bg-white/60"
            initial={{ width: 0 }}
            animate={{ width: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <span className="text-white/75 text-[11px] tracking-[0.38em] uppercase font-medium">
            朗豪坊 40 樓 · 女性專屬醫美
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="text-white mb-5 font-serif"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            textShadow: "0 4px 30px rgba(0,0,0,0.35), 0 1px 0 rgba(0,0,0,0.2)",
          }}
        >
          <CharReveal text="肌源解碼" delay={0.5} />
          <br />
          <CharReveal text="原生美學" delay={0.82} />
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="text-white/85 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-xs tracking-wide"
        >
          AI 皮膚分析 · 原廠儀器 · 量身定制療程
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-5 flex-wrap mb-10"
        >
          {/* Primary CTA */}
          <Link href="/booking">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-full text-white text-sm font-medium tracking-wide bg-accent btn-ripple"
              style={{
                boxShadow:
                  "0 8px 32px -6px rgba(197,43,33,0.65), 0 0 0 1px rgba(255,255,255,0.08) inset",
              }}
            >
              {/* Shimmer on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">免費預約 VISIA 分析</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={14} />
              </motion.span>
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/treatments">
            <motion.button
              whileHover={{ x: 3 }}
              className="group flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 px-2 py-2"
            >
              <span className="relative">
                了解療程
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-[1px] bg-white/70"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </span>
              <ChevronRight size={15} />
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Trust badges row ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-5 flex-wrap"
        >
          {["原廠正貨", "全女班治療師", "絕無 Hard Sell", "VISIA 數據追蹤"].map(
            (badge, i) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-1.5 text-white/60 hover:text-white/90 transition-colors duration-300 cursor-default"
              >
                <motion.span
                  className="w-1 h-1 rounded-full bg-accent/70"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-[11px] tracking-[0.15em] font-light">
                  {badge}
                </span>
              </motion.div>
            )
          )}
        </motion.div>
      </div>

      {/* ── Right side editorial text ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 right-10 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-5"
      >
        <motion.div
          className="w-[1px] bg-gradient-to-b from-transparent via-white/25 to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 72 }}
          transition={{ delay: 2.2, duration: 1.0 }}
        />
        <span
          className="text-white/30 text-[9px] tracking-[0.38em] font-medium uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Premium Aesthetics
        </span>
        <motion.div
          className="w-[1px] bg-gradient-to-b from-transparent via-white/25 to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 72 }}
          transition={{ delay: 2.4, duration: 1.0 }}
        />
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 right-10 z-20 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-white/30 tracking-[0.28em] uppercase font-medium">
          Scroll
        </span>
        <div className="w-[1px] h-14 bg-white/12 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent/80 to-transparent"
            animate={{ height: ["0%", "60%", "0%"], top: ["0%", "40%", "100%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── Animated rose-gold border glow at bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(197,43,33,0.0) 10%, rgba(220,80,60,0.5) 40%, rgba(255,180,160,0.7) 50%, rgba(220,80,60,0.5) 60%, rgba(197,43,33,0.0) 90%, transparent 100%)",
        }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
