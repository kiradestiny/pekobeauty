"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, Flame, Clock, ThumbsUp, SlidersHorizontal } from 'lucide-react';

export interface Category {
  name: string;
  count: number;
  emoji?: string;
}

interface BlogFilterBarProps {
  categories: Category[];
  activeTab: string;
  searchQuery: string;
  sortBy: string;
  onTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
  onClearAll: () => void;
  totalResults: number;
}

const sortOptions = [
  { value: 'latest', label: '最新發佈', icon: Clock },
  { value: 'popular', label: '最多瀏覽', icon: Flame },
  { value: 'likes', label: '最多好評', icon: ThumbsUp },
];

const BlogFilterBar = ({
  categories,
  activeTab,
  searchQuery,
  sortBy,
  onTabChange,
  onSearchChange,
  onSortChange,
  onClearAll,
  totalResults,
}: BlogFilterBarProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasActiveFilter = activeTab !== '全部' || searchQuery !== '';
  const activeSortOption = sortOptions.find((o) => o.value === sortBy) || sortOptions[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  return (
    <div className="sticky top-20 z-40 bg-white/97 backdrop-blur-2xl border-b border-gray-100 -mx-4 px-4 sm:mx-0 sm:px-0 pb-0 mb-14">
      {/* ── Row 1: Search + Sort ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center py-4">

        {/* Search Input */}
        <div className="relative flex-1 group">
          <Search
            size={15}
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
              isFocused ? 'text-[#C52B21]' : 'text-gray-300'
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="搜尋文章、療程或關鍵字..."
            className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:bg-white focus:border-gray-300 focus:ring-0 transition-all outline-none"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                onClick={() => { onSearchChange(''); inputRef.current?.focus(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors flex items-center justify-center"
              >
                <X size={11} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Sort Dropdown */}
        <div ref={sortRef} className="relative flex-shrink-0">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:border-gray-200 transition-all w-full sm:w-auto justify-between sm:justify-start"
          >
            <SlidersHorizontal size={14} className="text-gray-400" />
            <span className="text-xs">{activeSortOption.label}</span>
            <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} className="text-gray-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                {sortOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => { onSortChange(opt.value); setIsSortOpen(false); }}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                        sortBy === opt.value
                          ? 'bg-gray-50 text-gray-900 font-bold'
                          : 'text-gray-500 hover:bg-gray-50 font-medium'
                      }`}
                    >
                      <Icon size={14} className={sortBy === opt.value ? 'text-[#C52B21]' : 'text-gray-400'} />
                      {opt.label}
                      {sortBy === opt.value && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C52B21]" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Row 2: Category Tabs (media nav style) ── */}
      <div className="flex items-end gap-4 -mb-px">
        <div
          ref={scrollRef}
          className="flex items-end gap-0 overflow-x-auto no-scrollbar flex-1"
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.name;
            return (
              <button
                key={cat.name}
                data-active={isActive}
                onClick={() => onTabChange(cat.name)}
                className={`relative flex items-center gap-2 px-4 py-3 text-[13px] font-bold whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                  isActive
                    ? 'text-gray-900 border-[#C52B21]'
                    : 'text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-200'
                }`}
              >
                {cat.name}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-black transition-colors ${
                    isActive
                      ? 'bg-[#C52B21]/10 text-[#C52B21]'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results count + Clear */}
        <div className="flex items-center gap-3 pb-3 flex-shrink-0">
          {searchQuery && (
            <span className="text-xs text-gray-400 hidden sm:block">
              <strong className="text-gray-600">{totalResults}</strong> 篇
            </span>
          )}
          <AnimatePresence>
            {hasActiveFilter && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={onClearAll}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#C52B21] transition-colors font-medium"
              >
                <X size={11} />
                清除
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BlogFilterBar;
