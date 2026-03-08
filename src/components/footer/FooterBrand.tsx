"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook } from 'lucide-react';

const socialLinks = [
  {
    icon: <Instagram size={18} />,
    label: "Instagram",
    href: "https://www.instagram.com/pekobeauty_official/",
    hoverClass: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent",
    tooltip: "@pekobeauty_official",
  },
  {
    icon: <Facebook size={18} />,
    label: "Facebook",
    href: "https://www.facebook.com/pekobeauty/",
    hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-transparent",
    tooltip: "Peko Beauty",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 9.13c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.829.868 4.79-1.554 7.158C17.587 23.293 15.292 24 12.186 24zm.007-9.316c-.069 0-.138.002-.207.006-1.135.063-1.942.392-2.403.979-.357.458-.505 1.053-.415 1.663.179 1.19 1.328 1.83 3.145 1.737 1.12-.06 1.955-.457 2.48-1.178.509-.699.793-1.762.843-3.154a11.157 11.157 0 0 0-3.443-.053z" />
      </svg>
    ),
    label: "Threads",
    href: "https://www.threads.com/@pekobeauty_official",
    hoverClass: "hover:bg-black hover:text-white hover:border-transparent",
    tooltip: "@pekobeauty_official",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    label: "YouTube",
    href: "https://www.youtube.com/@PekoBeauty",
    hoverClass: "hover:bg-[#FF0000] hover:text-white hover:border-transparent",
    tooltip: "@PekoBeauty",
  },
];

const FooterBrand = () => {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  return (
    <div className="lg:col-span-2 space-y-7">
      {/* Logo */}
      <Link href="/" className="inline-flex group">
        <div className="relative w-44 h-12 transition-all duration-300 group-hover:opacity-80 group-hover:scale-[1.03]">
          <Image
            src="/images/peko-beauty-hong-kong-medical-aesthetics-logo.png"
            alt="PEKO Beauty Logo"
            fill
            className="object-contain object-left"
          />
        </div>
      </Link>

      {/* 品牌描述 */}
      <p className="text-sm text-gray-500 leading-relaxed max-w-[300px]">
        位於旺角朗豪坊的高端醫美中心。我們主張「效果為本」的完整皮膚管理方案，結合全球頂尖醫療科技與全女班專業團隊，從根源解碼您的肌膚需要，成就自信之美。
      </p>

      {/* 社群媒體圖示 */}
      <div className="flex items-center gap-2.5">
        {socialLinks.map((social, idx) => (
          <div key={idx} className="relative">
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              onMouseEnter={() => setHoveredSocial(idx)}
              onMouseLeave={() => setHoveredSocial(null)}
              className={`
                relative flex items-center justify-center w-9 h-9 rounded-xl
                border border-gray-200 text-gray-400
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
                ${social.hoverClass}
              `}
            >
              {social.icon}
            </a>
            {/* Tooltip */}
            {hoveredSocial === idx && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-gray-900 text-white text-[10px] rounded-lg whitespace-nowrap pointer-events-none z-10 shadow-xl">
                {social.tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 品牌標語 */}
      <div className="inline-flex items-center gap-2 border border-gray-100 rounded-full px-4 py-2 bg-gray-50/50">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C52B21] animate-pulse" />
        <span className="text-[11px] text-gray-400 tracking-[0.12em] uppercase font-medium">
          肌源解碼 · 定義您的原生美學
        </span>
      </div>
    </div>
  );
};

export default FooterBrand;
