"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ShieldCheck,
  Users,
  HeartOff,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Star,
  Sparkles,
  Award,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const advantages = [
  {
    icon: ShieldCheck,
    title: "100% 原廠正貨",
    desc: "所有儀器及耗材均附原廠認證，現場可掃碼核實，確保療程安全及有效。",
    highlight: "安全保障",
    color: "from-emerald-400 to-teal-500",
    colorRaw: ["#34d399", "#14b8a6"],
    glow: "rgba(52,211,153,0.25)",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-600",
    number: "01",
  },
  {
    icon: Users,
    title: "全女班專業團隊",
    desc: "從諮詢到操作均由經驗豐富的女性治療師負責，給予您高度私隱與同理心。",
    highlight: "私隱貼心",
    color: "from-purple-400 to-indigo-500",
    colorRaw: ["#a78bfa", "#6366f1"],
    glow: "rgba(167,139,250,0.25)",
    accentBg: "bg-purple-50",
    accentText: "text-purple-600",
    number: "02",
  },
  {
    icon: HeartOff,
    title: "絕無 Hard Sell",
    desc: "我們主張效果為本，明碼實價。不靠強迫推銷，只靠口碑與數據留住客戶。",
    highlight: "誠信透明",
    color: "from-rose-400 to-[#C52B21]",
    colorRaw: ["#fb7185", "#C52B21"],
    glow: "rgba(197,43,33,0.25)",
    accentBg: "bg-rose-50",
    accentText: "text-rose-600",
    number: "03",
  },
  {
    icon: TrendingUp,
    title: "數據化追蹤",
    desc: "結合 VISIA 影像數據，每一步的改善都清晰可見，拒絕盲目單次收費。",
    highlight: "效果可見",
    color: "from-amber-400 to-orange-500",
    colorRaw: ["#fbbf24", "#f97316"],
    glow: "rgba(251,191,36,0.25)",
    accentBg: "bg-amber-50",
    accentText: "text-amber-600",
    number: "04",
  },
];

const stats = [
  { label: "服務人次", value: 15000, suffix: "+", icon: Users },
  { label: "客戶滿意度", value: 99, suffix: "%", icon: Star },
  { label: "原廠認證儀器", value: 20, suffix: "+", icon: Award },
  { label: "專業治療師", value: 15, suffix: "+", icon: Sparkles },
];

const testimonials = [
  {
    text: "第一次做醫美，本來很擔心被推銷，但全程都很舒適，治療師非常專業，效果也超出預期！",
    author: "Mandy C.",
    treatment: "HIFU 提升療程",
    rating: 5,
  },
  {
    text: "VISIA 分析讓我清楚看到皮膚問題所在，療程後對比非常明顯，真的很值得！",
    author: "Kelly L.",
    treatment: "VISIA 皮膚分析",
    rating: 5,
  },
  {
    text: "全女班環境讓我非常放鬆，治療師很有耐心解釋每個步驟，完全沒有壓力。",
    author: "Vivian T.",
    treatment: "激光嫩膚療程",
    rating: 5,
  },
];

/* ─────────────────────────────────────────────
   PARTICLE FIELD
───────────────────────────────────────────── */
const ParticleField = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: (i * 5.3 + 7) % 100,
        y: (i * 7.1 + 13) % 100,
        size: (i % 3) + 1.5,
        duration: 7 + (i % 5),
        delay: (i * 0.4) % 4,
        opacity: 0.08 + (i % 4) * 0.04,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#C52B21]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 12, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
            scale: [1, 1.6, 1],
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
  );
};

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2.4,
      onUpdate: (v) => setCount(Math.floor(v)),
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [value, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

/* ─────────────────────────────────────────────
   MAGNETIC WRAPPER
───────────────────────────────────────────── */
const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.28);
      y.set((e.clientY - cy) * 0.28);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   3D ADVANTAGE CARD
