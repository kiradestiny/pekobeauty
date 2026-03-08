"use client";

import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import SkinQuiz from '@/components/SkinQuiz';
import OffersHero from './OffersHero';
import OffersFilterBar from './OffersFilterBar';
import OffersGrid from './OffersGrid';
import OffersConsultBanner from './OffersConsultBanner';
import OffersTrustSection from './OffersTrustSection';
import OffersFAQ from './OffersFAQ';
import { promotions } from './offersData';

// ─── Client Shell ─────────────────────────────────────────────────────────────
/**
 * Manages all interactive filter state for the offers page.
 *
 * State hierarchy:
 *   1. activeSeries  – 'all' | 'flagship' | 'hollywood-spectra'
 *   2. selectedConcern – string | null (concern tag)
 *
 * Both filters are applied together. The filtered list is passed to both
 * OffersFilterBar (for result counts) and OffersGrid (for rendering).
 */
export default function OffersClient() {
  const [activeSeries, setActiveSeries] = useState<string>('all');
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // ── Derived: all unique concern tags across ALL promotions ──
  const allConcerns = useMemo(() => {
    const set = new Set<string>();
    promotions.forEach(p => p.concerns.forEach(c => set.add(c)));
    return Array.from(set);
  }, []);

  // ── Derived: filtered list based on series + concern ──
  const filteredPromotions = useMemo(
    () =>
      promotions.filter(p => {
        const seriesMatch = activeSeries === 'all' || p.series === activeSeries;
        const concernMatch = !selectedConcern || p.concerns.includes(selectedConcern);
        return seriesMatch && concernMatch;
      }),
    [activeSeries, selectedConcern],
  );

  // ── Quiz result handler ──
  const handleQuizResult = (concern: string) => {
    // Reset series filter, apply concern
    setActiveSeries('all');
    setSelectedConcern(concern);
    setShowQuiz(false);
    // Defer scroll until grid has re-rendered
    setTimeout(() => {
      document.getElementById('offers-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // ── Series change: clear concern to avoid confusing zero-result states ──
  const handleSeriesChange = (series: string) => {
    setActiveSeries(series);
    setSelectedConcern(null);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen overflow-x-hidden">

      {/* ── Skin Quiz Modal ── */}
      <AnimatePresence>
        {showQuiz && (
          <SkinQuiz
            onClose={() => setShowQuiz(false)}
            promotions={promotions}
            onResult={handleQuizResult}
          />
        )}
      </AnimatePresence>

      {/* ── 1. Immersive Hero ── */}
      <OffersHero onOpenQuiz={() => setShowQuiz(true)} />

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

        {/* ── 2. Filter Bar (sticky) ── */}
        <OffersFilterBar
          activeSeries={activeSeries}
          setActiveSeries={handleSeriesChange}
          selectedConcern={selectedConcern}
          setSelectedConcern={setSelectedConcern}
          allConcerns={allConcerns}
          resultCount={filteredPromotions.length}
        />

        {/* ── 3. Offers Grid ── */}
        <OffersGrid
          promotions={filteredPromotions}
          activeSeries={activeSeries}
        />

        {/* ── 4. Consult Banner ── */}
        <OffersConsultBanner />

        {/* ── 5. Trust Section ── */}
        <OffersTrustSection />

        {/* ── 6. FAQ ── */}
        <OffersFAQ />

        {/* ── 7. Footer Note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pb-20 text-center"
        >
          <p className="text-gray-400 text-xs mb-5 italic">
            * 優惠僅適用於 Peko Beauty 新客戶 · 需提前預約 · 最終解釋權歸本中心所有
          </p>
          <motion.a
            href="/treatments"
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 border-b-2 border-gray-800 pb-0.5 hover:text-[#C52B21] hover:border-[#C52B21] transition-colors"
          >
            查看更多療程詳情
            <ArrowRight size={14} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
