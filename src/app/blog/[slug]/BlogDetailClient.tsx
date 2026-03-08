"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Facebook,
  MessageCircle,
  ChevronLeft,
  Clock,
  BookOpen,
  Heart,
  Share2,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  Eye,
  Calendar,
  ArrowUp,
  ExternalLink,
  Link as LinkIcon,
} from 'lucide-react';
import Link from 'next/link';

// ─── Article Data ─────────────────────────────────────────────────────────────
const article = {
  title: '【2025 凹凸洞攻略】Sylfirm X 矽谷電波：為何它能成為修復界的新寵？',
  category: '皮膚科技',
  articleType: 'IN-DEPTH' as const,
  date: '2025年12月15日',
  readTime: '閱讀約 5 分鐘',
  views: '1,247',
  likes: 128,
  author: 'Peko 編輯部',
  authorAvatar: 'https://i.pravatar.cc/150?u=peko1',
  authorTitle: '資深醫美編輯',
  authorBio: '擁有超過 8 年醫美行業報道經驗，專注於前沿科技療程深度解析。',
  heroImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1600',
  tags: ['凹凸洞', 'Sylfirm X', '矽谷電波', '皮膚修復', '微創療程'],
};

const typeConfig = {
  'IN-DEPTH':   { label: 'IN-DEPTH',   className: 'bg-indigo-600 text-white' },
  'SCIENCE':    { label: 'SCIENCE',    className: 'bg-teal-600 text-white' },
  'REAL STORY': { label: 'REAL STORY', className: 'bg-[#C52B21] text-white' },
  'GUIDE':      { label: 'GUIDE',      className: 'bg-amber-500 text-white' },
  'Q&A':        { label: 'Q&A',        className: 'bg-purple-600 text-white' },
  'EXCLUSIVE':  { label: 'EXCLUSIVE',  className: 'bg-gray-950 text-white' },
};

const toc = [
  { id: 'section-1', title: '修復基底膜：關鍵所在' },
  { id: 'section-2', title: 'Sylfirm X vs 傳統激光' },
  { id: 'section-3', title: '適合哪些膚質？' },
  { id: 'section-4', title: '術後護理建議' },
  { id: 'section-faq', title: '常見問題 FAQ' },
];

// ─── Reading Progress Bar ─────────────────────────────────────────────────────
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
      style={{ scaleX, backgroundColor: '#C52B21' }}
    />
  );
};

