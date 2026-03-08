"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Award,
  Users,
  ThumbsUp,
  ChevronDown,
  MessageCircle,
  MapPin,
  Clock,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// REUSABLE: ReadMoreText — truncates on mobile, expands on tap
// ─────────────────────────────────────────────────────────────
function ReadMoreText({
  children,
  lines = 3,
  className = "",
}: {
  children: React.ReactNode;
  lines?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const lineClampClass = !expanded ? `line-clamp-${lines}` : "";
  return (
    <div className={className}>
      <div className={`md:line-clamp-none ${lineClampClass}`}>{children}</div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="md:hidden mt-1 text-[#C52B21] text-xs font-semibold hover:underline"
      >
        {expanded ? "收起 ▲" : "展開更多 ▼"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const BRAND_RED = "#C52B21";
const WA_LINK =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20BTL%20Exion%20黃金微針試做優惠";
const WA_BOOKING =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想預約%20BTL%20Exion%20黃金微針試做，請問有咩時間？";

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS — ease as cubic-bezier array to satisfy TS
// ─────────────────────────────────────────────────────────────
const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

// ─────────────────────────────────────────────────────────────
// REUSABLE: AnimatedSection wrapper
// ─────────────────────────────────────────────────────────────
function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────
// REUSABLE: WhatsApp CTA Button
// ─────────────────────────────────────────────────────────────
function WhatsAppButton({
  href = WA_LINK,
  text = "💬 WhatsApp 預約試做 — HK$2,980",
  className = "",
  large = true,
  fullWidth = false,
}: {
  href?: string;
  text?: string;
  className?: string;
  large?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold rounded-lg transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-xl active:scale-[0.98] ${
        large ? "px-8 py-5 text-lg md:text-xl" : "px-6 py-4 text-base"
      } ${fullWidth ? "w-full" : ""} ${className}`}
      style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.40)" }}
    >
      {text}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 1: STICKY NAV (desktop only)
// ─────────────────────────────────────────────────────────────
function StickyNav() {
  const navItems = [
    { label: "療程數據", id: "treatment-stats" },
    { label: "技術原理", id: "science" },
    { label: "療程比較", id: "comparison" },
    { label: "客人見證", id: "results" },
    { label: "常見問題", id: "faq" },
    { label: "收費", id: "pricing" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden md:block sticky top-[64px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center gap-6 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-xs font-semibold text-gray-500 hover:text-[#C52B21] transition-colors duration-150 pb-0.5 border-b-2 border-transparent hover:border-[#C52B21]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 2: HERO
// ─────────────────────────────────────────────────────────────
function HeroSection() {
  const trustBadges = [
    "🏆 美國 FDA Class II 認證",
    "⚡ AI Single Pass 痛感低 50%",
    "👩‍⚕️ 全女班專業團隊",
    "🚫 絕無硬銷",
    "⭐ 5,000+ 真實好評",
  ];

  const stats = [
    { val: "70–85%", label: "痘疤改善率" },
    { val: "60%", label: "毛孔收細" },
    { val: "1–3天", label: "極短恢復期" },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#fdf8f0] to-white pt-20"
    >
      {/* ── 大圖區域（全寬、帶 badges 疊加）── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden"
      >
        <Image
          src="/images/peko-beauty-reception-desk-mong-kok.jpg"
          alt="Peko Beauty BTL Exion 黃金微針 RF 微針射頻 凹凸洞毛孔改善 旺角朗豪坊醫美中心"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* 底部漸層 — badges 可讀性 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {/* 右上角限時優惠標籤 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
          className="absolute top-4 right-4"
        >
          <span
            className="text-white text-xs md:text-sm font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5"
            style={{ background: BRAND_RED }}
          >
            ✨ 新客試做 HK$2,980
          </span>
        </motion.div>

        {/* 底部 Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
          className="absolute bottom-4 left-0 right-0 px-4"
        >
          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full font-semibold border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── 文字 + CTA 區域 ── */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-14 text-center">

        {/* H1 — SEO 優化標題（高 CTR · 覆蓋多元搜尋意圖）*/}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
          className="text-[clamp(20px,4vw,40px)] font-black leading-[1.3] text-gray-900 mb-5 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion 黃金微針 香港｜AI Single Pass 深層重塑
          <br />
          <span className="text-[clamp(16px,3vw,28px)] font-bold text-gray-600">
            痘疤 70–85% · 毛孔收細 60% · 痛感低 50%
            <span className="hidden sm:inline"> — </span>
            <br className="sm:hidden" />
            效果 / 次數 / 技術原理完整解析
          </span>
          <br />
          <span className="text-[clamp(14px,2.5vw,22px)] font-black" style={{ color: BRAND_RED }}>
            試做 HK$2,880｜旺角朗豪坊 · FDA Class II 認證
          </span>
        </motion.h1>

        {/* 三大數據卡 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }}
          className="flex justify-center gap-2 md:gap-4 mb-6 w-full max-w-sm mx-auto"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-amber-50 border border-amber-100 rounded-xl px-2 md:px-5 py-2.5 text-center flex-1"
            >
              <div className="text-sm md:text-xl font-black text-amber-700 leading-tight whitespace-nowrap">{s.val}</div>
              <div className="text-[9px] md:text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE_OUT }}
          className="text-gray-500 text-sm md:text-base max-w-lg mx-auto mb-7 leading-relaxed"
        >
          BTL Exion 全球首創 <strong>AI Single Pass 單次通過技術</strong>，24K 黃金絕緣微針，深度可調 0.5–4.0mm，FDA Class II 認證。
          <span className="hidden md:inline">Single Pass 設計令每點只穿刺一次，較傳統多 Pass 微針痛感降低 50%，精準輸送 RF 能量至真皮層，刺激膠原重塑，痘疤改善率 70–85%、毛孔收細 60%。</span>
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.42, ease: EASE_OUT }}
          className="flex flex-col items-center gap-3"
        >
          <WhatsAppButton href={WA_LINK} />
          <p className="text-xs text-gray-400">✅ 新客限定 · 明碼實價 · 到店後無需即場決定</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 3: PAIN POINTS
// ─────────────────────────────────────────────────────────────
function PainPointsSection() {
  const points = [
    {
      emoji: "😟",
      tag: "凹凸洞困擾",
      title: "暗瘡好了，但留下凹凸洞，皮膚唔平",
      desc: "暗瘡消退後留下的凹陷疤痕最難處理——護膚品完全滲透唔到真皮層，無論用幾貴的精華都無法令皮膚真正平滑，因為凹凸洞是真皮層膠原蛋白受損缺失的結果，需要從底層重建才能改善。",
      imgSrc: null as string | null,
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
    },
    {
      emoji: "😔",
      tag: "粗毛孔問題",
      title: "毛孔越來越大，用收縮水都無用",
      desc: "毛孔粗大的根本原因係皮脂腺分泌旺盛加上真皮層彈力蛋白流失，令毛孔「彈」唔返去細。用化妝水或偏磨砂類護膚品只係暫時性收縮，並非真正從根源縮小毛孔，更有機會因為刺激而令情況更差。",
      imgSrc: null as string | null,
      gradient: "from-amber-200 via-orange-100 to-yellow-50",
      accentColor: "#d97706",
    },
    {
      emoji: "😩",
      tag: "皮膚紋理差",
      title: "皮膚表面粗糙不均，妝容不服貼",
      desc: "皮膚紋理粗糙、上妝唔服貼、膚質唔均勻，係真皮層膠原蛋白不規則排列的表現。很多人試過去角質、導入，只改善表皮角質問題，但真正令皮膚「幼滑」的，需要重整真皮層的膠原蛋白結構。",
      imgSrc: null as string | null,
      gradient: "from-violet-200 via-purple-100 to-indigo-50",
      accentColor: "#7c3aed",
    },
    {
      emoji: "😤",
      tag: "初老細紋",
      title: "眼周、額頭、嘴角細紋早出現",
      desc: "25 歲後膠原蛋白開始流失，加上頻繁表情動作，令紋路逐漸定形。若不及時介入，細紋會逐步加深成為動態紋和靜態紋——用眼霜、抗老精華只係補水，根本無法逆轉真皮層已流失的膠原支撐。",
      imgSrc: null as string | null,
      gradient: "from-sky-200 via-blue-100 to-cyan-50",
      accentColor: "#0284c7",
    },
  ];

  return (
    <AnimatedSection id="pain-points" className="py-12 md:py-16 px-4 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div variants={fadeUp} className="text-center mb-10 md:mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C52B21] mb-3 px-4 py-1.5 bg-red-50 rounded-full border border-red-100">
            你的困擾
          </span>
          <h2
            className="text-2xl md:text-[2rem] font-black text-gray-900 mb-3 leading-tight"
            style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
          >
            你係咪試過呢啲情況？
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            這些皮膚問題，護膚品永遠只能治標——因為根源在真皮層，外搽根本到達不了
          </p>
        </motion.div>

        {/* Image-first 2×2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {points.map((p) => (
            <motion.div
              key={p.title}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* ── Image / Placeholder Area ── */}
              <div className="relative aspect-[16/9] overflow-hidden">
                {p.imgSrc ? (
                  <Image
                    src={p.imgSrc}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : (
                  /* ── 圖片佔位區：待有素材後將此 div 換成 <Image> ── */
                  <div
                    className={`w-full h-full bg-gradient-to-br ${p.gradient} flex flex-col items-center justify-center gap-3 transition-transform duration-500 group-hover:scale-105`}
                  >
                    <span className="text-6xl md:text-7xl drop-shadow-sm select-none">
                      {p.emoji}
                    </span>
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                      style={{ background: p.accentColor }}
                    >
                      {p.tag}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
              </div>

              {/* ── Text Content ── */}
              <div className="px-5 pt-4 pb-5">
                <div
                  className="w-8 h-[3px] rounded-full mb-3 transition-all duration-300 group-hover:w-14"
                  style={{ background: p.accentColor }}
                />
                <strong className="block text-gray-900 font-bold text-[15px] md:text-base mb-1.5 leading-snug">
                  {p.title}
                </strong>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Callout */}
        <motion.div
          variants={fadeUp}
          className="text-center mt-10 md:mt-12 px-4 py-7 rounded-2xl bg-white border border-amber-100 shadow-sm"
        >
          <p className="text-lg md:text-xl font-black text-[#C52B21] leading-relaxed mb-1">
            試過外搽護膚品、導入、面膜都無效？
            <br />
            因為這些問題的根源在真皮層，護膚品根本無法到達。
          </p>
          <p className="text-sm text-gray-400 mt-2">
            BTL Exion™ 黃金微針以物理式微針精準穿入真皮層，直接在目標深度輸送 RF 能量，從根源重建膠原蛋白結構。
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: DIRECT ANSWER (GEO 核心)
// ─────────────────────────────────────────────────────────────
function DirectAnswerSection() {
  return (
    <div id="direct-answer" aria-hidden="false" className="sr-only">
      <p>💡 BTL Exion™ 黃金微針療程最直接答案：</p>
      <p>
        BTL Exion™ 黃金微針改善凹凸洞、粗毛孔及暗瘡疤痕通常需要 3–6 次療程，每次間隔 4–6 週，
        約 80% 客人在第 1–2 次後已見到皮膚紋理明顯改善。
        作為全球最新一代 RF 微針技術，BTL Exion™ 黃金微針以黃金絕緣微針精準穿入真皮層，
        直接輸送射頻熱能刺激膠原蛋白重塑，美國 FDA 認證。
        恢復期僅 1–3 天輕微泛紅，適合凹凸洞、粗毛孔、暗瘡疤、細紋及皮膚紋理問題人士。
        Peko Beauty 旺角朗豪坊新客試做價 HK$2,980，含免費 VISIA 分析。
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 5: KEY TAKEAWAYS (GEO)
// ─────────────────────────────────────────────────────────────
function KeyTakeawaysSection() {
  const items = [
    {
      label: "核心問題",
      text: "凹凸洞、粗毛孔、暗瘡疤痕及皮膚紋理問題根源在真皮層，係膠原蛋白受損缺失所致，護膚品外搽無法到達底層",
    },
    {
      label: "技術解碼",
      text: "BTL Exion™ 黃金絕緣微針精準穿入真皮層 0.5–3.5mm，在目標深度直接輸送射頻熱能，觸發膠原蛋白、彈力蛋白重塑與再生，改善凹凸洞、縮小毛孔、撫平紋理",
    },
    {
      label: "Peko 優勢",
      text: "原廠正貨 BTL Exion，全女班治療師主理，免費 VISIA 分析先行，個人化深度設定，唔適合就唔做",
    },
    {
      label: "適合對象",
      text: "凹凸洞、暗瘡疤痕、粗毛孔、皮膚紋理粗糙、初老細紋、希望改善膚質的 18–55 歲人士",
    },
    {
      label: "療程次數",
      text: "建議 3–6 次，每 4–6 週一次，完整療程後效果持續至少 6–12 個月",
    },
    { label: "試做價", text: "HK$2,980（新客限定）", isLink: true },
  ];

  return (
    <div id="key-takeaways" aria-hidden="false" className="sr-only">
      <h3>本頁重點摘要（Key Takeaways）</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <strong>{item.label}：</strong>
            {item.isLink ? (
              <>{item.text}，歡迎 <a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp 查詢</a></>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 6: TREATMENT STATS TABLE
// ─────────────────────────────────────────────────────────────
function TreatmentStatsSection() {
  const rows = [
    { icon: "⏱", label: "療程時間", value: "約 60–90 分鐘（含敷舒緩膏 30–45 分鐘及實際治療時間）" },
    {
      icon: "😌",
      label: "痛感指數",
      value:
        "2–3/10 — 治療前需敷舒緩膏 30–45 分鐘，治療時感受為輕微刺感及溫熱感，大部分客人可輕鬆完成整個療程",
    },
    {
      icon: "🔴",
      label: "恢復期",
      value: "1–3 天，療程後面部泛紅為正常反應，通常 24–48 小時消退；部分敏感肌可能有輕微點狀結痂，5–7 天脫落",
    },
    { icon: "📅", label: "建議次數", value: "3–6 次，每 4–6 週一次（按個人皮膚狀況及目標調整）" },
    { icon: "✅", label: "見效時間", value: "第 1–2 次後膚質改善已可感受，凹凸洞改善於第 3–4 次後最明顯" },
    {
      icon: "📆",
      label: "效果維持",
      value: "視乎個人膚質及完整療程次數，建議完成 3–6 次療程後效果更穩定，配合防曬及正確護膚可進一步延長",
    },
    {
      icon: "🛡️",
      label: "認證",
      value: "美國 FDA 認證 · 歐盟 CE · 原廠 BTL 正貨儀器",
    },
  ];

  return (
    <AnimatedSection id="treatment-stats" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl md:text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion™ 黃金微針 療程數據一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">
          所有數字來自 Peko Beauty 朗豪坊真實臨床記錄及 BTL 原廠臨床研究數據
        </motion.p>

        <motion.div
          variants={scaleIn}
          className="overflow-hidden rounded-2xl shadow-lg border border-gray-100"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: BRAND_RED }}>
                <th className="text-left text-white px-5 py-4 text-sm font-bold w-2/5">項目</th>
                <th className="text-left text-white px-5 py-4 text-sm font-bold">詳情</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-5 py-4 font-semibold text-gray-800 text-sm border-b border-gray-100">
                    {row.icon} {row.label}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-sm leading-relaxed border-b border-gray-100">
                    {row.value}
                  </td>
                </tr>
              ))}
              <tr className="bg-red-50">
                <td className="px-5 py-5 font-black text-[#C52B21] text-sm">💰 新客試做價</td>
                <td className="px-5 py-5 font-black text-[#C52B21] text-2xl">HK$2,980（全面）</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// THERAPIST NOTE — collapsible on mobile
// ─────────────────────────────────────────────────────────────
function TherapistNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5 md:p-7">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">👩‍⚕️</span>
        <strong className="text-green-800 text-sm md:text-base flex-1">
          治療師筆記 ｜ Peko Beauty 朗豪坊臨床手記
        </strong>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex-shrink-0 text-green-700"
          aria-expanded={open}
        >
          <ChevronDown size={18} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div className={`${open ? "block" : "hidden"} md:block`}>
        <p className="text-gray-700 italic leading-[1.9] text-sm md:text-[15px]">
          &ldquo;BTL Exion 黃金微針係我們店裡改善凹凸洞效果反應最好嘅療程之一。最大的分別係佢的黃金微針係絕緣設計，
          意思係射頻能量只係係針尖位置釋放，唔係沿整支針——所以表皮的熱損傷極少，恢復期比你想像中快好多。
          我有一位 28 歲客人做三次之後，佢自己話上妝服貼程度有明顯分別，朋友問佢係咪換咗護膚品。
          黃金微針最需要的係耐心——膠原重塑需要時間，但係第 2–3 次治療後客人通常都好驚喜。&rdquo;
        </p>
        <p className="text-xs text-gray-400 mt-3">— Peko Beauty 資深治療師，旺角朗豪坊診所</p>
      </div>
      {!open && (
        <p className="md:hidden text-gray-500 italic text-xs line-clamp-2">
          &ldquo;BTL Exion 黃金微針係我們店裡改善凹凸洞效果反應最好嘅療程之一。最大的分別係佢的黃金微針係絕緣設計……&rdquo;
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 7: SCIENCE
// ─────────────────────────────────────────────────────────────
function ScienceSection() {
  const stats = [
    { value: "70%+", label: "凹凸洞改善率" },
    { value: "40%+", label: "毛孔縮小程度" },
    { value: "3.5mm", label: "最大穿刺深度" },
    { value: "95%", label: "客人整體滿意度" },
  ];

  return (
    <AnimatedSection id="science" className="py-10 md:py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-8"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion™ 黃金微針點樣解決凹凸洞？
          <br className="hidden sm:block" />
          RF 微針射頻技術原理完整拆解
        </motion.h2>

        {/* ❶ Problem */}
        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❶ 問題根源：點解凹凸洞、粗毛孔難以自癒？
        </motion.h3>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-5 text-[15px]">
            凹凸洞（冰鑿型、箱車型疤痕）是暗瘡發炎後真皮層膠原蛋白被破壞、缺失所形成的凹陷結構。
            一旦形成，皮膚自身的修復能力已無法自行填補——因為缺乏足夠訊號刺激成纖維細胞（Fibroblasts）
            再次合成膠原蛋白。粗毛孔亦同理：隨著真皮層彈力蛋白（Elastin）流失，
            支撐毛孔壁的結構減弱，毛孔邊緣向外擴展，用化妝水或收縮噴霧僅屬暫時效果。
          </ReadMoreText>
        </motion.div>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-8 text-[15px]">
            真正改善這些問題的方法，是製造一個「受控的微損傷」——觸發皮膚進入深層修復模式，
            激活大量成纖維細胞分裂增殖，合成新生膠原蛋白填補凹陷、縮小毛孔壁、重塑皮膚結構。
            這正是 RF 微針技術的核心設計理念：以物理刺激 + 熱能，精準啟動皮膚底層的膠原重塑程序。
          </ReadMoreText>
        </motion.div>

        {/* ❷ Tech */}
        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❷ 技術解法：BTL Exion™ 黃金微針如何介入？
        </motion.h3>

        {/* 桌面版：完整技術卡片 */}
        <div className="hidden md:grid grid-cols-2 gap-4 mb-7">
          <motion.div
            variants={scaleIn}
            className="bg-amber-50 rounded-xl p-5 border border-amber-100"
          >
            <div className="font-black text-amber-700 text-xl mb-2">黃金絕緣微針技術</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              針體外層覆蓋<strong>絕緣塗層</strong>，確保射頻能量只在<strong>針尖精準釋放</strong>，
              而非沿整支針均勻散熱。這項創新讓表皮受到的熱損傷降到最低，大幅縮短恢復期，
              同時讓 RF 能量更集中地作用於目標真皮層深度（可調節 0.5mm–3.5mm）。
            </p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            className="bg-rose-50 rounded-xl p-5 border border-rose-100"
          >
            <div className="font-black text-rose-700 text-xl mb-2">AI 精準 RF 能量控制</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              BTL Exion™ 配備<strong>AI 實時溫控系統</strong>，在微針穿刺的同時同步監測皮膚溫度，
              自動調整每個脈衝的射頻能量輸出。這確保真皮層溫度精準維持在最佳膠原重塑範圍
              （<strong>45–65°C</strong>），最大化治療效果，同時完全避免熱傷害風險。
            </p>
          </motion.div>
        </div>

        {/* 手機版：簡化 2 欄說明 */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-6">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-center">
            <div className="font-black text-amber-700 text-base mb-1">黃金絕緣微針</div>
            <p className="text-gray-500 text-xs">針尖精準釋能・表皮損傷極少</p>
          </div>
          <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 text-center">
            <div className="font-black text-rose-700 text-base mb-1">AI RF 溫控</div>
            <p className="text-gray-500 text-xs">實時監測・最佳治療溫度</p>
          </div>
        </div>

        <motion.div variants={fadeUp} className="hidden md:block">
          <ReadMoreText lines={2} className="text-gray-600 leading-[1.9] mb-10 text-[15px]">
            值得留意的是，BTL Exion™ 黃金微針的針具設計為一次性使用（每位客人使用全新針具），
            完全避免交叉感染風險。針体規格採用 34 gauge（極細），刺入時不適感比你想像中低很多，
            配合完整舒緩膏敷用後，大部分客人表示治療過程屬可接受舒適範圍。
          </ReadMoreText>
        </motion.div>
        <div className="md:hidden mb-8" />

        {/* ❸ Clinical data */}
        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-5">
          ❸ 臨床數據：效果有幾好？
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <motion.div
              key={s.value}
              variants={scaleIn}
              className="bg-amber-50 rounded-xl p-5 text-center border border-amber-100"
            >
              <div className="text-3xl md:text-4xl font-black text-amber-700 leading-tight">{s.value}</div>
              <div className="text-xs text-gray-500 mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Therapist note */}
        <TherapistNote />
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 8: PROCESS
// ─────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      num: 1,
      title: "WhatsApp 預約 / 網上預約",
      desc: "透過 WhatsApp +852 5335 3313 預約，客服會在 24 小時內確認時間。BTL Exion™ 黃金微針療程連敷舒緩膏時間共約 70–90 分鐘，建議提前最少 2 天預約，熱門時段（週五晚、週六）建議提前 5–7 天。",
    },
    {
      num: 2,
      title: "到店 + 免費 VISIA 皮膚深層分析",
      desc: "到達朗豪坊 40 樓後，資深治療師先以 VISIA 儀器進行免費深層皮膚分析，以科學數據量化評估你的凹凸洞深度類型、粗毛孔嚴重程度、疤痕分佈及膠原流失狀況，制定最適合的治療計劃及深度、能量設定。",
    },
    {
      num: 3,
      title: "個人化方案制定（零硬銷）",
      desc: "治療師根據 VISIA 數據，說明最適合的 BTL Exion™ 黃金微針治療深度、能量級別及建議次數。Peko Beauty 承諾：如果療程唔適合你的膚況或禁忌症，我們會如實告知，不會為咗銷售而推薦。",
    },
    {
      num: 4,
      title: "敷舒緩膏（30–45 分鐘）",
      desc: "清潔面部後敷上舒緩膏 30–45 分鐘，令治療過程更舒適。敷膏期間可輕鬆休息，治療師會在敷膏完成後為你仔細清除，確保藥效充分起效再開始治療。",
    },
    {
      num: 5,
      title: "BTL Exion™ 黃金微針療程進行",
      desc: "清除舒緩膏後即時開始治療。治療師以一次性黃金絕緣微針頭按分區系統化覆蓋全面，深度依治療部位精準調節。全程約 20–30 分鐘，治療師全程與你確認舒適程度。",
    },
    {
      num: 6,
      title: "療程後護理 + WhatsApp 跟進",
      desc: "療程後塗抹舒緩修復護理品，並提供詳細居家護理指引。治療師透過 WhatsApp 在 24–48 小時內主動跟進皮膚恢復情況，如有任何異常會即時指導處理。",
    },
  ];

  return (
    <AnimatedSection id="process" className="py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-12"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          在 Peko Beauty 做 BTL Exion™ 黃金微針係咩流程？
        </motion.h2>

        <div className="space-y-4 md:space-y-5">
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              className="flex gap-4 md:gap-6 items-start"
            >
              <div
                className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white font-black text-base md:text-lg shadow-md"
                style={{ background: BRAND_RED }}
              >
                {step.num}
              </div>
              <div className="bg-white rounded-xl p-4 md:p-5 flex-1 shadow-sm border border-gray-100">
                <strong className="block text-gray-900 text-[14px] md:text-[15px] leading-snug">
                  {step.title}
                </strong>
                {/* 步驟詳情：桌面版顯示，手機版隱藏 */}
                <p className="hidden md:block text-gray-500 text-sm leading-relaxed mt-2">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 9: COMPARISON TABLE (desktop only)
// ─────────────────────────────────────────────────────────────
function ComparisonSection() {
  const rows = [
    {
      feature: "核心技術",
      exion: "黃金絕緣微針 + AI RF 精準釋能",
      sylfirm: "雙波 RF 微針（연속波 + 脈衝波）",
      morpheus: "雙極 RF 微針（固定能量）",
    },
    {
      feature: "痛感",
      exion: "2–3/10（需敷舒緩膏）",
      sylfirm: "3–4/10（需敷舒緩膏）",
      morpheus: "4–6/10（需敷舒緩膏）",
    },
    {
      feature: "恢復期",
      exion: "1–3 天（輕微泛紅）",
      sylfirm: "1–3 天（輕微泛紅）",
      morpheus: "3–7 天（紅腫明顯）",
    },
    {
      feature: "凹凸洞改善",
      exion: "✅ 顯著（膠原填補）",
      sylfirm: "✅ 顯著（雙波增強）",
      morpheus: "✅ 顯著",
      highlight: true,
    },
    {
      feature: "荷爾蒙斑 / 暗印",
      exion: "⚠️ 有輔助效果",
      sylfirm: "✅ 最強項（特別設計）",
      morpheus: "❌ 非適應症",
      highlight: true,
    },
    {
      feature: "玫瑰痤瘡 / 紅血絲",
      exion: "⚠️ 視乎情況",
      sylfirm: "✅ 特別適合",
      morpheus: "❌ 不建議",
      highlight: true,
    },
    {
      feature: "面部提拉緊緻",
      exion: "✅ 有效（RF 緊緻）",
      sylfirm: "⚠️ 輕至中度",
      morpheus: "✅ 有效（深度 RF）",
    },
    {
      feature: "表皮受損風險",
      exion: "極低（絕緣針尖精準）",
      sylfirm: "低（雙波智能切換）",
      morpheus: "中等",
      highlight: true,
    },
    {
      feature: "試做價",
      exion: "HK$2,980",
      sylfirm: "HK$1,880",
      morpheus: "HK$3,000+",
      isPrice: true,
    },
  ];

  return (
    <AnimatedSection id="comparison" className="hidden md:block py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion™ 黃金微針 vs Sylfirm X vs Morpheus8
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">
          以下比較基於 Peko Beauty 真實臨床數據，幫助你做出最適合自己情況的選擇。
        </motion.p>

        <motion.div variants={scaleIn} className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-4 px-4 text-left text-xs font-bold w-[22%]">比較項目</th>
                <th
                  className="py-4 px-4 text-center text-xs font-bold w-[26%]"
                  style={{ background: BRAND_RED }}
                >
                  ⭐ BTL Exion™ 黃金微針
                  <br />
                  <span className="font-normal opacity-80 text-[10px]">(Peko Beauty)</span>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">Sylfirm X 黃金微針</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">Morpheus8 微針</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 text-xs border-b border-gray-100">
                    {row.feature}
                  </td>
                  <td
                    className={`px-4 py-3.5 text-center text-xs border-b border-gray-100 font-semibold bg-red-50/60 ${
                      row.isPrice
                        ? "text-xl font-black text-[#C52B21]"
                        : row.highlight
                        ? "text-green-700"
                        : "text-[#C52B21]"
                    }`}
                  >
                    {row.exion}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">
                    {row.sylfirm}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">
                    {row.morpheus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          variants={fadeUp}
          className="mt-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5"
        >
          <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
            <strong className="text-gray-900">🎯 Peko 建議：</strong>
            如果你<strong>主要困擾是凹凸洞、粗毛孔及皮膚紋理</strong>，BTL Exion™ 黃金微針是極具競爭力的選擇；
            若同時有<strong>荷爾蒙斑或玫瑰痤瘡</strong>問題，建議先諮詢了解{" "}
            <Link
              href="/treatments/sylfirm-x"
              className="text-[#C52B21] font-bold underline underline-offset-2"
            >
              Sylfirm X
            </Link>
            。唔確定？先做免費 VISIA 分析，再決定最適合你的方案，零壓力。
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <p className="text-gray-500 mb-4 text-[15px]">想知道你的皮膚更適合哪一款療程？</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            style={{ background: BRAND_RED }}
          >
            👉 查看 BTL Exion™ 黃金微針試做優惠 HK$2,980
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 10: TESTIMONIALS
// ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "做完第 3 次之後，朋友話我皮膚好咗好多，問我係咪係換咗護膚品。我有凹凸洞問題超過 5 年，試過好多方法都唔見效，做完 Exion 黃金微針第 2 次後感覺皮膚平滑咗，到第 3 次後凹陷真係填補咗一截。治療師全程好 professional，敷膏夠時間先開始，完全無 hard sell。",
      name: "K 小姐",
      age: "29歲",
      concern: "凹凸洞 + 粗毛孔",
      treatment: "BTL Exion™ 黃金微針 × 4 次",
    },
    {
      quote:
        "我最怕係微針嘅痛，但敷完舒緩膏之後真係唔係想像中咁可怕，就係偶爾一陣刺感，整體都好 ok。最驚喜係做完隔日皮膚紅腫消得好快，第 3 日已經可以正常補妝返工。做完 3 次後毛孔縮小好明顯，上妝服貼程度差好遠。",
      name: "M 小姐",
      age: "34歲",
      concern: "粗毛孔 + 皮膚紋理",
      treatment: "BTL Exion™ 黃金微針 × 3 次",
    },
  ];

  const socialStats = [
    { value: "95%", label: "客人滿意度" },
    { value: "5,000+", label: "真實好評" },
    { value: "70%+", label: "凹凸洞改善率" },
    { value: "100%", label: "原廠正貨儀器" },
  ];

  return (
    <AnimatedSection id="results" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          真實客人效果見證
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          以下均為 Peko Beauty 旺角朗豪坊真實客人，已獲授權展示
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Placeholder image area */}
              <div className="relative h-44 bg-gradient-to-br from-amber-50 to-rose-50">
                <Image
                  src="/images/peko-beauty-reception-desk-mong-kok.jpg"
                  alt={`Peko Beauty BTL Exion 黃金微針效果 ${t.concern}`}
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-white text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: `${BRAND_RED}cc` }}
                  >
                    {t.treatment}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <strong className="text-gray-900 text-sm">{t.name}</strong>
                <p className="text-xs text-gray-400 mt-0.5">
                  {t.age}，主要困擾：{t.concern}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          variants={scaleIn}
          className="bg-amber-50 rounded-2xl py-6 px-8 flex flex-wrap justify-center gap-8 text-center border border-amber-100"
        >
          {socialStats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-amber-700">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 11: TRUST SIGNALS — Dark background
// ─────────────────────────────────────────────────────────────
function TrustSection() {
  const pillars = [
    {
      Icon: Award,
      title: "儀器信任",
      items: [
        "100% 原廠正貨 BTL Exion™",
        "美國 FDA 認證",
        "歐盟 CE 認可",
        "一次性針具，零交叉感染",
      ],
    },
    {
      Icon: Users,
      title: "服務信任",
      items: [
        "全女班資深治療師",
        "零硬銷承諾",
        "明碼實價透明收費",
        "免費 VISIA 皮膚深層分析",
      ],
    },
    {
      Icon: ThumbsUp,
      title: "結果信任",
      items: [
        "95% 客人滿意度",
        "5,000+ 真實好評",
        "療程前後 VISIA 對比追蹤",
        "售後1對1 WhatsApp 跟進",
      ],
    },
  ];

  return (
    <AnimatedSection id="why-peko" className="py-10 md:py-14 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl md:text-3xl font-black text-white mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          點解旺角客人揀 Peko Beauty 做 BTL Exion™ 黃金微針？
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 mb-10">
          三個核心承諾，缺一不可
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map(({ Icon, title, items }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              className="bg-gray-800 rounded-2xl p-7 hover:bg-gray-700 transition-colors duration-200"
            >
              <Icon size={36} className="text-[#C52B21] mb-4" />
              <h3 className="text-[#C52B21] font-bold text-lg mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                    <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 12: PRICING
// ─────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <AnimatedSection id="pricing" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion™ 黃金微針 香港收費一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          Peko Beauty 承諾：明碼實價，絕無隱藏收費，絕不硬銷升級
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Trial */}
          <motion.div
            variants={scaleIn}
            className="relative border-2 border-[#C52B21] rounded-2xl p-7 text-center bg-white shadow-md"
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-1 rounded-full whitespace-nowrap"
              style={{ background: BRAND_RED }}
            >
              ✨ 新客限定
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">新客體驗方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              BTL Exion™ 黃金微針全面單次療程
              <br />+ 免費 VISIA 皮膚深層分析
            </p>
            <div className="text-5xl font-black text-[#C52B21] leading-none mb-1">HK$2,980</div>
            <p className="text-gray-300 text-xs mb-6">市場參考價 HK$4,500+</p>
            <a
              href={WA_BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: BRAND_RED }}
            >
              💬 WhatsApp 立即預約
            </a>
          </motion.div>

          {/* Package */}
          <motion.div
            variants={scaleIn}
            className="border-2 border-gray-200 rounded-2xl p-7 text-center bg-gray-50"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">療程套票方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              根據 VISIA 分析個人化建議
              <br />（3 次 / 5 次 / 6 次套裝可選）
            </p>
            <div className="text-3xl font-black text-gray-600 leading-none mb-1">歡迎查詢</div>
            <p className="text-gray-300 text-xs mb-6">按個人膚質及需求次數報價</p>
            <a
              href="https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20BTL%20Exion%20黃金微針套票價錢"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-600 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:bg-gray-700 active:scale-[0.98]"
            >
              📋 查詢套票詳情
            </a>
          </motion.div>
        </div>

        {/* Transparency promise */}
        <motion.div
          variants={fadeUp}
          className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
        >
          <p className="text-green-800 text-sm leading-relaxed">
            💯 <strong>Peko Beauty 透明承諾：</strong>到店後無需即場決定購買任何療程
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 13: SUITABILITY
// ─────────────────────────────────────────────────────────────
function SuitabilitySection() {
  const suitable = [
    "凹凸洞、暗瘡疤痕、冰鑿型 / 箱車型疤痕",
    "粗毛孔、皮脂腺分泌過旺",
    "皮膚紋理粗糙、上妝不服貼",
    "初老細紋、眼尾紋、額紋",
    "整體膚質改善，希望皮膚更幼滑",
    "工作繁忙，可接受 1–3 天輕微恢復期",
  ];
  const unsuitable = [
    "懷孕或哺乳期",
    "治療部位有活躍性感染、疱疹或開放性傷口",
    "正有活躍性暗瘡發炎（需先處理後再安排療程）",
    "體內有心臟起搏器或其他電子植入物",
    "治療部位有金屬植入物（如骨板、骨釘）",
    "正在服用維他命 A 酸（Accutane）療程期間",
    "自體免疫疾病（需由醫師評估後再進行）",
  ];

  return (
    <AnimatedSection id="suitability" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-8"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion™ 黃金微針適合咩人做？（包含禁忌症）
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={scaleIn}
            className="bg-green-50 rounded-2xl p-6 border border-green-200"
          >
            <h3 className="text-green-800 font-bold text-base mb-5 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              適合做 BTL Exion™ 黃金微針
            </h3>
            <ul className="space-y-3">
              {suitable.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="bg-red-50 rounded-2xl p-6 border border-red-200"
          >
            <h3 className="text-red-700 font-bold text-base mb-5 flex items-center gap-2">
              <XCircle size={20} className="text-red-500" />
              不建議做 BTL Exion™ 黃金微針
            </h3>
            <ul className="space-y-3">
              {unsuitable.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p variants={fadeUp} className="text-gray-400 text-sm mt-5 leading-relaxed italic">
          如果不確定自己的體質是否適合，歡迎先透過{" "}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C52B21] font-semibold not-italic"
          >
            WhatsApp 免費諮詢
          </a>{" "}
          我們的專業顧問，無任何消費壓力。
        </motion.p>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 14: FAQ
// ─────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "BTL Exion™ 黃金微針係咩？同 Sylfirm X 或 Morpheus8 有咩分別？",
      a: "BTL Exion™ 黃金微針係 BTL 原廠 Exion Prime 系統的微針射頻手具，使用黃金絕緣微針將射頻能量精準輸送到真皮層目標深度（0.5mm–3.5mm）。與 Sylfirm X 的最大分別在於：Sylfirm X 特別設計雙波模式（連續波 + 脈衝波），對荷爾蒙斑、玫瑰痤瘡有特別針對性；Exion 黃金微針則在膠原重塑、凹凸洞改善及皮膚緊緻方面表現出色，且配合 BTL Exion 的 AI 溫控系統，能量精準度更高。Morpheus8 的設計概念相似，但恢復期通常較長、痛感較高。選擇哪款應視乎你的主要問題而定。",
    },
    {
      q: "黃金微針點樣改善凹凸洞？需要做幾多次？",
      a: "凹凸洞係因為暗瘡發炎後真皮層膠原蛋白受損缺失所形成，RF 微針透過物理穿刺 + 熱能，在凹陷區域附近製造「受控微損傷」，觸發皮膚大量合成新膠原蛋白去填補凹陷結構。一般凹凸洞改善需要 3–6 次療程，每 4–6 週一次；淺層凹凸洞通常 3–4 次後已有明顯改善，深層冰鑿型疤痕則建議 5–6 次以上配合提升能量。見效時間約在第 2–3 次之後，因為膠原重塑需要 4–6 週時間才能看到完整效果。",
    },
    {
      q: "黃金微針痛唔痛？敷舒緩膏要幾耐？",
      a: "BTL Exion™ 黃金微針治療前需要敷舒緩膏 30–45 分鐘，確保治療過程舒適。敷膏後治療時大多數客人感受為輕微刺感及溫熱感，痛感指數約 2–3/10，屬可接受範圍。治療師會全程詢問你的舒適程度，如有需要可按部位調節能量強度。相比 Morpheus8 或 CO2 激光，BTL Exion 黃金微針的整體舒適度較高，這亦係它愈來愈受歡迎的主要原因之一。",
    },
    {
      q: "黃金微針恢復期係幾耐？做完可唔可以返工？",
      a: "BTL Exion™ 黃金微針的恢復期通常為 1–3 天。療程後面部會有泛紅、輕微腫脹感，24–48 小時後大多消退。部分敏感肌或能量較高的療程可能有輕微點狀結痂（針孔位置），約 5–7 天會自然脫落——切勿強行剝除。一般建議療程後第 2–3 天可以正常補妝返工，但避免厚重底妝覆蓋。與 Morpheus8 相比，BTL Exion 黃金微針的停工期明顯較短，這係黃金絕緣針設計的最大優勢——表皮受損範圍極小。",
    },
    {
      q: "黃金微針可以改善粗毛孔嗎？效果有幾持久？",
      a: "可以。粗毛孔的根本原因係真皮層彈力蛋白及膠原蛋白流失、失去對毛孔壁的支撐力。RF 微針重建真皮層支撐結構後，毛孔自然收縮細緻。臨床上毛孔縮小效果通常在完成 3 次療程後最為明顯，效果可維持 6–12 個月；配合定期防曬及適當護膚，效果可進一步延長。需要注意的是：如果皮脂腺分泌持續旺盛（如激素因素），後續可能需要維護療程。",
    },
    {
      q: "做完黃金微針可以即時見效嗎？",
      a: "短期效果（療程後 1–2 週）：皮膚輕微緊緻感，部分客人反映膚色稍亮。中期效果（第 4–8 週）：膠原蛋白大量合成，凹凸洞開始填補，毛孔縮小，皮膚質感明顯改善。長期效果（完成 3–6 次療程後）：整體膚質提升，凹凸洞改善 70%+，毛孔縮小 40%+，效果持續穩定。請注意，RF 微針改善凹凸洞不像填充劑般即時——雖然膠原增生需要時間，但效果屬自然生成，不會有「填充感」，且效果比外搽護膚品更持久根本。",
    },
    {
      q: "黃金微針做完有冇副作用？長期做會唔會依賴？",
      a: "常見短期反應：治療後 24–72 小時泛紅、輕微腫脹、輕微熱感，均屬正常修復反應。少數人可能有輕微結痂（針孔小點），5–7 天脫落。長期安全性方面，目前並無主流研究支持「RF 微針長期做會令膠原流失」，相反，適當療程節奏下都係在促進膠原持續合成。需要注意的是：療程節奏不能太密（至少間隔 4–6 週），讓膠原有足夠時間重塑；在活躍暗瘡、皮膚炎症期間不應進行療程。",
    },
    {
      q: "黃金微針做完要注意咩護理？",
      a: "療程後最重要的護理分三個重點：第一，加強保濕（使用無刺激成分的修復型保濕品）；第二，嚴格防曬（至少 SPF50，避免直曬）；第三，48 小時內避免高溫環境（蒸面、桑拿、游泳）及劇烈運動。1 週內避免使用含酸類（AHA、BHA、維他命 A 酸）、美白類（熊果苷高濃度）及去角質類產品。如有輕微結痂，切勿強行剝除，待其自然脫落。療程後治療師會提供完整個人化護理指引。",
    },
    {
      q: "BTL Exion™ 黃金微針 vs Exion 膠原槍，我應該選邊個？",
      a: "兩款療程截然不同，應按你的主要目標選擇。如果你主要困擾是：凹凸洞、粗毛孔、暗瘡疤痕、皮膚紋理粗糙——選黃金微針；如果你主要困擾是：面部鬆弛、法令紋、輪廓下垂、皮膚暗啞缺水、希望完全無恢復期——選 Exion 膠原槍（RF + 超聲波無針版本）。兩款療程亦可以配合進行，達到緊緻 + 膚質提升的雙重效果。如果你不確定，最好先做 VISIA 皮膚分析，治療師會根據你的具體皮膚狀況提供最適切建議。",
    },
    {
      q: "活躍性暗瘡可以做黃金微針嗎？",
      a: "活躍性暗瘡發炎期間（有明顯發紅、腫脹、化膿的暗瘡）不建議進行黃金微針療程，因為在發炎部位進行穿刺有機會加劇炎症、增加感染風險，亦可能加深疤痕形成。建議先配合適當護理控制暗瘡發炎後，再安排黃金微針。如果你的暗瘡已大致平伏但留有紅印或凹凸洞，則通常可以進行療程——治療師在到店諮詢時會評估具體情況並給出專業建議。",
    },
    {
      q: "BTL Exion™ 黃金微針香港收費大概幾多？",
      a: "香港市場黃金微針收費差異頗大，受地段、儀器品牌、是否包含 VISIA 分析及治療範圍影響。一般市場單次全面黃金微針療程約 HK$2,500–5,000。Peko Beauty 目前新客試做價為 HK$2,980（全面），包含免費 VISIA 皮膚深層分析；完整療程套票按 3 次、5 次或 6 次安排，按個人目標作個人化建議。選擇中心時，最重要看的係：儀器是否原廠正貨、治療師資質、是否有完整諮詢評估流程，以及到店後是否有消費壓力。",
    },
    {
      q: "Peko Beauty 旺角朗豪坊點去？",
      a: "Peko Beauty 位於九龍旺角亞皆老街 8 號朗豪坊辦公室大樓 40 樓 02 室。港鐵旺角站 C 出口步行約 5 分鐘，或旺角東站步行約 8 分鐘。營業時間：週一至五 11:30–20:30，週六 10:00–19:00，公眾假期 11:00–18:00，週日休息。",
    },
    {
      q: "Peko Beauty 接受咩付款方式？",
      a: "Peko Beauty 接受現金（港幣）、Visa、MasterCard、American Express、銀聯卡、轉數快（FPS）、支付寶香港（AlipayHK）及微信支付香港（WeChat Pay HK）。",
    },
  ];

  return (
    <AnimatedSection id="faq" className="py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-10"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion™ 黃金微針 常見問題 FAQ
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-gray-900 text-sm md:text-base leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-[#C52B21] transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600 text-sm leading-[1.85]">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 15: RELATED TREATMENTS
// ─────────────────────────────────────────────────────────────
function RelatedSection() {
  const related = [
    {
      href: "/treatments/sylfirm-x",
      emoji: "💉",
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
      tag: "雙波微針",
      title: "Sylfirm X 矽谷雙波黃金微針",
      desc: "修復荷爾蒙斑、玫瑰痤瘡、凹凸洞，雙波模式針對性更強",
      cta: "試做 HK$1,880",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/btl-exion",
      emoji: "✨",
      gradient: "from-indigo-200 via-blue-100 to-sky-50",
      accentColor: "#3730a3",
      tag: "無創 RF",
      title: "BTL Exion™ 膠原槍（無針版）",
      desc: "無針無創 RF + 超聲波，激生透明質酸，零恢復期面部緊緻提升",
      cta: "試做 HK$680",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/hollywood-spectra-laser",
      emoji: "⚡",
      gradient: "from-yellow-200 via-amber-100 to-orange-50",
      accentColor: "#d97706",
      tag: "激光美白",
      title: "Hollywood Spectra 膠原激光",
      desc: "改善暗瘡印、紅印、均勻膚色，配合黃金微針達到亮白 + 修復雙效",
      cta: "試做 HK$880",
      imgSrc: null as string | null,
    },
  ];

  return (
    <AnimatedSection id="related" className="py-12 md:py-16 px-4 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <motion.h3
          variants={fadeUp}
          className="text-xl font-black text-gray-900 mb-2"
        >
          相關療程推薦
        </motion.h3>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">
          配合使用，效果更全面
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {related.map((item) => (
            <motion.div
              key={item.href}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="group"
            >
              <Link
                href={item.href}
                className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* ── Image / Placeholder Area ── */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.imgSrc ? (
                    <Image
                      src={item.imgSrc}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-2 transition-transform duration-500 group-hover:scale-105`}
                    >
                      <span className="text-5xl drop-shadow-sm select-none">{item.emoji}</span>
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                        style={{ background: item.accentColor }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
                </div>

                {/* ── Text Content ── */}
                <div className="px-4 pt-3.5 pb-4">
                  <div
                    className="w-6 h-[2.5px] rounded-full mb-2.5 transition-all duration-300 group-hover:w-10"
                    style={{ background: item.accentColor }}
                  />
                  <strong className="block text-gray-900 text-[13px] font-bold mb-1 leading-snug group-hover:text-[#C52B21] transition-colors">
                    {item.title}
                  </strong>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.desc}</p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold"
                    style={{ color: item.accentColor }}
                  >
                    → {item.cta}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 16: FINAL CTA
// ─────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section
      id="final-cta"
      className="py-16 px-4 text-center"
      style={{
        background: "linear-gradient(135deg, #fdf8f0 0%, #fff8f0 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="max-w-2xl mx-auto"
      >
        <h2
          className="text-2xl md:text-3xl font-black text-gray-900 mb-3"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          準備好告別凹凸洞、粗毛孔了嗎？
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
          免費 VISIA 皮膚深層分析 + 零壓力專業諮詢
          <br />
          新客試做價{" "}
          <strong className="text-[#C52B21]">HK$2,980</strong>，明碼實價，絕無隱藏消費
        </p>

        <div className="flex justify-center mb-8">
          <WhatsAppButton href={WA_BOOKING} text="💬 WhatsApp 立即預約" large />
        </div>

        <div className="text-xs text-gray-400 space-y-2 leading-relaxed max-w-xs mx-auto text-left md:max-w-none md:text-center">
          <div className="flex items-start md:items-center justify-start md:justify-center gap-1.5">
            <MapPin size={13} className="flex-shrink-0 mt-0.5 md:mt-0" />
            <span>旺角朗豪坊辦公室大樓 40 樓 02 室（港鐵旺角站 C 出口，步行約 5 分鐘）</span>
          </div>
          <div className="flex items-start md:items-center justify-start md:justify-center gap-1.5">
            <Clock size={13} className="flex-shrink-0 mt-0.5 md:mt-0" />
            <span>週一至五 11:30–20:30 ｜ 週六 10:00–19:00 ｜ 公眾假期 11:00–18:00 ｜ 週日休息</span>
          </div>
          <div className="flex items-center justify-start md:justify-center gap-1.5">
            <MessageCircle size={13} className="flex-shrink-0" />
            <span>+852 5335 3313 ｜ info@peko.com.hk</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// DEFAULT EXPORT — compose all sections
// ─────────────────────────────────────────────────────────────
export default function BtlExionMicroneedleClient() {
  return (
    <div className="bg-white">
      <StickyNav />
      <HeroSection />
      <PainPointsSection />
      <DirectAnswerSection />
      <KeyTakeawaysSection />
      <TreatmentStatsSection />
      <ScienceSection />
      <ProcessSection />
      <ComparisonSection />
      <TestimonialsSection />
      <TrustSection />
      <PricingSection />
      <SuitabilitySection />
      <FAQSection />
      <RelatedSection />
      <FinalCTASection />
    </div>
  );
}
