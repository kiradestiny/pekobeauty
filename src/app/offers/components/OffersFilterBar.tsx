"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Grid3X3, Target, X, ChevronDown } from 'lucide-react';
import { BRAND_RED, HOLLYWOOD_ORANGE } from './offersData';

// ─── Config ───────────────────────────────────────────────────────────────────
const VISIBLE_CONCERNS_LIMIT = 10;

/** Series tab definition */
const SERIES_TABS = [
  {
    id: 'all',
    label: '全部療程',
    labelShort: '全部',
    icon: Grid3X3,
    color: '#374151',
    activeBg: 'linear-gradient(135deg, #1a1a1a, #333)',
  },
  {
    id: 'flagship',
    label: '皇牌儀器系列',
    labelShort: '皇牌儀器',
    icon: Crown,
    color: BRAND_RED,
    activeBg: `linear-gradient(135deg, ${BRAND_RED}, #8B0000)`,
  },
  {
    id: 'hollywood-spectra',
    label: 'Hollywood Spectra™',
    labelShort: 'Hollywood',
    icon: Sparkles,
    color: HOLLYWOOD_ORANGE,
    activeBg: `linear-gradient(135deg, ${HOLLYWOOD_ORANGE}, #7C3B0D)`,
  },
] as const;

// ─── Props ───────────────────────────────────────────────────────────────────
interface OffersFilterBarProps {
  activeSeries: string;
  setActiveSeries: (s: string) => void;
  selectedConcern: string | null;
  setSelectedConcern: (c: string | null) => void;
  allConcerns: string[];
  resultCount: number;
}

// ─── Series Tab ───────────────────────────────────────────────────────────────
const SeriesTab = ({
  tab,
  active,
  onClick,
}: {
  tab: typeof SERIES_TABS[number];
  active: boolean;
  onClick: () => void;
}) => {
  const Icon = tab.icon;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={active}
      aria-label={`篩選系列：${tab.label}`}
      className={`
        relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
        transition-colors duration-200 overflow-hidden
        ${active ? 'text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}
      `}
    >
      {/* Active background */}
      {active && (
        <motion.span
          layoutId="activeSeriesBg"
          className="absolute inset-0 rounded-xl"
          style={{ background: tab.activeBg }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        />
      )}
      <Icon
        size={13}
        aria-hidden="true"
        className="relative z-10 shrink-0"
        style={active ? {} : { color: tab.color }}
      />
      {/* Responsive label */}
      <span className="relative z-10 hidden sm:inline">{tab.label}</span>
      <span className="relative z-10 sm:hidden">{tab.labelShort}</span>
    </motion.button>
  );
};