// ─── Floating Left Action Rail ────────────────────────────────────────────────
const FloatingActions = ({
  liked, likeCount, bookmarked,
  onLike, onBookmark, onShare,
  show,
}: {
  liked: boolean; likeCount: number; bookmarked: boolean;
  onLike: () => void; onBookmark: () => void; onShare: () => void;
  show: boolean;
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3"
      >
        {/* Like */}
        <motion.button
          onClick={onLike}
          whileTap={{ scale: 0.9 }}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl border shadow-sm transition-all ${
            liked
              ? 'bg-[#C52B21] border-[#C52B21] text-white shadow-red-100'
              : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-700'
          }`}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          <span className="text-[9px] font-black">{likeCount}</span>
        </motion.button>

        {/* Bookmark */}
        <motion.button
          onClick={onBookmark}
          whileTap={{ scale: 0.9 }}
          className={`p-3 rounded-2xl border shadow-sm transition-all ${
            bookmarked
              ? 'bg-gray-900 border-gray-900 text-white'
              : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-700'
          }`}
        >
          <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
        </motion.button>

        {/* Share */}
        <motion.button
          onClick={onShare}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-2xl border border-gray-100 bg-white text-gray-400 hover:border-gray-200 hover:text-gray-700 shadow-sm transition-all"
        >
          <Share2 size={16} />
        </motion.button>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-2" />

        {/* Back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-2xl border border-gray-100 bg-white text-gray-300 hover:border-gray-200 hover:text-gray-700 shadow-sm transition-all"
        >
          <ArrowUp size={16} />
        </motion.button>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Bottom Floating CTA ──────────────────────────────────────────────────────
const FloatingCTA = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
      >
        <div className="bg-gray-950/95 backdrop-blur-xl text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-white/10">
          <div>
            <div className="text-[11px] text-gray-400 font-medium">想了解更多？</div>
            <div className="text-[13px] font-bold">Sylfirm X 矽谷電波首拔體驗</div>
          </div>
          <Link
            href="/booking"
            className="flex-shrink-0 bg-[#C52B21] px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-[#A3241B] transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            立即預約 <ArrowRight size={12} />
          </Link>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Expert Note Callout ──────────────────────────────────────────────────────
const ExpertNote = ({ children }: { children: React.ReactNode }) => (
  <div className="my-8 flex gap-4 p-6 bg-gradient-to-r from-red-50 to-orange-50/30 border-l-4 border-[#C52B21] rounded-r-2xl">
    <div className="flex-shrink-0 w-7 h-7 bg-[#C52B21] rounded-lg flex items-center justify-center mt-0.5">
      <span className="text-white text-[10px] font-black">P</span>
    </div>
    <div>
      <div className="text-[10px] font-black text-[#C52B21] tracking-widest uppercase mb-1.5">Peko 專家筆記</div>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  </div>
);

// ─── Pull Quote ───────────────────────────────────────────────────────────────
const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="my-10 py-8 px-6 border-y border-gray-100 text-center">
    <p className="text-xl md:text-2xl font-bold text-gray-900 leading-snug italic">
      "{children}"
    </p>
  </blockquote>
);

// ─── Comparison Table ─────────────────────────────────────────────────────────
const ComparisonTable = () => (
  <div className="my-8 overflow-hidden rounded-2xl border border-gray-100">
    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
      <div className="p-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">比較項目</div>
      <div className="p-4 text-[11px] font-black text-[#C52B21] uppercase tracking-widest border-l border-gray-100">Sylfirm X</div>
      <div className="p-4 text-[11px] font-black text-gray-500 uppercase tracking-widest border-l border-gray-100">傳統 CO2 激光</div>
    </div>
    {[
      ['恢復時間', '4–6 小時', '7–14 天'],
      ['表皮損傷', '極微', '明顯結焦'],
      ['反黑風險', '極低', '中至高'],
      ['適用膚質', '所有膚質', '白皙膚質為佳'],
      ['療程次數', '3–6 次', '1–3 次'],
    ].map(([item, a, b], i) => (
      <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
        <div className="p-4 text-[13px] text-gray-500 font-medium border-b border-gray-50">{item}</div>
        <div className="p-4 text-[13px] font-bold text-gray-800 border-l border-b border-gray-100 flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
          {a}
        </div>
        <div className="p-4 text-[13px] text-gray-500 border-l border-b border-gray-100">{b}</div>
      </div>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const BlogDetailClient = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  // Intersection observer for TOC active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Show/hide floating elements based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / docHeight;
      setShowActions(scrollY > 300);
      setShowFloatingCTA(progress > 0.35 && progress < 0.92);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    setLiked((p) => !p);
    setLikeCount((p) => liked ? p - 1 : p + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  const typeCfg = typeConfig[article.articleType];

  return (
    <div className="bg-white min-h-screen">
      <ReadingProgress />
      <FloatingActions
        liked={liked} likeCount={likeCount} bookmarked={bookmarked}
        onLike={handleLike}
        onBookmark={() => setBookmarked((p) => !p)}
        onShare={handleShare}
        show={showActions}
      />
      <FloatingCTA show={showFloatingCTA} />

      {/* ── Hero Section (Full-Bleed Cinematic) ── */}
      <div className="relative w-full pt-20">
        <div className="relative aspect-[21/9] overflow-hidden bg-gray-900">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover opacity-75"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 to-transparent hidden md:block" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 max-w-5xl">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4 flex-wrap"
            >
              <span className={`inline-flex items-center px-2.5 py-1 rounded text-[9px] font-black tracking-[0.12em] uppercase ${typeCfg.className}`}>
                {typeCfg.label}
              </span>
              <span className="text-[10px] font-black text-[#C52B21] tracking-widest uppercase">
                {article.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 max-w-4xl"
            >
              {article.title}
            </motion.h1>

            {/* Meta strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-4 text-[12px] text-white/60 font-medium flex-wrap"
            >
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span className="flex items-center gap-1.5"><Eye size={12} /> {article.views} 次瀏覽</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Author Strip ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-100">
              <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-800">{article.author}</div>
              <div className="text-[11px] text-gray-400">{article.authorTitle}</div>
            </div>
          </div>

          {/* Back + actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-[#C52B21] transition-colors font-medium"
            >
              <ChevronLeft size={14} /> 返回專欄
            </Link>
            <span className="h-4 w-px bg-gray-200" />
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors font-medium"
            >
              <Share2 size={13} /> 分享
            </button>
            <button
              onClick={() => setBookmarked((p) => !p)}
              className={`flex items-center gap-1.5 text-[12px] transition-colors font-medium ${
                bookmarked ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <Bookmark size={13} fill={bookmarked ? 'currentColor' : 'none'} />
              {bookmarked ? '已儲存' : '儲存'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* ── Article Body (8 cols) ── */}
          <article ref={articleRef} className="lg:col-span-8">

            {/* Lead paragraph */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium border-l-4 border-[#C52B21] pl-5 mb-10">
              凹凸洞一直是醫美界最具挑戰性的課題之一。從傳統的 CO2 激光到黃金微針，雖然技術不斷演進，但「長恢復期」與「反黑風險」始終是客人的擔憂。直到 2025 年，Sylfirm X 矽谷電波的出現，徹底改變了這個局面。
            </p>

            {/* Article image */}
            <div className="my-8">
              <img
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000"
                alt="Sylfirm X Technology"
                className="w-full rounded-2xl object-cover aspect-[16/9]"
              />
              <p className="text-[11px] text-gray-400 mt-2.5 text-center font-medium">
                ▲ Sylfirm X 採用雙波技術，首創修復基底膜的精準機制（示意圖）
              </p>
            </div>

            {/* Section 1 */}
            <section id="section-1" className="mb-12 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5 flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#C52B21] text-white text-[11px] font-black flex items-center justify-center mt-0.5">1</span>
                修復基底膜：為什麼這是解決色斑與凹凸洞的關鍵？
              </h2>
              <p className="text-[15px] text-gray-600 leading-[1.9] mb-4">
                許多人不知道，皮膚的反覆泛紅、頑固色斑以及凹凸洞難以癒合，根源都在於「基底膜（Basement Membrane）」的受損。基底膜就像是皮膚的「地基」，如果地基不穩，任何保養品都難以吸收，任何療程的效果都難以持久。
              </p>
              <ExpertNote>
                Sylfirm X 是全球首創採用雙波（連續波 + 脈衝波）技術的儀器，它能精準修復基底膜，從根源截斷異常血管形成，這對於荷爾蒙斑及長期泛紅膚質尤為有效。無論是色素沉澱還是結構性凹陷，都能從根本層面得到針對性修復。
              </ExpertNote>
            </section>

            <PullQuote>
              恢復期從過去的 14 天大幅縮短至 4–6 小時，這是 Sylfirm X 最顛覆性的意義所在
            </PullQuote>

            {/* Section 2 */}
            <section id="section-2" className="mb-12 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5 flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#C52B21] text-white text-[11px] font-black flex items-center justify-center mt-0.5">2</span>
                Sylfirm X vs 傳統激光：邊款先係「凹凸洞終結者」？
              </h2>
              <p className="text-[15px] text-gray-600 leading-[1.9] mb-5">
                傳統二氧化碳 (CO2) 激光透過大面積氣化皮膚來強迫再生，這會產生明顯結焦，恢復期長達 7–14 天。而 Sylfirm X 透過極細微針將能量直接送達真皮層，表皮不產生氣化傷口，通常 4–6 小時後即可退紅，隔日可正常上妝。
              </p>
              <ComparisonTable />
            </section>

            {/* Section 3 */}
            <section id="section-3" className="mb-12 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5 flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#C52B21] text-white text-[11px] font-black flex items-center justify-center mt-0.5">3</span>
                適合哪些膚質？
              </h2>
              <p className="text-[15px] text-gray-600 leading-[1.9] mb-5">
                Sylfirm X 的適應症非常廣泛，幾乎適合所有膚質，包括亞洲人較難處理的深色皮膚。以下是主要適應症：
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  '頑固凹凸洞及粗大毛孔',
                  '荷爾蒙斑 (Melasma) 及炎症後色素沉著',
                  '長期泛紅、微絲血管擴張',
                  '眼周細紋及皮膚鬆弛',
                  '痤瘡疤痕（冰鑿型/滾輪型）',
                  '暗沉及不均勻膚色',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <CheckCircle2 size={14} className="text-[#C52B21] flex-shrink-0" />
                    <span className="text-[13px] text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 */}
            <section id="section-4" className="mb-12 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-5 flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#C52B21] text-white text-[11px] font-black flex items-center justify-center mt-0.5">4</span>
                術後護理建議
              </h2>
              <p className="text-[15px] text-gray-600 leading-[1.9] mb-4">
                雖然 Sylfirm X 恢復期極短，但術後的黃金 72 小時仍是修復關鍵：
              </p>
              <div className="space-y-3">
                {[
                  { step: '01', title: '加強保濕', desc: '選用含有透明質酸或積雪草成分的保濕精華，每日 2–3 次塗敷。' },
                  { step: '02', title: '嚴格防曬', desc: 'SPF 50+ 物理防曬霜，避免直曬，外出建議搭配防曬帽。' },
                  { step: '03', title: '生長因子護理', desc: '可選用含 EGF 生長因子的修復精華，加速基底膜重建。' },
                  { step: '04', title: '避免刺激', desc: '術後 72 小時勿使用含酸類（AHA/BHA/Retinol）產品。' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl">
                    <div className="flex-shrink-0 text-[10px] font-black text-[#C52B21] bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-gray-800 mb-1">{item.title}</div>
                      <div className="text-[12px] text-gray-500 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="section-faq" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-black text-[#C52B21] tracking-[0.2em] uppercase">FAQ</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="space-y-3">
                {[
                  {
                    q: 'Sylfirm X 療程會痛嗎？',
                    a: '療程前會敷上舒緩膏，過程中只會有輕微的溫熱感或微刺感，絕大部分客人都表示可以接受。整個療程約 30–45 分鐘。',
                  },
                  {
                    q: '需要做多少次才見效？',
                    a: '一般建議 3–6 次為一個完整療程，每次間隔約 4–6 週。具體次數需視乎皮膚狀況而定，VISIA 皮膚分析可幫助制定個人化方案。',
                  },
                  {
                    q: '療程後皮膚會變薄嗎？',
                    a: '不會。Sylfirm X 的機制是促進膠原蛋白增生與基底膜修復，療程後皮膚結構實際上會更健壯及有彈性。',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="p-5 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-[10px] font-black text-[#C52B21] bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0 mt-0.5">Q</span>
                      <span className="text-[14px] font-bold text-gray-900">{item.q}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0 mt-0.5">A</span>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Article Footer ── */}
            <div className="border-t border-gray-100 pt-8 space-y-8">

              {/* Tags */}
              <div>
                <span className="text-[10px] font-black text-gray-400 tracking-[0.15em] uppercase block mb-3">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-50 text-gray-500 text-[12px] rounded-lg border border-gray-100 font-medium hover:bg-red-50 hover:text-[#C52B21] hover:border-red-100 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Like + Share row */}
              <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-y border-gray-100">
                <div>
                  <div className="text-[13px] font-bold text-gray-800 mb-0.5">這篇文章對您有幫助嗎？</div>
                  <div className="text-[11px] text-gray-400">您的回饋是我們持續創作的動力</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] transition-all border ${
                      liked
                        ? 'bg-[#C52B21] text-white border-[#C52B21] shadow-md shadow-red-100'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Heart size={15} fill={liked ? 'white' : 'none'} />
                    {liked ? '已點讚' : '很有幫助'} ({likeCount})
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] bg-white text-gray-700 border border-gray-200 hover:border-gray-300 transition-all"
                  >
                    <Share2 size={15} /> 分享
                  </button>
                </div>
              </div>

              {/* Social share */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-gray-400 tracking-[0.15em] uppercase">分享至</span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1877F2]/5 text-[#1877F2] text-[12px] font-bold border border-[#1877F2]/10 hover:bg-[#1877F2]/10 transition-colors">
                    <Facebook size={14} /> Facebook
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366]/5 text-[#25D366] text-[12px] font-bold border border-[#25D366]/10 hover:bg-[#25D366]/10 transition-colors">
                    <MessageCircle size={14} /> WhatsApp
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 text-gray-500 text-[12px] font-bold border border-gray-100 hover:bg-gray-100 transition-colors"
                  >
                    <LinkIcon size={14} /> 複製連結
                  </button>
                </div>
              </div>

              {/* Author card */}
              <div className="flex gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-[#C52B21] tracking-widest uppercase mb-1">撰文作者</div>
                  <div className="text-[15px] font-bold text-gray-900 mb-0.5">{article.author}</div>
                  <div className="text-[11px] text-gray-400 mb-2">{article.authorTitle}</div>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{article.authorBio}</p>
                </div>
              </div>

              {/* Back to blog */}
              <Link
                href="/blog"
                className="flex items-center gap-2 text-[13px] font-bold text-gray-400 hover:text-[#C52B21] transition-colors group"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                返回 Peko Beauty Journal
              </Link>
            </div>
          </article>

          {/* ── Sidebar (4 cols) ── */}
          <aside className="lg:col-span-4 space-y-6">

            {/* TOC - Sticky */}
            <div className="sticky top-24 space-y-6">

              {/* Table of Contents */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen size={14} className="text-[#C52B21]" />
                  <span className="text-[10px] font-black text-gray-800 tracking-[0.15em] uppercase">文章目錄</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <nav className="space-y-1">
                  {toc.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-[13px] font-medium transition-all group ${
                        activeSection === item.id
                          ? 'bg-red-50 text-[#C52B21] font-bold'
                          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-colors ${
                        activeSection === item.id ? 'bg-[#C52B21] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                      }`}>
                        {i + 1}
                      </span>
                      <span className="line-clamp-1">{item.title}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Consultation CTA */}
              <div className="bg-gray-950 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full" />
                <div className="relative z-10">
                  <div className="text-[9px] font-black tracking-[0.2em] text-gray-400 uppercase mb-4">Expert Consultation</div>
                  <h4 className="text-base font-bold mb-3 leading-snug">
                    想知道 Sylfirm X<br />是否適合您的膚質？
                  </h4>
                  <p className="text-[12px] text-gray-400 mb-5 leading-relaxed">
                    透過 VISIA 8 維度分析，Peko 顧問為您制定個人化方案。
                  </p>
                  <Link
                    href="/booking"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#C52B21] text-white rounded-xl text-[12px] font-bold hover:bg-[#A3241B] transition-colors"
                  >
                    預約免費諮詢 <ArrowRight size={13} />
                  </Link>
                  <a
                    href="https://wa.me/85253353313"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 text-gray-300 rounded-xl text-[12px] font-medium hover:bg-white/10 transition-colors mt-2"
                  >
                    <MessageCircle size={13} /> WhatsApp 即時諮詢
                  </a>
                </div>
              </div>

              {/* Related Treatments */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-black text-gray-800 tracking-[0.15em] uppercase">相關療程</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <div className="space-y-3">
                  {[
                    { badge: '凹凸洞修復', name: 'Sylfirm X 矽谷電波', detail: '首拔體驗價 HK$1,880', href: '/treatments/sylfirm-x' },
                    { badge: '肌底診斷', name: 'VISIA 智能皮膚分析', detail: '8 大維度深度解碼', href: '/treatments/visia-skin-analysis' },
                  ].map((t) => (
                    <Link key={t.name} href={t.href} className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#C52B21]/20 hover:bg-red-50/30 transition-all">
                      <div>
                        <div className="text-[9px] font-black text-[#C52B21] tracking-widest uppercase mb-1">{t.badge}</div>
                        <div className="text-[13px] font-bold text-gray-800 group-hover:text-[#C52B21] transition-colors">{t.name}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{t.detail}</div>
                      </div>
                      <ExternalLink size={14} className="text-gray-300 group-hover:text-[#C52B21] transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailClient;
