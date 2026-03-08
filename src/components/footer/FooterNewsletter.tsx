"use client";

import React, { useState, useRef, useMemo } from 'react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';

// 使用固定種子的偽隨機數，避免 SSR/客戶端 hydration 不匹配
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const FooterNewsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const particles = useMemo(() =>
    [...Array(18)].map((_, i) => ({
      width: Math.round((seededRandom(i * 3) * 4 + 2) * 100) / 100,
      height: Math.round((seededRandom(i * 3 + 1) * 4 + 2) * 100) / 100,
      top: Math.round((seededRandom(i * 3 + 2) * 100) * 100) / 100,
      left: Math.round((i / 18) * 100 * 100) / 100,
    })),
  []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3500);
    }, 900);
  };

  return (
    <div className="relative overflow-hidden bg-[#0f0f0f] py-14 md:py-16">
      {/* 動態背景粒子 */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              background: i % 3 === 0 ? '#C52B21' : i % 3 === 1 ? '#fff' : '#888',
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `footer-particle-float ${4 + (i % 5)}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          />
        ))}
        {/* 漸層光暈 */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#C52B21] rounded-full blur-[120px] opacity-10" />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#C52B21] rounded-full blur-[120px] opacity-8" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* 左側文案 */}
          <div className="text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
              <Sparkles size={13} className="text-[#C52B21]" />
              <span className="text-[11px] text-gray-400 tracking-[0.15em] uppercase font-medium">
                Exclusive Newsletter
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight leading-snug">
              訂閱 PEKO BEAUTY
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C52B21] to-[#ff6b6b]">
                專屬資訊
              </span>
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto lg:mx-0 leading-relaxed">
              第一時間獲取最新醫美科技資訊與限時試做優惠
            </p>
          </div>

          {/* 右側表單 */}
          <div className="w-full max-w-md flex-shrink-0">
            {status === "success" ? (
              <div className="flex items-center justify-center gap-3 bg-white/5 border border-green-500/30 rounded-2xl px-6 py-5 text-green-400">
                <CheckCircle2 size={22} className="flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">感謝訂閱！</p>
                  <p className="text-xs text-green-400/70 mt-0.5">您將收到我們的最新優惠資訊。</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative group">
                <div
                  className={`relative flex items-center rounded-2xl border transition-all duration-300 overflow-hidden ${
                    focused
                      ? 'border-[#C52B21]/60 shadow-[0_0_30px_rgba(197,43,33,0.15)]'
                      : 'border-white/10'
                  } bg-white/5`}
                >
                  <input
                    ref={inputRef}
                    type="email"
                    id="footer-newsletter-email"
                    name="email"
                    placeholder="您的電子郵件地址"
                    className="flex-1 bg-transparent px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required
                    suppressHydrationWarning
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="relative m-1.5 bg-[#C52B21] hover:bg-[#a82219] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 group/btn overflow-hidden disabled:opacity-60 whitespace-nowrap"
                  >
                    {/* 按鈕光澤掃過效果 */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                    {status === "loading" ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        訂閱
                        <Send size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-gray-600 mt-2.5 text-center">
                  我們尊重您的隱私，隨時可取消訂閱。
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes footer-particle-float {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-18px) scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default FooterNewsletter;
