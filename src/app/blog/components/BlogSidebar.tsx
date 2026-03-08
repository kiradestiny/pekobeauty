"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Tag,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  BookMarked,
  ExternalLink,
} from 'lucide-react';
import { SidebarSkeleton } from '@/components/blog/BlogSkeleton';
import type { BlogPost, ArticleType } from './blogTypes';

interface BlogSidebarProps {
  trendingPosts: BlogPost[];
  isLoading: boolean;
  activeTag: string;
  onTagClick: (tag: string) => void;
}

// ─── Type colors ─────────────────────────────────────────────────────────────
const typeColorMap: Partial<Record<ArticleType, string>> = {
  'IN-DEPTH':   'text-indigo-600',
  'SCIENCE':    'text-teal-600',
  'REAL STORY': 'text-[#C52B21]',
  'GUIDE':      'text-amber-600',
  'Q&A':        'text-purple-600',
  'EXCLUSIVE':  'text-gray-700',
};

// ─── Editorial Callout (replaces the countdown offer card) ───────────────────
const EditorialCallout = () => (
  <motion.div
    initial={{ opacity: 0, x: 16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="bg-gray-950 rounded-2xl p-7 text-white relative overflow-hidden"
  >
    {/* Subtle background texture */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    />
    <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />

    <div className="relative z-10">
      {/* Label */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[9px] font-black tracking-[0.18em] text-gray-400 uppercase">
          From the Editor
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <BookMarked size={24} className="text-[#C52B21] mb-4" />

      <h4 className="text-base font-bold leading-snug mb-3">
        科學美學，不是選擇，是必修課。
      </h4>
      <p className="text-gray-400 text-[13px] mb-6 leading-relaxed">
        每一篇文章都經過 Peko 編輯部審核，確保資訊準確、科學有據。立即預約專屬皮膚分析，開始您的精準美麗旅程。
      </p>

      {/* Checklist */}
      <div className="space-y-2 mb-6">
        {['全女班顧問團隊', 'VISIA 8 維度分析', '1 對 1 客製化方案'].map((item) => (
          <div key={item} className="flex items-center gap-2 text-[12px] text-gray-300">
            <CheckCircle2 size={12} className="text-[#C52B21] flex-shrink-0" />
            {item}
          </div>
        ))}
      </div>

      <Link
        href="/booking"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#C52B21] text-white rounded-xl text-sm font-bold hover:bg-[#A3241B] transition-colors"
      >
        預約免費諮詢 <ArrowUpRight size={14} />
      </Link>
    </div>
  </motion.div>
);

// ─── Trending Posts ───────────────────────────────────────────────────────────
const TrendingPosts = ({ posts, isLoading }: { posts: BlogPost[]; isLoading: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: 16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.05 }}
    className="bg-white border border-gray-100 rounded-2xl p-6"
  >
    {/* Section header */}
    <div className="flex items-center gap-3 mb-6">
      <TrendingUp size={14} className="text-[#C52B21] flex-shrink-0" />
      <span className="text-[10px] font-black text-gray-800 tracking-[0.15em] uppercase">
        Most Read
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>

    {isLoading ? (
      <SidebarSkeleton />
    ) : (
      <div className="space-y-5">
        {posts.map((post, i) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-3.5">
            {/* Rank */}
            <div className="flex-shrink-0 w-6 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-300 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all mt-0.5">
              {i + 1}
            </div>

            {/* Thumbnail */}
            <div className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={post.image}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt=""
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center min-w-0 flex-1">
              {post.articleType && (
                <span className={`text-[9px] font-black tracking-widest uppercase mb-1 ${typeColorMap[post.articleType] ?? 'text-gray-500'}`}>
                  {post.articleType}
                </span>
              )}
              <h5 className="text-[12px] font-bold text-gray-800 group-hover:text-[#C52B21] transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h5>
              <span className="text-[10px] text-gray-400 font-medium mt-1">{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    )}
  </motion.div>
);

// ─── Topics (refactored Tag Cloud) ────────────────────────────────────────────
const allTags = [
  '凹凸洞', '荷爾蒙斑', 'Sylfirm X', 'Thermage',
  '私密護理', 'VISIA', '抗衰老', '保濕',
  '美白', '皮秒激光', '膠原蛋白', '毛孔',
];

const TopicsCloud = ({ activeTag, onTagClick }: { activeTag: string; onTagClick: (tag: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className="bg-white border border-gray-100 rounded-2xl p-6"
  >
    <div className="flex items-center gap-3 mb-5">
      <Tag size={14} className="text-[#C52B21] flex-shrink-0" />
      <span className="text-[10px] font-black text-gray-800 tracking-[0.15em] uppercase">
        Topics
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
    <div className="flex flex-wrap gap-1.5">
      {allTags.map((tag) => {
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`px-3 py-1.5 text-[11px] rounded-lg font-medium transition-all duration-200 border ${
              isActive
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  </motion.div>
);

// ─── Newsletter ───────────────────────────────────────────────────────────────
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
      className="bg-white border border-gray-100 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <Sparkles size={14} className="text-[#C52B21] flex-shrink-0" />
        <span className="text-[10px] font-black text-gray-800 tracking-[0.15em] uppercase">
          Newsletter
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">
        訂閱 Peko Beauty Journal，每週精選醫美知識直送信箱。
      </p>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            exit={{ opacity: 0, scale: 0.97 }}
            onSubmit={handleSubmit}
            className="space-y-2.5"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-[13px] placeholder-gray-300 text-gray-700 focus:border-gray-300 focus:bg-white focus:ring-0 outline-none transition-colors"
              required
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-[12px] font-bold hover:bg-[#C52B21] transition-colors flex items-center justify-center gap-1.5"
            >
              立即訂閱 <ChevronRight size={13} />
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-3 text-center"
          >
            <CheckCircle2 size={28} className="text-green-500 mb-2" />
            <p className="text-[13px] font-bold text-gray-800">訂閱成功！</p>
            <p className="text-[11px] text-gray-400 mt-1">感謝訂閱，我們很快會與您聯繫。</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Ask an Expert (replaces QuickContact) ────────────────────────────────────
const AskExpert = () => (
  <motion.div
    initial={{ opacity: 0, x: 16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="bg-white border border-gray-100 rounded-2xl p-6"
  >
    <div className="flex items-center gap-3 mb-5">
      <MessageCircle size={14} className="text-[#C52B21] flex-shrink-0" />
      <span className="text-[10px] font-black text-gray-800 tracking-[0.15em] uppercase">
        Ask an Expert
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>

    <p className="text-[12px] text-gray-500 mb-5 leading-relaxed">
      有關於療程或皮膚護理的疑問？我們的顧問隨時為您解答。
    </p>

    <a
      href="https://wa.me/85253353313"
      className="flex items-center justify-between w-full px-4 py-3 bg-[#ECFDF5] text-[#059669] rounded-xl text-[12px] font-bold hover:bg-[#D1FAE5] transition-colors group"
    >
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp 立即諮詢
      </div>
      <ExternalLink size={12} className="text-[#059669] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>

    <Link
      href="/contact"
      className="flex items-center justify-center gap-1.5 mt-3 text-[11px] font-medium text-gray-400 hover:text-gray-700 transition-colors"
    >
      其他聯絡方式 <ArrowUpRight size={12} />
    </Link>
  </motion.div>
);

// ─── Main BlogSidebar ─────────────────────────────────────────────────────────
const BlogSidebar = ({ trendingPosts, isLoading, activeTag, onTagClick }: BlogSidebarProps) => (
  <aside className="lg:col-span-4 space-y-6">
    <EditorialCallout />
    <TrendingPosts posts={trendingPosts} isLoading={isLoading} />
    <TopicsCloud activeTag={activeTag} onTagClick={onTagClick} />
    <Newsletter />
    <AskExpert />
  </aside>
);

export default BlogSidebar;
