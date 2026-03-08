"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';
import BlogCard from './BlogCard';
import BlogFeaturedPost from './BlogFeaturedPost';
import { BlogCardSkeleton, FeaturedSkeleton } from '@/components/blog/BlogSkeleton';
import type { BlogPost } from './blogTypes';

interface BlogGridProps {
  posts: BlogPost[];
  isLoading: boolean;
  showFeatured: boolean;
  favorites: number[];
  onToggleFavorite: (e: React.MouseEvent, id: number) => void;
  onShare: (e: React.MouseEvent, title: string) => void;
  onResetFilters: () => void;
}

// ─── Section Label ─────────────────────────────────────────────────────────── 
const SectionLabel = ({
  label,
  sub,
  delay = 0,
}: {
  label: string;
  sub?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-4 mb-8"
  >
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-black text-[#C52B21] tracking-[0.2em] uppercase">
        {label}
      </span>
      {sub && (
        <span className="text-[11px] text-gray-400 font-medium">{sub}</span>
      )}
    </div>
    <div className="flex-1 h-px bg-gray-100" />
    <BookOpen size={13} className="text-gray-200 flex-shrink-0" />
  </motion.div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-24 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50"
  >
    <div className="w-14 h-14 bg-white border border-gray-100 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-sm">
      <Search size={22} className="text-gray-300" />
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">找不到相關文章</h3>
    <p className="text-sm text-gray-400 mb-7 max-w-xs mx-auto leading-relaxed">
      嘗試其他關鍵字，或瀏覽全部分類的文章
    </p>
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onReset}
      className="px-7 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-[#C52B21] transition-colors shadow-sm"
    >
      重設搜尋
    </motion.button>
  </motion.div>
);

// ─── Main BlogGrid ─────────────────────────────────────────────────────────── 
const BlogGrid = ({
  posts,
  isLoading,
  showFeatured,
  favorites,
  onToggleFavorite,
  onShare,
  onResetFilters,
}: BlogGridProps) => {
  if (isLoading) {
    return (
      <>
        <FeaturedSkeleton />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  if (posts.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  const featuredPost = showFeatured ? posts[0] : null;
  const gridPosts = showFeatured ? posts.slice(1) : posts;

  return (
    <>
      {/* ── Cover Story / Featured ── */}
      <AnimatePresence mode="wait">
        {featuredPost && (
          <motion.div
            key={`featured-${featuredPost.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <BlogFeaturedPost post={featuredPost} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Grid Posts ── */}
      {gridPosts.length > 0 && (
        <>
          {/* Section header */}
          {showFeatured ? (
            <SectionLabel label="Latest Articles" sub="最新深度文章" />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-[10px] font-black text-gray-400 tracking-[0.15em] uppercase">
                共 {posts.length} 篇文章
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </motion.div>
          )}

          {/* 2-column card grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {gridPosts.map((post, idx) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={idx}
                  isFavorite={favorites.includes(post.id)}
                  onToggleFavorite={onToggleFavorite}
                  onShare={onShare}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* End of feed indicator */}
          {gridPosts.length >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">
                ─ End of Feed · {posts.length} Articles ─
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default BlogGrid;
