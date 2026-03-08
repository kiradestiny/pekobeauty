"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Heart, Share2, ArrowRight, Eye, MessageCircle } from 'lucide-react';
import type { BlogPost, ArticleType } from './blogTypes';

// ─── Article Type Badge ────────────────────────────────────────────────────────
const typeConfig: Record<ArticleType, { label: string; className: string }> = {
  'IN-DEPTH':  { label: 'IN-DEPTH',   className: 'bg-indigo-600 text-white' },
  'SCIENCE':   { label: 'SCIENCE',    className: 'bg-teal-600 text-white' },
  'REAL STORY':{ label: 'REAL STORY', className: 'bg-[#C52B21] text-white' },
  'GUIDE':     { label: 'GUIDE',      className: 'bg-amber-500 text-white' },
  'Q&A':       { label: 'Q&A',        className: 'bg-purple-600 text-white' },
  'EXCLUSIVE': { label: 'EXCLUSIVE',  className: 'bg-gray-950 text-white' },
};

const ArticleTypeBadge = ({ type }: { type?: ArticleType }) => {
  if (!type) return null;
  const cfg = typeConfig[type];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black tracking-[0.12em] uppercase ${cfg.className}`}>
      {cfg.label}
    </span>
  );
};

// ─── BlogCard Props ───────────────────────────────────────────────────────────
interface BlogCardProps {
  post: BlogPost;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent, id: number) => void;
  onShare?: (e: React.MouseEvent, title: string) => void;
}

// ─── Main BlogCard ────────────────────────────────────────────────────────────
const BlogCard = ({
  post,
  index = 0,
  isFavorite = false,
  onToggleFavorite,
  onShare,
}: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleQuickLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasLiked) {
      setHasLiked(true);
      setLocalLikes((p) => p + 1);
    } else {
      setHasLiked(false);
      setLocalLikes((p) => p - 1);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
        >
          {/* ── Image ── */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={post.image}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              alt={post.title}
            />

            {/* Gradient overlay — visible only on hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Top-left: Article type + trending */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <ArticleTypeBadge type={post.articleType} />
              {post.isTrending && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black tracking-[0.1em] bg-amber-400 text-white uppercase">
                  TRENDING
                </span>
              )}
            </div>

            {/* Top-right: Actions */}
            <div className={`absolute top-3 right-3 flex gap-1.5 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
              <button
                onClick={(e) => onToggleFavorite?.(e, post.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors shadow-sm ${
                  isFavorite ? 'bg-[#C52B21] text-white' : 'bg-black/30 text-white hover:bg-black/50'
                }`}
              >
                <Heart size={13} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={(e) => onShare?.(e, post.title)}
                className="w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/50 transition-colors shadow-sm"
              >
                <Share2 size={13} />
              </button>
            </div>

            {/* Bottom-right: view count */}
            <div className={`absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Eye size={9} /> {post.views}
            </div>
          </div>

          {/* ── Content ── */}
          <div className="p-5 flex flex-col flex-grow">

            {/* Category + Read time */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#C52B21] uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                  <Clock size={10} /> {post.readTime}
                </span>
              </div>
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <MessageCircle size={10} /> {post.comments}
              </span>
            </div>

            {/* Title */}
            <h3 className={`text-[15px] font-bold text-gray-900 leading-snug mb-2.5 line-clamp-2 transition-colors duration-200 ${isHovered ? 'text-[#C52B21]' : ''}`}>
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-400 rounded font-medium border border-gray-100 hover:bg-red-50 hover:text-[#C52B21] hover:border-red-100 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer: Author + CTA */}
            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {post.authorAvatar ? (
                    <img src={post.authorAvatar} alt={post.author} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-[8px] font-black text-[#C52B21]">
                      P
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-700 leading-none">{post.author}</div>
                  {post.authorTitle && (
                    <div className="text-[9px] text-gray-400 font-medium mt-0.5">{post.authorTitle}</div>
                  )}
                </div>
              </div>

              {/* Like + Read */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleQuickLike}
                  className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-[#C52B21] transition-colors"
                >
                  <motion.div
                    animate={{ scale: hasLiked ? [1, 1.5, 1] : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Heart size={12} fill={hasLiked ? '#C52B21' : 'none'} className={hasLiked ? 'text-[#C52B21]' : ''} />
                  </motion.div>
                  {localLikes}
                </button>

                <div className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${
                  isHovered ? 'bg-[#C52B21] text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
