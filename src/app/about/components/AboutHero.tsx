"use client";
import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  useMotionValue, animate, MotionValue
} from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Star, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

/* ═══════════════════════════════════════════════════════════
   CONSTANTS & CONFIG
═══════════════════════════════════════════════════════════ */
const BRAND       = '#C52B21';
const BRAND_DARK  = '#2C1810';

/* ═══════════════════════════════════════════════════════════
   1. ANIMATED SILK BLOBS  (ambient background)
═══════════════════════════════════════════════════════════ */
const blobs = [
  { color: `radial-gradient(ellipse, rgba(197,43,33,0.09) 0%, transparent 65%)`, w: 760, h: 540, animate: { x: ['-5%','8%','-3%','-5%'], y: ['-10%','6%','14%','-10%'] }, duration: 22 },
  { color: `radial-gradient(ellipse, rgba(220,100,90,0.07) 0%, transparent 60%)`,  w: 640, h: 620, animate: { x: ['55%','65%','50%','55%'], y: ['-12%','10%','5%','-12%'] }, duration: 28 },
  { color: `radial-gradient(ellipse, rgba(255,220,215,0.22) 0%, transparent 55%)`, w: 580, h: 480, animate: { x: ['22%','40%','18%','22%'], y: ['28%','8%','40%','28%'] }, duration: 18 },
  { color: `radial-gradient(ellipse, rgba(197,43,33,0.05) 0%, transparent 60%)`,   w: 520, h: 440, animate: { x: ['68%','60%','75%','68%'], y: ['45%','28%','58%','45%'] }, duration: 32 },
  { color: `radial-gradient(ellipse, rgba(245,200,195,0.20) 0%, transparent 65%)`, w: 440, h: 380, animate: { x: ['-2%','14%','4%','-2%'], y: ['48%','68%','42%','48%'] }, duration: 25 },
];

