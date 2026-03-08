"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Eye, ArrowRight, Users } from 'lucide-react';
import type { BlogPost, ArticleType } from '@/app/blog/components/blogTypes';

// ─── Article Type Config ────────────────────────────────────────────────────── 
const typeConfig: Record<ArticleType, { label: string; bg: string; text: string }> = {
  'IN-DEPTH':  { label: 'IN-DEPTH',   bg: 'bg-indigo-600',  text: 'text-white' },
  'SCIENCE':   { label: 'SCIENCE',    bg: 'bg-teal-600',    text: 'text-white' },
  'REAL STORY':{ label: 'REAL STORY', bg: 'bg-[#C52B21]',   text: 'text-white' },
  'GUIDE':     { label: 'GUIDE',      bg: 'bg-amber-500',   text: 'text-white' },
  'Q&A':       { label: 'Q&A',        bg: 'bg-purple-600',  text: 'text-white' },
  'EXCLUSIVE': { label: 'EXCLUSIVE',  bg: 'bg-gray-950',    text: 'text-white' },
};

interface BlogFeaturedPostProps {
  post: BlogPost;
}

const BlogFeaturedPost = ({ post }: BlogFeaturedPostProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const typeCfg = post.articleType ? typeConfig[post.articleType] : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14"
    >
      {/* ── Section Label ── */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[10px] font-black text-[#C52B21] tracking-[0.2em] uppercase">
          Cover Story
        </span>
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">本期精選</span>
      </div>

      <Link href={`/blog/${post.slug}`} className="group block">
        {/* ── Desktop: Side-by-side layout ── */}
        {/* ── Mobile: Stacked ── */}
        <div className="grid md:grid-cols-12 rounded-2xl overflow-hidden border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-500">

          {/* Image side */}
          <div className="md:col-span-7 relative aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-100">
            <motion.div
              className="absolute inset-0 scale-110"
              style={{ y: imageY }}
            >
              <img
                src={post.image}
                className="w-full h-full object-cover"
                alt={post.title}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />

            {/* Trending badge on image */}
            {post.isTrending && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-amber-400 text-white text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-widest shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                TRENDING
              </div>
            )}
          </div>

          {/* Content side */}
          <div className="md:col-span-5 p-7 md:p-10 flex flex-col justify-between">

            {/* Top: badges + meta */}
            <div>
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                {typeCfg && (
                  <span className={`inline-flex items-center px-2.5 py-1 rounded text-[9px] font-black tracking-[0.12em] uppercase ${typeCfg.bg} ${typeCfg.text}`}>
                    {typeCfg.label}
                  </span>
                )}
                <span className="text-[10px] font-black text-[#C52B21] tracking-widest uppercase">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <motion.h2
                className={`text-xl md:text-2xl lg:text-3xl font-black text-gray-950 leading-tight mb-4 transition-colors duration-300 ${
                  'group-hover:text-[#C52B21]'
                }`}
              >
                {post.title}
              </motion.h2>

              {/* Excerpt */}
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-400 rounded font-medium border border-gray-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom: Meta + CTA */}
            <div>
              {/* Stats row */}
              <div className="flex items-center gap-4 text-[11px] text-gray-400 font-medium mb-6 pb-6 border-b border-gray-50">
                <span className="flex items-center gap-1.5">
                  <Clock size={11} /> {post.readTime} 閱讀
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={11} /> {post.views} 瀏覽
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={11} /> {post.comments} 留言
                </span>
              </div>

              {/* Author + Read CTA */}
              <div className="flex items-center justify-between">
                {/* Author */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                    {post.authorAvatar ? (
                      <img src={post.authorAvatar} alt={post.author} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center text-[10px] font-black text-[#C52B21]">
                        P
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-gray-800">{post.author}</div>
                    {post.authorTitle && (
                      <div className="text-[10px] text-gray-400">{post.authorTitle}</div>
                    )}
                    <div className="text-[10px] text-gray-400">{post.date}</div>
                  </div>
                </div>

                {/* Read button */}
                <div className={`flex items-center gap-2 text-sm font-bold transition-all duration-300 ${
                  'group-hover:text-[#C52B21] text-gray-700'
                }`}>
                  <span className="hidden sm:block text-[12px]">閱讀全文</span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    'group-hover:bg-[#C52B21] group-hover:border-[#C52B21] group-hover:text-white border-gray-200 text-gray-500'
                  }`}>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogFeaturedPost;
