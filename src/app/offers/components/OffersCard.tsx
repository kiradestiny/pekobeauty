"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  Users,
  CheckCircle2,
  MessageCircle,
  Clock,
  ChevronRight,
  Flame,
  Cpu,
  Zap,
} from 'lucide-react';
import { Promotion, SERIES_CONFIG } from './offersData';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const parsePrice = (price: string): number => {
  const n = parseInt(price.replace(/[,\s]/g, ''), 10);
  return isNaN(n) ? 0 : n;
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5" aria-hidden="true">
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        size={12}
        className={
          i <= Math.round(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }
      />
    ))}
  </div>
);

const DiscountBadge = ({
  original,
  trial,
  accentColor,
}: {
  original: string;
  trial: string;
  accentColor: string;
}) => {
  const orig = parsePrice(original);
  const tri = parsePrice(trial);
  if (orig === 0 || tri >= orig) return null;
  const pct = Math.round(((orig - tri) / orig) * 100);
  return (
    <motion.div
      initial={{ scale: 0, rotate: -12 }}
      animate={{ scale: 1, rotate: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
      className="absolute top-3 right-3 z-20 w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-xl text-white font-black text-center pointer-events-none"
      style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}
      aria-label={`優惠 ${pct}% off`}
    >
      <span className="text-[10px] leading-none">省</span>
      <span className="text-base leading-none">{pct}%</span>
    </motion.div>
  );
};

// ─── Main Card ────────────────────────────────────────────────────────────────
interface OffersCardProps {
  offer: Promotion;
  index: number;
}

export default function OffersCard({ offer, index }: OffersCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const seriesCfg = SERIES_CONFIG[offer.series];
  const accentColor = seriesCfg.color;

  const waMessage = encodeURIComponent(`Hi Peko，我想查詢 ${offer.title} 試做優惠（HK$${offer.trialPrice}），請問有咩時間？`);
  const waHref = `https://wa.me/85253353313?text=${waMessage}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
      style={{ borderTop: `4px solid ${accentColor}` }}
      aria-label={`${offer.title} — 試做優惠 HK$${offer.trialPrice}`}
    >
      {/* ── Image Area ── */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 shrink-0">
        {/* Skeleton */}
        {!imageLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
          />
        )}

        {/* Image with hover zoom */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Image
            src={offer.image}
            alt={`${offer.title} 療程`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.35s ease' }}
          />
        </motion.div>

        {/* Dark gradient for legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"
        />

        {/* Discount badge */}
        <DiscountBadge
          original={offer.originalPrice}
          trial={offer.trialPrice}
          accentColor={accentColor}
        />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {/* Category tag */}
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-black text-white shadow-md leading-none"
            style={{ backgroundColor: offer.tagColor ?? accentColor }}
          >
            {offer.tag}
          </span>

          {/* HOT badge */}
          {offer.popular && (
            <motion.span
              animate={{ scale: [1, 1.09, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}
              className="inline-flex items-center gap-1 bg-[#C52B21] text-white px-2.5 py-1 rounded-full text-[11px] font-black w-fit shadow-md"
            >
              <Flame size={10} aria-hidden="true" />
              HOT
            </motion.span>
          )}
        </div>

        {/* Bottom overlay: rating left, duration right */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 pointer-events-none">
          {offer.rating && (
            <div className="bg-black/55 backdrop-blur-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
              <StarRating rating={offer.rating} />
              <span className="text-xs text-white font-semibold leading-none">
                {offer.rating} ({offer.reviewCount}+)
              </span>
            </div>
          )}

          {offer.duration && (
            <div className="ml-auto bg-black/45 backdrop-blur-sm border border-white/20 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
              <Clock size={12} aria-hidden="true" className="text-white/80" />
              <span className="text-xs text-white/90 font-medium">{offer.duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="flex flex-col flex-1 p-5 gap-0">

        {/* Title + subtitle */}
        <div className="mb-3">
          <h3 className="text-lg font-black text-gray-900 leading-snug">{offer.title}</h3>
          <p
            className="text-sm font-semibold mt-1 leading-tight"
            style={{ color: accentColor }}
          >
            {offer.subtitle}
          </p>
        </div>

        {/* Core Tech chip */}
        <div className="flex items-center gap-2 mb-3">
          <Cpu size={13} aria-hidden="true" className="text-gray-400 shrink-0" />
          <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded border border-gray-100 leading-tight line-clamp-1">
            {offer.coreTech}
          </span>
        </div>

        {/* USP banner — always visible, key selling point */}
        <div
          className="flex items-start gap-2 rounded-lg px-3 py-2.5 mb-3 border"
          style={{
            backgroundColor: `${accentColor}0D`,
            borderColor: `${accentColor}30`,
          }}
        >
          <Zap size={13} aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: accentColor }} />
          <p className="text-xs text-gray-700 leading-relaxed font-medium">{offer.usp}</p>
        </div>

        {/* Concern tags */}
        <div className="flex flex-wrap gap-1.5 mb-3" aria-label="適合皮膚問題">
          {offer.concerns.slice(0, 4).map(c => (
            <span
              key={c}
              className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100 leading-tight font-medium"
            >
              #{c}
            </span>
          ))}
          {offer.concerns.length > 4 && (
            <span className="text-xs text-gray-400 leading-tight self-center">
              +{offer.concerns.length - 4}
            </span>
          )}
        </div>

        {/* Highlights */}
        {offer.highlights && offer.highlights.length > 0 && (
          <ul className="space-y-2 mb-3" aria-label="療程亮點">
            {offer.highlights.slice(0, 3).map(h => (
              <li key={h} className="flex items-start gap-2 text-sm text-gray-600 leading-snug">
                <CheckCircle2
                  size={14}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                  style={{ color: accentColor }}
                />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Social proof */}
        {offer.bookingsThisMonth && (
          <motion.div
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.8, repeat: Infinity }}
            className="flex items-center gap-2 text-xs text-gray-600 bg-orange-50 border border-orange-100 px-3 py-2 rounded-lg mb-3"
          >
            <Users size={13} aria-hidden="true" className="text-orange-400 shrink-0" />
            本月已有{' '}
            <span className="font-black text-gray-800">{offer.bookingsThisMonth}+</span>{' '}
            人預約此療程
          </motion.div>
        )}

        {/* Trust items — pushed to bottom */}
        <div className="space-y-1.5 mt-auto mb-0">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 size={12} aria-hidden="true" style={{ color: accentColor }} />
            包含 VISIA 深度皮膚報告
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 size={12} aria-hidden="true" style={{ color: accentColor }} />
            承諾絕無 Hard Sell
          </div>
        </div>

        {/* ── Price + CTA ── */}
        <div className="border-t border-gray-100 pt-4 mt-4">
          {/* Price Row */}
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-xs text-gray-400 line-through leading-none mb-1">
                原價 HK${offer.originalPrice}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-extrabold" style={{ color: accentColor }}>
                  HK$
                </span>
                <motion.span
                  key={offer.trialPrice}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-black text-gray-900 leading-none"
                >
                  {offer.trialPrice}
                </motion.span>
              </div>
              <div className="text-xs text-gray-500 mt-1 font-medium">新客試做優惠</div>
            </div>
          </div>

          {/* WhatsApp CTA — Full Width */}
          <motion.a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`WhatsApp 預約 ${offer.title}`}
            className="relative w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-white text-sm font-bold overflow-hidden shadow-md mb-2"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
            }}
          >
            {/* Shimmer sweep */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            />
            <MessageCircle size={15} aria-hidden="true" className="relative z-10 shrink-0" />
            <span className="relative z-10 whitespace-nowrap">💬 WhatsApp 預約試做</span>
          </motion.a>

          {/* Detail link — Visible Secondary Button */}
          <Link
            href={offer.link}
            aria-label={`了解 ${offer.title} 詳情`}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
          >
            查看療程詳情
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
