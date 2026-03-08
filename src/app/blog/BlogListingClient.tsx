"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ReadingProgress, BackToTop, CursorSpotlight } from '@/components/blog/BlogInteractions';
import BlogHero from './components/BlogHero';
import BlogFilterBar from './components/BlogFilterBar';
import BlogGrid from './components/BlogGrid';
import BlogSidebar from './components/BlogSidebar';
import BlogCTA from './components/BlogCTA';
import type { BlogPost, Category } from './components/blogTypes';

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories: Category[] = [
  { name: '全部', count: 5 },
  { name: '皮膚科技', count: 2 },
  { name: '私密護理', count: 1 },
  { name: '美學百科', count: 1 },
  { name: '真實個案', count: 1 },
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'sylfirm-x-guide',
    title: '【2025 凹凸洞攻略】Sylfirm X 矽谷電波：為何它能成為修復界的新寵？',
    excerpt: '傳統激光往往伴隨長恢復期，Sylfirm X 透過專利雙波技術，在不傷害表皮的情況下修復基底膜，徹底改變凹凸洞療程的遊戲規則。',
    category: '皮膚科技',
    date: '2025-12-15',
    author: 'Peko 編輯部',
    authorAvatar: 'https://i.pravatar.cc/150?u=peko1',
    authorTitle: '資深美學編輯',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800',
    isTrending: true,
    views: '1.2k',
    likes: 85,
    comments: 12,
    tags: ['凹凸洞', 'Sylfirm X', '矽谷電波'],
    articleType: 'IN-DEPTH',
  },
  {
    id: 2,
    slug: 'intimate-care-faq',
    title: '難以啟齒的困擾？三分鐘了解女性私密修復 360 的安全性與成效。',
    excerpt: '產後尿滲或乾澀不只是身體的變化，更是生活品質的挑戰。我們以全女班團隊，為您解構私密護理的每一個細節。',
    category: '私密護理',
    date: '2025-12-10',
    author: 'Dr. Chan',
    authorAvatar: 'https://i.pravatar.cc/150?u=peko2',
    authorTitle: '婦科美學顧問',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800',
    isTrending: false,
    views: '850',
    likes: 42,
    comments: 5,
    tags: ['私密護理', '女性健康'],
    articleType: 'Q&A',
  },
  {
    id: 3,
    slug: 'visia-skin-analysis',
    title: '肉眼看不見的危機？VISIA 智能皮膚分析如何預測你 5 年後的肌膚狀態。',
    excerpt: '為什麼每天勤力護膚，皮膚依然暗淡無光？VISIA 透過 8 大維度深度掃描，揭示隱藏在表皮下的色素與受損細胞，讓護膚從猜測變成科學。',
    category: '美學百科',
    date: '2025-12-05',
    author: 'Peko 編輯部',
    authorAvatar: 'https://i.pravatar.cc/150?u=peko3',
    authorTitle: '皮膚科技編輯',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800',
    isTrending: true,
    views: '2.1k',
    likes: 156,
    comments: 28,
    tags: ['VISIA', '皮膚分析'],
    articleType: 'SCIENCE',
  },
  {
    id: 4,
    slug: 'collagen-boost-2025',
    title: '膠原蛋白流失怎麼辦？2025 最新增生技術全解析：從超聲波到電波。',
    excerpt: '過了 25 歲，膠原蛋白每年以 1% 的速度流失。我們將對比 Thermage FLX 與最新一代超聲波技術，助您找到最適合的療程。',
    category: '皮膚科技',
    date: '2025-11-28',
    author: 'Peko 編輯部',
    authorAvatar: 'https://i.pravatar.cc/150?u=peko4',
    authorTitle: '科技美容研究員',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1570172619380-2126ad04840b?q=80&w=800',
    isTrending: false,
    views: '1.5k',
    likes: 94,
    comments: 15,
    tags: ['膠原蛋白', 'Thermage'],
    articleType: 'GUIDE',
  },
  {
    id: 5,
    slug: 'real-case-pigmentation',
    title: '【真實個案】告別 10 年荷爾蒙斑：Sylfirm X 配合皮秒激光的雙重打擊。',
    excerpt: '陳小姐曾嘗試多種去斑療程效果均不理想，甚至出現反黑。看 Peko 如何透過複合治療方案，在 3 個療程後達到顯著效果。',
    category: '真實個案',
    date: '2025-11-20',
    author: 'Sarah Wong',
    authorAvatar: 'https://i.pravatar.cc/150?u=peko5',
    authorTitle: '真實個案撰稿人',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800',
    isTrending: false,
    views: '3.2k',
    likes: 210,
    comments: 45,
    tags: ['荷爾蒙斑', '皮秒激光'],
    articleType: 'REAL STORY',
  },
];

// ─── Page Component ───────────────────────────────────────────────────────────
export default function BlogListingClient() {
  const [activeTab, setActiveTab] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filtered & sorted posts
  const filteredPosts = useMemo(() => {
    let posts = blogPosts.filter((post) => {
      const matchesTab =
        activeTab === '全部' ||
        post.category === activeTab ||
        post.tags.includes(activeTab);
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTab && matchesSearch;
    });

    if (sortBy === 'popular') {
      posts = [...posts].sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
    } else if (sortBy === 'likes') {
      posts = [...posts].sort((a, b) => b.likes - a.likes);
    } else {
      posts = [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return posts;
  }, [activeTab, searchQuery, sortBy]);

  const trendingPosts = useMemo(() => blogPosts.filter((p) => p.isTrending), []);

  // Show featured only when no filter is active
  const showFeatured = activeTab === '全部' && searchQuery === '';

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleShare = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  const handleClearAll = () => {
    setActiveTab('全部');
    setSearchQuery('');
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden pt-20">
      {/* Global interactions */}
      <ReadingProgress />
      <BackToTop />
      <CursorSpotlight />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* ── Editorial Masthead / Hero ── */}
        <BlogHero />

        {/* ── Filter Bar (sticky) ── */}
        <BlogFilterBar
          categories={categories}
          activeTab={activeTab}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onTabChange={setActiveTab}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onClearAll={handleClearAll}
          totalResults={filteredPosts.length}
        />

        {/* ── Main Layout: Content + Sidebar ── */}
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14">

          {/* Main content area (8 cols) */}
          <div className="lg:col-span-8">
            <BlogGrid
              posts={filteredPosts}
              isLoading={isLoading}
              showFeatured={showFeatured}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onShare={handleShare}
              onResetFilters={handleClearAll}
            />
          </div>

          {/* Sidebar (4 cols) */}
          <BlogSidebar
            trendingPosts={trendingPosts}
            isLoading={isLoading}
            activeTag={activeTab}
            onTagClick={setActiveTab}
          />
        </div>

        {/* ── Bottom Editorial CTA ── */}
        <BlogCTA />

      </div>
    </div>
  );
}
