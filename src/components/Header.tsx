"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Target,
  Heart,
  Zap,
  Instagram,
  Facebook,
  MapPin,
  Calendar,
  Droplets,
  ShieldCheck,
  Layers,
  Focus,
  Activity,
  X,
  Eye,
  Sun,
  Flame,
  Star,
  LayoutGrid,
  Shield,
  Crown,
  ChevronRight,
  Scan,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  hot?: boolean;
  isNew?: boolean;
}

interface MenuSection {
  title: string;
  accentColor: string;
  items: MenuItem[];
}

// ─── Menu Data ────────────────────────────────────────────────────────────────
const BRAND_RED = '#C52B21';
const HOLLYWOOD_ORANGE = '#C75E1A';

const megaMenuSections: {
  flagship: MenuSection;
  hollywood: MenuSection;
  concerns: MenuSection;
} = {
  flagship: {
    title: '皇牌儀器系列',
    accentColor: BRAND_RED,
    items: [
      {
        name: 'Sylfirm X 矽谷電波',
        href: '/treatments/sylfirm-x',
        icon: <Zap size={14} />,
        color: 'bg-amber-50 text-amber-600',
        hot: true,
      },
      {
        name: 'BTL Exion™ 面+眼+頸',
        href: '/treatments/btl-exion',
        icon: <Activity size={14} />,
        color: 'bg-rose-50 text-rose-600',
        hot: true,
      },
      {
        name: 'BTL Exion™ 黃金微針',
        href: '/treatments/btl-exion-microneedle',
        icon: <Layers size={14} />,
        color: 'bg-yellow-50 text-yellow-700',
      },
      {
        name: 'BTL Exion™ Body',
        href: '/treatments/btl-exion-body',
        icon: <Shield size={14} />,
        color: 'bg-green-50 text-green-600',
      },
      {
        name: 'BTL Exion™ 眼部',
        href: '/treatments/btl-exion-eye',
        icon: <Eye size={14} />,
        color: 'bg-violet-50 text-violet-600',
      },
      {
        name: 'XE LHA Peel 玻璃肌',
        href: '/treatments/xe-lha-peel',
        icon: <Sparkles size={14} />,
        color: 'bg-blue-50 text-blue-600',
        isNew: true,
      },
      {
        name: 'Ulfit HIFU 緊緻拉提',
        href: '/treatments/ulfit-hifu',
        icon: <Focus size={14} />,
        color: 'bg-indigo-50 text-indigo-600',
      },
      {
        name: 'Venus Glow™ 水漾活膚',
        href: '/treatments/venus-glow',
        icon: <Droplets size={14} />,
        color: 'bg-cyan-50 text-cyan-600',
      },
      {
        name: 'BTL EMfemme 360',
        href: '/treatments/btl-emfemme-360',
        icon: <Heart size={14} />,
        color: 'bg-pink-50 text-pink-600',
        hot: true,
      },
      {
        name: 'DEP 無針水光',
        href: '/treatments/dep-mesotherapy',
        icon: <Droplets size={14} />,
        color: 'bg-blue-50 text-blue-600',
      },
      {
        name: 'VISIA 皮膚深層分析',
        href: '/treatments/visia-skin-analysis',
        icon: <Scan size={14} />,
        color: 'bg-violet-50 text-violet-600',
        isNew: true,
      },
    ],
  },
  hollywood: {
    title: 'Hollywood Spectra™',
    accentColor: HOLLYWOOD_ORANGE,
    items: [
      {
        name: 'Laser Facial 美白嫩膚',
        href: '/treatments/hollywood-spectra-laser',
        icon: <Sun size={14} />,
        color: 'bg-yellow-50 text-yellow-600',
      },
      {
        name: '蜂巢無創膠原',
        href: '/treatments/hollywood-spectra-laser',
        icon: <LayoutGrid size={14} />,
        color: 'bg-orange-50 text-orange-600',
      },
      {
        name: 'Carbon Peel 控油',
        href: '/treatments/hollywood-spectra-laser',
        icon: <Flame size={14} />,
        color: 'bg-gray-100 text-gray-600',
      },
      {
        name: 'Golden Laser 消紅印',
        href: '/treatments/hollywood-spectra-laser',
        icon: <Star size={14} />,
        color: 'bg-amber-50 text-amber-600',
      },
      {
        name: '色斑針對治療',
        href: '/treatments/hollywood-spectra-laser',
        icon: <Target size={14} />,
        color: 'bg-purple-50 text-purple-600',
      },
    ],
  },
  concerns: {
    title: '肌膚困擾',
    accentColor: '#374151',
    items: [
      {
        name: '凹凸洞 / 皺紋',
        href: '/concerns/pores-wrinkles',
        icon: <Layers size={14} />,
        color: 'bg-orange-50 text-orange-600',
      },
      {
        name: '色斑 / 荷爾蒙斑',
        href: '/concerns/pigmentation',
        icon: <Focus size={14} />,
        color: 'bg-purple-50 text-purple-600',
      },
      {
        name: '蘋果肌下垂',
        href: '/concerns/sagging',
        icon: <Activity size={14} />,
        color: 'bg-red-50 text-red-600',
      },
      {
        name: '暗瘡印 / 毛孔',
        href: '/concerns/acne-scars',
        icon: <Target size={14} />,
        color: 'bg-emerald-50 text-emerald-600',
      },
      {
        name: '泛紅 / 玫瑰痤瘡',
        href: '/concerns/redness',
        icon: <ShieldCheck size={14} />,
        color: 'bg-green-50 text-green-600',
      },
      {
        name: '黑眼圈 / 眼袋',
        href: '/concerns/eye-dark-circles',
        icon: <Eye size={14} />,
        color: 'bg-indigo-50 text-indigo-600',
      },
      {
        name: '瘦身修形',
        href: '/concerns/body-slimming',
        icon: <Zap size={14} />,
        color: 'bg-teal-50 text-teal-600',
      },
      {
        name: '私密健康護理',
        href: '/concerns/intimate-care',
        icon: <Heart size={14} />,
        color: 'bg-pink-50 text-pink-600',
      },
    ],
  },
};

