"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Train, ChevronRight, Instagram, Facebook, Mail, ExternalLink } from 'lucide-react';

const BRAND = "#C52B21";

const transportOptions = [
  {
    icon: <Train size={18} />, title: '地鐵', detail: '旺角站 C3 / E1 出口',
    steps: ['乘地鐵至旺角站', '由 C3 或 E1 出口離開', '步行約 2 分鐘至朗豪坊', '乘電梯至辦公大樓 40 樓'],
  },
];

function Reveal({ children, delay = 0, dir = 'up' }: { children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'right' }) {
  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} variants={variants[dir]}>
      {children}
    </motion.div>
  );
}

export default function ContactMap() {
  const [activeTransport, setActiveTransport] = useState(0);

  return (
    <section id="map" className="pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[48px] shadow-2xl shadow-gray-200/60 overflow-hidden border border-gray-50">
          <div className="grid lg:grid-cols-2">

            {/* Left: Form placeholder slot */}
            <div className="relative min-h-[600px] bg-gray-50 group/map overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.282683182031!2d114.16753137602432!3d22.319356642055342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040090a0a0a0a1%3A0x1234567890abcdef!2sPeko%20Beauty!5e0!3m2!1szh-TW!2shk!4v1700000000000!5m2!1szh-TW!2shk"
                width="100%" height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen loading="lazy"
                className="grayscale group-hover/map:grayscale-0 transition-all duration-1000"
              />
              {/* Map overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Floating location pin */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${BRAND}, #FF4444)`, boxShadow: `0 8px 32px rgba(197,43,33,0.5)` }}>
                  <MapPin size={22} />
                </div>
                <div className="w-4 h-4 rounded-full mx-auto -mt-1 blur-sm opacity-40"
                  style={{ background: BRAND }} />
              </motion.div>
            </div>

            {/* Right: Location info + transport */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <Reveal dir="right">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase mb-3 block" style={{ color: BRAND }}>
                    Find Us
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">我們的位置</h2>
                </Reveal>

                {/* Address card */}
                <Reveal delay={0.1} dir="right">
                  <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl mb-8 group hover:bg-[#C52B21]/5 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${BRAND}, #FF4444)` }}>
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">中心地址</h4>
                      <p className="text-gray-500 leading-relaxed text-sm">
                        九龍旺角亞皆老街 8 號<br />
                        朗豪坊辦公室大樓 40 樓 02 室
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Transport tabs */}
                <Reveal delay={0.15} dir="right">
                  <div className="mb-6">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">交通指引</p>
                    <div className="flex gap-2 mb-6">
                      {transportOptions.map((t, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTransport(i)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300"
                          style={{
                            background: activeTransport === i ? BRAND : '#F3F4F6',
                            color: activeTransport === i ? 'white' : '#6B7280',
                          }}
                        >
                          {t.icon} {t.title}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTransport}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm font-semibold text-gray-600 mb-4">
                          {transportOptions[activeTransport].detail}
                        </p>
                        <div className="space-y-3">
                          {transportOptions[activeTransport].steps.map((step, si) => (
                            <motion.div
                              key={si}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: si * 0.08 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                style={{ background: `linear-gradient(135deg, ${BRAND}, #FF4444)` }}>
                                {si + 1}
                              </div>
                              <span className="text-sm text-gray-600">{step}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </Reveal>
              </div>

              {/* Bottom actions */}
              <Reveal delay={0.2} dir="right">
                <div className="space-y-4">
                  <motion.a
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    href="https://maps.app.goo.gl/yDeTCYYEYdkPddsB9"
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm tracking-widest hover:bg-black transition-colors shadow-xl"
                  >
                    <Navigation size={18} /> 在 Google Maps 開啟 <ExternalLink size={14} className="opacity-60" />
                  </motion.a>

                  {/* Social links */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">Follow Us</span>
                    <div className="flex gap-2">
                      {[
                        { icon: <Instagram size={18} />, href: 'https://www.instagram.com/pekobeauty_official/', label: 'Instagram' },
                        { icon: <Facebook size={18} />, href: 'https://www.facebook.com/pekobeauty/', label: 'Facebook' },
                        { icon: <Mail size={18} />, href: 'mailto:info@peko.com.hk', label: 'Email' },
                      ].map((s, i) => (
                        <motion.a
                          key={i} href={s.href}
                          whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}
                          aria-label={s.label}
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300"
                          style={{ ['--hover-bg' as string]: BRAND }}
                          onMouseEnter={e => (e.currentTarget.style.background = BRAND)}
                          onMouseLeave={e => (e.currentTarget.style.background = '')}
                        >
                          {s.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
