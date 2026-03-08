"use client";

import React, { useState } from 'react';
import { Clock, ShieldCheck, Users, Award } from 'lucide-react';

const trustItems = [
  {
    icon: <Clock size={22} />,
    label: "Opening Hours",
    title: "營業時間",
    content: (
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-sm text-gray-700 font-medium mt-1">
        <span>星期一至五</span><span className="text-gray-500">11:30 – 20:30</span>
        <span>星期六</span><span className="text-gray-500">10:00 – 19:00</span>
        <span>公眾假期</span><span className="text-gray-500">11:00 – 18:00</span>
        <span className="text-[#C52B21]">星期日</span><span className="text-[#C52B21]">休息</span>
      </div>
    ),
  },
  {
    icon: <ShieldCheck size={22} />,
    label: "Authenticity",
    title: "原廠正貨保證",
    content: (
      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
        100% 原廠正貨儀器及藥品，拒絕仿製品，療效有保障。
      </p>
    ),
  },
  {
    icon: <Users size={22} />,
    label: "Professional Team",
    title: "全女班醫療團隊",
    content: (
      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
        資深醫療美容師全程貼心服務，安全舒適有保障。
      </p>
    ),
  },
  {
    icon: <Award size={22} />,
    label: "Award Winning",
    title: "多項業界認可",
    content: (
      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
        屢獲香港醫美業界殊榮，客戶滿意度持續 98%+。
      </p>
    ),
  },
];

const FooterTrustBar = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-y border-gray-100">
      {trustItems.map((item, idx) => (
        <div
          key={idx}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`
            group flex items-start gap-4 p-4 rounded-2xl
            transition-all duration-300 cursor-default
            ${hoveredIdx === idx
              ? 'bg-gray-50 shadow-sm -translate-y-0.5'
              : 'bg-transparent'
            }
          `}
        >
          {/* 圖示 */}
          <div
            className={`
              flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
              transition-all duration-300
              ${hoveredIdx === idx
                ? 'bg-[#C52B21] text-white shadow-lg shadow-red-200'
                : 'bg-gray-100 text-gray-400'
              }
            `}
          >
            {item.icon}
          </div>

          {/* 文字 */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-0.5">
              {item.label}
            </p>
            <p className={`text-sm font-bold transition-colors duration-200 ${
              hoveredIdx === idx ? 'text-[#C52B21]' : 'text-gray-800'
            }`}>
              {item.title}
            </p>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTrustBar;