/** Mobile treatment tab keys — concerns get their own dedicated strip */
type MobileTab = 'flagship' | 'hollywood';

// ─── Component ────────────────────────────────────────────────────────────────
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('flagship');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: '首頁', href: '/' },
    { name: '醫美療程', href: '/treatments', isMega: true },
    { name: '品牌理念', href: '/about' },
    { name: '最新優惠', href: '/offers' },
    { name: '醫美專欄', href: '/blog' },
    { name: '聯絡我們', href: '/contact' },
  ];

  /** Secondary nav links shown in compact grid (excludes 首頁 & 醫美療程 which appear as tabs) */
  const secondaryLinks = [
    { name: '品牌理念', href: '/about' },
    { name: '最新優惠', href: '/offers' },
    { name: '醫美專欄', href: '/blog' },
    { name: '聯絡我們', href: '/contact' },
    { name: '預約查詢', href: '/booking' },
  ];

  const menuVariants: Variants = {
    closed: { opacity: 0, scale: 1.05, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.04, delayChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 24, filter: 'blur(8px)' },
    open: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  };

  const mobileTabConfig: { key: MobileTab; label: string; icon: React.ReactNode; accent: string }[] = [
    { key: 'flagship', label: '皇牌儀器', icon: <Crown size={12} />, accent: BRAND_RED },
    { key: 'hollywood', label: 'Hollywood Spectra™', icon: <Sparkles size={12} />, accent: HOLLYWOOD_ORANGE },
  ];

  const activeMobileSection = megaMenuSections[mobileTab];

  return (
    <>
      {/* ── Desktop/Tablet Header ── */}
      <header
        className={`fixed w-full z-[150] transition-all duration-700 ease-in-out border-b ${
          scrolled || isOpen
            ? 'bg-white/70 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_1px_20px_rgba(0,0,0,0.06)] py-0 border-white/40'
            : 'bg-white/55 backdrop-blur-lg py-2 border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>

            {/* Logo */}
            <div className="flex-shrink-0 relative z-[160]">
              <Link href="/" className="flex items-center group" onClick={() => setIsOpen(false)}>
                <div className="relative w-32 md:w-40 h-10 md:h-12 transition-transform group-hover:scale-105">
                  <Image
                    src="/images/peko-beauty-hong-kong-medical-aesthetics-logo.png"
                    alt="PEKO Beauty Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-10 items-center">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className="relative py-2 text-sm font-bold tracking-widest text-gray-700 hover:text-black transition-colors duration-300 flex items-center gap-1.5"
                  >
                    {link.name}
                    {link.isMega && (
                      <ChevronDown
                        size={12}
                        aria-hidden="true"
                        className="group-hover:rotate-180 transition-transform duration-300"
                      />
                    )}
                    <span
                      className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: BRAND_RED }}
                    />
                  </Link>

                  {/* ── Mega Menu Dropdown ── */}
                  {link.isMega && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="w-[860px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 p-7 grid grid-cols-3 gap-7">

                        {/* ── Column 1: 皇牌儀器系列 ── */}
                        <div>
                          <h4 className="flex items-center gap-2 text-[12px] font-black tracking-[0.2em] uppercase mb-4 px-1">
                            <Crown size={11} style={{ color: BRAND_RED }} aria-hidden="true" />
                            <span style={{ color: BRAND_RED }}>皇牌儀器系列</span>
                          </h4>
                          <div className="space-y-0.5">
                            {megaMenuSections.flagship.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-black rounded-xl transition-all group/item"
                              >
                                <span
                                  className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center group-hover/item:scale-110 transition-transform shrink-0`}
                                >
                                  {item.icon}
                                </span>
                                <span className="leading-tight">{item.name}</span>
                                {item.hot && (
                                  <span className="ml-auto text-[8px] px-1.5 py-0.5 bg-[#C52B21] text-white rounded-full font-black tracking-tighter shrink-0">
                                    HOT
                                  </span>
                                )}
                                {item.isNew && (
                                  <span className="ml-auto text-[8px] px-1.5 py-0.5 bg-emerald-500 text-white rounded-full font-black tracking-tighter shrink-0">
                                    NEW
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* ── Column 2: Hollywood Spectra™ ── */}
                        <div>
                          <h4 className="flex items-center gap-2 text-[12px] font-black tracking-[0.2em] uppercase mb-4 px-1">
                            <Sparkles size={11} style={{ color: HOLLYWOOD_ORANGE }} aria-hidden="true" />
                            <span style={{ color: HOLLYWOOD_ORANGE }}>Hollywood Spectra™</span>
                          </h4>

                          {/* Series intro badge */}
                          <div
                            className="mb-3 px-3 py-2 rounded-xl text-[12px] text-orange-700 font-medium leading-snug"
                            style={{ backgroundColor: `${HOLLYWOOD_ORANGE}12` }}
                          >
                            5-in-1 納秒激光系統，針對不同皮膚問題精準施治
                          </div>

                          <div className="space-y-0.5">
                            {megaMenuSections.hollywood.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-semibold text-gray-600 hover:bg-orange-50/50 hover:text-black rounded-xl transition-all group/item"
                              >
                                <span
                                  className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center group-hover/item:scale-110 transition-transform shrink-0`}
                                >
                                  {item.icon}
                                </span>
                                <span className="leading-tight">{item.name}</span>
                              </Link>
                            ))}
                          </div>

                        </div>

                        {/* ── Column 3: 肌膚困擾 ── */}
                        <div>
                          <h4 className="flex items-center gap-2 text-[12px] font-black tracking-[0.2em] text-gray-400 uppercase mb-4 px-1">
                            <Target size={11} aria-hidden="true" />
                            肌膚困擾
                          </h4>
                          <div className="space-y-0.5">
                            {megaMenuSections.concerns.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-black rounded-xl transition-all group/item"
                              >
                                <span
                                  className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center group-hover/item:scale-110 transition-transform shrink-0`}
                                >
                                  {item.icon}
                                </span>
                                <span className="leading-tight">{item.name}</span>
                              </Link>
                            ))}
                          </div>

                          {/* CTA block */}
                          <div className="mt-4 mx-1 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                            <p className="text-[12px] text-gray-500 mb-2 font-medium">
                              不確定從何開始？
                            </p>
                            <Link
                              href="/offers"
                              className="flex items-center gap-1.5 text-[12px] font-bold text-white px-3 py-2 rounded-xl w-full justify-center transition-opacity hover:opacity-90"
                              style={{ backgroundColor: BRAND_RED }}
                            >
                              查看試做優惠
                              <ArrowRight size={12} aria-hidden="true" />
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right CTAs (tablet+) */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="https://wa.me/85253353313"
                className="flex items-center gap-2 text-gray-600 hover:text-[#25D366] transition-all duration-300 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp 聯絡我們"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span className="text-xs font-bold tracking-wider uppercase">WhatsApp</span>
              </a>
              <Link
                href="/booking"
                className="px-8 py-2.5 rounded-full text-white text-sm font-bold tracking-widest transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                style={{ backgroundColor: BRAND_RED }}
              >
                立即預約
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center gap-3 relative z-[160]">
              {/* Mobile CTA — hidden when menu open */}
              {!isOpen && (
                <Link
                  href="/booking"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-black tracking-widest shadow-md active:scale-95 transition-all"
                  style={{ backgroundColor: BRAND_RED }}
                >
                  <Calendar size={13} aria-hidden="true" />
                  立即預約
                </Link>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-12 h-12 flex items-center justify-center text-gray-900 transition-all duration-300"
                aria-label={isOpen ? '關閉選單' : '開啟選單'}
                aria-expanded={isOpen}
              >
                <div className="relative w-6 h-5">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 8, backgroundColor: '#111' } : { rotate: 0, y: 0, backgroundColor: '#111' }}
                    transition={{ duration: 0.3 }}
                    className="absolute block w-6 h-0.5 rounded-full"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0, backgroundColor: '#111' }}
                    transition={{ duration: 0.3 }}
                    className="absolute block w-6 h-0.5 top-2 rounded-full"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -8, backgroundColor: '#111' } : { rotate: 0, y: 0, backgroundColor: '#111' }}
                    transition={{ duration: 0.3 }}
                    className="absolute block w-6 h-0.5 top-4 rounded-full"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* ── Mobile Full-Screen Menu (Luxury Glass Edition) ──────────────────── */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed inset-0 z-[140] flex flex-col"
            style={{
              background:
                'linear-gradient(150deg, rgba(255,255,255,0.98) 0%, rgba(255,248,245,0.97) 45%, rgba(245,248,255,0.98) 100%)',
              backdropFilter: 'blur(48px) saturate(200%)',
              WebkitBackdropFilter: 'blur(48px) saturate(200%)',
            }}
          >

            {/* ── Decorative ambient blobs ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
              <div
                className="absolute top-[-5%] right-[-8%] w-[65%] h-[35%] rounded-full blur-[120px]"
                style={{ backgroundColor: 'rgba(197,43,33,0.07)' }}
              />
              <div
                className="absolute top-[30%] left-[-12%] w-[55%] h-[30%] rounded-full blur-[100px]"
                style={{ backgroundColor: 'rgba(199,94,26,0.06)' }}
              />
              <div
                className="absolute bottom-0 right-[-5%] w-[60%] h-[30%] rounded-full blur-[110px]"
                style={{ backgroundColor: 'rgba(99,102,241,0.05)' }}
              />
              {/* Subtle grid texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 32px, #000 32px), repeating-linear-gradient(90deg, #000 0px, transparent 1px, transparent 32px, #000 32px)',
                }}
              />
            </div>

            {/* ── Top bar: contacts + close ── */}
            <div className="pt-[80px] px-6 pb-5 flex justify-between items-center border-b border-black/[0.04]">
              <motion.div variants={itemVariants} className="flex gap-3">
                <a
                  href="tel:+85253353313"
                  aria-label="致電我們"
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-gray-700 active:scale-90 transition-all"
                  style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <Phone size={18} aria-hidden="true" />
                </a>
                <a
                  href="https://wa.me/85253353313"
                  aria-label="WhatsApp 我們"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#25D366] active:scale-90 transition-all"
                  style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                </a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-gray-500 rounded-full px-4 py-2 active:scale-95 transition-all"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.07)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  aria-label="關閉選單"
                >
                  <X size={13} aria-hidden="true" />
                  關閉
                </button>
              </motion.div>
            </div>

            {/* ── Scrollable content ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain">

              {/* ════════════════════════════════════════════════ */}
              {/* SECTION 1 — 肌膚困擾 (Priority: Users come with problems) */}
              {/* ════════════════════════════════════════════════ */}
              <motion.div variants={itemVariants} className="px-6 pt-7 pb-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(197,43,33,0.1)' }}
                    >
                      <Target size={11} style={{ color: BRAND_RED }} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-black tracking-[0.18em] uppercase text-gray-400">
                      針對肌膚困擾
                    </span>
                  </div>
                  <Link
                    href="/concerns"
                    className="flex items-center gap-1 text-xs font-bold transition-colors"
                    style={{ color: BRAND_RED }}
                    onClick={() => setIsOpen(false)}
                  >
                    查看全部
                    <ChevronRight size={12} aria-hidden="true" />
                  </Link>
                </div>

                {/* Horizontal scroll concern chips */}
                <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {megaMenuSections.concerns.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 pl-2.5 pr-4 py-2.5 rounded-2xl shrink-0 active:scale-95 transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.72)',
                        border: '1px solid rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 2px 14px rgba(0,0,0,0.05)',
                      }}
                    >
                      <span
                        className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center shrink-0`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm font-bold text-gray-800 whitespace-nowrap leading-tight">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* ════════════════════════════════════════════════ */}
              {/* SECTION 2 — 醫美療程 (Two-tab: 皇牌儀器 + Hollywood) */}
              {/* ════════════════════════════════════════════════ */}
              <motion.div variants={itemVariants} className="px-6 pt-7 pb-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(197,43,33,0.1)' }}
                    >
                      <Crown size={11} style={{ color: BRAND_RED }} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-black tracking-[0.18em] uppercase text-gray-400">
                      醫美療程
                    </span>
                  </div>
                  <Link
                    href="/treatments"
                    className="flex items-center gap-1 text-xs font-bold transition-colors"
                    style={{ color: BRAND_RED }}
                    onClick={() => setIsOpen(false)}
                  >
                    查看全部
                    <ChevronRight size={12} aria-hidden="true" />
                  </Link>
                </div>

                {/* 2-tab switcher */}
                <div
                  className="flex p-1.5 rounded-2xl mb-5 gap-1.5"
                  style={{
                    background: 'rgba(0,0,0,0.04)',
                    border: '1px solid rgba(255,255,255,0.6)',
                  }}
                >
                  {mobileTabConfig.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setMobileTab(tab.key)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-black transition-all duration-300 ${
                        mobileTab === tab.key ? 'text-gray-900' : 'text-gray-400'
                      }`}
                      style={
                        mobileTab === tab.key
                          ? {
                              background: 'rgba(255,255,255,0.88)',
                              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                              border: '1px solid rgba(255,255,255,1)',
                              backdropFilter: 'blur(8px)',
                            }
                          : {}
                      }
                    >
                      <span
                        style={mobileTab === tab.key ? { color: tab.accent } : {}}
                        className="transition-colors"
                      >
                        {tab.icon}
                      </span>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Accent rule */}
                <div
                  className="h-px rounded-full mb-5 transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${activeMobileSection.accentColor}, transparent)`,
                    opacity: 0.35,
                  }}
                  aria-hidden="true"
                />

                {/* Treatment cards */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileTab}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    className="grid grid-cols-1 gap-3"
                  >
                    {mobileTab === 'hollywood' && (
                      <div
                        className="px-4 py-3 rounded-2xl text-sm font-medium leading-snug mb-1"
                        style={{
                          background: `${HOLLYWOOD_ORANGE}0d`,
                          border: `1px solid ${HOLLYWOOD_ORANGE}20`,
                          color: '#9A4A14',
                        }}
                      >
                        <span className="font-bold">5-in-1 納秒激光系統</span>
                        ，精準針對不同皮膚問題
                      </div>
                    )}
                    {activeMobileSection.items.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.25 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-4 p-4 rounded-2xl active:scale-[0.98] transition-all group"
                          style={{
                            background: 'rgba(255,255,255,0.65)',
                            border: '1px solid rgba(255,255,255,0.88)',
                            backdropFilter: 'blur(12px)',
                            boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                          }}
                          onClick={() => setIsOpen(false)}
                        >
                          {/* Icon */}
                          <div
                            className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0 transition-transform group-active:scale-110`}
                          >
                            {/* Upscale icon size for glass cards */}
                            <span className="scale-[1.4]">{item.icon}</span>
                          </div>

                          {/* Name + tags */}
                          <div className="flex-1 min-w-0">
                            <span className="block text-[15px] font-black text-gray-900 leading-snug">
                              {item.name}
                            </span>
                            <div className="flex gap-1.5 mt-1">
                              {item.hot && (
                                <span
                                  className="text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wide text-white"
                                  style={{ backgroundColor: BRAND_RED }}
                                >
                                  HOT
                                </span>
                              )}
                              {item.isNew && (
                                <span className="text-[10px] px-2 py-0.5 bg-emerald-500 text-white rounded-full font-black uppercase tracking-wide">
                                  NEW
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-300 group-active:text-white transition-all shrink-0"
                            style={{
                              background: 'rgba(0,0,0,0.04)',
                            }}
                          >
                            <ChevronRight size={15} aria-hidden="true" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* ════════════════════════════════════════════════ */}
              {/* SECTION 3 — 其他導航 (Secondary: compact pill grid) */}
              {/* ════════════════════════════════════════════════ */}
              <motion.div variants={itemVariants} className="px-6 pt-7 pb-8">
                <p className="text-xs font-black tracking-[0.18em] uppercase text-gray-300 mb-4">更多</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="py-4 px-3 rounded-2xl text-center text-sm font-bold text-gray-700 active:scale-95 active:text-black transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.55)',
                        border: '1px solid rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

            </div>{/* end scrollable */}

            {/* ════════════════════════════════════════════════ */}
            {/* FIXED BOTTOM — Booking CTA + Social links */}
            {/* ════════════════════════════════════════════════ */}
            <motion.div
              variants={itemVariants}
              className="px-6 pt-5 pb-8 shrink-0"
              style={{
                background: 'rgba(255,255,255,0.82)',
                backdropFilter: 'blur(24px)',
                borderTop: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 -20px 60px rgba(0,0,0,0.04)',
              }}
            >
              {/* Main booking button */}
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-4.5 rounded-2xl text-white font-black text-base relative overflow-hidden active:scale-[0.98] transition-all"
                style={{
                  backgroundColor: BRAND_RED,
                  boxShadow: '0 8px 30px rgba(197,43,33,0.28)',
                  paddingTop: '1.125rem',
                  paddingBottom: '1.125rem',
                }}
              >
                <Calendar size={18} aria-hidden="true" />
                立即預約體驗
                {/* Shimmer sweep */}
                <motion.div
                  aria-hidden="true"
                  animate={{ x: ['-120%', '120%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
                />
              </Link>

              {/* Social + map links */}
              <div className="mt-5 flex justify-center gap-6">
                <a
                  href="https://www.instagram.com/pekobeauty_official/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-gray-400 active:text-[#E1306C] transition-all"
                  style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <Instagram size={18} aria-hidden="true" />
                </a>
                <a
                  href="https://www.facebook.com/pekobeauty/"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-gray-400 active:text-[#1877F2] transition-all"
                  style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <Facebook size={18} aria-hidden="true" />
                </a>
                <a
                  href="https://www.google.com/maps?q=22.319356,114.167531"
                  aria-label="地圖位置"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-gray-400 active:text-black transition-all"
                  style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <MapPin size={18} aria-hidden="true" />
                </a>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
