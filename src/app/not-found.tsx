'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Home, ArrowLeft, Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center px-6 py-12 overflow-hidden relative bg-background">
      {/* Interactive Spotlight Effect */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-30 opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${dx}px ${dy}px, rgba(197, 43, 33, 0.08), transparent 80%)`,
        }}
      />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[15%] w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[15%] w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-2xl w-full text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Minimalist 404 Display */}
          <div className="relative mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[10rem] md:text-[15rem] font-bold text-accent/5 leading-none select-none tracking-tighter"
            >
              404
            </motion.div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-accent mb-4"
              >
                <MapPin size={20} className="animate-bounce" />
                <span className="text-sm font-medium tracking-[0.2em] uppercase">Page Not Found</span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                迷路也是一種美
              </h1>
              <div className="w-12 h-[2px] bg-accent/30 mb-6" />
            </div>
          </div>

          <p className="text-muted text-lg mb-12 max-w-md mx-auto leading-relaxed">
            您尋找的頁面可能已搬遷或不存在。<br />
            別擔心，美麗的旅程總有驚喜。
          </p>

          {/* Simplified Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/"
              className="group relative px-8 py-4 bg-foreground text-background rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2 font-medium">
                <Home size={18} />
                返回首頁
              </span>
            </Link>
            
            <Link 
              href="/treatments"
              className="group px-8 py-4 border border-foreground/10 rounded-full hover:border-accent/30 transition-all hover:bg-accent/5 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2 font-medium text-foreground group-hover:text-accent transition-colors">
                瀏覽療程
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Subtle Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            回到上一頁
          </button>
        </motion.div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-20">
        <Sparkles className="text-accent w-6 h-6" />
      </div>
    </div>
  );
}
