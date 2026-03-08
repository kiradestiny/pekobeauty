"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const legalLinks = [
  { name: '隱私權政策', href: '/privacy' },
  { name: '服務條款', href: '/terms' },
];

const FooterBottom = () => {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
      {/* 版權聲明 */}
      <p className="text-[11px] text-gray-400 font-light tracking-wider order-2 md:order-1">
        © {year}{' '}
        <span className="font-semibold text-gray-500">PEKO HK LIMITED</span>
        . ALL RIGHTS RESERVED.
      </p>

      {/* 法律連結 */}
      <div className="flex items-center gap-1 order-1 md:order-2">
        {legalLinks.map((link, idx) => (
          <React.Fragment key={link.name}>
            <Link
              href={link.href}
              className="text-[11px] text-gray-400 hover:text-[#C52B21] transition-colors duration-200 font-medium px-2 py-1 rounded hover:bg-red-50"
            >
              {link.name}
            </Link>
            {idx < legalLinks.length - 1 && (
              <span className="text-gray-200 text-xs">|</span>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};

export default FooterBottom;
