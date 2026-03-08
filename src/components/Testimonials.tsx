"use client";

import React, { useState, useMemo, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Star, Quote, ArrowRight, CheckCircle2, ThumbsUp, Filter, Tag, Sparkles, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Testimonial {
  id: number;
  name: string;
  initials: string;
  rating: number;
  category: string;
  text: string;
  treatment: string;
  link: string;
  date: string;
  likes: number;
  offer: string;
  platform: "Google" | "Facebook" | "自費客";
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const CATEGORIES = ["全部", "凹凸洞·膚質", "緊緻·提拉", "色斑·美白", "私密修復", "體雕"];

const BRAND_RED = "#C52B21";

/** Desktop initial rows: 3 cols × 2 rows = 6 cards */
const DESKTOP_INITIAL = 6;
/** Mobile initial rows: 1 col × 3 rows = 3 cards */
const MOBILE_INITIAL = 3;

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Cathy W.",
    initials: "CW",
    rating: 5,
    category: "凹凸洞·膚質",
    text: "以前好怕被 Hard Sell，喺 Peko 做 Sylfirm X 感覺好專業。治療師會睇住 VISIA 報告解釋，完全無壓迫感，凹凸洞真係平咗好多，紅印都淡咗！",
    treatment: "Sylfirm X 矽谷電波",
    link: "/treatments/sylfirm-x",
    date: "2025.11.15",
    likes: 24,
    offer: "首次體驗 $1,880",
    platform: "Google",
  },
  {
    id: 2,
    name: "Mrs. Lam",
    initials: "ML",
    rating: 5,
    category: "私密修復",
    text: "生完小朋友之後一直有尿滲困擾，一直唔敢講。嚟 Peko 做 EMfemme 360，全女班主理，唯一性探頭令我安心好多，而且真係改善咗好多！",
    treatment: "EMfemme 360 私密修復",
    link: "/treatments/exion-femme-360",
    date: "2025.12.02",
    likes: 18,
    offer: "私密療程諮詢",
    platform: "自費客",
  },
  {
    id: 3,
    name: "Joanne L.",
    initials: "JL",
    rating: 5,
    category: "緊緻·提拉",
    text: "朗豪坊地點超方便，放工過嚟做 BTL Exion 膠原槍，做完即時見到塊臉飽滿咗！佢哋話可以激生 +224% 透明質酸，做完水潤感維持咗好耐，完全唔痛。",
    treatment: "BTL Exion 膠原槍",
    link: "/treatments/btl-exion",
    date: "2025.12.10",
    likes: 31,
    offer: "體驗價 $680",
    platform: "Google",
  },
  {
    id: 4,
    name: "Winnie T.",
    initials: "WT",
    rating: 5,
    category: "色斑·美白",
    text: "做咗幾次 Hollywood Spectra Laser Facial，塊臉明顯白淨咗，啲深層荷爾蒙斑淡咗好多。最鍾意係佢哋唔強逼買 package，一次一次咁做。",
    treatment: "Hollywood Spectra 激光靚膚",
    link: "/treatments/hollywood-spectra",
    date: "2025.12.12",
    likes: 15,
    offer: "首次體驗 $880",
    platform: "Google",
  },
  {
    id: 5,
    name: "Sarah K.",
    initials: "SK",
    rating: 5,
    category: "緊緻·提拉",
    text: "Ulfit HIFU 效果真係好驚喜！做完半邊臉即刻見到提拉咗，下顎線返返嚟。個圓形探頭貼合面型，TDT 擴散式加熱痛感比以前 HIFU 低好多，可以接受。",
    treatment: "Ulfit HIFU 超聲刀",
    link: "/treatments/ulfit-hifu",
    date: "2025.12.14",
    likes: 42,
    offer: "500發 $1,280",
    platform: "Facebook",
  },
  {
    id: 6,
    name: "Amy C.",
    initials: "AC",
    rating: 5,
    category: "凹凸洞·膚質",
    text: "試過好多地方做蜂巢，Peko 用 Hollywood Spectra MLA 手具做，打完唔出血唔結焦，佢哋解釋係 LIOB 技術，翌日皮膚明顯光滑咗，毛孔細咗！",
    treatment: "蜂巢無創膠原 (Hollywood Spectra)",
    link: "/treatments/hollywood-spectra",
    date: "2026.01.03",
    likes: 27,
    offer: "首次體驗 $980",
    platform: "Google",
  },
  {
    id: 7,
    name: "Kelly M.",
    initials: "KM",
    rating: 5,
    category: "色斑·美白",
    text: "面頰有玫瑰痤瘡泛紅困擾多年，試用 Hollywood Spectra 585nm Golden Laser，做完紅腫明顯改善。治療師好有耐性解釋原理，唔係一來就叫你買 package。",
    treatment: "Golden Laser 黃金激光",
    link: "/treatments/hollywood-spectra",
    date: "2026.01.10",
    likes: 33,
    offer: "金色激光 $1,280",
    platform: "Google",
  },
  {
    id: 8,
    name: "Tiffany H.",
    initials: "TH",
    rating: 5,
    category: "凹凸洞·膚質",
    text: "試左 XE LHA Peel 鹼性換膚，係第四代技術，邊換膚邊填充，完全零脫皮！做完皮膚光滑好多，閉塞粉刺走晒，而且好舒服唔係一般果酸咁刺。",
    treatment: "XE LHA 鹼性煥膚",
    link: "/treatments/lha-peel",
    date: "2026.01.18",
    likes: 19,
    offer: "首次體驗 $980",
    platform: "Facebook",
  },
  {
    id: 9,
    name: "Vivian P.",
    initials: "VP",
    rating: 5,
    category: "緊緻·提拉",
    text: "眼紋同眼皮鬆弛一直係我嘅煩惱，做咗 BTL Exion 眼部療程，個眼周真係緊咗！啲人話係「眼袋小熨斗」，真係貼切，完全無痛好享受。",
    treatment: "BTL Exion 眼部緊緻",
    link: "/treatments/btl-exion",
    date: "2026.01.22",
    likes: 21,
    offer: "眼部體驗 $380",
    platform: "自費客",
  },
  {
    id: 10,
    name: "Christina Y.",
    initials: "CY",
    rating: 5,
    category: "體雕",
    text: "生完BB肚腩鬆晒，試咗 BTL Exion Body 溶脂療程，完全唔痛，做完即時見到緊咗少少。治療師話要幾次先見明顯效果係老實話，唔係亂講大話。",
    treatment: "BTL Exion 身體塑形",
    link: "/treatments/btl-exion",
    date: "2026.01.28",
    likes: 38,
    offer: "體驗價 $680/部位",
    platform: "Google",
  },
  {
    id: 11,
    name: "Michelle F.",
    initials: "MF",
    rating: 5,
    category: "凹凸洞·膚質",
    text: "做咗 Hollywood Spectra Carbon Peel，係碳粉去油療程，做完即時見到毛孔細咗、油光減少。啲碳粉係真係用嚟吸光清走污垢而唔係亂噏。好推薦！",
    treatment: "Carbon Peel 碳粉激光",
    link: "/treatments/hollywood-spectra",
    date: "2026.02.05",
    likes: 16,
    offer: "首次體驗 $880",
    platform: "Facebook",
  },
  {
    id: 12,
    name: "Elaine W.",
    initials: "EW",
    rating: 5,
    category: "凹凸洞·膚質",
    text: "凹凸洞好嚴重做咗 BTL Exion 黃金微針，Single Pass 技術真係痛感比我之前做過嘅微針低，而且 AI 脈衝控制能量安全感十足。做完紅褪得好快！",
    treatment: "BTL Exion 黃金微針射頻",
    link: "/treatments/btl-exion",
    date: "2026.02.12",
    likes: 45,
    offer: "首次體驗 $2,980",
    platform: "Google",
  },
  {
    id: 13,
    name: "Grace T.",
    initials: "GT",
    rating: 5,
    category: "凹凸洞·膚質",
    text: "試咗 Venus Glow 淨膚療程，個 360° 旋轉負壓水流真係舒服到喊，佢哋話係 70 微米水流唔係物理擠壓，係咁見到黑頭粉刺輕鬆走晒，皮膚通透晒！",
    treatment: "Venus Glow 深層淨膚",
    link: "/treatments/venus-glow",
    date: "2026.02.19",
    likes: 22,
    offer: "首次體驗 $480",
    platform: "Google",
  },
];