// ─── Concern Tag ──────────────────────────────────────────────────────────────
const ConcernTag = ({
  label,
  active,
  activeColor,
  onClick,
}: {
  label: string;
  active: boolean;
  activeColor: string;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-pressed={active}
    aria-label={`篩選皮膚問題：${label}`}
    className={`relative px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 ${
      active
        ? 'text-white shadow-md'
        : 'bg-gray-50 text-gray-500 border border-transparent hover:border-gray-200 hover:bg-white'
    }`}
  >
    {active && (
      <motion.span
        layoutId={`activeConcern-${label}`}
        className="absolute inset-0 rounded-lg"
        style={{ backgroundColor: activeColor }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    )}
    <span className="relative z-10">{label}</span>
  </motion.button>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OffersFilterBar({
  activeSeries,
  setActiveSeries,
  selectedConcern,
  setSelectedConcern,
  allConcerns,
  resultCount,
}: OffersFilterBarProps) {
  const [concernsExpanded, setConcernsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleConcerns = concernsExpanded
    ? allConcerns
    : allConcerns.slice(0, VISIBLE_CONCERNS_LIMIT);
  const hiddenCount = allConcerns.length - VISIBLE_CONCERNS_LIMIT;
  const hasActiveFilter = activeSeries !== 'all' || selectedConcern !== null;

  /** Derive accent color for concern tags based on active series */
  const concernActiveColor =
    activeSeries === 'flagship'
      ? BRAND_RED
      : activeSeries === 'hollywood-spectra'
        ? HOLLYWOOD_ORANGE
        : '#374151';

  const clearFilters = () => {
    setActiveSeries('all');
    setSelectedConcern(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="sticky top-0 z-30 mb-10 py-3 bg-[#FAFAFA]"
      role="search"
      aria-label="療程篩選器"
    >
      {/* ── Layer 1: Series Tabs ── */}
      <div
        className="flex flex-wrap gap-2 mb-4"
        role="group"
        aria-label="按系列篩選"
      >
        {SERIES_TABS.map(tab => (
          <SeriesTab
            key={tab.id}
            tab={tab}
            active={activeSeries === tab.id}
            onClick={() => setActiveSeries(tab.id)}
          />
        ))}

        {/* Result count + clear button on same row */}
        <div className="ml-auto flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={resultCount}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-xs text-gray-400"
              aria-live="polite"
              aria-atomic="true"
            >
              找到{' '}
              <span className="font-bold text-gray-600">{resultCount}</span>{' '}
              個療程
            </motion.span>
          </AnimatePresence>

          <AnimatePresence>
            {hasActiveFilter && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearFilters}
                aria-label="清除所有篩選條件"
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
              >
                <X size={11} aria-hidden="true" />
                清除
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Layer 2: Skin Concern Filter Panel ── */}
      <motion.div
        layout
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="px-4 py-3 md:px-5 md:py-4">
          {/* Header row */}
          <div className="flex items-center gap-2 mb-3">
            <Target
              size={13}
              aria-hidden="true"
              style={{ color: concernActiveColor }}
              className="shrink-0 transition-colors duration-200"
            />
            <span className="text-[12px] font-bold text-gray-800">按您的皮膚問題篩選：</span>
          </div>

          {/* Tags row (horizontal scroll on mobile) */}
          <div
            ref={scrollRef}
            className="flex flex-wrap gap-1.5"
            role="group"
            aria-label="按皮膚問題篩選"
          >
            {/* All reset */}
            <ConcernTag
              label="全部問題"
              active={selectedConcern === null}
              activeColor={concernActiveColor}
              onClick={() => setSelectedConcern(null)}
            />

            {visibleConcerns.map(concern => (
              <ConcernTag
                key={concern}
                label={concern}
                active={selectedConcern === concern}
                activeColor={concernActiveColor}
                onClick={() =>
                  setSelectedConcern(selectedConcern === concern ? null : concern)
                }
              />
            ))}

            {/* Expand / collapse */}
            {allConcerns.length > VISIBLE_CONCERNS_LIMIT && (
              <motion.button
                onClick={() => setConcernsExpanded(v => !v)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-expanded={concernsExpanded}
                aria-label={
                  concernsExpanded
                    ? '收起皮膚問題篩選'
                    : `展開更多（還有 ${hiddenCount} 個）`
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] text-gray-400 hover:text-gray-600 border border-dashed border-gray-200 hover:border-gray-300 transition-all"
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: concernsExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={11} />
                </motion.span>
                {concernsExpanded ? '收起' : `更多 +${hiddenCount}`}
              </motion.button>
            )}
          </div>
        </div>

        {/* Active filter indicator strip */}
        <AnimatePresence>
          {hasActiveFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div
                className="px-4 md:px-5 py-2.5 border-t border-gray-50 flex items-center gap-2 flex-wrap text-[11px]"
                style={{ backgroundColor: `${concernActiveColor}08` }}
              >
                <Target size={10} aria-hidden="true" style={{ color: concernActiveColor }} />
                <span className="text-gray-500">目前篩選：</span>

                {activeSeries !== 'all' && (
                  <span
                    className="font-bold px-1.5 py-0.5 rounded"
                    style={{
                      color: concernActiveColor,
                      backgroundColor: `${concernActiveColor}15`,
                    }}
                  >
                    {SERIES_TABS.find(t => t.id === activeSeries)?.label ?? activeSeries}
                  </span>
                )}

                {selectedConcern && (
                  <span
                    className="font-bold px-1.5 py-0.5 rounded"
                    style={{
                      color: concernActiveColor,
                      backgroundColor: `${concernActiveColor}15`,
                    }}
                  >
                    #{selectedConcern}
                  </span>
                )}

                <button
                  onClick={clearFilters}
                  aria-label="清除所有篩選"
                  className="ml-auto flex items-center gap-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={10} aria-hidden="true" />
                  清除
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