/* ═══════════════════════════════════════════════════════════
   2. HERO RIGHT PANEL  (品牌照片 + 浮動卡片 + 3D tilt)
═══════════════════════════════════════════════════════════ */
function HeroRightPanel({
  mouseX, mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const rotateX   = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY   = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
  const springRX  = useSpring(rotateX, { stiffness: 55, damping: 22 });
  const springRY  = useSpring(rotateY, { stiffness: 55, damping: 22 });

  return (
    <div className="relative hidden lg:block" style={{ height: 600 }}>
      {/* Entry animation wrapper */}
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0, x: 70, scale: 0.90 }}
        animate={{ opacity: 1, x: 0,  scale: 1 }}
        transition={{ duration: 1.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 1100 }}
      >
        {/* 3D tilt container */}
        <motion.div
          className="relative w-full h-full"
          style={{ rotateX: springRX, rotateY: springRY, transformStyle: 'preserve-3d' }}
        >

          {/* ── Decorative spinning rings ── */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 400, height: 400,
              right: -28, top: 50,
              border: '1px solid rgba(197,43,33,0.13)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 260, height: 260,
              right: 42, top: 120,
              border: '1px dashed rgba(197,43,33,0.09)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          />

          {/* ── Dot-grid accent ── */}
          <div className="absolute grid grid-cols-5 gap-[10px] pointer-events-none" style={{ right: 8, top: 12 }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-[3px] h-[3px] rounded-full"
                style={{ background: `rgba(197,43,33,${0.10 + (i % 4) * 0.06})` }}
                animate={{ opacity: [0.25, 0.75, 0.25] }}
                transition={{ duration: 2.5 + (i % 5) * 0.4, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
          </div>

          {/* ══════════════════════════
              MAIN PHOTO CARD
          ══════════════════════════ */}
          <motion.div
            className="absolute overflow-hidden"
            style={{
              width: '76%',
              height: '85%',
              right: '4%',
              top: '5%',
              borderRadius: '28px 28px 56px 18px',
              boxShadow: '0 36px 80px -12px rgba(44,24,16,0.28), 0 0 0 1px rgba(197,43,33,0.10)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Fallback background */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #F7EDE9 0%, #DEB8A8 100%)' }}
            />

            {/* Brand photo */}
            <Image
              src="/images/peko-beauty-reception-desk-mong-kok.jpg"
              alt="Peko Beauty 旺角旗艦店"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 380px, 500px"
              priority
            />

            {/* Warm gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(160deg, rgba(197,43,33,0.04) 0%, transparent 38%, rgba(44,24,16,0.42) 100%)',
              }}
            />

          </motion.div>

          {/* ══════════════════════════
              浮動卡片 1 — 服務年資
          ══════════════════════════ */}
          <motion.div
            className="absolute z-10 cursor-default"
            style={{ left: '18%', top: '7%' }}
            initial={{ opacity: 0, x: -36, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06, y: -4 }}
              style={{
                background: 'rgba(255,255,255,0.94)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                borderRadius: '18px',
                border: '1px solid rgba(197,43,33,0.14)',
                padding: '14px 18px',
                boxShadow: '0 16px 48px -8px rgba(44,24,16,0.16), inset 0 0 0 1px rgba(255,255,255,0.85)',
                minWidth: 148,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(197,43,33,0.07)' }}
                >
                  <Star size={16} color={BRAND} strokeWidth={1.5} />
                </div>
                <div>
                  <div
                    className="font-playfair text-[26px] text-[#C52B21] leading-none"
                    style={{ fontWeight: 300 }}
                  >
                    <SpringCounter to={10} suffix="+" delay={1.15} />
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.32em] text-[#8B6B63]/65 mt-[3px]">
                    年行業經驗
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════
              浮動卡片 2 — Hard Sell 承諾
          ══════════════════════════ */}
          <motion.div
            className="absolute z-10 cursor-default"
            style={{ left: '22%', bottom: '14%' }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.28, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              whileHover={{ scale: 1.06, y: -2 }}
              style={{
                background: 'linear-gradient(135deg, #C52B21 0%, #A52019 100%)',
                borderRadius: '18px',
                padding: '14px 20px',
                boxShadow: '0 20px 56px -8px rgba(197,43,33,0.50), 0 0 0 1px rgba(255,255,255,0.08) inset',
                minWidth: 162,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <Shield size={16} color="white" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-white font-playfair text-[22px] leading-none" style={{ fontWeight: 300 }}>
                    0
                  </div>
                  <div className="text-white/70 text-[9px] uppercase tracking-[0.32em] mt-[3px]">
                    Hard Sell 承諾
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════
              浮動卡片 3 — 累積客戶
          ══════════════════════════ */}
          <motion.div
            className="absolute z-10 cursor-default"
            style={{ right: '1%', bottom: '18%' }}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.50, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              whileHover={{ scale: 1.06, y: -3 }}
              style={{
                background: 'rgba(255,255,255,0.94)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                borderRadius: '18px',
                border: '1px solid rgba(197,43,33,0.11)',
                padding: '12px 16px',
                boxShadow: '0 10px 36px -6px rgba(44,24,16,0.13), inset 0 0 0 1px rgba(255,255,255,0.85)',
                minWidth: 148,
              }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar stack */}
                <div className="flex -space-x-[9px] flex-shrink-0">
                  {['#E8C4B4', '#D4A090', '#C08070'].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex-shrink-0"
                      style={{ background: c, zIndex: 3 - i }}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <div
                      className="font-playfair text-[22px] text-[#C52B21] leading-none"
                      style={{ fontWeight: 300 }}
                    >
                      <SpringCounter to={5000} suffix="+" delay={1.6} />
                    </div>
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.28em] text-[#8B6B63]/65 mt-[3px] flex items-center gap-1">
                    <Users size={8} color="rgba(139,107,99,0.55)" strokeWidth={1.5} />
                    位信任客戶
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════
              浮動徽章 — 原廠正貨
          ══════════════════════════ */}
          <motion.div
            className="absolute z-10 cursor-default"
            style={{ right: '5%', top: '3%' }}
            initial={{ opacity: 0, scale: 0.65, rotate: 14 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.72, duration: 0.85, ease: 'backOut' }}
          >
            <motion.div
              animate={{ rotate: [0, 2.5, -2.5, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08 }}
              style={{
                background: '#2C1810',
                borderRadius: '16px',
                padding: '11px 16px',
                boxShadow: '0 10px 32px rgba(44,24,16,0.30)',
                textAlign: 'center',
              }}
            >
              <div className="text-white/50 text-[8px] uppercase tracking-[0.45em] mb-[2px]">原廠</div>
              <div
                className="font-playfair text-[#C52B21] text-[22px] leading-none"
                style={{ fontWeight: 300 }}
              >
                100%
              </div>
              <div className="text-white/45 text-[8px] uppercase tracking-[0.35em] mt-[2px]">正貨保證</div>
            </motion.div>
          </motion.div>

          {/* ── Subtle corner glow ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: 0,
              background: 'radial-gradient(ellipse at 80% 20%, rgba(197,43,33,0.07) 0%, transparent 55%)',
              borderRadius: '2rem',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. MAGNETIC BUTTON  (cursor attraction micro-interaction)
═══════════════════════════════════════════════════════════ */
function MagneticButton({
  children, className, style, onClick, strength = 0.45,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx   = rect.left + rect.width / 2;
    const cy   = rect.top  + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  const handleClick      = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const id   = Date.now();
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    onClick?.();
  };

  return (
    <motion.button
      ref={ref}
      style={{ ...style, x: sx, y: sy, position: 'relative', overflow: 'hidden' }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
    >
      {children}
      {ripples.map(r => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.45 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: r.x, top: r.y,
            width: 40, height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. WORD-BY-WORD REVEAL
═══════════════════════════════════════════════════════════ */
function WordReveal({ text, delay = 0, className = '' }: {
  text: string; delay?: number; className?: string;
}) {
  const words = text.split('');
  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {words.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, rotateX: -60, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. ANIMATED SPRING COUNTER
═══════════════════════════════════════════════════════════ */
function SpringCounter({ to, suffix = '', delay = 0 }: {
  to: number; suffix?: string; delay?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(0, to, {
        duration: 2.2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: v => setCurrent(Math.round(v)),
      });
      return controls.stop;
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [to, delay]);

  return <span>{current.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════
   7. DECORATIVE SVG CURVES
═══════════════════════════════════════════════════════════ */
function DecorativeCurves() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
      <motion.path
        d="M -80 250 Q 300 100 700 280 Q 1100 450 1520 200"
        stroke="rgba(197,43,33,0.10)" strokeWidth="0.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.5, delay: 1.2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M -80 420 Q 400 260 800 440 Q 1100 580 1520 360"
        stroke="rgba(197,43,33,0.06)" strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4, delay: 1.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 800 -20 Q 960 300 850 660 Q 780 900 920 1000"
        stroke="rgba(197,43,33,0.05)" strokeWidth="0.6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 2.4, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. MIST REVEAL  (blur-fade-up)
═══════════════════════════════════════════════════════════ */
function MistReveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   9. WAVE DIVIDER
═══════════════════════════════════════════════════════════ */
const WaveDivider = () => (
  <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10 overflow-hidden" style={{ height: 90 }}>
    <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none" className="w-full h-full">
      <motion.path
        d="M0 90L60 80C120 70 240 50 360 46.7C480 43.3 600 56.7 720 61.7C840 66.7 960 63.3 1080 54.5C1200 45.7 1320 31.3 1380 24.7L1440 18V90H1380C1320 90 1200 90 1080 90C960 90 840 90 720 90C600 90 480 90 360 90C240 90 120 90 60 90H0Z"
        fill="#2C1810"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   10. MOBILE HERO CARD  (photo + metric chips, mobile only)
═══════════════════════════════════════════════════════════ */
function MobileHeroCard() {
  return (
    <motion.div
      className="block lg:hidden relative w-full rounded-3xl overflow-hidden my-8"
      style={{ aspectRatio: '4/3' }}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Fallback */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #F7EDE9 0%, #DEB8A8 100%)' }}
      />

      {/* Photo */}
      <Image
        src="/images/peko-beauty-reception-desk-mong-kok.jpg"
        alt="Peko Beauty 旺角旗艦店"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw"
        priority
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.58) 0%, transparent 55%)' }}
      />

      {/* Metric chips */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap">
        {/* 5+ years */}
        <div
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 99,
            padding: '6px 14px',
            border: '1px solid rgba(197,43,33,0.14)',
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          <span className="font-playfair text-[#C52B21]" style={{ fontSize: 15, fontWeight: 300 }}>10+</span>
          <span style={{ fontSize: 9, color: 'rgba(90,60,55,0.68)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            年行業經驗
          </span>
        </div>

        {/* 5000+ customers */}
        <div
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 99,
            padding: '6px 14px',
            border: '1px solid rgba(197,43,33,0.14)',
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          <span className="font-playfair text-[#C52B21]" style={{ fontSize: 15, fontWeight: 300 }}>5,000+</span>
          <span style={{ fontSize: 9, color: 'rgba(90,60,55,0.68)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            位信任客戶
          </span>
        </div>

        {/* 0 Hard Sell */}
        <div
          style={{
            background: 'rgba(197,43,33,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 99,
            padding: '6px 14px',
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          <span className="font-playfair text-white" style={{ fontSize: 15, fontWeight: 300 }}>0</span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Hard Sell
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   11. FLOATING BADGE  (pulse micro-interaction)
═══════════════════════════════════════════════════════════ */
function FloatingBadge({ text, icon, delay = 0 }: {
  text: string; icon?: React.ReactNode; delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="flex items-center gap-2 cursor-default"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'backOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3 }}
    >
      <motion.div
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px 6px 10px',
          background: hovered ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${hovered ? 'rgba(197,43,33,0.35)' : 'rgba(197,43,33,0.18)'}`,
          borderRadius: 99,
          boxShadow: hovered ? '0 8px 24px rgba(197,43,33,0.12)' : '0 2px 12px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
        }}
      >
        <span className="relative flex" style={{ width: 8, height: 8 }}>
          <motion.span
            className="absolute inline-flex rounded-full"
            style={{ background: BRAND, inset: 0 }}
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: BRAND }} />
        </span>
        {icon}
        <span style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(90,60,55,0.8)',
        }}>
          {text}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
═══════════════════════════════════════════════════════════ */
export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX  = useSpring(0, { stiffness: 60, damping: 25 });
  const glowY  = useSpring(0, { stiffness: 60, damping: 25 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgScale  = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    glowX.set(e.clientX);
    glowY.set(e.clientY);
    mouseX.set(e.clientX / window.innerWidth  - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  }, [glowX, glowY, mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #FEFCF8 0%, #FBF5F2 45%, #F7EDE9 100%)' }}
    >
      {/* ── Animated silk blobs ── */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 overflow-hidden">
        {blobs.map((blob, i) => (
          <motion.div key={i}
            className="absolute rounded-full"
            style={{ width: blob.w, height: blob.h, background: blob.color, filter: 'blur(72px)', top: 0, left: 0 }}
            animate={blob.animate}
            transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
          />
        ))}
      </motion.div>

      {/* ── Decorative SVG curves ── */}
      <DecorativeCurves />

      {/* ── Mouse-follow glow ── */}
      <motion.div
        className="fixed w-[520px] h-[520px] rounded-full pointer-events-none z-0"
        style={{
          x: glowX, y: glowY,
          translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(197,43,33,0.08) 0%, rgba(197,43,33,0.03) 40%, transparent 68%)',
          filter: 'blur(32px)',
        }}
      />

      {/* ── Seamless wave ── */}
      <WaveDivider />

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT  (Left text + Right panel grid)
      ══════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-28 lg:pt-36 pb-16 lg:pb-28"
      >
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ════════════════════
              LEFT — Text Content
          ════════════════════ */}
          <div className="max-w-2xl">

            {/* Eyebrow row */}
            <MistReveal delay={0.15}>
              <div className="flex items-center gap-5 mb-8 flex-wrap">
                <motion.div
                  className="h-[1px] bg-gradient-to-r from-[#C52B21]/55 to-transparent flex-shrink-0"
                  style={{ width: 44 }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.45 }}
                />
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-[10px] font-medium tracking-[0.6em] uppercase text-[#C52B21]/70">
                    Peko Beauty · 品牌理念
                  </span>
                  <FloatingBadge text="旺角旗艦店" delay={0.9} />
                </div>
              </div>
            </MistReveal>

            {/* Headline — 3D word-by-word reveal */}
            <div className="mb-8 overflow-hidden" style={{ perspective: '800px' }}>
              <h1 className="font-playfair leading-[1.15]"
                style={{ fontSize: 'clamp(1.85rem, 3.2vw, 3.0rem)', fontWeight: 300, color: BRAND_DARK }}>
                <WordReveal text="以科學與誠信，" delay={0.28} />
              </h1>
              <h1 className="font-playfair leading-[1.1]"
                style={{ fontSize: 'clamp(1.85rem, 3.2vw, 3.0rem)', fontWeight: 300 }}>
                {'重新定義'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    style={{
                      display: 'inline-block',
                      backgroundImage: 'linear-gradient(135deg, #C52B21 0%, #E0392D 50%, #C52B21 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      transformOrigin: 'bottom center',
                    }}
                    initial={{ opacity: 0, y: 30, rotateX: -60, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, delay: 0.58 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
              <h1 className="font-playfair leading-[1.15]"
                style={{ fontSize: 'clamp(1.85rem, 3.2vw, 3.0rem)', fontWeight: 300, color: BRAND_DARK }}>
                <WordReveal text="醫學美容基準。" delay={0.88} />
              </h1>
            </div>

            {/* Mobile photo card */}
            <MobileHeroCard />

            {/* Sub-headline */}
            <MistReveal delay={1.08}>
              <p className="text-base md:text-lg leading-[2.1] max-w-xl mb-8 lg:mb-12 font-light"
                style={{ color: 'rgba(90,74,68,0.85)', letterSpacing: '0.01em' }}>
                不追逐短暫的表面修飾，Peko Beauty 致力結合頂尖{' '}
                <motion.span
                  className="font-medium relative inline-block"
                  style={{ color: BRAND }}
                  whileHover={{ scale: 1.04 }}
                >
                  AI 數據分析
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1px] w-full"
                    style={{ background: BRAND, scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.span>
                {' '}與零壓力的純粹體驗，為您尋回肌膚最健康的本源。
              </p>
            </MistReveal>

            {/* CTAs */}
            <MistReveal delay={1.24}>
              <div className="flex flex-col sm:flex-row gap-5 items-start">

                {/* Primary — Magnetic + Ripple */}
                <MagneticButton
                  className="group relative inline-flex items-center gap-3 rounded-full bg-[#C52B21] text-white"
                  style={{
                    padding: '15px 38px',
                    fontWeight: 600, fontSize: '11px',
                    letterSpacing: '0.42em', textTransform: 'uppercase',
                    boxShadow: '0 14px 40px -8px rgba(197,43,33,0.45)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => document.getElementById('peko-standard')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #D63520, #C52B21)' }}
                    whileHover={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    探索 Peko 標準
                    <motion.span whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <ArrowRight size={13} />
                    </motion.span>
                  </span>
                </MagneticButton>

                {/* Secondary — ghost with shimmer */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                >
                  <Link href="/booking"
                    className="relative inline-flex items-center gap-2 overflow-hidden rounded-full group"
                    style={{
                      padding: '15px 30px',
                      border: '1px solid rgba(197,43,33,0.28)',
                      color: 'rgba(140,60,50,0.82)',
                      fontWeight: 600, fontSize: '11px',
                      letterSpacing: '0.38em', textTransform: 'uppercase',
                      backdropFilter: 'blur(10px)',
                      background: 'rgba(255,255,255,0.50)',
                      boxShadow: '0 4px 20px rgba(197,43,33,0.08)',
                    }}
                  >
                    <motion.span
                      className="absolute inset-0"
                      initial={{ x: '-100%' }}
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                      }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">預約免費諮詢</span>
                  </Link>
                </motion.div>
              </div>
            </MistReveal>

            {/* Scroll cue */}
            <MistReveal delay={1.55}>
              <div className="mt-8 lg:mt-14 flex items-center gap-6">
                <motion.div className="h-[1px]"
                  style={{ width: 44, background: `linear-gradient(to right, rgba(197,43,33,0.5), rgba(197,43,33,0.06))` }}
                  initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.7 }}
                />
                <button
                  onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 group transition-opacity duration-300 hover:opacity-80"
                  style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.6em', textTransform: 'uppercase', color: 'rgba(197,43,33,0.55)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  繼續探索
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronDown size={11} />
                  </motion.div>
                </button>
              </div>
            </MistReveal>
          </div>

          {/* ════════════════════
              RIGHT — Photo Panel
          ════════════════════ */}
          <HeroRightPanel mouseX={mouseX} mouseY={mouseY} />

        </div>{/* end grid */}
      </motion.div>

    </section>
  );
}
