"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BRAND = "#C52B21";

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 5000, suffix: '+', label: '滿意客戶', highlight: true },
  { value: 98, suffix: '%', label: '客戶回頭率', highlight: false },
  { value: 40, suffix: 'F', label: '朗豪坊樓層', highlight: false },
  { value: 10, suffix: '+', label: '年專業經驗', highlight: false },
];

export default function ContactStats() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center group"
            >
              <div
                className="text-4xl md:text-5xl font-black mb-2 tabular-nums transition-colors duration-300"
                style={{ color: s.highlight ? BRAND : '#111827' }}
              >
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
