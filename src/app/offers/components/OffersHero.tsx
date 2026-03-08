"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Sparkles, ChevronRight, Gift } from 'lucide-react';
import { BRAND_RED } from './offersData';

// ─── Constants ────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 55;
const MAX_CONNECT_DIST = 90;

// ─── Particle Canvas ──────────────────────────────────────────────────────────
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    const setSize = () => {
      const W = window.innerWidth;
      const H = canvas.parentElement?.offsetHeight ?? window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { W, H };
    };

    let { W, H } = setSize();

    const pts = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.35 + 0.05,
      red: Math.random() > 0.75,
      pulse: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        p.pulse += 0.02;
        const alpha = p.a * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.red
          ? `rgba(197,43,33,${alpha})`
          : `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          if (Math.abs(dx) > MAX_CONNECT_DIST || Math.abs(dy) > MAX_CONNECT_DIST) continue;
          const d = Math.hypot(dx, dy);
          if (d < MAX_CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - d / MAX_CONNECT_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };

    tick();

    const onResize = () => {
      ({ W, H } = setSize());
      for (const p of pts) {
        p.x = Math.min(p.x, W);
        p.y = Math.min(p.y, H);
      }
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// ─── Magnetic Button ──────────────────────────────────────────────────────────
const MagneticButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 250, damping: 18 });
  const sy = useSpring(my, { stiffness: 250, damping: 18 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mx.set((e.clientX - r.left - r.width / 2) * 0.35);
      my.set((e.clientY - r.top - r.height / 2) * 0.35);
    },
    [mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
interface OffersHeroProps {
  onOpenQuiz: () => void;
}

export default function OffersHero({ onOpenQuiz }: OffersHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0505] via-[#0A0A0A] to-[#050510]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 55%, ${BRAND_RED}30 0%, transparent 50%),
                            radial-gradient(circle at 75% 25%, #1A6B8A1A 0%, transparent 45%)`,
        }}
      />
      <ParticleCanvas />

      {/* ── Main Content ── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C52B21]/40 bg-[#C52B21]/10 text-[#ff7070] text-xs font-bold tracking-widest mb-10"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            aria-hidden="true"
          >
            <Gift size={13} />
          </motion.span>
          NEW CLIENT EXCLUSIVE · 新客戶尊享禮遇
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-[86px] font-light text-white leading-[1.05] tracking-tight mb-6"
        >
          用科學數據
          <br />
          <span className="relative inline-block">
            <span
              className="font-black"
              style={{
                background: `linear-gradient(135deg, #ff7070 0%, ${BRAND_RED} 45%, #8B0000 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              解碼您的肌膚
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.85, duration: 0.7, ease: 'easeOut' }}
              aria-hidden="true"
              className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full origin-left"
              style={{ background: `linear-gradient(90deg, ${BRAND_RED}, transparent)` }}
            />
          </span>
        </motion.h1>

        {/* Subtitle — one punchy line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white/45 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          皇牌醫美試做優惠，全包 VISIA 皮膚分析，明碼實價，無 Hard Sell。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary — quiz */}
          <MagneticButton>
            <motion.button
              onClick={onOpenQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              aria-label="開啟 30 秒皮膚測驗，找出最適合您的療程"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm text-white overflow-hidden shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${BRAND_RED}, #8B0000)` }}
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
              />
              <Sparkles size={17} aria-hidden="true" className="text-yellow-300 relative z-10" />
              <span className="relative z-10">30 秒測出最適合您的療程</span>
              <ChevronRight
                size={15}
                aria-hidden="true"
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </MagneticButton>

          {/* Secondary — browse */}
          <MagneticButton>
            <motion.a
              href="#offers-grid"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="向下瀏覽所有優惠"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl font-medium text-sm text-white/75 border border-white/20 hover:border-white/35 hover:text-white transition-all backdrop-blur-sm"
            >
              瀏覽所有優惠
              <ChevronRight size={15} aria-hidden="true" />
            </motion.a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/35 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
