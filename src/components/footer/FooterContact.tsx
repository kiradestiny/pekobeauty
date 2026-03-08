"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ExternalLink } from 'lucide-react';

const contactItems = [
  {
    icon: <MapPin size={15} />,
    label: "地址",
    value: "旺角亞皆老街8號朗豪坊\n辦公室大樓40樓02室",
    href: "https://maps.app.goo.gl/PNEjSMsQ66Ax7ohX9",
    isMultiLine: true,
    color: "text-[#C52B21]",
    bgColor: "bg-red-50",
    hoverBg: "group-hover:bg-[#C52B21]",
  },
  {
    icon: <Phone size={15} />,
    label: "電話",
    value: "+852 2662 2092",
    href: "tel:+85226622092",
    isMultiLine: false,
    color: "text-[#C52B21]",
    bgColor: "bg-red-50",
    hoverBg: "group-hover:bg-[#C52B21]",
  },
  {
    icon: <MessageCircle size={15} />,
    label: "WhatsApp",
    value: "+852 5335 3313",
    href: "https://wa.me/85253353313",
    isMultiLine: false,
    color: "text-[#C52B21]",
    bgColor: "bg-red-50",
    hoverBg: "group-hover:bg-[#C52B21]",
  },
  {
    icon: <Mail size={15} />,
    label: "電郵",
    value: "info@peko.com.hk",
    href: "mailto:info@peko.com.hk",
    isMultiLine: false,
    color: "text-[#C52B21]",
    bgColor: "bg-red-50",
    hoverBg: "group-hover:bg-[#C52B21]",
  },
];

const FooterContact = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-900 mb-7 flex items-center gap-2.5">
        <span className="w-5 h-px bg-[#C52B21]" />
        聯絡我們
      </h4>

      <ul className="space-y-4">
        {contactItems.map((item, idx) => (
          <li key={idx}>
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group flex items-start gap-3 transition-all duration-200"
            >
              {/* 圖示容器 — 微互動：hover 時填色 */}
              <div
                className={`
                  flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                  transition-all duration-300
                  ${item.bgColor} ${item.color}
                  ${item.hoverBg} group-hover:text-white group-hover:shadow-md group-hover:scale-110
                `}
              >
                {item.icon}
              </div>

              {/* 文字內容 */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5 font-medium">
                  {item.label}
                </p>
                <p
                  className={`text-sm font-medium transition-colors duration-200 leading-snug ${
                    hoveredIdx === idx ? 'text-[#C52B21]' : 'text-gray-700'
                  }`}
                  style={{ whiteSpace: item.isMultiLine ? 'pre-line' : 'nowrap' }}
                >
                  {item.value}
                </p>
              </div>

              {/* 外部連結指示 */}
              {item.href.startsWith('http') && hoveredIdx === idx && (
                <ExternalLink
                  size={12}
                  className="flex-shrink-0 mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      {/* 快速預約 CTA */}
      <a
        href="/booking"
        className="
          mt-7 flex items-center justify-center gap-2
          w-full py-3 rounded-xl
          border border-[#C52B21]/30 text-[#C52B21] text-sm font-semibold
          hover:bg-[#C52B21] hover:text-white hover:border-[#C52B21]
          transition-all duration-300 group/cta
          relative overflow-hidden
        "
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-500" />
        立即預約諮詢
        <span className="text-lg leading-none group-hover/cta:translate-x-0.5 transition-transform duration-200">→</span>
      </a>
    </div>
  );
};

export default FooterContact;
