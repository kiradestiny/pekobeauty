"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, Crown, Sparkles } from 'lucide-react';
import { Promotion, SERIES_CONFIG } from './offersData';
import OffersCard from './OffersCard';

// ─── Types ────────────────────────────────────────────────────────────────────
interface OffersGridProps {
  promotions: Promotion[];
  activeSeries: string;
}

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <motion.div
    key="empty"
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.92 }}
    className="flex flex-col items-center justify-center py-24 text-center"
    role="status"
    aria-live="polite"
  >
    <motion.div
      animate={{ rotate: [0, -10, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      className="mb-5 text-gray-200"
      aria-hidden="true"
    >
      <SearchX size={52} />
    </motion.div>
    <h3 className="text-lg font-bold text-gray-400 mb-2">找不到符合條件的療程</h3>
    <p className="text-sm text-gray-300 max-w-xs">請嘗試調整篩選條件，或清除膚質問題選項</p>
  </motion.div>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({
  series,
  count,
}: {
  series: 'flagship' | 'hollywood-spectra';
  count: number;
}) => {
  const cfg = SERIES_CONFIG[series];
  const isFlagship = series === 'flagship';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="flex items-center gap-4 mb-6"
    >
      {/* Colour bar */}
      <div
        className="w-1 h-10 rounded-full shrink-0"
        style={{ background: `linear-gradient(180deg, ${cfg.color}, ${cfg.color}55)` }}
        aria-hidden="true"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Series icon */}
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0"
            style={{ backgroundColor: `${cfg.color}15` }}
            aria-hidden="true"
          >
            {isFlagship ? (
              <Crown size={12} style={{ color: cfg.color }} />
            ) : (
              <Sparkles size={12} style={{ color: cfg.color }} />
            )}
          </span>

          <h2 className="text-xl font-black text-gray-900 leading-none">{cfg.label}</h2>

          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${cfg.color}12`, color: cfg.color }}
          >
            {count} 個療程
          </span>
        </div>

        {/* Sub-label */}
        <p className="text-xs text-gray-400 mt-1">
          {isFlagship
            ? '醫院級別儀器，原廠探頭即場開封，效果有臨床數據支持'
            : '5合1納秒激光系統，針對不同皮膚問題精準施治'}
        </p>
      </div>

      {/* Divider line */}
      <div
        className="hidden sm:block flex-1 h-px opacity-20"
        style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent)` }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

// ─── Cards Grid ───────────────────────────────────────────────────────────────
const CardsGrid = ({
  promotions,
  indexOffset = 0,
}: {
  promotions: Promotion[];
  indexOffset?: number;
}) => (
  <motion.div
    layout
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
  >
    <AnimatePresence mode="popLayout">
      {promotions.map((offer, idx) => (
        <OffersCard key={offer.id} offer={offer} index={indexOffset + idx} />
      ))}
    </AnimatePresence>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OffersGrid({ promotions, activeSeries }: OffersGridProps) {
  /** Split promotions into their two series buckets */
  const flagshipPromos = promotions.filter(p => p.series === 'flagship');
  const hollywoodPromos = promotions.filter(p => p.series === 'hollywood-spectra');

  const isEmpty = promotions.length === 0;
  /** Show two distinct sections only when viewing "all" */
  const showBothSections = activeSeries === 'all' && !isEmpty;
  const showSingleSection = activeSeries !== 'all' && !isEmpty;

  return (
    <section
      id="offers-grid"
      className="mb-20"
      aria-label="優惠療程列表"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {isEmpty ? (
          <EmptyState key="empty" />
        ) : showBothSections ? (
          <motion.div
            key="both-sections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-14"
          >
            {/* ── Flagship Section ── */}
            {flagshipPromos.length > 0 && (
              <div>
                <SectionHeader series="flagship" count={flagshipPromos.length} />
                <CardsGrid promotions={flagshipPromos} indexOffset={0} />
              </div>
            )}

            {/* ── Hollywood Spectra Section ── */}
            {hollywoodPromos.length > 0 && (
              <div>
                {/* Decorative divider */}
                <div
                  className="flex items-center gap-3 mb-8"
                  aria-hidden="true"
                >
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-100 bg-white text-[10px] text-gray-400 font-medium">
                    <Sparkles size={10} className="text-orange-400" />
                    5-in-1 激光系列
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>

                <SectionHeader series="hollywood-spectra" count={hollywoodPromos.length} />
                <CardsGrid promotions={hollywoodPromos} indexOffset={flagshipPromos.length} />
              </div>
            )}
          </motion.div>
        ) : showSingleSection ? (
          <motion.div
            key="single-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Show section header only if the series is explicit */}
            {activeSeries === 'flagship' && flagshipPromos.length > 0 && (
              <div className="mb-6">
                <SectionHeader series="flagship" count={flagshipPromos.length} />
              </div>
            )}
            {activeSeries === 'hollywood-spectra' && hollywoodPromos.length > 0 && (
              <div className="mb-6">
                <SectionHeader series="hollywood-spectra" count={hollywoodPromos.length} />
              </div>
            )}
            <CardsGrid promotions={promotions} indexOffset={0} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
