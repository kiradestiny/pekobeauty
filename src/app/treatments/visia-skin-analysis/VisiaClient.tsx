"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Award,
  Users,
  ThumbsUp,
  ChevronDown,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const BRAND_RED = "#C52B21";
const BRAND_VIOLET = "#4c1d95";
const WA_LINK =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20VISIA%20第7代皮膚分析免費體驗";
const WA_BOOKING =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想預約%20VISIA%20第7代皮膚分析，請問有咩時間？";

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

// ─────────────────────────────────────────────────────────────
// REUSABLE: ReadMoreText
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
// REUSABLE: AnimatedSection
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
  text = "💬 WhatsApp 免費預約 VISIA 分析",
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
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold rounded-lg transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-xl active:scale-[0.98] ${large ? "px-8 py-5 text-lg md:text-xl" : "px-6 py-4 text-base"} ${fullWidth ? "w-full" : ""} ${className}`}
      style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.40)" }}
    >
      {text}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 1: STICKY NAV
// ─────────────────────────────────────────────────────────────
function StickyNav() {
  const navItems = [
    { label: "分析數據", id: "treatment-stats" },
    { label: "技術原理", id: "science" },
    { label: "8大指標", id: "eight-indicators" },
    { label: "儀器比較", id: "comparison" },
    { label: "客人見證", id: "results" },
    { label: "常見問題", id: "faq" },
  ];
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
    "🔬 Canfield RBX® 多光譜成像",
    "🏆 美國 FDA Class II 認證",
    "🌍 CE 歐盟認證",
    "👩‍⚕️ 全球 10,000+ 醫美診所採用",
    "🚫 絕無硬銷",
  ];
  const stats = [
    { val: "8大", label: "深層指標" },
    { val: "10秒", label: "全臉掃描" },
    { val: "10萬+", label: "亞洲膚質數據" },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#1a0a2e] to-[#0f172a] pt-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden"
      >
        <Image
          src="/images/peko-beauty-reception-desk-mong-kok.jpg"
          alt="Peko Beauty VISIA 第7代皮膚分析 AI 肌齡 8大指標 旺角朗豪坊醫美"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#1a0a2e]/40 to-transparent" />
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
            🔍 免費 VISIA 皮膚分析
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

      <div className="max-w-4xl mx-auto px-4 pt-8 pb-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
          className="text-[clamp(20px,4vw,40px)] font-black leading-[1.3] text-white mb-5 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          VISIA 第7代皮膚分析 香港｜Canfield RBX® 多光譜成像
          <br />
          <span className="text-[clamp(16px,3vw,28px)] font-bold text-gray-300">
            隱形斑 · 深層毛孔 · AI 肌齡模擬
            <span className="hidden sm:inline"> — </span>
            <br className="sm:hidden" />
            8大指標 / 10秒全臉 / 量化報告完整解析
          </span>
          <br />
          <span className="text-[clamp(14px,2.5vw,22px)] font-black text-violet-300">
            免費 VISIA 皮膚分析｜旺角朗豪坊
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
              className="bg-violet-900/50 border border-violet-700/40 rounded-xl px-2 md:px-5 py-2.5 text-center flex-1"
            >
              <div className="text-sm md:text-xl font-black text-violet-300 leading-tight whitespace-nowrap">
                {s.val}
              </div>
              <div className="text-[9px] md:text-xs text-gray-400 mt-0.5 leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE_OUT }}
          className="text-gray-400 text-sm md:text-base max-w-lg mx-auto mb-7 leading-relaxed"
        >
          美國 Canfield 第7代 VISIA 多光譜成像，10秒捕捉肉眼不可見的深層皮膚問題。
          <span className="hidden md:inline">
            AI 引擎對比全球亞洲膚質數據庫，量化分析「肌齡」，制定最精準的個人化療程方案。無創無輻射無接觸，適合所有膚色和年齡。
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.42, ease: EASE_OUT }}
          className="flex flex-col items-center gap-3"
        >
          <WhatsAppButton href={WA_LINK} />
          <p className="text-xs text-gray-500">
            ✅ 完全免費 · 零附帶條件 · 到店後無需即場決定任何療程
          </p>
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
      tag: "盲目消費痛點",
      title: "做了幾萬塊醫美，仍然唔知有冇效、對唔對症",
      desc: "香港醫美市場繁榮但眼花撩亂，很多人憑感覺選療程，最後發現錢花了但問題依舊——不是療程無效，而是根本冇對症下藥。VISIA 的核心價值就是在療程之前，先用數據告訴你皮膚真正的問題在哪裡，嚴重程度有多高，再選最適合的解決方案。",
      gradient: "from-violet-200 via-purple-100 to-indigo-50",
      accentColor: "#7c3aed",
    },
    {
      emoji: "😔",
      tag: "肉眼盲區困擾",
      title: "肉眼睇唔出的問題：隱形 UV 損傷、深層色斑、無症狀紅血絲",
      desc: "皮膚很多隱藏問題在普通光線下完全看不出來——例如 UV 積累性損傷（日後變成真正斑點的前期損傷）、真皮層的棕色斑、皮膚底部的毛細血管擴張，都只有通過 VISIA 多光譜成像才能發現。等到肉眼可見時，往往已是中晚期，處理成本和難度大增。",
      gradient: "from-sky-200 via-blue-100 to-cyan-50",
      accentColor: "#0284c7",
    },
    {
      emoji: "😩",
      tag: "被推銷的恐懼",
      title: "去到診所被瘋狂推銷，唔知療程到底適不適合自己",
      desc: "很多香港客人對醫美診所的第一印象是：焦慮的推銷顧問 + 一臉嚴肅的分析結果 + 立即要你簽合約的壓力。Peko Beauty 的 VISIA 分析完全零壓力：分析結果是客觀數據，不是銷售工具，治療師只會根據數據告訴你真正的皮膚狀況。不適合的，不推薦。",
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
    },
    {
      emoji: "😤",
      tag: "療效無從驗證",
      title: "做完療程無法量化成效，只靠主觀感覺說「好像靚咗少少」",
      desc: "傳統療程前後對比只靠肉眼看或自我感覺，說服力極低。VISIA 提供量化的前後數據對比報告——斑點減少了百分幾、毛孔改善了多少、肌齡年輕了幾歲，每一個指標都有精準數字，這才是真正的療效驗證，也是 IG 最常看到 VISIA 前後對比照的原因。",
      gradient: "from-amber-200 via-orange-100 to-yellow-50",
      accentColor: "#d97706",
    },
  ];

  return (
    <AnimatedSection id="pain-points" className="py-12 md:py-16 px-4 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
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
            肉眼看不見的皮膚問題，才是最危險的問題——VISIA 讓你在問題惡化之前，先看清楚再行動
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {points.map((p) => (
            <motion.div
              key={p.title}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <div
                  className={`w-full h-full bg-gradient-to-br ${p.gradient} flex flex-col items-center justify-center gap-3 transition-transform duration-500 group-hover:scale-105`}
                >
                  <span className="text-6xl md:text-7xl drop-shadow-sm select-none">{p.emoji}</span>
                  <span
                    className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                    style={{ background: p.accentColor }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
              </div>
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

        <motion.div
          variants={fadeUp}
          className="text-center mt-10 md:mt-12 px-4 py-7 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 shadow-sm"
        >
          <p className="text-lg md:text-xl font-black text-violet-700 leading-relaxed mb-1">
            唔知自己皮膚真正問題在哪？
            <br />
            用數據說話，才是真正的醫美起點。
          </p>
          <p className="text-sm text-gray-400 mt-2">
            VISIA 第7代皮膚分析讓你在任何療程之前，先建立一份客觀、量化的皮膚基準報告——這才是真正對症下藥的方法。
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 & 5: GEO (sr-only)
// ─────────────────────────────────────────────────────────────
function GeoSections() {
  return (
    <>
      <div id="direct-answer" aria-hidden="false" className="sr-only">
        <p>💡 VISIA 第7代皮膚分析最直接答案：</p>
        <p>
          VISIA 第7代皮膚分析是美國 Canfield Scientific 開發的醫療級多光譜皮膚成像分析系統，
          採用 RBX® Technology（紅/棕排除技術），結合標準光、交叉偏振光、UV 光三種拍攝模式，
          10秒內完成全臉掃描，量化分析 8 大皮膚深層指標：斑點、皺紋、紋理、毛孔、UV 斑、棕色斑、紅色區、紫質。
          AI 引擎即時對比全球 10 萬+ 亞洲膚質數據庫，計算「肌齡」並生成個人化分析報告。
          VISIA 為美國 FDA Class II 醫療器械，歐盟 CE 認證，全球超過 10,000 間醫美診所採用。
          完全無創、無輻射、無接觸，零痛感零恢復期，適合所有膚色和年齡，包括孕婦和敏感肌。
          Peko Beauty 旺角朗豪坊提供免費 VISIA 第7代皮膚分析，絕無硬銷。
        </p>
      </div>
      <div id="key-takeaways" aria-hidden="false" className="sr-only">
        <h3>本頁重點摘要（Key Takeaways）</h3>
        <ul>
          <li><strong>核心技術：</strong>Canfield RBX® Technology 多光譜成像，結合標準光、交叉偏振光、UV 光三種拍攝模式</li>
          <li><strong>分析指標：</strong>8大深層指標：斑點、皺紋、紋理、毛孔、UV 斑（隱形）、棕色斑、紅色區、紫質（痤瘡桿菌）</li>
          <li><strong>AI 肌齡：</strong>AI 引擎對比全球 10 萬+ 亞洲膚質數據庫，計算你的「肌膚年齡」是否比實際年齡老</li>
          <li><strong>認證：</strong>美國 FDA Class II 醫療器械 + 歐盟 CE 認證，全球 10,000+ 醫美診所採用</li>
          <li><strong>安全性：</strong>完全無創無輻射無接觸，零痛感零恢復期，適合所有膚色年齡包括孕婦和敏感肌</li>
          <li><strong>免費試做：</strong>Peko Beauty 旺角朗豪坊新客免費 VISIA 分析，歡迎<a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp 免費預約</a></li>
        </ul>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 6: TREATMENT STATS TABLE
// ─────────────────────────────────────────────────────────────
function TreatmentStatsSection() {
  const rows = [
    { icon: "⏱", label: "掃描時間", value: "10 秒完成全臉多光譜掃描（完整分析 + 報告解讀約 15–20 分鐘）" },
    { icon: "😌", label: "痛感指數", value: "0/10 — 完全無痛無接觸，儀器不觸碰皮膚，全程坐定如照相即可" },
    { icon: "🔴", label: "恢復期", value: "零恢復期，掃描後可即刻化妝外出，完全不影響日常活動" },
    { icon: "🔬", label: "核心技術", value: "Canfield RBX® Technology 多光譜成像（標準光 + 交叉偏振光 + UV 光）" },
    { icon: "📊", label: "量化指標", value: "8大指標：斑點、皺紋、紋理、毛孔、UV 斑、棕色斑、紅色區、紫質（痤瘡桿菌）" },
    { icon: "🤖", label: "AI 肌齡", value: "對比全球 10 萬+ 亞洲膚質數據庫，計算你的「肌膚年齡」與實際年齡差距" },
    { icon: "📋", label: "分析報告", value: "即場出具量化分析報告，含同齡人百分位排名、個人化療程建議，可電郵傳送" },
    { icon: "🛡️", label: "認證", value: "美國 FDA Class II 醫療器械 + 歐盟 CE 認證 + Canfield 原廠授權正貨設備（可驗序號）" },
    { icon: "✅", label: "適合對象", value: "所有膚色、年齡（包括孕婦、敏感肌、所有膚質），無任何禁忌症" },
  ];

  return (
    <AnimatedSection id="treatment-stats" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-center text-2xl md:text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          VISIA 第7代皮膚分析 規格一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">
          Peko Beauty 使用 Canfield 官方授權正貨第7代設備，可驗證序號
        </motion.p>
        <motion.div variants={scaleIn} className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: BRAND_VIOLET }}>
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
              <tr className="bg-violet-50">
                <td className="px-5 py-5 font-black text-violet-700 text-sm">💰 收費</td>
                <td className="px-5 py-5 font-black text-violet-700 text-2xl">免費提供（新客）</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// THERAPIST NOTE
// ─────────────────────────────────────────────────────────────
function TherapistNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 md:p-7">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">👩‍⚕️</span>
        <strong className="text-violet-800 text-sm md:text-base flex-1">
          治療師筆記 ｜ Peko Beauty 朗豪坊 VISIA 分析手記
        </strong>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex-shrink-0 text-violet-700"
          aria-expanded={open}
        >
          <ChevronDown size={18} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div className={`${open ? "block" : "hidden"} md:block`}>
        <p className="text-gray-700 italic leading-[1.9] text-sm md:text-[15px]">
          &ldquo;VISIA 是我每天最期待用的儀器。每次幫客人做完分析，看到她們驚訝的表情——「原來我有這麼多隱形 UV 損傷」、「原來我右臉的斑比左臉嚴重那麼多」——這些都是她們照鏡子永遠看不到的信息。
          VISIA 讓我們治療師的工作完全不同：不是靠感覺推薦療程，而是用數據告訴客人問題在哪裡、嚴重程度有多高，再選最對症的解決方案。
          最有滿足感是療程前後對比——不是客人主觀說「好像靚咗」，是數據顯示斑點縮小了 30%、肌齡年輕了 2 歲。這個說服力，是任何言語都無法替代的。&rdquo;
        </p>
        <p className="text-xs text-gray-400 mt-3">— Peko Beauty 資深治療師，旺角朗豪坊診所</p>
      </div>
      {!open && (
        <p className="md:hidden text-gray-500 italic text-xs line-clamp-2">
          &ldquo;VISIA 是我每天最期待用的儀器。每次幫客人做完分析，看到她們驚訝的表情……&rdquo;
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 7: SCIENCE
// ─────────────────────────────────────────────────────────────
function ScienceSection() {
  const statsData = [
    { value: "3種", label: "光譜模式" },
    { value: "FDA", label: "Class II 認證" },
    { value: "10萬+", label: "亞洲數據對比" },
    { value: "0/10", label: "痛感" },
  ];

  return (
    <AnimatedSection id="science" className="py-10 md:py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-8"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          VISIA 第7代點樣睇到肉眼看唔到嘅皮膚問題？
          <br className="hidden sm:block" />
          Canfield RBX® 多光譜成像技術完整拆解
        </motion.h2>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-violet-700 mb-3">
          ❶ 核心突破：為何普通鏡頭看不到隱藏皮膚問題？
        </motion.h3>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-5 text-[15px]">
            普通照相機或皮膚鏡只能捕捉可見光（400–700nm），只顯示皮膚表面資訊。
            然而皮膚問題的根源往往在深層——UV 積累性損傷、真皮層色素、皮下毛細血管、毛孔內的痤瘡桿菌等，
            都隱藏在不同的皮膚深度，需要不同波長的光線才能「照出來」。
            VISIA 的革命性突破，就是通過三種光譜模式的組合成像，同時「看穿」皮膚不同深度的問題。
          </ReadMoreText>
        </motion.div>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-violet-700 mb-3">
          ❷ VISIA 三種光譜成像模式
        </motion.h3>

        <div className="hidden md:grid grid-cols-3 gap-4 mb-7">
          {[
            {
              bg: "bg-amber-50 border-amber-100",
              titleColor: "text-amber-700",
              icon: "☀️",
              title: "標準光（白光）",
              desc: "可見光下拍攝皮膚表面，分析表層斑點、紋理、毛孔大小等肉眼狀況。提供皮膚表面的基準圖像。",
            },
            {
              bg: "bg-sky-50 border-sky-100",
              titleColor: "text-sky-700",
              icon: "🔵",
              title: "交叉偏振光",
              desc: "消除皮膚表面反光，穿透表皮看到真皮層的血管（紅色區）、棕色色素、深層皺紋等肉眼不可見的問題。",
            },
            {
              bg: "bg-violet-50 border-violet-100",
              titleColor: "text-violet-700",
              icon: "💜",
              title: "UV 紫外線光",
              desc: "UV 光激發皮膚中的色素和細菌螢光，顯示隱形 UV 損傷（日後斑點前期）、痤瘡桿菌（紫質）等早期問題。",
            },
          ].map((item) => (
            <motion.div key={item.title} variants={scaleIn} className={`rounded-xl p-5 border ${item.bg}`}>
              <div className={`font-black text-base mb-2 ${item.titleColor}`}>{item.icon} {item.title}</div>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden grid grid-cols-1 gap-3 mb-6">
          {[
            { title: "☀️ 標準光（白光）", desc: "表層斑點、紋理、毛孔大小", colorClass: "bg-amber-50 border-amber-100 text-amber-700" },
            { title: "🔵 交叉偏振光", desc: "真皮層血管、深層色素、深層皺紋", colorClass: "bg-sky-50 border-sky-100 text-sky-700" },
            { title: "💜 UV 紫外線光", desc: "隱形 UV 損傷、痤瘡桿菌（紫質）", colorClass: "bg-violet-50 border-violet-100 text-violet-700" },
          ].map((t) => (
            <div key={t.title} className={`rounded-xl p-4 border ${t.colorClass}`}>
              <div className="font-black text-sm mb-1">{t.title}</div>
              <p className="text-gray-500 text-xs">{t.desc}</p>
            </div>
          ))}
        </div>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-violet-700 mb-3">
          ❸ RBX® Technology：紅/棕排除技術
        </motion.h3>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={2} className="text-gray-600 leading-[1.9] mb-8 text-[15px]">
            VISIA 獨有的 RBX®（Red-Brown Exclusion）技術，是業界最先進的色素分離演算法。
            它能在複合皮膚問題中，精準分離「紅色問題」（血管擴張、玫瑰痤瘡、炎症後紅印）與
            「棕色問題」（黑色素斑、曬斑、肝斑），
            讓治療師可以針對不同病因選擇最適合的療程——例如紅色問題對應 Sylfirm X，棕色問題對應 Hollywood Spectra Laser。
          </ReadMoreText>
        </motion.div>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-violet-700 mb-5">
          ❹ 臨床技術數據
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statsData.map((s) => (
            <motion.div key={s.value} variants={scaleIn} className="bg-violet-50 rounded-xl p-5 text-center border border-violet-100">
              <div className="text-2xl md:text-3xl font-black text-violet-700 leading-tight">{s.value}</div>
              <div className="text-xs text-gray-500 mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <TherapistNote />
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 7.5: 8大指標詳解
// ─────────────────────────────────────────────────────────────
function EightIndicatorsSection() {
  const indicators = [
    { emoji: "🔵", name: "斑點（Spots）", desc: "量化表面斑點（曬斑、雀斑、老年斑）的數量、大小及分佈密度", lightMode: "標準光", concern: "色斑困擾", accentColor: "#0284c7" },
    { emoji: "〰️", name: "皺紋（Wrinkles）", desc: "測量細紋和皺紋的深度、長度和分佈，量化皮膚老化程度", lightMode: "標準光", concern: "抗老需求", accentColor: "#7c3aed" },
    { emoji: "🌀", name: "紋理（Texture）", desc: "分析皮膚表面平滑度和均勻性，反映皮膚細緻程度及膚質狀態", lightMode: "標準光", concern: "膚質改善", accentColor: "#059669" },
    { emoji: "⭕", name: "毛孔（Pores）", desc: "精確計算毛孔的數量、大小、深度，評估毛孔粗大問題嚴重程度", lightMode: "標準光", concern: "毛孔粗大", accentColor: "#d97706" },
    { emoji: "☀️", name: "UV 斑（UV Spots）", desc: "在 UV 紫外線光下顯現肉眼不可見的紫外線積累損傷，是日後真實斑點的「前期預警」", lightMode: "UV 光", concern: "隱形 UV 損傷", accentColor: "#b45309" },
    { emoji: "🟫", name: "棕色斑（Brown Areas）", desc: "通過交叉偏振光照出真皮層的黑色素斑塊，包括肉眼不可見的隱形肝斑前期", lightMode: "偏振光", concern: "深層色素", accentColor: "#92400e" },
    { emoji: "🔴", name: "紅色區（Red Areas）", desc: "顯示皮膚底層毛細血管擴張、炎症紅疹、玫瑰痤瘡及炎症後紅印", lightMode: "偏振光", concern: "玫瑰痤瘡/紅印", accentColor: "#C52B21" },
    { emoji: "💜", name: "紫質（Porphyrins）", desc: "UV 光激發痤瘡桿菌產生的螢光，量化毛孔內藏的痤瘡桿菌數量，預測暗瘡風險", lightMode: "UV 光", concern: "暗瘡預防", accentColor: "#6d28d9" },
  ];

  return (
    <AnimatedSection id="eight-indicators" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-3 text-center"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          VISIA 8大皮膚深層指標完整解析
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          每個指標都有精確量化數值，對比同齡亞洲人皮膚狀況百分位排名
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {indicators.map((item) => (
            <motion.div
              key={item.name}
              variants={scaleIn}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-3xl mb-2 block">{item.emoji}</span>
              <strong className="block text-[13px] font-bold mb-1 leading-tight" style={{ color: item.accentColor }}>
                {item.name}
              </strong>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.desc}</p>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold text-white inline-block w-fit" style={{ background: item.accentColor }}>
                  {item.concern}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-500 inline-block w-fit">
                  {item.lightMode}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="mt-8 bg-violet-50 border border-violet-200 rounded-xl p-5 text-center">
          <p className="text-violet-800 text-sm leading-relaxed">
            💡 <strong>AI 肌齡模擬：</strong>VISIA 分析完成後，AI 引擎將你的 8 大指標數值對比全球 10 萬+ 亞洲同齡人皮膚數據庫，
            計算出你的「肌膚年齡」是否比實際年齡老——若肌齡偏高，代表皮膚老化程度超前，可及早介入針對性療程。
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 8: PROCESS
// ─────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    { num: 1, title: "WhatsApp 預約（2分鐘）", desc: "透過 WhatsApp +852 5335 3313 預約，客服在 24 小時內確認時間。VISIA 分析本身約 10 分鐘，加上報告解讀和諮詢約 15–20 分鐘，建議預留半小時。" },
    { num: 2, title: "到店 + VISIA 第7代多光譜掃描（10秒）", desc: "治療師協助清潔面部後，引導你坐在 VISIA 儀器前，將下巴放於支架，10秒內完成三種光譜模式的全臉掃描。過程完全無接觸、無痛，如照相一樣簡單。" },
    { num: 3, title: "AI 即時生成皮膚分析報告（2分鐘）", desc: "VISIA 系統即時輸出 8 大指標量化結果，AI 引擎對比亞洲膚質數據庫生成「肌齡」報告，顯示你的每個指標在同齡人中的百分位排名。" },
    { num: 4, title: "治療師報告解讀 + 個人化建議（零硬銷）", desc: "治療師根據 VISIA 報告的客觀數據，解釋你最主要的皮膚問題，並說明最對症的解決方案（例如棕色斑建議 Hollywood Spectra、毛孔問題建議 DEP 或 BTL Exion）。不適合的療程直說不做。" },
    { num: 5, title: "決定療程（或只拿報告回家考慮）", desc: "你可以選擇即日開始療程，也可以只拿報告回家慢慢考慮，沒有任何壓力。Peko Beauty 承諾到店後無需即場決定。" },
  ];

  return (
    <AnimatedSection id="process" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-12"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          在 Peko Beauty 做 VISIA 皮膚分析係咩流程？
        </motion.h2>
        <div className="space-y-4 md:space-y-5">
          {steps.map((step) => (
            <motion.div key={step.num} variants={fadeUp} className="flex gap-4 md:gap-6 items-start">
              <div
                className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white font-black text-base md:text-lg shadow-md"
                style={{ background: BRAND_VIOLET }}
              >
                {step.num}
              </div>
              <div className="bg-white rounded-xl p-4 md:p-5 flex-1 shadow-sm border border-gray-100">
                <strong className="block text-gray-900 text-[14px] md:text-[15px] leading-snug">{step.title}</strong>
                <p className="hidden md:block text-gray-500 text-sm leading-relaxed mt-2">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 9: COMPARISON TABLE
// ─────────────────────────────────────────────────────────────
function ComparisonSection() {
  type CompRow = { feature: string; visia: string; regular: string; skinScope: string; highlight?: boolean };
  const rows: CompRow[] = [
    { feature: "成像技術", visia: "Canfield RBX® 多光譜（3種光譜）", regular: "單一可見光成像", skinScope: "LED 皮膚鏡（放大表皮）" },
    { feature: "分析深度", visia: "✅ 表皮 + 真皮層同時分析", regular: "⚠️ 只限皮膚表面", skinScope: "⚠️ 主要表皮層", highlight: true },
    { feature: "隱形 UV 損傷", visia: "✅ 精確顯示（UV 光模式）", regular: "❌ 完全看不見", skinScope: "❌ 看不見", highlight: true },
    { feature: "棕色/紅色分離", visia: "✅ RBX® 精準分離兩種色素", regular: "❌ 無法分辨", skinScope: "❌ 無法分辨", highlight: true },
    { feature: "量化分析", visia: "✅ 數字化 8 大指標", regular: "❌ 主觀口頭描述", skinScope: "⚠️ 局部局限性量化", highlight: true },
    { feature: "AI 肌齡對比", visia: "✅ 對比 10 萬+ 亞洲數據庫", regular: "❌ 無", skinScope: "❌ 無", highlight: true },
    { feature: "療程前後追蹤", visia: "✅ 量化數據對比驗證", regular: "⚠️ 只靠主觀感覺", skinScope: "⚠️ 局部對比" },
    { feature: "FDA 認證", visia: "✅ FDA Class II 醫療器械", regular: "❌ 一般消費品", skinScope: "⚠️ 視品牌而定" },
    { feature: "適用膚色", visia: "✅ 所有膚色（亞洲皮膚優化）", regular: "⚠️ 深色皮膚較難判讀", skinScope: "⚠️ 深色皮膚較難判讀" },
  ];

  return (
    <AnimatedSection id="comparison" className="hidden md:block py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          VISIA 第7代 vs 普通皮膚分析 vs 一般皮膚鏡
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-sm mb-8">
          為何 VISIA 是全球醫美診所皮膚分析的黃金標準？
        </motion.p>
        <motion.div variants={scaleIn} className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-4 px-4 text-left text-xs font-bold w-[22%]">比較項目</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]" style={{ background: BRAND_VIOLET }}>
                  ⭐ VISIA 第7代
                  <br /><span className="font-normal opacity-80 text-[10px]">(Peko Beauty)</span>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">普通皮膚分析儀</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">一般皮膚鏡</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 text-xs border-b border-gray-100">{row.feature}</td>
                  <td className={`px-4 py-3.5 text-center text-xs border-b border-gray-100 font-semibold bg-violet-50/60 ${row.highlight ? "text-violet-700" : "text-violet-600"}`}>{row.visia}</td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.regular}</td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">{row.skinScope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 bg-violet-50 border-l-4 border-violet-500 rounded-r-xl p-5">
          <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
            <strong className="text-gray-900">🎯 Peko 建議：</strong>
            如果你<strong>想在醫美療程前建立客觀的皮膚基準數據</strong>，VISIA 是唯一能同時量化 8 大指標並生成 AI 肌齡報告的醫療級儀器。
            不確定自己皮膚問題在哪？先做{" "}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-violet-700 font-bold underline underline-offset-2">
              免費 VISIA 皮膚分析
            </a>
            ，用數據說話，再決定療程，零壓力。
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            style={{ background: BRAND_VIOLET }}
          >
            🔍 免費預約 VISIA 第7代皮膚分析
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
      quote: "我做了幾年醫美，一直唔知自己係斑的問題定係毛孔問題比較嚴重。做完 VISIA 之後，治療師用數據告訴我：我的 UV 損傷指數非常高（同齡人 top 20%），但毛孔問題其實只是中等。當下我終於知道要優先處理什麼。後來針對去斑做了 Hollywood Spectra，做了 3 次後再做 VISIA 對比，UV 斑指數真的降低了！這個前後數據對比比任何廣告都有說服力。",
      name: "C 小姐",
      age: "34歲",
      concern: "色斑問題 + 療程方向不明確",
      treatment: "VISIA 分析 → Hollywood Spectra × 3次",
    },
    {
      quote: "之前去過幾間診所做皮膚分析，每次都係靠治療師主觀講然後推銷。Peko Beauty 的 VISIA 完全不同——有一份量化報告，每個指標都有數字，仲有跟同齡人比較的百分位。治療師解釋完之後說我可以考慮再來，完全無壓力。最後我選了做 Sylfirm X 處理紅色區問題，做完 2 次後再做 VISIA 對比，紅色區指數真的下降了！報告就是最好的證明。",
      name: "K 小姐",
      age: "29歲",
      concern: "玫瑰痤瘡 + 不信任診所推銷",
      treatment: "VISIA 分析 → Sylfirm X × 2次",
    },
  ];

  const socialStats = [
    { value: "免費", label: "VISIA 分析（新客）" },
    { value: "10秒", label: "全臉掃描完成" },
    { value: "8大", label: "量化深層指標" },
    { value: "零", label: "恢復期" },
  ];

  return (
    <AnimatedSection id="results" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          真實客人 VISIA 分析見證
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
              <div className="relative h-44 bg-gradient-to-br from-violet-50 to-indigo-50">
                <Image
                  src="/images/peko-beauty-reception-desk-mong-kok.jpg"
                  alt={`Peko Beauty VISIA 分析效果 ${t.concern}`}
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-white text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${BRAND_VIOLET}cc` }}>
                    {t.treatment}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <strong className="text-gray-900 text-sm">{t.name}</strong>
                <p className="text-xs text-gray-400 mt-0.5">{t.age}，主要困擾：{t.concern}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={scaleIn}
          className="bg-violet-50 rounded-2xl py-6 px-8 flex flex-wrap justify-center gap-8 text-center border border-violet-100"
        >
          {socialStats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-violet-700">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 11: TRUST SIGNALS
// ─────────────────────────────────────────────────────────────
function TrustSection() {
  const pillars = [
    {
      Icon: Award,
      title: "設備信任",
      items: [
        "美國 Canfield 正貨第7代 VISIA",
        "FDA Class II 醫療器械認證",
        "歐盟 CE 認證",
        "Canfield 官方授權設備（可驗序號）",
      ],
    },
    {
      Icon: Users,
      title: "服務信任",
      items: [
        "全女班資深治療師主理",
        "零硬銷承諾，數據說話",
        "明碼實價透明收費",
        "免費 VISIA 第7代皮膚分析（新客）",
      ],
    },
    {
      Icon: ThumbsUp,
      title: "結果信任",
      items: [
        "8大指標量化，百分位對比",
        "AI 肌齡模擬有據可查",
        "療程前後 VISIA 數據對比驗證",
        "5,000+ 真實好評",
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
          點解旺角客人揀 Peko Beauty 做 VISIA 皮膚分析？
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 mb-10">
          三個核心承諾，缺一不可
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map(({ Icon, title, items }) => (
            <motion.div key={title} variants={scaleIn} className="bg-gray-800 rounded-2xl p-7 hover:bg-gray-700 transition-colors duration-200">
              <Icon size={36} className="text-violet-400 mb-4" />
              <h3 className="text-violet-400 font-bold text-lg mb-4">{title}</h3>
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
          VISIA 第7代皮膚分析 香港收費一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          Peko Beauty 承諾：明碼實價，絕無隱藏收費，絕不硬銷升級
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            variants={scaleIn}
            className="relative border-2 rounded-2xl p-7 text-center bg-white shadow-md"
            style={{ borderColor: BRAND_VIOLET }}
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-5 py-1 rounded-full whitespace-nowrap"
              style={{ background: BRAND_VIOLET }}
            >
              🔍 新客限定
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">免費 VISIA 皮膚分析</h3>
            <p className="text-gray-400 text-sm mb-5">
              VISIA 第7代全臉多光譜掃描
              <br />+ 8大指標量化報告 + AI 肌齡分析
              <br />+ 治療師 1 對 1 報告解讀 + 個人化建議
            </p>
            <div className="text-5xl font-black text-violet-700 leading-none mb-1">免費</div>
            <p className="text-gray-300 text-xs mb-6">市場參考價 HK$300–800</p>
            <a
              href={WA_BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: BRAND_VIOLET }}
            >
              💬 WhatsApp 立即預約免費分析
            </a>
          </motion.div>

          <motion.div variants={scaleIn} className="border-2 border-gray-200 rounded-2xl p-7 text-center bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-2">VISIA + 療程套餐</h3>
            <p className="text-gray-400 text-sm mb-5">
              VISIA 免費分析後按報告建議
              <br />選配最適合的療程套票
              <br />（可選 Hollywood Spectra / Sylfirm X / DEP 等）
            </p>
            <div className="text-3xl font-black text-gray-600 leading-none mb-1">歡迎查詢</div>
            <p className="text-gray-300 text-xs mb-6">按個人膚質及需求報價</p>
            <a
              href="https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20VISIA%20分析後的療程套票價錢"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-600 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:bg-gray-700 active:scale-[0.98]"
            >
              📋 查詢療程套票詳情
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-800 text-sm leading-relaxed">
            💯 <strong>Peko Beauty 透明承諾：</strong>到店後無需即場決定購買任何療程 · VISIA 分析完全免費
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
    "首次做醫美療程，想先了解自己皮膚狀況",
    "有斑點、毛孔、皺紋、暗沉等問題，想知道嚴重程度",
    "想知道自己是否有隱形的 UV 積累性損傷",
    "懷疑自己有肝斑但肉眼看不清楚",
    "想追蹤醫美療程效果，要量化數據驗證",
    "進行療程前後，建立客觀比較基準",
    "對皮膚護理感興趣，想了解自己真實膚齡",
    "孕婦及哺乳期媽媽（完全無輻射無接觸）",
    "敏感肌、所有膚色及年齡人士",
  ];

  const unsuitable = [
    "唯一注意：建議在受訓專業人員操作下進行以確保最佳分析質素",
    "分析前需清除妝容及護膚品（到店後治療師協助潔面）",
  ];

  return (
    <AnimatedSection id="suitability" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          VISIA 皮膚分析適合哪些人？
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={scaleIn} className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-green-800 font-black text-lg mb-5 flex items-center gap-2">
              <CheckCircle size={22} className="text-green-600" /> 適合人士
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

          <motion.div variants={scaleIn} className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="text-amber-800 font-black text-lg mb-5 flex items-center gap-2">
              ⚠️ 注意事項
            </h3>
            <ul className="space-y-3 mb-6">
              {unsuitable.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm">
                  <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠️</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
              <p className="text-violet-800 text-sm font-semibold mb-1">✨ VISIA 的獨特優勢</p>
              <p className="text-gray-600 text-xs leading-relaxed">
                VISIA 是目前市場上<strong>唯一無禁忌症</strong>的醫療級皮膚分析儀——無輻射、無接觸、無副作用，
                適合所有人，包括孕婦、哺乳期、敏感肌、老人、小孩。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 14: FAQ
// ─────────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    {
      q: "VISIA 皮膚分析是什麼？跟普通皮膚測試有什麼分別？",
      a: "VISIA 是美國 Canfield Scientific 開發的第7代多光譜皮膚成像分析系統，採用 RBX® Technology，結合標準光、交叉偏振光、UV 光三種拍攝模式，量化分析 8 大皮膚深層指標。普通皮膚分析儀只使用單一可見光，只能看到皮膚表面，無法顯示真皮層的深層色素、隱形 UV 損傷、皮下血管等問題。VISIA 有美國 FDA Class II 醫療器械認證，是全球 10,000+ 醫美診所使用的黃金標準分析工具。",
    },
    {
      q: "VISIA 皮膚分析有副作用嗎？安全嗎？孕婦可以做嗎？",
      a: "VISIA 完全無副作用。純影像多光譜成像，無輻射、無接觸、無任何能量輸出，全程如照相一樣。適合所有膚色、所有年齡，包括孕婦、哺乳期媽媽、敏感肌人士，無任何禁忌症。唯一注意是分析前需清除妝容（Peko 到店後有協助潔面服務），否則妝容會影響分析準確性。",
    },
    {
      q: "VISIA 能測出隱形斑嗎？肉眼看不到的問題真的能照出來？",
      a: "可以。VISIA 的 UV 光模式能顯示肉眼完全看不見的「UV 積累性損傷」——這是在紫外線下才能看到的黑色素沉澱前期，是日後真正斑點形成之前的早期預警。很多 28–35 歲的客人做完 VISIA 後都驚訝發現自己有大量隱形 UV 損傷，但肉眼完全看不出來。及早發現及早介入，才能防患於未然。",
    },
    {
      q: "VISIA 的肌齡是怎樣計算的？肌齡比實際年齡老代表什麼？",
      a: "VISIA AI 引擎將你的 8 大指標數值對比全球 10 萬+ 亞洲同齡人皮膚數據庫，計算你每個指標在同齡人中的百分位排名，再綜合計算出「肌膚年齡」。例如你實際 30 歲，但肌齡顯示 34 歲，代表你的皮膚老化程度比同齡人更快，可以針對主要問題指標選擇對應療程來「追回」。肌齡本身不是「不合格」的評判，而是幫助你了解皮膚狀況的客觀參考。",
    },
    {
      q: "VISIA 皮膚分析準確嗎？跟診斷有分別嗎？",
      a: "VISIA 是目前市場上最精準的皮膚量化分析系統之一，被全球 10,000+ 醫美診所採用，並在多個皮膚科學研究中被引用。VISIA 提供的是量化的皮膚影像數據分析，不是醫療診斷——它不能診斷皮膚病。治療師會根據 VISIA 數據結合臨床觀察給出療程建議，如有皮膚疾病（如濕疹、重度暗瘡）則需轉介皮膚科醫生。",
    },
    {
      q: "香港邊間診所有正貨第7代 VISIA？怎麼分辨真假？",
      a: "Peko Beauty 旺角朗豪坊使用 Canfield 官方授權正貨第7代 VISIA，可現場驗證設備序號與 Canfield 官方資料庫對照。分辨正貨的方法：(1) 要求出示設備序號及 Canfield 官方授權書；(2) 查看儀器背面/底部是否有 FDA 認證標誌；(3) 正貨 VISIA 分析報告有 Canfield 官方格式，包含百分位對比圖。",
    },
    {
      q: "VISIA 前後對比照片怎麼拍？每次結果一樣嗎？",
      a: "VISIA 有精確的頭部定位系統（下巴支架 + 面部定位器），確保每次拍攝角度完全一致，以便精確的前後對比。影響準確性的因素：妝容（需素顏）、面部水腫（建議同一時段拍攝）、皮膚表面護膚品殘留。Peko Beauty 建議客人在每次療程前後都做 VISIA，以量化追蹤療程效果，這是我們「用數據說話」服務承諾的核心。",
    },
    {
      q: "做 VISIA 皮膚分析要帶什麼？需要準備什麼？",
      a: "無需特別準備。到店後治療師會協助潔面（提供洗面產品），確保皮膚清潔後才進行分析。建議：(1) 到店前不要塗防曬或粉底；(2) 如有特定皮膚困擾可提前告知治療師；(3) 帶備舊的 VISIA 報告（如有）作前後對比。整個流程約 30 分鐘，包含分析和報告解讀。",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <AnimatedSection id="faq" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          VISIA 皮膚分析常見問題
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          香港客人最常問的 VISIA 問題，一次解答
        </motion.p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 text-sm md:text-[15px] hover:bg-violet-50/50 transition-colors duration-150"
              >
                <span className="leading-snug pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-violet-500 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-[1.9] border-t border-gray-100 pt-4 bg-violet-50/30">
                  {faq.a}
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
      href: "/treatments/hollywood-spectra-laser",
      emoji: "⚡",
      name: "Hollywood Spectra 激光",
      desc: "VISIA 棕色斑 / UV 斑指數偏高的首選療程",
      tag: "去斑首選",
      color: "from-yellow-50 to-amber-50",
      accent: "#d97706",
    },
    {
      href: "/treatments/sylfirm-x",
      emoji: "🔴",
      name: "Sylfirm X 雙波微針",
      desc: "VISIA 紅色區指數偏高、肝斑問題的精準對策",
      tag: "紅區/肝斑",
      color: "from-red-50 to-rose-50",
      accent: "#C52B21",
    },
    {
      href: "/treatments/dep-mesotherapy",
      emoji: "💧",
      name: "DEP 無針水光",
      desc: "VISIA 顯示皮膚缺水、毛孔粗大的針對療程",
      tag: "補水/毛孔",
      color: "from-sky-50 to-cyan-50",
      accent: "#0284c7",
    },
    {
      href: "/treatments/btl-exion",
      emoji: "✨",
      name: "BTL Exion RF 射頻",
      desc: "VISIA 皺紋 / 紋理指數偏差的緊緻抗老方案",
      tag: "抗老緊緻",
      color: "from-violet-50 to-purple-50",
      accent: "#7c3aed",
    },
  ];

  return (
    <AnimatedSection id="related" className="py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-3"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          VISIA 分析後，對症下藥的療程推薦
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          根據你的 VISIA 指標偏差，治療師會推薦最對症的療程
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((item) => (
            <motion.div key={item.name} variants={scaleIn} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <Link href={item.href} className={`block bg-gradient-to-br ${item.color} rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-200 h-full`}>
                <span className="text-4xl mb-3 block">{item.emoji}</span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white inline-block mb-2"
                  style={{ background: item.accent }}
                >
                  {item.tag}
                </span>
                <strong className="block text-[13px] font-bold text-gray-900 mb-1 leading-tight">{item.name}</strong>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
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
    <AnimatedSection id="final-cta" className="py-16 px-4 bg-gradient-to-br from-[#1a0a2e] to-[#2d1257]">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-block bg-violet-700/40 text-violet-200 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border border-violet-500/40 mb-5">
            📍 旺角朗豪坊 · Peko Beauty
          </span>
          <h2
            className="text-[clamp(22px,5vw,44px)] font-black text-white leading-[1.25] mb-4"
            style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
          >
            唔知自己皮膚問題在哪？
            <br />
            <span className="text-violet-300">10秒，讓 VISIA 數據告訴你答案</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            免費 VISIA 第7代皮膚分析 + 8大指標量化報告 + AI 肌齡模擬 + 治療師 1 對 1 解讀。
            完全免費，零壓力，到店後無需即場決定任何療程。
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 mb-8">
          <WhatsAppButton
            href={WA_BOOKING}
            text="💬 WhatsApp 立即預約免費 VISIA 分析"
            large={true}
          />
          <p className="text-xs text-gray-500">
            ✅ 完全免費 · 無附帶條件 · 即日可查詢
          </p>
        </motion.div>

        <motion.div variants={scaleIn} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: "📍", title: "診所地址", desc: "旺角朗豪坊\n7樓 Peko Beauty" },
              { icon: "🕐", title: "營業時間", desc: "周一至日\n11:00–21:00" },
              { icon: "📱", title: "WhatsApp", desc: "+852 5335 3313\n24小時訊息" },
              { icon: "🚇", title: "交通", desc: "旺角站 D3 出口\n步行 3 分鐘" },
            ].map((info) => (
              <div key={info.title}>
                <div className="text-2xl mb-1">{info.icon}</div>
                <div className="text-white text-xs font-bold mb-0.5">{info.title}</div>
                <div className="text-gray-400 text-[10px] leading-relaxed whitespace-pre-line">{info.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function VisiaClient() {
  return (
    <main className="min-h-screen">
      <StickyNav />
      <HeroSection />
      <PainPointsSection />
      <GeoSections />
      <TreatmentStatsSection />
      <ScienceSection />
      <EightIndicatorsSection />
      <ProcessSection />
      <ComparisonSection />
      <TestimonialsSection />
      <TrustSection />
      <PricingSection />
      <SuitabilitySection />
      <FAQSection />
      <RelatedSection />
      <FinalCTASection />
    </main>
  );
}