"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  Zap,
  Target,
  Sparkles,
  Sun,
  Droplets,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const BRAND_RED = "#C52B21";
const WA_LINK =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20Hollywood%20Spectra%20激光試做優惠";
const WA_BOOKING =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想預約%20Hollywood%20Spectra%20激光試做，請問有咩時間？";

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
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
// 5 MODES DATA
// ─────────────────────────────────────────────────────────────
const MODES = [
  {
    id: "laser-facial",
    shortName: "Laser Facial",
    fullName: "Laser Facial 美白嫩膚",
    emoji: "✨",
    Icon: Sparkles,
    gradient: "from-amber-100 via-yellow-50 to-orange-50",
    accentColor: "#d97706",
    tagline: "全面提亮 · 嫩膚保濕 · 日常保養型",
    badge: "入門首選",
    badgeBg: "#d97706",
    heroDesc:
      "以 1064nm + 532nm 雙波長結合進行全面基礎嫩膚，透過光聲效應刺激真皮層膠原增生，即時均勻膚色、提亮暗啞，是零停工期的日常型激光保養最佳選擇。",
    techTitle: "技術原理",
    techDesc:
      "雙波長協同作用：1064nm 穿透真皮層刺激膠原蛋白及彈力蛋白新生，同時以溫和能量打破舊黑色素舊角質堆積；532nm 則精準作用於表皮層，分解表層暗沉色素。兩種波長在同一療程中協同進行，令嫩膚效果更全面均勻。",
    forWhom: ["膚色整體暗黃、無光澤", "輕微暗沉 / 初步色素不均", "初次接觸激光者", "想維持膚質的日常保養型客人", "任何膚色、全年均可做"],
    benefits: [
      { icon: "🌟", title: "即時提亮", desc: "療程後即刻感受膚色透亮，出門即見效" },
      { icon: "🧬", title: "膠原刺激", desc: "真皮層光聲效應，促進新生膠原蛋白，改善皮膚彈性" },
      { icon: "🔬", title: "均勻膚色", desc: "分解表層舊色素堆積，改善膚色不均及暗沉" },
      { icon: "💎", title: "零恢復期", desc: "無需任何停工期，即做即走，午休可做" },
    ],
    sessions: "建議 4–6 次，每 2–3 週一次",
    downtime: "零停工期（可即日化妝）",
    painLevel: "1/10 — 輕微溫熱感",
    highlight: "最適合初次接觸激光 · 見效快 · 零壓力",
  },
  {
    id: "ptp-collagen",
    shortName: "蜂巢 PTP+™",
    fullName: "蜂巢 PTP+™ 多脈衝模式",
    emoji: "🍯",
    Icon: Zap,
    gradient: "from-indigo-100 via-purple-50 to-violet-50",
    accentColor: "#6d28d9",
    tagline: "FDA 唯一荷爾蒙斑認證 · 低反黑風險",
    badge: "荷爾蒙斑專治",
    badgeBg: "#6d28d9",
    heroDesc:
      "Hollywood Spectra 的 PTP+™（Q-PTP / Q-3 / Q-4）多脈衝技術是全球首個獲美國 FDA 批准專治荷爾蒙斑（Melasma）的激光模式。採用「先低能量穩定黑色素細胞，再高能量精準碎斑」的革命性雙步驟，大幅降低反黑風險。",
    techTitle: "PTP+™ 多脈衝技術原理",
    techDesc:
      "傳統激光處理荷爾蒙斑容易「越打越深」，原因在於高能量刺激黑色素細胞活化，引發代償性增生。PTP+™ 顛覆這一邏輯：首先以低能量脈衝預先「穩定」黑色素細胞，使其進入抑制狀態；隨後才施以較高能量精準擊碎色素顆粒。這種雙步驟保護機制讓發炎後黑素沉著風險（PIH）大幅降低，是荷爾蒙斑患者的突破性選擇。",
    forWhom: ["荷爾蒙斑（肝斑/Melasma）困擾者", "曾用其他激光後反黑的人", "反覆積累型色素問題", "荷爾蒙波動期（如產後或更年期前）", "深色亞洲膚質、怕反黑"],
    benefits: [
      { icon: "🏆", title: "FDA 唯一認證", desc: "全球首個 FDA 批核專治 Melasma 的激光模式（K213569, 2022）" },
      { icon: "🛡️", title: "低反黑風險", desc: "雙步驟 PTP+ 機制，先穩定後碎斑，顯著降低術後色素反彈" },
      { icon: "📊", title: "臨床改善率", desc: "臨床數據：荷爾蒙斑改善率高達 70–80%，遠超傳統激光" },
      { icon: "🔄", title: "持久管理", desc: "比傳統激光更有效控制荷爾蒙斑復發週期" },
    ],
    sessions: "建議 5–8 次，每 2–3 週一次（荷爾蒙斑需較多次數）",
    downtime: "零停工期",
    painLevel: "1–2/10",
    highlight: "全球唯一 FDA 批核專治荷爾蒙斑激光 · 比傳統激光低反黑",
  },
  {
    id: "carbon-peel",
    shortName: "Carbon Peel",
    fullName: "Carbon Peel 碳粉激光",
    emoji: "🖤",
    Icon: Droplets,
    gradient: "from-slate-200 via-gray-100 to-zinc-50",
    accentColor: "#374151",
    tagline: "荷里活明星碳粉激光 · 即收毛孔控油",
    badge: "毛孔 / 控油首選",
    badgeBg: "#374151",
    heroDesc:
      "又稱「荷里活碳粉激光」（Hollywood Laser Peel），是明星紅地毯前的保養秘技。治療師先塗上醫用碳粉，碳粒深入毛孔後以 1064nm Spectra Mode 照射，碳粒瞬間氣化爆破，帶走油脂角栓及舊角質，即時收縮毛孔、均勻膚色。",
    techTitle: "碳粉爆破原理",
    techDesc:
      "碳粉激光的精妙之處在於碳粉作為「能量中介」。醫用碳粉（Carbon Lotion）塗於面部後，碳粒會深入毛孔、吸附油脂及角栓；當 1064nm Spectra Mode 激光照射時，碳粒瞬間大量吸收能量並氣化，產生微爆破效應（Photomechanical Effect），將毛孔內的油脂污垢帶走，同時熱能傳導至皮脂腺，抑制其過度活躍，達到長效控油效果。整個過程只有輕微「啪啪聲」及溫熱感，全程舒適。",
    forWhom: ["毛孔粗大、T 區油脂分泌旺盛", "黑頭粉刺問題嚴重", "膚色暗黃、角質堆積", "出油旺盛的油性或混合肌", "希望即時見效、亮膚收毛孔"],
    benefits: [
      { icon: "🕳️", title: "即效收毛孔", desc: "碳粒爆破帶走角栓，毛孔視覺上即時縮小" },
      { icon: "💧", title: "深層控油", desc: "熱能作用於皮脂腺，有效抑制油脂過度分泌" },
      { icon: "🧹", title: "清潔黑頭", desc: "碳粒吸附毛孔內油脂及氧化污垢，清除黑頭更徹底" },
      { icon: "✨", title: "即時亮膚", desc: "去除舊角質堆積，膚色即時提亮，觸感更平滑細緻" },
    ],
    sessions: "建議 4–8 次，每 2–3 週一次",
    downtime: "零停工期（可即日化妝）",
    painLevel: "1/10 — 輕微啪啪聲 + 溫熱感",
    highlight: "荷里活最著名的紅毯前急救保養 · 即時亮膚效果",
  },
  {
    id: "golden-laser",
    shortName: "Golden Laser",
    fullName: "Golden Laser 消紅印",
    emoji: "🌟",
    Icon: Sun,
    gradient: "from-yellow-100 via-amber-50 to-rose-50",
    accentColor: "#b45309",
    tagline: "溫和消紅印 · 玫瑰痤瘡泛紅專治",
    badge: "痘紅 / 玫瑰痤瘡",
    badgeBg: "#b45309",
    heroDesc:
      "Gold Toning 是 Hollywood Spectra 的溫和治療模式，以較穩定、均勻的 1064nm 能量輸出，專門針對痘後紅印（PIH 紅色期）、臉部泛紅、玫瑰痤瘡輕度症狀及整體膚色不均問題，是敏感肌及泛紅膚質的理想選擇。",
    techTitle: "Gold Toning 原理",
    techDesc:
      "Gold Toning 避開了高峰值能量對皮膚帶來的強烈熱刺激，改以較溫和、均勻分佈的能量輸出，作用於皮膚淺至中層的血管及色素細胞，幫助細小擴張的血管收縮、減少血紅蛋白吸收過多激光能量所引致的紅色素殘留。此模式對輕度玫瑰痤瘡的泛紅、炎症後色素改變（PIH 早期紅印階段）特別有效，能讓皮膚整體狀態變得更平穩均勻。",
    forWhom: ["暗瘡痘痘留下紅印（PIH 紅色期）", "臉部容易泛紅、易敏感膚質", "輕度玫瑰痤瘡（Rosacea）泛紅", "皮膚容易出現網狀紅絲", "做完其他療程後協助修復穩定"],
    benefits: [
      { icon: "💆", title: "消紅印", desc: "針對痘後 PIH 紅色期，加速血紅素代謝，淡化紅印" },
      { icon: "🌸", title: "改善泛紅", desc: "幫助細小擴張血管收縮，減少難看的面部泛紅不均" },
      { icon: "🛡️", title: "敏感肌適用", desc: "溫和能量設定，敏感肌及薄皮膚同樣可安全使用" },
      { icon: "🎨", title: "均勻膚色", desc: "整體均勻膚色分佈，讓面色看起來更平靜、自然" },
    ],
    sessions: "建議 4–6 次，每 2–3 週一次",
    downtime: "零停工期",
    painLevel: "1/10 — 最舒適的模式之一",
    highlight: "敏感肌 / 泛紅肌的激光首選 · 溫和不刺激",
  },
  {
    id: "pigment-treatment",
    shortName: "色斑針對",
    fullName: "色斑針對治療",
    emoji: "🎯",
    Icon: Target,
    gradient: "from-rose-100 via-pink-50 to-red-50",
    accentColor: "#C52B21",
    tagline: "532nm 精準碎斑 · 雀斑曬斑老人斑",
    badge: "色斑專治",
    badgeBg: "#C52B21",
    heroDesc:
      "針對各類皮膚色素問題（雀斑、曬斑、老人斑、咖啡牛奶斑、顴痣）的精準治療模式，以 532nm 高峰值能量配合 PTP+™ 多脈衝技術，精準作用於色素顆粒，不傷害周圍正常皮膚組織，是色斑問題的最直接解決方案。",
    techTitle: "532nm 色素選擇性作用原理",
    techDesc:
      "532nm 波長被稱為「色素波長」，因其能被黑色素顆粒高度吸收，而對周圍正常皮膚組織的影響相對較低。Q-switched 模式產生的超短脈衝（納秒級），以高峰值功率瞬間傳遞巨大能量，在極短時間內令色素顆粒受熱膨脹，繼而爆破成細小碎片（選擇性光熱解，Selective Photothermolysis）。這些碎片隨後經由皮膚的淋巴免疫系統自然代謝排出體外。配合 PTP+™ 多脈衝模式，可進一步提升效果，同時降低反黑風險。",
    forWhom: ["雀斑（Ephelides）— 基因性色素問題", "曬斑（Solar Lentigo）— 紫外線積累", "老人斑（Age Spots / Liver Spots）", "咖啡牛奶斑（Café-au-lait Macules）", "顴痣（Naevus of Ota 同類型表淺色素）"],
    benefits: [
      { icon: "🎯", title: "精準定點碎斑", desc: "532nm 高選擇性波長，精準作用於色素，不傷周圍組織" },
      { icon: "⚡", title: "高效碎色素", desc: "納秒級超短脈衝 + 高峰值能量，徹底擊碎各類色素顆粒" },
      { icon: "🔄", title: "自然代謝", desc: "碎裂色素由淋巴系統自然排出，安全根治不殘留" },
      { icon: "🛡️", title: "低反黑設計", desc: "配合 PTP+™ 多脈衝，降低亞洲膚質最擔心的 PIH 反黑風險" },
    ],
    sessions: "視乎色斑類型及深淺，通常 3–6 次，每 4–6 週一次",
    downtime: "輕微（色斑位置可能出現短暫結痂 1–3 天，依能量而定）",
    painLevel: "2–3/10（針對性高能量時）",
    highlight: "色素問題的終極解決方案 · 雀斑曬斑老人斑首選",
  },
];

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
  text = "💬 WhatsApp 預約試做 — HK$880",
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
// SECTION 1: HERO
// ─────────────────────────────────────────────────────────────
function HeroSection({ onModeSelect }: { onModeSelect: (id: string) => void }) {
  const trustBadges = [
    "🇺🇸 美國 FDA 首個 Melasma 認證",
    "🇰🇷 韓國 Lutronic 原廠正品",
    "⭐ 5,000+ 真實好評",
    "🚫 絕無硬銷",
    "0天 零恢復期",
  ];

  const stats = [
    { val: "1", label: "套系統 5 種模式" },
    { val: "90%", label: "客人滿意度" },
    { val: "0天", label: "零恢復期" },
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#fdf8ff] to-white pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden"
      >
        <Image
          src="/images/peko-beauty-reception-desk-mong-kok.jpg"
          alt="Peko Beauty Hollywood Spectra 5合1納秒激光系統 美白去斑嫩膚 旺角朗豪坊醫美中心"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

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
            🌟 5-in-1 納秒激光系統
          </span>
        </motion.div>

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

      <div className="max-w-4xl mx-auto px-4 pt-8 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-4"
        >
          <span className="text-[#C52B21] text-xs font-bold tracking-widest uppercase">Hollywood Spectra™</span>
          <span className="text-gray-400 text-xs">by Lutronic</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
          className="text-[clamp(20px,4vw,40px)] font-black leading-[1.3] text-gray-900 mb-3 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          Hollywood Spectra™ 5合1納秒激光
          <br />
          <span className="text-[clamp(14px,2.5vw,24px)] font-bold text-gray-600">
            美白嫩膚 · 荷爾蒙斑 · 碳粉控油 · 消紅印 · 去色斑
          </span>
          <br />
          <span className="text-[clamp(13px,2vw,20px)] font-black" style={{ color: BRAND_RED }}>
            一套系統，五種精準模式 · 旺角朗豪坊
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }}
          className="flex justify-center gap-2 md:gap-4 mb-6 w-full max-w-sm mx-auto"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-red-50 border border-red-100 rounded-xl px-2 md:px-5 py-2.5 text-center flex-1"
            >
              <div className="text-sm md:text-xl font-black text-[#C52B21] leading-tight whitespace-nowrap">{s.val}</div>
              <div className="text-[9px] md:text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE_OUT }}
          className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-6 leading-relaxed"
        >
          全球超過 60 個國家使用的 Q-switched Nd:YAG 納秒激光平台（1064nm + 532nm），
          搭載五種精準模式，針對不同皮膚問題一一擊破。零恢復期，即做即走。
        </motion.p>

        {/* Mode Quick-Access Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: EASE_OUT }}
          className="flex flex-wrap justify-center gap-2 mb-7"
        >
          {MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onModeSelect(mode.id)}
              className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-[#C52B21] hover:text-[#C52B21] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span>{mode.emoji}</span>
              <span>{mode.shortName}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.42, ease: EASE_OUT }}
          className="flex flex-col items-center gap-3"
        >
          <WhatsAppButton href={WA_LINK} />
          <p className="text-xs text-gray-400">✅ 新客試做 HK$880 · 明碼實價 · 到店後無需即場決定</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// GEO: Direct Answer + Key Takeaways (hidden)
// ─────────────────────────────────────────────────────────────
function GeoSection() {
  return (
    <>
      <div id="direct-answer" aria-hidden="false" className="sr-only">
        <p>💡 Hollywood Spectra 激光療程最直接答案：</p>
        <p>
          Hollywood Spectra™ 是韓國 Lutronic 出品的 Q-switched Nd:YAG 納秒激光系統，擁有五種精準治療模式：
          (1) Laser Facial 美白嫩膚，針對暗黃膚色；
          (2) PTP+™ 多脈衝蜂巢模式，FDA 唯一認證治療荷爾蒙斑（Melasma），改善率 70–80%，降低反黑風險；
          (3) Carbon Peel 碳粉激光（荷里活碳粉激光），即時收毛孔、控油清黑頭；
          (4) Golden Laser 金激光，針對痘後紅印及玫瑰痤瘡泛紅；
          (5) 色斑針對治療，以 532nm 精準碎雀斑、曬斑、老人斑。
          全系統零恢復期，新客試做 HK$880，Peko Beauty 旺角朗豪坊。
        </p>
      </div>
      <div id="key-takeaways" aria-hidden="false" className="sr-only">
        <h3>本頁重點摘要</h3>
        <ul>
          <li><strong>核心技術：</strong>Q-switched Nd:YAG 納秒激光（1064nm + 532nm），超短納秒脈衝 + 高峰值功率</li>
          <li><strong>五種模式：</strong>Laser Facial、PTP+™ 蜂巢多脈衝、Carbon Peel 碳粉激光、Golden Laser 金激光、色斑針對治療</li>
          <li><strong>FDA 認證：</strong>K213569，2022 年，全球首個同時獲 FDA 認證治療 Melasma 的激光儀器</li>
          <li><strong>荷爾蒙斑改善率：</strong>臨床數據 70–80%</li>
          <li><strong>試做價：</strong>HK$880（新客限定），旺角朗豪坊 Peko Beauty</li>
        </ul>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 2: 5 MODES OVERVIEW GRID
// ─────────────────────────────────────────────────────────────
function ModesOverviewSection({ activeMode, onModeSelect }: { activeMode: string; onModeSelect: (id: string) => void }) {
  return (
    <AnimatedSection id="modes-overview" className="py-10 md:py-14 px-4 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-8 md:mb-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C52B21] mb-3 px-4 py-1.5 bg-red-50 rounded-full border border-red-100">
            5種精準模式
          </span>
          <h2
            className="text-2xl md:text-[2rem] font-black text-gray-900 mb-3 leading-tight"
            style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
          >
            Hollywood Spectra™ 一套系統，五種精準治療
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
            點擊任何模式，查看詳細原理、適合對象及療程效果
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {MODES.map((mode, index) => (
            <motion.button
              key={mode.id}
              variants={scaleIn}
              onClick={() => onModeSelect(mode.id)}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className={`group text-left bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer ${
                activeMode === mode.id
                  ? "border-[#C52B21] shadow-lg"
                  : "border-gray-100 hover:border-gray-200"
              } ${index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className={`relative h-28 bg-gradient-to-br ${mode.gradient} flex flex-col items-center justify-center gap-2 overflow-hidden`}>
                <span className="text-5xl drop-shadow-sm select-none">{mode.emoji}</span>
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                  style={{ background: mode.accentColor }}
                >
                  {mode.badge}
                </span>
                {activeMode === mode.id && (
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{ background: BRAND_RED }}
                  />
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <strong className="text-gray-900 font-bold text-[14px] leading-snug group-hover:text-[#C52B21] transition-colors">
                    {mode.fullName}
                  </strong>
                  {activeMode === mode.id && (
                    <span className="flex-shrink-0 text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: BRAND_RED }}>
                      查看中
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{mode.tagline}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: mode.accentColor }}>
                  <span>查看詳情</span>
                  <span>→</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 3: MODE DETAIL (Tabbed)
// ─────────────────────────────────────────────────────────────
function ModeDetailSection({
  activeMode,
  onModeSelect,
  sectionRef,
}: {
  activeMode: string;
  onModeSelect: (id: string) => void;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const mode = MODES.find((m) => m.id === activeMode) ?? MODES[0];
  const ModeIcon = mode.Icon;

  return (
    <section id="mode-detail" ref={sectionRef as React.RefObject<HTMLElement>} className="py-10 md:py-14 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Tab Selector */}
        <div className="mb-8 overflow-x-auto -mx-4 px-4">
          <div className="flex gap-2 min-w-max">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => onModeSelect(m.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border-2 ${
                  activeMode === m.id
                    ? "text-white border-transparent shadow-lg"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
                style={activeMode === m.id ? { background: m.accentColor, borderColor: m.accentColor } : {}}
              >
                <span>{m.emoji}</span>
                <span>{m.shortName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            {/* Mode Header */}
            <div className={`rounded-2xl bg-gradient-to-br ${mode.gradient} p-6 md:p-8 mb-7 border border-white/50`}>
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                  style={{ background: mode.accentColor }}
                >
                  <ModeIcon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2
                      className="text-xl md:text-2xl font-black text-gray-900 leading-snug"
                      style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
                    >
                      {mode.fullName}
                    </h2>
                    <span
                      className="text-white text-[10px] font-bold px-3 py-1 rounded-full"
                      style={{ background: mode.accentColor }}
                    >
                      {mode.badge}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm font-semibold">{mode.tagline}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">{mode.heroDesc}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { label: "痛感指數", value: mode.painLevel.split(" — ")[0], sub: mode.painLevel.split(" — ")[1] ?? "" },
                  { label: "恢復期", value: mode.downtime.split("（")[0], sub: mode.downtime.includes("（") ? mode.downtime.match(/（(.*)）/)?.[1] ?? "" : "" },
                  { label: "建議次數", value: mode.sessions.split("，")[0].replace("建議 ", ""), sub: "完整療程" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-white/70">
                    <div className="text-xs font-bold text-gray-500 mb-0.5">{stat.label}</div>
                    <div className="text-sm font-black text-gray-900 leading-tight">{stat.value}</div>
                    {stat.sub && <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{stat.sub}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Mode Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tech Principle */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                  <span className="text-lg">🔬</span>
                  {mode.techTitle}
                </h3>
                <p className="text-gray-600 text-sm leading-[1.85]">{mode.techDesc}</p>
              </div>

              {/* For Whom */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                  <span className="text-lg">👤</span>
                  適合對象
                </h3>
                <ul className="space-y-2">
                  {mode.forWhom.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: mode.accentColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
              {mode.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl block mb-2">{benefit.icon}</span>
                  <strong className="text-gray-900 text-xs font-bold block mb-1">{benefit.title}</strong>
                  <p className="text-gray-500 text-[11px] leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* Highlight Banner */}
            <div
              className="mt-5 rounded-xl p-4 flex items-center gap-3"
              style={{ background: `${mode.accentColor}12`, border: `1px solid ${mode.accentColor}30` }}
            >
              <span className="text-xl">💡</span>
              <p className="text-sm font-bold" style={{ color: mode.accentColor }}>
                {mode.highlight}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href={WA_BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ background: mode.accentColor }}
              >
                💬 WhatsApp 查詢 {mode.shortName}
              </a>
              <a
                href={`#faq`}
                onClick={(e) => { e.preventDefault(); document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold rounded-lg px-6 py-4 text-base hover:bg-gray-200 transition-all duration-200"
              >
                查看常見問題
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// STICKY DUAL-LAYER NAV
// ─────────────────────────────────────────────────────────────
function StickyNav() {
  const pageNavItems = [
    { label: "療程原理", id: "science" },
    { label: "療程比較", id: "comparison" },
    { label: "客人見證", id: "results" },
    { label: "收費", id: "pricing" },
    { label: "常見問題", id: "faq" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden md:block sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-center gap-6 py-3">
          {pageNavItems.map((item) => (
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
// SECTION 4: SCIENCE
// ─────────────────────────────────────────────────────────────
function ScienceSection() {
  return (
    <AnimatedSection id="science" className="py-10 md:py-16 px-4 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C52B21] mb-3 px-4 py-1.5 bg-red-50 rounded-full border border-red-100">
            技術核心
          </span>
          <h2
            className="text-2xl md:text-3xl font-black text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
          >
            Hollywood Spectra™ 核心技術拆解
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
            Q-switched Nd:YAG 納秒激光平台 + 獨家 PTP+™ 多脈衝技術
          </p>
        </motion.div>

        {/* Dual Wave */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <motion.div variants={scaleIn} className="bg-indigo-50 rounded-2xl p-5 md:p-6 border border-indigo-100">
            <div className="font-black text-indigo-700 text-xl md:text-2xl mb-1">1064nm</div>
            <div className="text-sm font-bold text-indigo-600 mb-3">深層波長 · 膠原刺激 + 控油</div>
            <p className="text-gray-600 text-sm leading-[1.85]">
              穿透皮膚深層真皮，以 LIOB（Laser-Induced Optical Breakdown）光聲效應
              <strong>大量刺激膠原蛋白及彈力蛋白增生</strong>，縮窄毛孔、改善皮膚彈性及細紋。
              配合碳粉模式（Carbon Peel），碳粒吸收並傳遞熱能，深層清潔毛孔、抑制皮脂腺活躍度。
              Gold Toning 模式以 1064nm 溫和輸出改善泛紅及紅印。
            </p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-amber-50 rounded-2xl p-5 md:p-6 border border-amber-100">
            <div className="font-black text-amber-600 text-xl md:text-2xl mb-1">532nm</div>
            <div className="text-sm font-bold text-amber-500 mb-3">表層波長 · 精準碎斑 + 去色素</div>
            <p className="text-gray-600 text-sm leading-[1.85]">
              精準針對表皮層的<strong>黑色素顆粒</strong>，以瞬間高峰值能量（Q-switched 模式）
              打碎色素顆粒成細小碎片，再由淋巴系統自然代謝排出體外。
              特別適合淡化<strong>雀斑、曬斑、老人斑</strong>等表淺色素問題，不傷害周圍正常皮膚組織。
            </p>
          </motion.div>
        </div>

        {/* PTP+ & HyperSurge */}
        <motion.div variants={fadeUp} className="bg-white rounded-2xl p-5 md:p-7 border border-gray-100 shadow-sm mb-8">
          <h3 className="font-black text-gray-900 text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            獨家 PTP+™ 多脈衝技術 — FDA 荷爾蒙斑認證核心
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "Step 1",
                title: "低能量穩定",
                desc: "先以低能量脈衝作用，令黑色素細胞進入「受抑制」狀態，防止其在高能量刺激下代償性增生",
                color: "bg-blue-50 border-blue-100",
                textColor: "text-blue-700",
              },
              {
                step: "Step 2",
                title: "高能量碎斑",
                desc: "黑色素細胞已被穩定後，再施以較高峰值能量精準擊碎色素顆粒，大幅提升碎斑效果",
                color: "bg-purple-50 border-purple-100",
                textColor: "text-purple-700",
              },
              {
                step: "結果",
                title: "低反黑風險",
                desc: "相比傳統單脈衝激光，PTP+™ 顯著降低亞洲膚質最擔心的炎症後黑素沉著（PIH 反黑）風險",
                color: "bg-green-50 border-green-100",
                textColor: "text-green-700",
              },
            ].map((item) => (
              <div key={item.step} className={`rounded-xl p-4 border ${item.color}`}>
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${item.textColor}`}>{item.step}</div>
                <div className="font-bold text-gray-900 text-sm mb-2">{item.title}</div>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Clinical Stats */}
        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-5">
          臨床數據：效果有幾好？
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { value: "70–80%", label: "荷爾蒙斑改善率（PTP+™）" },
            { value: "90%", label: "膚色提亮滿意率" },
            { value: "75%", label: "色斑淡化改善率" },
            { value: "88%", label: "客人整體滿意度" },
          ].map((s) => (
            <motion.div key={s.value} variants={scaleIn} className="bg-red-50 rounded-xl p-5 text-center border border-red-100">
              <div className="text-2xl md:text-3xl font-black text-[#C52B21] leading-tight">{s.value}</div>
              <div className="text-xs text-gray-500 mt-2 leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Therapist Note */}
        <motion.div variants={fadeUp} className="bg-green-50 border border-green-200 rounded-xl p-5 md:p-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">👩‍⚕️</span>
            <strong className="text-green-800 text-sm md:text-base">
              治療師筆記 ｜ Peko Beauty 朗豪坊臨床手記
            </strong>
          </div>
          <p className="text-gray-700 italic leading-[1.9] text-sm md:text-[15px]">
            &ldquo;Hollywood Spectra 係我最常推薦給初次接觸激光的客人，原因係零停工期，即做即走，同埋幾乎係所有激光中最唔痛的一種。最重要是它有五種模式，我可以按每位客人的皮膚狀況做個人化組合——例如有荷爾蒙斑的客人用 PTP+™，油脂旺盛加 Carbon Peel，有紅印的加 Gold Toning。這種靈活性係一般激光系統做唔到的。好多客人第一次做完出門口就話感覺皮膚亮咗，而堅持做足 6–8 次的客人，膚色和整體皮膚質感的改善，就更加係肉眼明顯。&rdquo;
          </p>
          <p className="text-xs text-gray-400 mt-3">— Peko Beauty 資深治療師，旺角朗豪坊診所</p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 5: TREATMENT STATS TABLE
// ─────────────────────────────────────────────────────────────
function TreatmentStatsSection() {
  const rows = [
    { icon: "⏱", label: "療程時間", value: "約 30–45 分鐘（視乎模式，含碳粉塗敷時間）" },
    { icon: "😌", label: "痛感指數", value: "1–2/10 — Laser Facial / Carbon Peel / Gold Toning 幾乎無痛；色斑針對治療約 2–3/10" },
    { icon: "🔴", label: "恢復期", value: "零恢復期 — 激光後皮膚可能微微泛紅約 1–2 小時；針對色斑時可能輕微結痂 1–3 天" },
    { icon: "📅", label: "建議次數", value: "4–8 次，每 2–3 週一次（色斑針對每 4–6 週，荷爾蒙斑建議 5–8 次以上）" },
    { icon: "✅", label: "見效時間", value: "第 1 次後即見膚色提亮及毛孔縮小；色斑及荷爾蒙斑通常需 3–5 次才見明顯改善" },
    { icon: "📆", label: "效果維持", value: "完成 4–8 次療程後效果更穩定，配合日常防曬及護膚可進一步延長" },
    {
      icon: "🏆",
      label: "認證",
      value: "美國 FDA K213569（2022，全球首個 Melasma 認證激光）· 韓國 KFDA · 歐盟 CE · 全球 60+ 國家使用",
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
          Hollywood Spectra™ 療程數據一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">
          所有數字來自 Peko Beauty 朗豪坊診所真實臨床記錄及韓國 Lutronic 原廠數據
        </motion.p>

        <motion.div variants={scaleIn} className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
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
                <td className="px-5 py-5 font-black text-[#C52B21] text-2xl">HK$880（全面）</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 6: PROCESS
// ─────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      num: 1,
      title: "WhatsApp 預約 / 網上預約",
      desc: "透過 WhatsApp +852 5335 3313 預約，客服會在 24 小時內確認時間。建議提前最少 1 天預約，熱門時段（週五晚、週六）建議提前 3–5 天。",
    },
    {
      num: 2,
      title: "到店 + 免費 VISIA 皮膚深層分析",
      desc: "到達朗豪坊 40 樓後，資深治療師先以 VISIA 儀器進行免費深層皮膚分析，量化評估色素分佈深度、膚色均勻度、毛孔狀況、膠原密度，以科學數據決定最適合的 Hollywood Spectra 模式及能量設定。",
    },
    {
      num: 3,
      title: "個人化模式制定（零硬銷）",
      desc: "治療師根據 VISIA 數據及你的皮膚問題，推薦最適合的模式組合——例如荷爾蒙斑用 PTP+™、毛孔問題加 Carbon Peel、痘紅印用 Gold Toning。Peko Beauty 承諾：如果療程唔適合你，我們會如實告知。",
    },
    {
      num: 4,
      title: "清潔 → 療程準備 → Hollywood Spectra 激光治療",
      desc: "深層清潔面部後，按選定模式進行準備（如 Carbon Peel 需塗碳粉）。整個治療過程約 20–30 分鐘，全程幾乎無任何痛感，可全程放鬆。",
    },
    {
      num: 5,
      title: "舒緩面膜 + 護理指引 + WhatsApp 跟進",
      desc: "激光後即場敷舒緩面膜補水修護，皮膚微微泛紅通常 1–2 小時內消退。治療師提供個人化護理指引（防曬、保濕），並透過 WhatsApp 在 48 小時內主動跟進恢復情況。",
    },
  ];

  return (
    <AnimatedSection id="process" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-12"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          在 Peko Beauty 做 Hollywood Spectra™ 係咩流程？
        </motion.h2>
        <div className="space-y-4 md:space-y-5">
          {steps.map((step) => (
            <motion.div key={step.num} variants={fadeUp} className="flex gap-4 md:gap-6 items-start">
              <div
                className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white font-black text-base md:text-lg shadow-md"
                style={{ background: BRAND_RED }}
              >
                {step.num}
              </div>
              <div className="bg-white rounded-xl p-4 md:p-5 flex-1 shadow-sm border border-gray-100">
                <strong className="block text-gray-900 text-[14px] md:text-[15px] leading-snug">{step.title}</strong>
                <p className="text-gray-500 text-sm leading-relaxed mt-2">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 7: COMPARISON TABLE
// ─────────────────────────────────────────────────────────────
function ComparisonSection() {
  const rows = [
    { feature: "核心技術", spectra: "Q-switched Nd:YAG 納秒 + PTP+™", pico: "皮秒 Nd:YAG / Alexandrite", ipl: "強脈衝光（寬頻光）" },
    { feature: "治療模式", spectra: "5 種精準模式（Facial/PTP+/Carbon/Gold/色斑）", pico: "通常 1–2 種", ipl: "寬頻 1 種" },
    { feature: "FDA 荷爾蒙斑認證", spectra: "✅ K213569（2022 唯一）", pico: "❌ 無", ipl: "❌ 無", highlight: true },
    { feature: "痛感", spectra: "1–2/10", pico: "3/10", ipl: "4/10" },
    { feature: "恢復期", spectra: "零恢復期（色斑針對 1–3 天）", pico: "1–3 天", ipl: "1–2 天" },
    { feature: "適合敏感肌", spectra: "✅ 非常適合", pico: "⚠️ 視乎情況", ipl: "❌ 風險較高", highlight: true },
    { feature: "深色膚質安全性", spectra: "✅ 高（PTP+™保護機制）", pico: "✅ 高", ipl: "❌ 反黑風險", highlight: true },
    { feature: "毛孔 / 控油", spectra: "✅ Carbon Peel 專項", pico: "⚠️ 有限", ipl: "⚠️ 有限", highlight: true },
    { feature: "消紅印", spectra: "✅ Golden Laser 專項", pico: "⚠️ 非主力", ipl: "⚠️ 部分有效" },
    { feature: "試做價", spectra: "HK$880", pico: "HK$2,000+", ipl: "HK$800+", isPrice: true },
  ];

  return (
    <AnimatedSection id="comparison" className="py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          Hollywood Spectra™ vs 皮秒激光 vs IPL 強脈衝光
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">
          以下比較基於 Peko Beauty 真實臨床數據，幫助你做出最適合自己膚質的選擇。
        </motion.p>

        <motion.div variants={scaleIn} className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-4 px-4 text-left text-xs font-bold w-[26%]">比較項目</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]" style={{ background: BRAND_RED }}>
                  ⭐ Hollywood Spectra™
                  <br />
                  <span className="font-normal opacity-80 text-[10px]">(Peko Beauty)</span>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[24%]">皮秒激光</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[24%]">IPL 強脈衝光</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 text-xs border-b border-gray-100">{row.feature}</td>
                  <td
                    className={`px-4 py-3.5 text-center text-xs border-b border-gray-100 font-semibold bg-red-50/60 ${
                      row.isPrice ? "text-xl font-black text-[#C52B21]" : row.highlight ? "text-green-700" : "text-[#C52B21]"
                    }`}
                  >
                    {row.spectra}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.pico}</td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.ipl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5">
          <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
            <strong className="text-gray-900">🎯 Peko 建議：</strong>
            Hollywood Spectra™ 的最大優勢是<strong>五種模式的靈活組合</strong>，
            一套系統可以同時解決多個皮膚問題，配合 FDA 唯一荷爾蒙斑認證，效果更全面可靠。
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-8">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            style={{ background: BRAND_RED }}
          >
            👉 查看 Hollywood Spectra™ 試做優惠 HK$880
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 8: TESTIMONIALS
// ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "做完第一次之後皮膚即刻感覺亮咗，連男朋友都問我係咪換咗粉底液！第 4 次做完後，臉上的雀斑明顯淡化了大概 50%，毛孔亦縮細了很多。最重要係整個過程幾乎沒有痛感，唔需要請假，做完即刻返工。",
      name: "A 小姐",
      age: "29歲",
      concern: "雀斑 + 膚色不均",
      treatment: "色斑針對 + Laser Facial × 6 次",
    },
    {
      quote:
        "生完小朋友後臉上長了好多荷爾蒙斑，試過好多美白護膚品都改善有限。治療師建議我做 PTP+™ 多脈衝模式，做了 6 次後，斑確實淡了很多，而且無反黑！最難得係治療師每次都細心解釋，完全無硬銷。",
      name: "K 小姐",
      age: "34歲",
      concern: "產後荷爾蒙斑 + 暗黃",
      treatment: "PTP+™ 多脈衝 × 6 次",
    },
    {
      quote:
        "一直有毛孔粗大同黑頭問題，試咗 Carbon Peel 之後即日覺得皮膚乾淨咗好多，毛孔係視覺上細咗。做完後上妝貼服感好了很多，算係我用過最有效嘅毛孔療程。",
      name: "M 小姐",
      age: "26歲",
      concern: "毛孔粗大 + 控油",
      treatment: "Carbon Peel 碳粉激光 × 5 次",
    },
  ];

  const socialStats = [
    { value: "90%", label: "膚色提亮滿意率" },
    { value: "5,000+", label: "真實好評" },
    { value: "88%", label: "客人整體滿意度" },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-36 bg-gradient-to-br from-indigo-50 to-amber-50">
                <Image
                  src="/images/peko-beauty-reception-desk-mong-kok.jpg"
                  alt={`Peko Beauty Hollywood Spectra ${t.concern} 效果`}
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-white text-[10px] px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: `${BRAND_RED}cc` }}
                  >
                    {t.treatment}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-500 text-xs italic leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
                <strong className="text-gray-900 text-sm">{t.name}</strong>
                <p className="text-xs text-gray-400 mt-0.5">{t.age}，主要困擾：{t.concern}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={scaleIn}
          className="bg-red-50 rounded-2xl py-6 px-8 flex flex-wrap justify-center gap-8 text-center border border-red-100"
        >
          {socialStats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-[#C52B21]">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 9: TRUST SIGNALS
// ─────────────────────────────────────────────────────────────
function TrustSection() {
  const pillars = [
    {
      Icon: Award,
      title: "儀器信任",
      items: [
        "100% 韓國 Lutronic 原廠正貨 Spectra™",
        "美國 FDA K213569 認可（首個 Melasma 認證）",
        "韓國 KFDA / 歐盟 CE 認可",
        "全球 60+ 國家醫療機構採用",
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
        "88% 客人滿意度",
        "5,000+ 真實好評",
        "療程前後 VISIA 對比追蹤",
        "售後 1 對 1 WhatsApp 跟進",
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
          點解旺角客人揀 Peko Beauty 做 Hollywood Spectra™？
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
// SECTION 10: PRICING
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
          Hollywood Spectra™ 香港收費一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          Peko Beauty 承諾：明碼實價，絕無隱藏收費，絕不硬銷升級
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            variants={scaleIn}
            className="relative border-2 border-[#C52B21] rounded-2xl p-7 text-center bg-white shadow-md"
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-1 rounded-full whitespace-nowrap"
              style={{ background: BRAND_RED }}
            >
              🌟 新客限定
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">新客體驗方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              Hollywood Spectra™ 全面激光療程
              <br />+ 免費 VISIA 皮膚深層分析
              <br />+ 個人化模式推薦諮詢
            </p>
            <div className="text-5xl font-black text-[#C52B21] leading-none mb-1">HK$880</div>
            <p className="text-gray-300 text-xs mb-6">市場參考價 HK$1,800+</p>
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

          <motion.div variants={scaleIn} className="border-2 border-gray-200 rounded-2xl p-7 text-center bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-2">療程套票方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              根據 VISIA 分析個人化建議
              <br />（4 次 / 6 次 / 8 次套裝可選）
              <br />可按需要混合不同模式
            </p>
            <div className="text-3xl font-black text-gray-600 leading-none mb-1">歡迎查詢</div>
            <p className="text-gray-300 text-xs mb-6">按個人膚質及需求次數報價</p>
            <a
              href="https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20Hollywood%20Spectra%20套票價錢"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-600 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:bg-gray-700 active:scale-[0.98]"
            >
              📋 查詢套票詳情
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-800 text-sm leading-relaxed">
            💯 <strong>Peko Beauty 透明承諾：</strong>明碼實價，絕無隱藏收費，到店後無需即場決定
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 11: SUITABILITY
// ─────────────────────────────────────────────────────────────
function SuitabilitySection() {
  const suitable = [
    "膚色暗黃、不均，想提亮嫩膚（Laser Facial）",
    "荷爾蒙斑（Melasma）困擾，怕反黑（PTP+™）",
    "毛孔粗大、T 區油脂分泌旺盛（Carbon Peel）",
    "暗瘡後紅印 / 玫瑰痤瘡泛紅（Golden Laser）",
    "雀斑、曬斑、老人斑、色素問題（色斑針對）",
    "工作繁忙，需要零停工期方案",
    "初次接觸激光，怕痛、怕恢復期",
  ];
  const unsuitable = [
    "懷孕或哺乳期",
    "治療部位有活躍性感染或開放性傷口",
    "光敏感症或正在服用光敏感藥物（如四環素）",
    "最近 4 週内有過度曝曬或曬傷未愈",
    "體內有心臟起搏器或金屬植入物（治療眼周時）",
    "近期服用口服 A 酸（需停藥 6 個月以上）",
    "嚴重免疫疾病患者",
  ];

  return (
    <AnimatedSection id="suitability" className="py-14 px-4 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-8"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          Hollywood Spectra™ 適合咩人做？（包含禁忌症）
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={scaleIn} className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-green-800 font-bold text-base mb-5 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              適合做 Hollywood Spectra™
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
          <motion.div variants={scaleIn} className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <h3 className="text-red-700 font-bold text-base mb-5 flex items-center gap-2">
              <XCircle size={20} className="text-red-500" />
              不建議做 Hollywood Spectra™
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
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#C52B21] font-semibold not-italic">
            WhatsApp 免費諮詢
          </a>{" "}
          我們的專業顧問，無任何消費壓力。
        </motion.p>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 12: FAQ
// ─────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Hollywood Spectra™ 係什麼？同一般皮秒激光有咩分別？",
      a: "Hollywood Spectra™ 是 Q-switched Nd:YAG 納秒激光平台（韓國 Lutronic），搭載 1064nm 與 532nm 雙波長，並配備 PTP+™ 多脈衝、HyperSurge Resonator™ 及 IntelliBeam™ 等獨家技術。它最大的特點是五種精準治療模式：Laser Facial 嫩膚、蜂巢 PTP+™ 荷爾蒙斑（FDA 唯一認證）、Carbon Peel 碳粉激光、Golden Laser 消紅印、色斑針對治療。與皮秒激光的最大分別不只是脈衝時間，而是治療定位：皮秒強調高速碎斑；Hollywood Spectra™ 更重視穩定性、舒適度、低恢復期，以及多模式靈活組合的整體皮膚管理能力。",
    },
    {
      q: "PTP+™ 蜂巢多脈衝模式係乜？點解可以治療荷爾蒙斑（Melasma）？",
      a: "PTP+™（Pulse Train Protocol）是 Hollywood Spectra™ 的革命性多脈衝技術，亦是全球首個獲美國 FDA 批准（K213569，2022年）專門治療 Melasma（荷爾蒙斑）的激光模式。其原理分兩步：第一步以低能量預脈衝「穩定」黑色素細胞，使其進入受抑制狀態；第二步才以較高能量精準擊碎色素顆粒。這種雙步驟大幅降低傳統激光治療荷爾蒙斑最常見的「PIH 反黑」風險，臨床數據顯示荷爾蒙斑改善率高達 70–80%。",
    },
    {
      q: "Carbon Peel 碳粉激光點樣收毛孔？即時效果係真的嗎？",
      a: "Carbon Peel（又稱荷里活碳粉激光）的工作原理：先塗上一層醫用碳粉，碳粒深入毛孔吸附油脂及角栓；再以 1064nm Spectra Mode 照射，碳粒瞬間氣化爆破，帶走毛孔內污垢，同時傳熱至皮脂腺來抑制油脂過度分泌。即時效果是真實的——碳粒爆破會同時去除舊角質及毛孔角栓，做完後皮膚確實更平滑、乾淨，毛孔視覺上縮小。但要維持長期毛孔管理，建議完成 4–8 次完整療程。",
    },
    {
      q: "Golden Laser 金激光對痘紅印有效嗎？同 Gold Toning 係唔係一樣？",
      a: "是的，Golden Laser 即是 Gold Toning 模式的通稱。它以較溫和、均勻的 1064nm 能量輸出，針對痘後 PIH 紅色期、臉部泛紅及輕度玫瑰痤瘡症狀。其機制是幫助細小擴張血管收縮、促進血紅素代謝，從而淡化紅印、均勻膚色。對於輕至中度痘紅印，通常 3–5 次後有明顯改善；若屬明顯玫瑰痤瘡或持續泛紅，則需諮詢治療師評估是否需要針對血管的特化療程。",
    },
    {
      q: "Hollywood Spectra™ 幾多次先見效？",
      a: "視乎選用模式及皮膚問題。Laser Facial 及 Carbon Peel 通常第 1 次即見膚色提亮及毛孔縮小；Golden Laser 消紅印通常 2–4 次後有明顯改善；色斑針對（雀斑、曬斑）通常 3–6 次；荷爾蒙斑（PTP+™）通常需 5–8 次以上，因荷爾蒙斑是慢性色素問題，需要較長療程管理週期。所有模式均建議完成完整療程以獲得最穩定持久的效果。",
    },
    {
      q: "Hollywood Spectra™ 痛唔痛？做完可以即日化妝同返工嗎？",
      a: "Hollywood Spectra™ 一般屬低痛感療程。Laser Facial、Carbon Peel、Gold Toning 模式通常感覺只有輕微溫熱感或橡筋輕彈，痛感約 1/10；色斑針對治療能量稍高，約 2–3/10。治療後皮膚通常只有輕微泛紅，約 1–2 小時內消退，普遍零恢復期。Carbon Peel 及 Laser Facial 做完即日即可化妝返工；色斑針對治療若用較高能量，斑點位置可能出現輕微結痂，建議諮詢治療師後決定化妝時機。",
    },
    {
      q: "Hollywood Spectra™ vs PicoSure 皮秒，去荷爾蒙斑邊個更好？",
      a: "對於荷爾蒙斑（Melasma），Hollywood Spectra™ 的 PTP+™ 多脈衝模式目前是全球唯一獲 FDA 認可專治 Melasma 的激光模式，臨床改善率 70–80%。PicoSure 等皮秒激光對深層色素及某些類型斑塊有優勢，但並非針對 Melasma 的 FDA 認可指徵。重要的是，荷爾蒙斑的治療邏輯是「穩定管理」而非「越猛越好」，過強能量反而可能引發 PIH 反黑。最正確的做法是先讓治療師評估你的斑種類型，再決定最合適的方案。",
    },
    {
      q: "Hollywood Spectra™ 有咩副作用？會反黑嗎？",
      a: "最常見的即時反應是短暫紅熱感及輕微乾燥，通常 1–2 小時內消退，屬零恢復期。針對色斑治療（532nm）後斑點位置可能出現輕微結痂 1–3 天，屬正常現象。反黑的主要風險來自：術後防曬不足、能量設定不當、皮膚本身炎症未穩定。PTP+™ 的雙步驟保護機制已大幅降低反黑風險，但正規操作 + 術後嚴格防曬仍然非常重要。Peko Beauty 會在療程後提供詳細的護理指引。",
    },
    {
      q: "做完 Hollywood Spectra™ 要注意咩？",
      a: "術後護理重點：① 嚴格防曬（SPF 50+，每 2–3 小時補塗）；② 加強保濕；③ 短期內避免去角質、果酸、A 醇、高濃度維他命 C；④ 24 小時內避免高溫環境（焗桑拿、蒸面）；⑤ 如有輕微結痂（色斑治療後），讓其自然脫落，勿強行撕除。大部分客人當日已可正常上班和社交，化妝可視皮膚反應，通常當日稍後或翌日已無問題。",
    },
    {
      q: "Hollywood Spectra™ 香港收費一般係幾多？",
      a: "香港市場上 Hollywood Spectra™ 收費受地段、儀器真偽及模式而有所不同。Peko Beauty 旺角朗豪坊目前提供新客試做價 HK$880（全面），包含免費 VISIA 皮膚深層分析及個人化模式推薦諮詢。完整療程套票按 4 次、6 次或 8 次方案，以及你的主訴問題個人化報價。選擇中心時，建議確認：是否使用 Lutronic 原廠正品儀器、收費是否透明、是否有術後跟進。",
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
          Hollywood Spectra™ 常見問題 FAQ
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
                <span className="font-bold text-gray-900 text-sm md:text-base leading-snug">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-[#C52B21] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
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
// SECTION 13: RELATED TREATMENTS
// ─────────────────────────────────────────────────────────────
function RelatedSection() {
  const related = [
    {
      href: "/treatments/sylfirm-x",
      emoji: "⚡",
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
      tag: "微針電波",
      title: "Sylfirm X 雙波黃金微針",
      desc: "配合 PTP+™ 使用，深層修復凹凸洞及荷爾蒙斑根源，加乘嫩膚效果",
      cta: "試做 HK$1,880",
    },
    {
      href: "/treatments/xe-lha-peel",
      emoji: "✨",
      gradient: "from-orange-200 via-amber-100 to-yellow-50",
      accentColor: "#d97706",
      tag: "果酸換膚",
      title: "XE-LHA Peel 醫學級換膚",
      desc: "激光前先做換膚提升角質通透度，令 Hollywood Spectra™ 激光能量吸收更有效",
      cta: "試做 HK$980",
    },
    {
      href: "/treatments/btl-exion",
      emoji: "💎",
      gradient: "from-blue-200 via-indigo-100 to-violet-50",
      accentColor: "#4f46e5",
      tag: "無創緊緻",
      title: "BTL Exion 膠原槍",
      desc: "無創激生 +224% 透明質酸，配合激光同步改善膚色及輪廓緊緻度",
      cta: "試做 HK$680",
    },
  ];

  return (
    <AnimatedSection id="related" className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h3 variants={fadeUp} className="text-xl font-black text-gray-900 mb-2">
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
                <div className={`relative h-28 bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-2`}>
                  <span className="text-5xl drop-shadow-sm select-none">{item.emoji}</span>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                    style={{ background: item.accentColor }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div className="px-4 pt-3.5 pb-4">
                  <strong className="block text-gray-900 text-[13px] font-bold mb-1 leading-snug group-hover:text-[#C52B21] transition-colors">
                    {item.title}
                  </strong>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: item.accentColor }}>
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
// SECTION 14: FINAL CTA
// ─────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section
      id="final-cta"
      className="py-16 px-4 text-center"
      style={{ background: "linear-gradient(135deg, #f5f0ff 0%, #fdf8ff 100%)" }}
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
          準備好體驗 Hollywood Spectra™ 5合1激光了嗎？
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
          免費 VISIA 皮膚深層分析 + 個人化模式推薦 + 零壓力諮詢
          <br />
          新客試做價{" "}
          <strong className="text-[#C52B21]">HK$880</strong>，明碼實價，絕無隱藏消費
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
export default function HollywoodSpectraClient() {
  const [activeMode, setActiveMode] = useState(MODES[0].id);
  const modeDetailRef = useRef<HTMLElement | null>(null);

  const handleModeSelect = (id: string) => {
    setActiveMode(id);
    setTimeout(() => {
      modeDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="bg-white">
      <StickyNav />
      <HeroSection onModeSelect={handleModeSelect} />
      <GeoSection />
      <ModesOverviewSection activeMode={activeMode} onModeSelect={handleModeSelect} />
      <ModeDetailSection activeMode={activeMode} onModeSelect={handleModeSelect} sectionRef={modeDetailRef} />
      <ScienceSection />
      <TreatmentStatsSection />
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