/* Pull-quote items for the auto-scrolling marquee */
const PULL_QUOTES = [
  { text: "凹凸洞平了好多", author: "Cathy W.", treatment: "Sylfirm X" },
  { text: "激生 Hyaluronic Acid，水潤感維持超耐", author: "Joanne L.", treatment: "BTL Exion" },
  { text: "零脫皮玻璃肌", author: "Tiffany H.", treatment: "XE LHA Peel" },
  { text: "下顎線返嚟了！", author: "Sarah K.", treatment: "Ulfit HIFU" },
  { text: "不痛做到埋脂收緊", author: "Christina Y.", treatment: "Exion Body" },
  { text: "毛孔細晒透明肌", author: "Grace T.", treatment: "Venus Glow" },
  { text: "荷爾蒙斑淡多了", author: "Winnie T.", treatment: "Hollywood Spectra" },
  { text: "AI 微針痛感比傳統低好多", author: "Elaine W.", treatment: "黃金微針" },
  { text: "紅腫改善了多年煩惱", author: "Kelly M.", treatment: "Golden Laser" },
  { text: "眼紋眼皮緊了，唔痛好享受", author: "Vivian P.", treatment: "Exion Eye" },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Platform badge */
const PlatformBadge = ({ platform }: { platform: Testimonial["platform"] }) => {
  const styles: Record<Testimonial["platform"], { bg: string; text: string; label: string }> = {
    Google:   { bg: "bg-blue-50",  text: "text-blue-700",  label: "Google 評價" },
    Facebook: { bg: "bg-sky-50",   text: "text-sky-700",   label: "Facebook" },
    "自費客": { bg: "bg-green-50", text: "text-green-700", label: "自費客" },
  };
  const s = styles[platform];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
};

/** Single review card */
const ReviewCard = ({ t, isLiked, onLike }: { t: Testimonial; isLiked: boolean; onLike: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    whileHover={{ y: -6 }}
    className="group relative bg-white rounded-[2rem] border border-slate-100 p-7 flex flex-col shadow-sm hover:shadow-xl hover:shadow-red-900/5 transition-all duration-500"
  >
    {/* Hover accent */}
    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-red-50/0 to-red-50/0 group-hover:from-red-50/40 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

    {/* Header row */}
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #C52B21, #e83a2e)" }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
            {t.name}
            <CheckCircle2 size={12} className="text-blue-500" />
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <PlatformBadge platform={t.platform} />
            <span className="text-[9px] text-gray-400 font-bold">{t.date}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-0.5 flex-shrink-0">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} size={12} fill={BRAND_RED} color={BRAND_RED} />
        ))}
      </div>
    </div>

    {/* Quote body */}
    <div className="flex-grow mb-5 relative">
      <Quote className="absolute -top-1 -left-1 text-red-100 -z-0" size={28} fill="currentColor" />
      <p className="relative z-10 text-gray-700 text-[14px] leading-relaxed font-light italic pl-1">
        "{t.text}"
      </p>
    </div>

    {/* Treatment tag */}
    <div className="mb-5 px-4 py-3 rounded-xl bg-red-50/60 border border-red-100/50 flex items-center justify-between">
      <div>
        <p className="text-[9px] font-bold text-[#C52B21] uppercase tracking-widest mb-0.5">提及療程</p>
        <p className="text-sm font-bold text-gray-900">{t.treatment}</p>
      </div>
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white text-[9px] font-bold text-[#C52B21] border border-red-100 shadow-sm whitespace-nowrap">
        <Sparkles size={9} />
        {t.offer}
      </span>
    </div>

    {/* Footer */}
    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
      <button
        onClick={onLike}
        className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
          isLiked ? "text-[#C52B21]" : "text-gray-400 hover:text-gray-600"
        }`}
        aria-label="覺得有用"
      >
        <ThumbsUp size={13} fill={isLiked ? "currentColor" : "none"} />
        有用 ({t.likes + (isLiked ? 1 : 0)})
      </button>
      <Link
        href={t.link}
        className="text-xs font-bold text-gray-700 flex items-center gap-1 hover:text-[#C52B21] transition-colors group/lk"
      >
        了解療程
        <ArrowRight size={13} className="group-hover/lk:translate-x-1 transition-transform" />
      </Link>
    </div>
  </motion.div>
);

/** Continuously scrolling pull-quote strip */
const QuoteMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const SPEED = 0.6;

  useAnimationFrame(() => {
    const el = trackRef.current;
    if (!el) return;
    xRef.current -= SPEED;
    const half = el.scrollWidth / 2;
    if (Math.abs(xRef.current) >= half) xRef.current = 0;
    el.style.transform = `translateX(${xRef.current}px)`;
  });

  const items = [...PULL_QUOTES, ...PULL_QUOTES];

  return (
    <div className="relative overflow-hidden py-4 mb-12">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ width: "max-content" }}>
        {items.map((q, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-slate-100 shadow-sm"
          >
            <Star size={12} fill={BRAND_RED} color={BRAND_RED} />
            <span className="text-xs font-bold text-gray-700 italic">"{q.text}"</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
              — {q.author} · {q.treatment}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Show-more button helper
───────────────────────────────────────────── */
const ShowMoreBtn = ({
  total,
  onClick,
}: {
  total: number;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="group flex items-center gap-2 px-8 py-4 rounded-full border-2 border-slate-200 text-sm font-bold text-gray-600 hover:border-[#C52B21] hover:text-[#C52B21] transition-all duration-300"
  >
    查看全部 {total} 則評價
    <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
  </motion.button>
);

const CollapseBtn = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="group flex items-center gap-2 px-8 py-4 rounded-full border-2 border-slate-200 text-sm font-bold text-gray-500 hover:border-slate-400 hover:text-gray-700 transition-all duration-300"
  >
    收起
    <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
  </motion.button>
);

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const MOBILE_VISIBLE = 3;

  const filtered = useMemo(
    () => activeCategory === "全部" ? testimonials : testimonials.filter(t => t.category === activeCategory),
    [activeCategory]
  );

  // Reset show-more when filter changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowAll(false);
  };

  const handleLike = (id: number) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Items sliced to DESKTOP_INITIAL when collapsed
  const slicedItems = useMemo(
    () => showAll ? filtered : filtered.slice(0, DESKTOP_INITIAL),
    [filtered, showAll]
  );

  // Whether to show the "see more" button:
  // - Mobile: shown when filtered count > MOBILE_INITIAL
  // - Desktop: shown when filtered count > DESKTOP_INITIAL
  const mobileHasMore = !showAll && filtered.length > MOBILE_INITIAL;
  const desktopHasMore = !showAll && filtered.length > DESKTOP_INITIAL;

  return (
    <section className="py-28 bg-[#FAFAFA] overflow-hidden relative">
      {/* Top rule */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#C52B21] text-xs font-bold tracking-widest uppercase mb-6"
          >
            <MessageSquare size={13} />
            Real Stories · Real Results
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight mb-6"
          >
            真實用家 · <span className="font-bold text-[#C52B21]">口碑親證</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-500 text-base font-light leading-relaxed mb-8"
          >
            我們堅持以效果說話。每一份好評，都是對 Peko 專業標準的真實肯定。
          </motion.p>

          {/* Aggregate stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-5"
          >
            {/* Numeric stats */}
            <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { value: "4.9", label: "平均評分", suffix: "/5" },
                { value: "200+", label: "五星評價", suffix: "" },
              ].map((stat, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                  {stat.suffix && <span className="text-sm font-bold text-gray-400">{stat.suffix}</span>}
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{stat.label}</span>
                </div>
              ))}
            </div>
            {/* Platform pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">收錄平台</span>
              {["Google", "Facebook", "Instagram", "Threads", "小紅書", "Fresha"].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-gray-600 shadow-sm"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Scrolling pull-quote marquee ── */}
        <QuoteMarquee />

        {/* ── Category filter ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat, idx) => {
            const hiddenOnMobile = !showAllFilters && idx >= MOBILE_VISIBLE;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 items-center gap-1.5
                  ${hiddenOnMobile ? "hidden sm:flex" : "flex"}
                  ${activeCategory === cat
                    ? "bg-[#C52B21] text-white shadow-md shadow-red-900/20 scale-105"
                    : "bg-white text-gray-500 border border-slate-200 hover:border-[#C52B21] hover:text-[#C52B21]"
                  }`}
              >
                {cat === "全部" ? <Filter size={12} /> : <Tag size={12} />}
                {cat}
              </button>
            );
          })}

          {/* Mobile filter expand toggle */}
          {CATEGORIES.length > MOBILE_VISIBLE && (
            <button
              onClick={() => setShowAllFilters(prev => !prev)}
              className="sm:hidden flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-slate-100 text-gray-500 border border-slate-200 hover:border-slate-400 transition-all duration-300"
            >
              {showAllFilters ? (
                <><ChevronUp size={12} />收起</>
              ) : (
                <><span className="font-black">+{CATEGORIES.length - MOBILE_VISIBLE}</span>&nbsp;更多</>
              )}
            </button>
          )}
        </div>

        {/* ── Review grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slicedItems.map((t, idx) => {
            /**
             * Responsive visibility when collapsed:
             * - Mobile  (< sm): hide items at index >= MOBILE_INITIAL  → hidden sm:block
             * - Desktop (sm+) : show all slicedItems (up to DESKTOP_INITIAL)
             */
            const hiddenOnMobile = !showAll && idx >= MOBILE_INITIAL;

            return (
              <div key={t.id} className={hiddenOnMobile ? "hidden sm:block" : ""}>
                <ReviewCard
                  t={t}
                  isLiked={likedIds.includes(t.id)}
                  onLike={() => handleLike(t.id)}
                />
              </div>
            );
          })}
        </div>

        {/* ── Show more / Collapse controls ── */}
        <div className="mt-12 flex justify-center">
          {/* Mobile button: shows when collapsed and there are > MOBILE_INITIAL items */}
          {mobileHasMore && (
            <div className="sm:hidden">
              <ShowMoreBtn total={filtered.length} onClick={() => setShowAll(true)} />
            </div>
          )}

          {/* Desktop button: shows when collapsed and there are > DESKTOP_INITIAL items */}
          {desktopHasMore && (
            <div className="hidden sm:block">
              <ShowMoreBtn total={filtered.length} onClick={() => setShowAll(true)} />
            </div>
          )}

          {/* Collapse button: visible on both when fully expanded */}
          {showAll && <CollapseBtn onClick={() => setShowAll(false)} />}
        </div>

        {/* ── Trust bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-10 border-t border-slate-200 flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {[
            {
              badge: (
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm italic">G</div>
              ),
              label: "Google 4.9 / 5.0",
            },
            {
              badge: (
                <div className="w-9 h-9 rounded-full bg-[#C52B21] flex items-center justify-center text-white font-bold text-[10px] leading-none text-center">
                  VISIA
                </div>
              ),
              label: "數據化追蹤效果",
            },
            {
              badge: (
                <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white">
                  <CheckCircle2 size={17} />
                </div>
              ),
              label: "100% 原廠正貨",
            },
            {
              badge: (
                <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center">
                  <Star size={16} fill="white" color="white" />
                </div>
              ),
              label: "200+ 五星好評",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity"
            >
              {item.badge}
              <span className="text-sm font-bold text-gray-800">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