───────────────────────────────────────────── */
const AdvantageCard = ({
  item,
  index,
  isActive,
  onClick,
}: {
  item: (typeof advantages)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, mx: 50, my: 50 });
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const active = hovered || isActive;

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotX: -(y - 0.5) * 14,
      rotY: (x - 0.5) * 14,
      mx: x * 100,
      my: y * 100,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.12,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: "1200px" }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ rotX: 0, rotY: 0, mx: 50, my: 50 });
        }}
        style={{
          transform: active
            ? `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) translateZ(12px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: hovered ? "transform 0.1s ease" : "transform 0.6s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: active
            ? `0 40px 80px -15px rgba(0,0,0,0.12), 0 0 0 1px rgba(226,232,240,0.6), 0 0 60px ${item.glow}`
            : "0 2px 20px rgba(0,0,0,0.04), inset 0 0 20px rgba(226,232,240,0.3)",
        }}
        className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 transition-all duration-500 overflow-hidden"
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none transition-opacity duration-400"
          style={{
            background: `radial-gradient(circle 220px at ${tilt.mx}% ${tilt.my}%, ${item.glow}, transparent 70%)`,
            opacity: active ? 1 : 0,
          }}
        />

        {/* Spotlight shimmer */}
        <div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 160px at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.18), transparent 70%)`,
            opacity: active ? 1 : 0,
          }}
        />

        {/* Number badge */}
        <div
          className="absolute top-6 right-7 text-[11px] font-black tracking-widest transition-all duration-400"
          style={{
            color: active ? item.colorRaw[0] : "#e2e8f0",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {item.number}
        </div>

        {/* Highlight badge */}
        <motion.div
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-5 left-6 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${item.accentBg} ${item.accentText}`}
        >
          {item.highlight}
        </motion.div>

        {/* Icon */}
        <div className="mt-8 mb-7">
          <motion.div
            animate={{
              scale: active ? 1.08 : 1,
              rotate: active ? [0, -5, 5, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.35 },
              rotate: { duration: 0.5, ease: "easeInOut" },
            }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
            style={{
              background: active
                ? `linear-gradient(135deg, ${item.colorRaw[0]}, ${item.colorRaw[1]})`
                : "#f8fafc",
              boxShadow: active ? `0 16px 32px ${item.glow}` : "none",
              transition: "background 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            <Icon
              size={26}
              style={{
                color: active ? "#fff" : "#94a3b8",
                transition: "color 0.3s",
              }}
            />
            {active && (
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  background: `linear-gradient(135deg, ${item.colorRaw[0]}, ${item.colorRaw[1]})`,
                }}
              />
            )}
          </motion.div>
        </div>

        <h3
          className="text-xl font-bold mb-4 tracking-tight transition-colors duration-300"
          style={{ color: active ? item.colorRaw[1] : "#111827" }}
        >
          {item.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed font-light">
          {item.desc}
        </p>

        {/* Animated bottom border */}
        <motion.div
          animate={{ scaleX: active ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full origin-left"
          style={{
            background: `linear-gradient(90deg, ${item.colorRaw[0]}, ${item.colorRaw[1]})`,
            boxShadow: `0 0 10px ${item.glow}`,
          }}
        />

        {/* Corner arrow */}
        <motion.div
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 right-6"
        >
          <ArrowRight size={16} style={{ color: item.colorRaw[0] }} className="opacity-70" />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
const StatCard = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-center p-8 rounded-3xl border overflow-hidden cursor-default"
      style={{
        backgroundColor: hovered ? "#fff" : "#FAFAFA",
        borderColor: hovered ? "rgba(197,43,33,0.2)" : "#f1f5f9",
        boxShadow: hovered
          ? "0 24px 60px rgba(197,43,33,0.1), 0 0 0 1px rgba(197,43,33,0.08)"
          : "none",
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          background: "radial-gradient(circle 120px at 50% 50%, rgba(197,43,33,0.06), transparent)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <motion.div
        animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? 10 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-10 h-10 mx-auto mb-4 rounded-xl bg-red-50 flex items-center justify-center"
      >
        <Icon size={18} className="text-[#C52B21]" />
      </motion.div>

      <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tabular-nums">
        <Counter value={stat.value} suffix={stat.suffix} />
      </div>
      <div className="text-xs text-gray-400 font-semibold tracking-widest uppercase">
        {stat.label}
      </div>

      {/* Animated underline */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-1/4 right-1/4 h-[2px] rounded-full origin-center"
        style={{ background: "linear-gradient(90deg, #C52B21, #f472b6)" }}
      />
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   TESTIMONIAL CARD
───────────────────────────────────────────── */
const TestimonialCard = ({
  item,
  index,
  isActive,
}: {
  item: (typeof testimonials)[0];
  index: number;
  isActive: boolean;
}) => (
  <motion.div
    data-testimonial={index}
    initial={{ opacity: 0, x: 40 }}
    animate={{
      opacity: isActive ? 1 : 0.45,
      x: 0,
      scale: isActive ? 1 : 0.96,
    }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="relative p-8 rounded-3xl border flex-shrink-0 w-80 md:w-96 snap-center"
    style={{
      background: isActive
        ? "linear-gradient(135deg, #fff 0%, #fef2f2 100%)"
        : "#fafafa",
      borderColor: isActive ? "rgba(197,43,33,0.15)" : "#f1f5f9",
      boxShadow: isActive ? "0 20px 50px rgba(197,43,33,0.08)" : "none",
    }}
  >
    {/* Quote mark */}
    <div
      className="absolute top-4 right-6 text-6xl font-serif leading-none select-none pointer-events-none"
      style={{ color: "rgba(197,43,33,0.08)" }}
    >
      "
    </div>

    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: item.rating }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + i * 0.06, duration: 0.4 }}
        >
          <Star size={14} className="text-amber-400 fill-amber-400" />
        </motion.div>
      ))}
    </div>

    <p className="text-sm text-gray-600 leading-relaxed mb-6 font-light">
      &ldquo;{item.text}&rdquo;
    </p>

    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C52B21] to-rose-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        {item.author[0]}
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-800">{item.author}</div>
        <div className="text-xs text-gray-400">{item.treatment}</div>
      </div>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   SVG CONNECTING LINE
───────────────────────────────────────────── */
const ConnectingLine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div
      ref={containerRef}
      className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none overflow-hidden"
      style={{ height: "32px" }}
    >
      <svg className="w-full h-full" viewBox="0 0 1200 32" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C52B21" stopOpacity="0" />
            <stop offset="30%" stopColor="#C52B21" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#f472b6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 16 Q 300 4 600 16 Q 900 28 1200 16"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PROGRESS DOTS
───────────────────────────────────────────── */
const ProgressDots = ({
  total,
  active,
  onSelect,
}: {
  total: number;
  active: number;
  onSelect: (i: number) => void;
}) => (
  <div className="flex items-center gap-2 justify-center mt-6">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        className="relative h-2 rounded-full overflow-hidden transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C52B21]"
        style={{ width: i === active ? 28 : 8 }}
        aria-label={`選擇第 ${i + 1} 個評價`}
      >
        <div className="absolute inset-0 bg-gray-200 rounded-full" />
        {i === active && (
          <motion.div
            layoutId="activeDot"
            className="absolute inset-0 rounded-full"
            style={{ background: "linear-gradient(90deg, #C52B21, #f472b6)" }}
          />
        )}
      </button>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
const WhyUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const hasMounted = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  /* Auto-rotate testimonials */
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  /* Scroll testimonial card horizontally — only after first user interaction or auto-rotate */
  useEffect(() => {
    // Skip the very first render to prevent page jumping on load
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const container = testimonialsScrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll("[data-testimonial]");
    const card = cards[activeTestimonial] as HTMLElement;
    if (card) {
      // Use scrollLeft instead of scrollIntoView to avoid page-level scroll
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const offset = cardRect.left - containerRect.left + container.scrollLeft - (containerRect.width - cardRect.width) / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [activeTestimonial]);

  const handleCardClick = useCallback(
    (i: number) => setActiveCard((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section ref={sectionRef} className="py-32 bg-white relative" style={{ overflow: "clip" }}>
      {/* Particle field */}
      <ParticleField />

      {/* Gradient fades */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#FAFAFA] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none z-10" />

      {/* Parallax blobs — clipped inside section, no horizontal overflow */}
      <motion.div
        style={{ y: y1 }}
        className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-rose-50 rounded-full blur-[120px] opacity-40 -z-10 blob-morph translate-x-1/2"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute left-0 bottom-1/4 w-[350px] h-[350px] bg-purple-50 rounded-full blur-[100px] opacity-30 -z-10 blob-morph-slow -translate-x-1/2"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-50 rounded-full blur-[140px] opacity-20 -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#C52B21] text-xs font-bold tracking-widest uppercase mb-8"
          >
            <CheckCircle2 size={14} />
            Why Choose Peko Beauty
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight mb-8"
          >
            超越傳統美容 ·{" "}
            <span className="font-bold text-[#C52B21]">定義專業標準</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 text-lg font-light leading-relaxed"
          >
            我們深知每一位顧客對美的追求與擔憂。Peko Beauty 以誠信為基石，
            結合頂尖科技與全女班專業團隊，為您提供最安心的醫美體驗。
          </motion.p>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 h-px w-32 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #C52B21, transparent)" }}
          />
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* ── Advantages grid with connecting line ── */}
        <div className="relative mb-24">
          <ConnectingLine />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {advantages.map((item, i) => (
              <AdvantageCard
                key={item.title}
                item={item}
                index={i}
                isActive={activeCard === i}
                onClick={() => handleCardClick(i)}
              />
            ))}
          </div>
          {/* Hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-gray-300 mt-6 tracking-wider"
          >
            點擊卡片了解更多 · Hover to explore
          </motion.p>
        </div>

        {/* ── Testimonials horizontal scroll ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-xs font-bold tracking-widest uppercase mb-4"
            >
              <Star size={12} className="fill-amber-400 text-amber-400" />
              真實客戶評價
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-light text-gray-800">
              她們的<span className="font-bold text-[#C52B21]">真實體驗</span>
            </h3>
          </div>

          {/* Scrollable testimonials */}
          <div
            ref={testimonialsScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 md:px-0 md:justify-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {testimonials.map((item, i) => (
              <TestimonialCard
                key={i}
                item={item}
                index={i}
                isActive={activeTestimonial === i}
              />
            ))}
          </div>

          <ProgressDots
            total={testimonials.length}
            active={activeTestimonial}
            onSelect={(i) => {
              setActiveTestimonial(i);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 8000);
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default WhyUs;
