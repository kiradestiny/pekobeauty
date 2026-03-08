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
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20BTL%20Exion%20Body%20試做優惠";
const WA_BOOKING =
  "https://wa.me/85253353313?text=Hi%20Peko%2C%20我想預約%20BTL%20Exion%20Body%20試做，請問有咩時間？";

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
  text = "💬 WhatsApp 預約試做 — HK$680/part",
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
    "❄️ AI Active Cooling 主動冷卻",
    "👩‍⚕️ 全女班專業團隊",
    "🚫 絕無硬銷",
    "⭐ 5,000+ 真實好評",
  ];

  const stats = [
    { val: "22%", label: "脂肪厚度減少" },
    { val: "85%", label: "皮膚緊緻改善" },
    { val: "零", label: "恢復期" },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#f0f7f4] to-white pt-20"
    >
      {/* ── 大圖區域 ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden"
      >
        <Image
          src="/images/peko-beauty-reception-desk-mong-kok.jpg"
          alt="Peko Beauty BTL Exion Body 無創身體緊緻 橙皮紋 腹部鬆弛 RF 超聲波 旺角朗豪坊醫美"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
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
            🌿 新客試做 HK$680/part
          </span>
        </motion.div>

        {/* Trust badges */}
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

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
          className="text-[clamp(20px,4vw,40px)] font-black leading-[1.3] text-gray-900 mb-5 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion Body 香港｜AI 溶脂緊膚雙效合一
          <br />
          <span className="text-[clamp(16px,3vw,28px)] font-bold text-gray-600">
            脂肪減少 22% · 緊膚 85% · 橙皮紋 · 零恢復期
            <span className="hidden sm:inline"> — </span>
            <br className="sm:hidden" />
            效果 / 部位 / 技術原理完整解析
          </span>
          <br />
          <span className="text-[clamp(14px,2.5vw,22px)] font-black" style={{ color: BRAND_RED }}>
            試做 HK$2,980（腹部全區）｜旺角朗豪坊
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
              className="bg-emerald-50 border border-emerald-100 rounded-xl px-2 md:px-5 py-2.5 text-center flex-1"
            >
              <div className="text-sm md:text-xl font-black text-emerald-700 leading-tight whitespace-nowrap">{s.val}</div>
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
          BTL Exion Body — 單極 RF + 標靶超聲波 + <strong>AI Active Cooling 主動冷卻</strong>，能量深達脂肪層 5cm，FDA Class II 認證。
          <span className="hidden md:inline">溶脂同時緊膚，臨床實證脂肪厚度減少 22%、皮膚緊緻改善 85%，解決「冷凍溶脂後鬆弛」痛點，零恢復期，可即刻返工。</span>
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
      tag: "腹部肚腩",
      title: "肚腩怎麼節食運動都消不走，皮膚還越來越鬆",
      desc: "腹部脂肪堆積加上皮膚彈性下降，即使體重正常，肚皮也會出現「軟趴趴」鬆弛感。產後或體重增減後尤為明顯。節食減肥可能令體重下降，但皮膚真皮層流失的膠原蛋白和彈力蛋白，無法靠飲食運動補充。",
      imgSrc: null as string | null,
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
    },
    {
      emoji: "😔",
      tag: "橙皮紋困擾",
      title: "大腿臀部橙皮紋（蜂窩組織），穿泳衣好自卑",
      desc: "橙皮紋（Cellulite）係因皮下脂肪不均勻分佈、加上真皮層膠原纖維隔板變形所造成，與體重無直接關係，很多纖細的人同樣有橙皮紋。任何滾輪按摩、塗抹型產品只能暫時改善外觀，無法從根源重建皮下結構。",
      imgSrc: null as string | null,
      gradient: "from-amber-200 via-orange-100 to-yellow-50",
      accentColor: "#d97706",
    },
    {
      emoji: "😩",
      tag: "蝴蝶袖問題",
      title: "上臂皮膚鬆弛下垂，舉手就能看到「蝴蝶袖」",
      desc: "手臂上方的皮膚鬆弛是膠原蛋白和彈力蛋白流失的直接結果，女性尤為常見。健身鍛鍊三頭肌可增加肌肉量，但無法逆轉已鬆弛的皮膚組織——改善蝴蝶袖需要同時針對皮膚底層的膠原蛋白重建。",
      imgSrc: null as string | null,
      gradient: "from-violet-200 via-purple-100 to-indigo-50",
      accentColor: "#7c3aed",
    },
    {
      emoji: "😤",
      tag: "產後身形",
      title: "生完 BB 後腹部、大腿鬆弛，唔識返去從前",
      desc: "懷孕期間皮膚被過度拉伸，產後膠原蛋白結構受損，令腹部、大腿內側及臀部皮膚出現明顯鬆弛感，甚至妊娠紋。產後運動可以收緊肌肉，但皮膚底層的結構重建需要更針對性的介入，護膚品和按摩無法到達真皮層深度。",
      imgSrc: null as string | null,
      gradient: "from-sky-200 via-blue-100 to-cyan-50",
      accentColor: "#0284c7",
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
            這些身體鬆弛問題，靠運動和護膚品永遠只能治標——真正的根源在皮膚底層，需要從真皮層介入
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
                {p.imgSrc ? (
                  <Image
                    src={p.imgSrc}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : (
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
                )}
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
          className="text-center mt-10 md:mt-12 px-4 py-7 rounded-2xl bg-white border border-emerald-100 shadow-sm"
        >
          <p className="text-lg md:text-xl font-black text-[#C52B21] leading-relaxed mb-1">
            試過運動、按摩、體雕儀器都改善有限？
            <br />
            因為這些問題根源在皮膚真皮層，運動無法逆轉已流失的膠原蛋白結構。
          </p>
          <p className="text-sm text-gray-400 mt-2">
            BTL Exion Body 從真皮層底部激生膠原蛋白，重建皮膚支撐結構，改善鬆弛與橙皮紋——這就是它的設計目的。
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
      <p>💡 BTL Exion Body 身體緊緻療程最直接答案：</p>
      <p>
        BTL Exion Body 改善腹部鬆弛、橙皮紋（蜂窩組織）及大腿、手臂皮膚鬆弛通常需要 4–8 次療程，每次間隔 2–4 週，
        約 75% 客人在第 2–3 次後已見到明顯改善。
        BTL Exion Body 採用 AI 單極射頻 + 超聲波雙技術，美國 FDA 認證，無針無創從真皮層
        激生膠原蛋白與透明質酸，改善身體皮膚鬆弛及橙皮紋，幾乎零恢復期，
        適合腹部、大腿、手臂、臀部等多個部位。
        Peko Beauty 旺角朗豪坊新客試做價 HK$680/part，含免費 VISIA 分析。
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
      text: "腹部鬆弛、橙皮紋、蝴蝶袖、大腿鬆弛因真皮層膠原蛋白及彈力蛋白流失所致，運動只能鍛鍊肌肉，無法重建皮膚底層支撐結構",
    },
    {
      label: "技術解碼",
      text: "BTL Exion Body 透過 AI 單極射頻 + 超聲波雙技術，大面積覆蓋身體治療部位，均勻加熱真皮層激生膠原蛋白與透明質酸，改善身體皮膚鬆弛及橙皮紋結構",
    },
    {
      label: "Peko 優勢",
      text: "原廠正貨 BTL Exion Body 手具，全女班治療師主理，免費 VISIA 分析先行，按部位個人化設定，幾乎零恢復期",
    },
    {
      label: "適合對象",
      text: "腹部鬆弛、橙皮紋、大腿鬆弛、手臂蝴蝶袖、產後身形恢復、希望無創改善身體皮膚的 20–60 歲人士",
    },
    {
      label: "療程次數",
      text: "建議 4–8 次，每 2–4 週一次（依部位及嚴重程度調整），完整療程後效果持續至少 6–12 個月",
    },
    { label: "試做價", text: "HK$680/part（新客限定，單一部位）", isLink: true },
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
    { icon: "⏱", label: "療程時間", value: "約 30–60 分鐘（視乎治療部位大小，腹部約 45–60 分鐘，手臂約 30 分鐘）" },
    {
      icon: "😌",
      label: "痛感指數",
      value: "1–2/10 — 全程舒適溫熱感，如同熱石按摩般輕柔，無需任何舒緩膏，大部分客人形容為「享受」",
    },
    {
      icon: "🔴",
      label: "恢復期",
      value: "幾乎零恢復期，療程後可能有輕微皮膚泛紅及溫熱感，通常 1–2 小時內消退，可即時正常生活",
    },
    { icon: "📅", label: "建議次數", value: "4–8 次，每 2–4 週一次（依部位及嚴重程度調整）" },
    { icon: "✅", label: "見效時間", value: "第 2–3 次後已見皮膚緊緻度提升，橙皮紋及鬆弛感改善逐步明顯" },
    {
      icon: "📆",
      label: "效果維持",
      value: "視乎個人體質、完整療程次數及生活習慣，建議完成全套療程後效果更穩定，配合適度運動可進一步延長",
    },
    { icon: "🎯", label: "可治療部位", value: "腹部（肚腩）· 大腿內外側 · 上臂（蝴蝶袖）· 臀部 · 側腰 · 腰背 · 膝上內側" },
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
          BTL Exion Body 身體緊緻 療程數據一覽
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">
          所有數字來自 Peko Beauty 朗豪坊真實臨床記錄及 BTL 原廠臨床研究數據
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
                <td className="px-5 py-5 font-black text-[#C52B21] text-2xl">HK$680/part</td>
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
          &ldquo;Exion Body 係我們功課做咗最用心的一個療程。最常見的情況係客人有做運動，但腹部始終有一層軟軟的鬆弛感，
          用揉捏的方式可以感受到皮膚「彈唔返去」的那種鬆弛。這其實唔係脂肪的問題，係真皮層的問題。
          做完 Exion Body 3–4 次後，好多客人反映摸落去皮膚緊了，蹦蹦的。
          有一位剛生完二胎的客人，做了 5 次腹部療程之後，佢話照鏡好像回到兩年前的肚皮，
          雖然唔係誇張到去幾 cm 那種，但那種皮膚收緊感係真實的，而且幾乎唔影響日常生活。&rdquo;
        </p>
        <p className="text-xs text-gray-400 mt-3">— Peko Beauty 資深治療師，旺角朗豪坊診所</p>
      </div>
      {!open && (
        <p className="md:hidden text-gray-500 italic text-xs line-clamp-2">
          &ldquo;Exion Body 係我們功課做咗最用心的一個療程。最常見的情況係客人有做運動，但腹部始終有一層軟軟的鬆弛感……&rdquo;
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
    { value: "+224%", label: "透明質酸激生" },
    { value: "+68%", label: "膠原蛋白改善" },
    { value: "幾乎零", label: "恢復期" },
    { value: "多部位", label: "可覆蓋全身" },
  ];

  return (
    <AnimatedSection id="science" className="py-10 md:py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-8"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion Body 點樣改善身體鬆弛？
          <br className="hidden sm:block" />
          AI 單極 RF + 超聲波身體應用原理拆解
        </motion.h2>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❶ 問題根源：點解橙皮紋、身體鬆弛難以靠運動逆轉？
        </motion.h3>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-5 text-[15px]">
            橙皮紋（Cellulite）並非單純脂肪問題，而係皮下脂肪細胞、膠原纖維隔板（Fibrous Septae）
            及表皮三者之間結構失衡的結果。當膠原纖維隔板變硬收縮，皮下脂肪被「困住」局部突出，
            在皮膚表面形成凹凸不均的橙皮狀外觀——這個結構層面的問題，
            任何表面按摩、塗抹霜或滾輪工具都無法觸及。
          </ReadMoreText>
        </motion.div>
        <motion.div variants={fadeUp}>
          <ReadMoreText lines={3} className="text-gray-600 leading-[1.9] mb-8 text-[15px]">
            腹部、手臂及大腿鬆弛則源於真皮層膠原蛋白（Collagen）及彈力蛋白（Elastin）的持續流失——
            25 歲後每年約流失 1%。體重下降後「皮留下」的鬆弛感、產後腹部垂墜感，均屬同一根源。
            要從根本逆轉，需要在真皮層層面重新激活膠原再生程序。
          </ReadMoreText>
        </motion.div>

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-3">
          ❷ 技術解法：BTL Exion Body 的身體應用優勢
        </motion.h3>

        <div className="hidden md:grid grid-cols-2 gap-4 mb-7">
          <motion.div variants={scaleIn} className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <div className="font-black text-emerald-700 text-xl mb-2">大面積身體手具設計</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              BTL Exion Body 配備<strong>專用大型治療手具</strong>，較面部手具覆蓋面積大 3–5 倍，
              能在較短時間內均勻加熱大面積身體部位（如整個腹部、大腿正面）。AI 系統實時監測皮膚溫度，
              確保不同部位的皮膚厚度差異下仍能達到最佳治療溫度。
            </p>
          </motion.div>
          <motion.div variants={scaleIn} className="bg-sky-50 rounded-xl p-5 border border-sky-100">
            <div className="font-black text-sky-700 text-xl mb-2">橙皮紋專項聲波預處理</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              超聲波技術在 RF 前進行<strong>皮下組織預處理</strong>，疏鬆變硬的膠原纖維隔板，
              令 RF 能量能更均勻地滲透至皮下脂肪層及真皮層底部。
              這對橙皮紋的改善尤為關鍵：透過軟化纖維隔板的束縛，配合膠原蛋白重組，
              橙皮紋的凹凸結構逐步被「填平」、「重整」。
            </p>
          </motion.div>
        </div>

        {/* 手機版 */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-center">
            <div className="font-black text-emerald-700 text-base mb-1">大面積身體手具</div>
            <p className="text-gray-500 text-xs">快速均勻覆蓋・腹部大腿</p>
          </div>
          <div className="bg-sky-50 rounded-xl p-4 border border-sky-100 text-center">
            <div className="font-black text-sky-700 text-base mb-1">超聲波預處理</div>
            <p className="text-gray-500 text-xs">疏鬆纖維隔板・橙皮紋改善</p>
          </div>
        </div>

        <motion.div variants={fadeUp} className="hidden md:block">
          <ReadMoreText lines={2} className="text-gray-600 leading-[1.9] mb-10 text-[15px]">
            BTL Exion Body 的 AI 溫控系統為身體應用的安全性提供額外保障——身體不同部位（如腹部與膝內側）
            的皮膚厚度及脂肪層差異較大，AI 每秒監測數千個溫度數據點，
            自動調整每個位置的能量輸出，確保均勻治療效果的同時，完全避免任何過熱或灼傷風險。
          </ReadMoreText>
        </motion.div>
        <div className="md:hidden mb-8" />

        <motion.h3 variants={fadeUp} className="text-lg font-bold text-[#C52B21] mb-5">
          ❸ 臨床數據：效果有幾好？
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <motion.div
              key={s.value}
              variants={scaleIn}
              className="bg-emerald-50 rounded-xl p-5 text-center border border-emerald-100"
            >
              <div className="text-3xl md:text-4xl font-black text-emerald-700 leading-tight">{s.value}</div>
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
// SECTION 7.5: TREATMENT AREAS — 可治療部位展示
// ─────────────────────────────────────────────────────────────
function TreatmentAreasSection() {
  const areas = [
    {
      emoji: "🫃",
      area: "腹部（肚腩）",
      desc: "改善腹部鬆弛、肚腩皮膚搜緊度不足，產後腹部恢復首選",
      tags: ["鬆弛", "肚腩", "產後"],
      accentColor: "#C52B21",
    },
    {
      emoji: "🦵",
      area: "大腿內外側",
      desc: "改善大腿橙皮紋、大腿內側鬆弛、減淡大腿皮膚不均質感",
      tags: ["橙皮紋", "大腿鬆弛"],
      accentColor: "#7c3aed",
    },
    {
      emoji: "💪",
      area: "上臂（蝴蝶袖）",
      desc: "緊緻上臂皮膚、改善手臂鬆弛下垂的蝴蝶袖問題",
      tags: ["蝴蝶袖", "手臂鬆弛"],
      accentColor: "#d97706",
    },
    {
      emoji: "🍑",
      area: "臀部",
      desc: "提升臀部緊緻度，改善臀部下垂及橙皮紋，增加肌膚彈性",
      tags: ["臀部提升", "橙皮紋"],
      accentColor: "#0284c7",
    },
    {
      emoji: "⌛",
      area: "側腰 / 腰背",
      desc: "改善腰側贅肉區域皮膚鬆弛，腰背線條更纖細緊緻",
      tags: ["側腰", "腰背"],
      accentColor: "#059669",
    },
    {
      emoji: "🦿",
      area: "膝上內側",
      desc: "改善膝上方內側皮膚下垂鬆弛，恢復腿部線條流暢度",
      tags: ["膝上", "腿部線條"],
      accentColor: "#6d28d9",
    },
  ];

  return (
    <AnimatedSection id="treatment-areas" className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-3 text-center"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion Body 可治療哪些部位？
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-10">
          六大常見身體治療部位，按個人需求自由組合
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {areas.map((a) => (
            <motion.div
              key={a.area}
              variants={scaleIn}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-3xl mb-3 block">{a.emoji}</span>
              <strong
                className="block text-base font-bold mb-1.5"
                style={{ color: a.accentColor }}
              >
                {a.area}
              </strong>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{a.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {a.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white"
                    style={{ background: a.accentColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            唔確定自己合適哪個部位？我們的治療師會在到店後先為你做評估再建議
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-3.5 text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: BRAND_RED }}
          >
            💬 WhatsApp 免費諮詢哪個部位更適合
          </a>
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
    {
      num: 1,
      title: "WhatsApp 預約 / 網上預約",
      desc: "透過 WhatsApp +852 5335 3313 預約，客服會在 24 小時內確認時間。BTL Exion Body 療程時間視部位而定（30–60 分鐘）。建議提前最少 2 天預約，熱門時段（週五晚、週六）建議提前 5–7 天。",
    },
    {
      num: 2,
      title: "到店 + 體態評估與皮膚分析",
      desc: "到達朗豪坊 40 樓後，資深治療師進行免費體態評估，了解你的主要困擾部位、鬆弛程度及橙皮紋狀況，並說明 BTL Exion Body 最適合的治療部位組合及預期效果。",
    },
    {
      num: 3,
      title: "個人化方案制定（零硬銷）",
      desc: "治療師根據評估結果，說明最適合的治療部位、能量參數及建議次數。Peko Beauty 承諾：如果療程唔適合你，我們會如實告知，不會為咗銷售而推薦。",
    },
    {
      num: 4,
      title: "BTL Exion Body 療程進行",
      desc: "在治療部位塗上導電凝膠後，以大型身體手具對目標部位緩慢系統性移動。全程舒適溫熱感，大部分客人形容如同熱石按摩。腹部療程約 40–55 分鐘，手臂約 20–30 分鐘，可輕鬆休息。",
    },
    {
      num: 5,
      title: "療程後即可恢復日常活動 + WhatsApp 跟進",
      desc: "BTL Exion Body 療程後幾乎無任何恢復期，可即時正常活動、返工、運動。治療師提供個人化護理建議，並透過 WhatsApp 在 48 小時內主動跟進身體反應情況，解答任何疑問。",
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
          在 Peko Beauty 做 BTL Exion Body 係咩流程？
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
                <strong className="block text-gray-900 text-[14px] md:text-[15px] leading-snug">
                  {step.title}
                </strong>
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
      exion: "AI 單極 RF + 超聲波（無針）",
      velashape: "冷凍脂肪細胞凋亡（CoolSculpting）",
      trad: "高強度聚焦電磁波增肌（Emsculpt）",
    },
    {
      feature: "主攻功效",
      exion: "溶脂 22% + 同步緊膚 85%",
      velashape: "溶脂為主（無緊膚機制）",
      trad: "增肌減脂（無直接緊膚）",
    },
    {
      feature: "痛感",
      exion: "1–2/10（舒適溫熱）",
      velashape: "2–4/10（冰凍感 30–60分）",
      trad: "3–5/10（強烈肌肉收縮）",
    },
    {
      feature: "恢復期",
      exion: "幾乎零恢復期",
      velashape: "數天至 2 週（麻木感）",
      trad: "幾乎零（但肌肉疲乏）",
    },
    {
      feature: "溶脂後皮膚緊緻",
      exion: "✅ 同步緊膚 85%",
      velashape: "❌ 可能更鬆弛",
      trad: "⚠️ 無直接緊膚效果",
      highlight: true,
    },
    {
      feature: "透明質酸激生",
      exion: "✅ +224%（臨床實證）",
      velashape: "❌ 否",
      trad: "❌ 否",
      highlight: true,
    },
    {
      feature: "適合產後媽媽",
      exion: "✅ 溶脂 + 緊膚雙效",
      velashape: "⚠️ 溶脂但皮膚或更鬆",
      trad: "⚠️ 增肌為主，非緊膚",
      highlight: true,
    },
    {
      feature: "即日可運動",
      exion: "✅ 可以",
      velashape: "❌ 需等待 1–2 天",
      trad: "✅ 可以（但肌肉疲乏）",
    },
    {
      feature: "體驗/試做價",
      exion: "HK$2,980（腹部全區）",
      velashape: "HK$2,000+/part",
      trad: "HK$3,000+",
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
          BTL Exion Body vs 冷凍溶脂 vs Emsculpt
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
                 ⭐ BTL Exion Body
                 <br /><span className="font-normal opacity-80 text-[10px]">(Peko Beauty)</span>
               </th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">冷凍溶脂（CoolSculpting）</th>
                <th className="py-4 px-4 text-center text-xs font-bold w-[26%]">Emsculpt</th>
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
                    {row.velashape}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs text-gray-500 border-b border-gray-100">
                    {row.trad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          variants={fadeUp}
          className="mt-6 bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-5"
        >
          <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
            <strong className="text-gray-900">🎯 Peko 建議：</strong>
            如果你<strong>希望無創、幾乎零恢復期、舒適感受優先</strong>，又想改善身體鬆弛及橙皮紋，
            BTL Exion Body 是目前香港最舒適有效的無針身體緊緻選擇。
            唔確定？先透過{" "}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="text-[#C52B21] font-bold underline underline-offset-2">
              WhatsApp 免費諮詢
            </a>
            ，告知你的主要困擾部位，我們的治療師會為你分析。
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <p className="text-gray-500 mb-4 text-[15px]">想了解哪個療程更適合你的身體困擾？</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            style={{ background: BRAND_RED }}
          >
            👉 查看 BTL Exion Body 試做優惠 HK$680/part
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
        "生完二胎後腹部一直很鬆弛，做了健身運動肌肉有點收，但皮膚那層始終係鬆的。做 Exion Body 腹部 4 次之後，皮膚感覺緊了好多，摸落去不再是那種軟趴趴的感覺。治療師全程很細心，能量調到舒適我才繼續，整個嘅舒適感比我預期好很多，就係熱熱的感覺。",
      name: "C 小姐",
      age: "34歲",
      concern: "產後腹部鬆弛",
      treatment: "BTL Exion Body 腹部 × 5 次",
    },
    {
      quote:
        "大腿橙皮紋係我最在意的問題。試過好多方法都改善不大，朋友介紹我試 Exion Body。做完第 3 次之後橙皮紋凹凸感明顯減淡，穿泳衣不再那麼自卑。最好的就係沒有恢復期，做完即刻去上班完全沒問題，而且唔痛，就係暖暖的感覺。",
      name: "T 小姐",
      age: "29歲",
      concern: "大腿橙皮紋",
      treatment: "BTL Exion Body 大腿 × 4 次",
    },
  ];

  const socialStats = [
    { value: "95%", label: "客人滿意度" },
    { value: "5,000+", label: "真實好評" },
    { value: "幾乎零", label: "恢復期" },
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
              <div className="relative h-44 bg-gradient-to-br from-emerald-50 to-teal-50">
                <Image
                  src="/images/peko-beauty-reception-desk-mong-kok.jpg"
                  alt={`Peko Beauty BTL Exion Body 效果 ${t.concern}`}
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

        <motion.div
          variants={scaleIn}
          className="bg-emerald-50 rounded-2xl py-6 px-8 flex flex-wrap justify-center gap-8 text-center border border-emerald-100"
        >
          {socialStats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-emerald-700">{s.value}</div>
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
      title: "儀器信任",
      items: [
        "100% 原廠正貨 BTL Exion Body",
        "美國 FDA 認證",
        "歐盟 CE 認可",
        "BTL 原廠認證治療師操作",
      ],
    },
    {
      Icon: Users,
      title: "服務信任",
      items: [
        "全女班資深治療師",
        "零硬銷承諾",
        "明碼實價透明收費",
        "免費體態評估與治療規劃",
      ],
    },
    {
      Icon: ThumbsUp,
      title: "結果信任",
      items: [
        "95% 客人滿意度",
        "5,000+ 真實好評",
        "療程前後對比追蹤",
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
          點解旺角客人揀 Peko Beauty 做 BTL Exion Body？
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
          BTL Exion Body 香港收費一覽
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
              🌿 新客限定
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">新客體驗方案</h3>
            <p className="text-gray-400 text-sm mb-5">
              BTL Exion Body 單一部位單次療程
              <br />（腹部 / 大腿 / 手臂 / 臀部 可選）
            </p>
            <div className="text-5xl font-black text-[#C52B21] leading-none mb-1">HK$680</div>
            <p className="text-gray-300 text-xs mb-6">/part (市場參考價 HK$1,800+)</p>
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
              根據體態評估個人化建議
              <br />（單部位 4–8 次 / 多部位組合可選）
            </p>
            <div className="text-3xl font-black text-gray-600 leading-none mb-1">歡迎查詢</div>
            <p className="text-gray-300 text-xs mb-6">按部位、次數及個人目標報價</p>
            <a
              href="https://wa.me/85253353313?text=Hi%20Peko%2C%20我想查詢%20BTL%20Exion%20Body%20身體緊緻套票價錢"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-600 text-white font-bold rounded-lg px-6 py-4 text-base transition-all duration-200 hover:bg-gray-700 active:scale-[0.98]"
            >
              📋 查詢套票詳情
            </a>
          </motion.div>
        </div>

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
    "腹部鬆弛、肚腩、產後腹部恢復",
    "大腿、臀部橙皮紋（蜂窩組織）",
    "手臂蝴蝶袖、上臂皮膚下垂",
    "側腰、腰背及大腿內側贅肉區皮膚鬆弛",
    "體重標準但皮膚鬆弛感明顯",
    "工作繁忙，需要零恢復期的身體緊緻方案",
  ];
  const unsuitable = [
    "懷孕或哺乳期（不可進行腹部治療）",
    "治療部位有活躍性感染或開放性傷口",
    "體內有心臟起搏器或其他電子植入物",
    "治療部位有金屬植入物（如骨板、骨釘）",
    "正在服用抗凝血藥物",
    "嚴重糖尿病或自體免疫疾病（需由醫師評估）",
    "近期進行過手術的部位（需完全癒合後）",
  ];

  return (
    <AnimatedSection id="suitability" className="py-14 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-black text-gray-900 mb-8"
          style={{ fontFamily: "var(--font-noto-serif-tc), serif" }}
        >
          BTL Exion Body 適合咩人做？（包含禁忌症）
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={scaleIn} className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-green-800 font-bold text-base mb-5 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              適合做 BTL Exion Body
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
              不建議做 BTL Exion Body
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
      q: "BTL Exion Body 係咩？同 BTL Exion 面部版有咩分別？",
      a: "BTL Exion Body 使用與 Exion 面部版相同的 AI 單極射頻 + 超聲波核心技術，但配備專用的大型身體治療手具，可以更高效地覆蓋腹部、大腿、手臂等大面積身體部位。面部版的治療范圍較細，能量設定針對面部皮膚厚度；Body 版的手具面積更大、穿透深度設定更適合身體組織，能在較短時間內完成一個部位的完整療程。兩者均屬無針無創，幾乎零恢復期。",
    },
    {
      q: "BTL Exion Body 可以改善橙皮紋嗎？原理係咩？",
      a: "可以。橙皮紋（Cellulite）的形成原因是皮下膠原纖維隔板（fibrous septae）不均勻收縮、脂肪細胞突出所致。BTL Exion Body 的雙技術組合對橙皮紋有針對性幫助：超聲波預處理可疏鬆變硬的纖維隔板；RF 能量加熱真皮層促進膠原蛋白重組，令皮膚底層支撐更均勻。需要注意的是，橙皮紋改善通常需要 4–8 次完整療程，且效果因個人嚴重程度而異，屬漸進改善而非單次根除。",
    },
    {
      q: "BTL Exion Body 可以減肥嗎？唔運動都有效？",
      a: "BTL Exion Body 的主要目的是皮膚緊緻、膠原重建及改善橙皮紋——並非主要的脂肪分解或減重療程。若你的主要目標是減少脂肪體積，可能需要配合其他體雕療程（如 BTL Vanquish 或 Emsculpt）一起規劃。Exion Body 最適合的場景是：體重已大致穩定，但皮膚有鬆弛感、橙皮紋或彈性不足的人；或在運動後希望進一步改善皮膚質感的人。配合適度運動和健康飲食，效果更持久。",
    },
    {
      q: "BTL Exion Body 痛唔痛？做完可以繼續運動嗎？",
      a: "BTL Exion Body 全程舒適溫熱感，痛感指數約 1–2/10，多數客人形容如同熱石按摩。療程後幾乎無任何恢復期，可以即時正常活動、運動及返工。唯一建議是避免療程後 2 小時內進行直接在治療部位的劇烈按摩或強力摩擦，讓皮膚組織在治療後的初期修復過程保持穩定。",
    },
    {
      q: "BTL Exion Body 需要做幾多次才見效？",
      a: "大部分客人在第 2–3 次後已能感受到皮膚緊緻度提升，橙皮紋凹凸感減淡，皮膚彈性改善。建議完整療程為 4–8 次，每 2–4 週一次；輕度鬆弛或橙皮紋問題通常 4–5 次已有明顯效果，較嚴重的鬆弛或多年橙皮紋則建議 6–8 次。完整療程後效果可維持至少 6–12 個月，配合適度運動可延長效果。",
    },
    {
      q: "產後多久可以做 BTL Exion Body 腹部療程？",
      a: "自然分娩後建議最少等待 6 週（42 天），確認惡露完全停止及傷口完全癒合後；剖腹產則建議等待 3–6 個月，確認傷口完全癒合及腹部感覺恢復正常後再進行。哺乳期間不建議進行腹部射頻療程。到店諮詢時，告知治療師你的產後情況，治療師會根據你的具體恢復狀況給出更準確的建議。",
    },
    {
      q: "BTL Exion Body 做完有冇副作用？",
      a: "常見短期反應：治療後局部皮膚有溫熱感，可能輕微泛紅，通常 1–2 小時內消退。由於 AI 溫控系統實時監測皮膚溫度，過熱或灼傷風險極低。長期安全性方面，目前無主流研究顯示適當頻率的 RF 療程會造成長期副作用。需要避免的是在禁忌症情況下勉強進行，或選擇不正規的療程中心使用未認證儀器——正規操作下 BTL Exion Body 屬非常安全的療程類別。",
    },
    {
      q: "BTL Exion Body 香港收費大概幾多？",
      a: "香港市場 Exion Body 收費因中心、地段、部位大小及是否配套諮詢評估而有差異。Peko Beauty 目前新客試做價為 HK$680/part（單一部位，如腹部、大腿或手臂），市場參考價一般為 HK$1,800+ 起。完整療程套票按部位、次數及個人目標提供個人化報價。選擇時建議確認：是否原廠正貨 BTL Exion Body 手具、是否提供免費諮詢評估、到店後有無消費壓力。",
    },
    {
      q: "BTL Exion Body 同 BTL EMfemme 360 有咩分別？",
      a: "兩者技術平台不同、適應症完全不同：BTL Exion Body 使用 AI 單極 RF + 超聲波，主要改善身體皮膚鬆弛、橙皮紋及膠原蛋白流失，適用於腹部、大腿、手臂、臀部等外部身體部位；BTL EMfemme 360 則專為女性親密部位（私密處）設計，使用不同的 360° RF 技術，主要改善陰道鬆弛、乾燥、尿失禁等婦科相關問題。兩者適應症、技術及治療部位均完全不同，不可互換。",
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
          BTL Exion Body 常見問題 FAQ
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
      href: "/treatments/btl-exion",
      emoji: "✨",
      gradient: "from-indigo-200 via-blue-100 to-sky-50",
      accentColor: "#3730a3",
      tag: "面部緊緻",
      title: "BTL Exion™ 膠原槍（面部）",
      desc: "同一技術平台的面部版本，無創 RF + 超聲波，激生透明質酸，零恢復期面部提升",
      cta: "試做 HK$680",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/btl-emfemme-360",
      emoji: "🌸",
      gradient: "from-rose-200 via-pink-100 to-red-50",
      accentColor: "#C52B21",
      tag: "私密護理",
      title: "BTL EMfemme 360",
      desc: "女性私密護理專用 RF 技術，改善陰道鬆弛、乾燥及尿失禁，有別於 Exion Body",
      cta: "了解詳情",
      imgSrc: null as string | null,
    },
    {
      href: "/treatments/ulfit-hifu",
      emoji: "🎯",
      gradient: "from-amber-200 via-orange-100 to-yellow-50",
      accentColor: "#d97706",
      tag: "HIFU 拉提",
      title: "ULFIT HIFU 超聲刀",
      desc: "高強度聚焦超聲波體雕，配合 Exion Body 達到提升 + 緊緻雙效",
      cta: "了解詳情",
      imgSrc: null as string | null,
    },
  ];

  return (
    <AnimatedSection id="related" className="py-12 md:py-16 px-4 bg-[#FAFAFA]">
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
      style={{ background: "linear-gradient(135deg, #f0f7f4 0%, #f5faf7 100%)" }}
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
          準備好告別肚腩鬆弛、橙皮紋了嗎？
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
          免費體態評估 + 零壓力專業諮詢
          <br />
          新客試做價{" "}
          <strong className="text-[#C52B21]">HK$680/part</strong>，明碼實價，絕無隱藏消費
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
export default function BtlExionBodyClient() {
  return (
    <div className="bg-white">
      <StickyNav />
      <HeroSection />
      <PainPointsSection />
      <DirectAnswerSection />
      <KeyTakeawaysSection />
      <TreatmentStatsSection />
      <ScienceSection />
      <TreatmentAreasSection />
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