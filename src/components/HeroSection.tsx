'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useTime, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const time = useTime();

  // Continuous animation values
  const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false });
  const pulse = useTransform(time, [0, 4000], [1, 1.1], { clamp: false }); // Subtle scale pulse
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse interaction
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  };

  const springConfig = { damping: 15, stiffness: 150, mass: 1 }; // Looser spring for more "flow"
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Dynamic transforms based on mouse + time
  const moveX1 = useTransform(mouseXSpring, [0, 1], [50, -50]);
  const moveY1 = useTransform(mouseYSpring, [0, 1], [50, -50]);
  
  // Complex Wave Paths (Animated)
  // Using useTransform to create morphing paths is complex, so we animate specific points or rotate groups
  // Instead, we will use rotating gradients and moving masks for color complexity

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] w-full overflow-hidden bg-[#FAFAFA] flex flex-col items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Dynamic Colorful Background Mesh */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Gradient Blob 1 - Peko Red/Pink */}
        <motion.div
            className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-[#FFD1D1] to-[#C52B21] rounded-full blur-[100px] opacity-20 mix-blend-multiply"
            style={{
                x: moveX1,
                y: moveY1,
                rotate: rotate,
            }}
        />
        {/* Gradient Blob 2 - Soft Blue/Purple for contrast */}
        <motion.div
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tr from-[#E0F2F1] to-[#B39DDB] rounded-full blur-[120px] opacity-30 mix-blend-multiply"
             style={{
                x: useTransform(moveX1, (v) => -v), // Move opposite
                y: useTransform(moveY1, (v) => -v),
                rotate: useTransform(rotate, (v) => -v), // Rotate opposite
            }}
        />
         {/* Gradient Blob 3 - Gold/Warmth center */}
        <motion.div
            className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-gradient-to-t from-[#FFF3E0] to-[#FFE0B2] rounded-full blur-[80px] opacity-20 mix-blend-multiply"
             style={{
                scale: pulse,
            }}
        />
      </div>


      {/* 2. Complex Animated Line Art (The "Flowing" Lines) */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
           <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C52B21" stopOpacity="0" />
              <stop offset="50%" stopColor="#C52B21" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0" />
            </linearGradient>
             <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#333" stopOpacity="0" />
              <stop offset="50%" stopColor="#333" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#C52B21" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Sine Wave 1 - Fast moving */}
          <motion.path
            d="M0,450 Q360,350 720,450 T1440,450"
            fill="none"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ 
                d: [
                    "M0,450 Q360,350 720,450 T1440,450",
                    "M0,450 Q360,550 720,450 T1440,450",
                    "M0,450 Q360,350 720,450 T1440,450"
                ] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

           {/* Sine Wave 2 - Offset & Slower */}
           <motion.path
            d="M0,450 Q360,550 720,450 T1440,450"
            fill="none"
            stroke="url(#lineGradient2)"
            strokeWidth="1.5"
            opacity="0.5"
            animate={{ 
                d: [
                    "M0,450 Q360,550 720,450 T1440,450",
                    "M0,450 Q360,350 720,450 T1440,450",
                    "M0,450 Q360,550 720,450 T1440,450"
                ] 
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          
           {/* Complex Spiral/Orbit Lines - Following Mouse slightly */}
           {[...Array(3)].map((_, i) => (
             <motion.ellipse
                key={i}
                cx="720"
                cy="450"
                rx={300 + i * 50}
                ry={150 + i * 30}
                stroke="#ccc"
                strokeWidth="0.5"
                fill="none"
                style={{
                    rotate: useTransform(time, [0, 20000 + i * 5000], [0, 360]),
                    x: moveX1,
                    y: moveY1,
                }}
                className="opacity-40"
             />
           ))}
           
           {/* Abstract Female Face Line Art - Elegant Profile */}
           <motion.path
                d="M680,250 C650,250 620,280 620,320 C620,360 640,380 640,400 C640,420 630,430 630,450 C630,480 650,520 680,550 C710,580 750,600 800,600"
                fill="none"
                stroke="url(#lineGradient2)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
                style={{
                    x: moveX1,
                    y: moveY1,
                    rotate: 5
                }}
           />

           {/* "PEKO BEAUTY" Line Art Animation */}
           <g transform="translate(450, 650) scale(1.5)">
                {/* P */}
                <motion.path
                    d="M10,50 L10,10 C10,10 40,10 40,30 C40,50 10,50 10,50"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 2 }}
                />
                {/* E */}
                <motion.path
                    d="M50,10 L50,50 M50,10 L80,10 M50,30 L75,30 M50,50 L80,50"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 2.2 }}
                />
                 {/* K */}
                 <motion.path
                    d="M90,10 L90,50 M120,10 L90,30 L120,50"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 2.4 }}
                />
                {/* O */}
                <motion.path
                    d="M145,30 C145,10 175,10 175,30 C175,50 145,50 145,30"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 2.6 }}
                />
                
                 {/* B */}
                 <motion.path
                    d="M200,10 L200,50 M200,10 C230,10 230,30 200,30 C230,30 230,50 200,50"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 2.8 }}
                />
                 {/* E */}
                 <motion.path
                    d="M240,10 L240,50 M240,10 L270,10 M240,30 L265,30 M240,50 L270,50"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 3.0 }}
                />
                {/* A */}
                 <motion.path
                    d="M280,50 L295,10 L310,50 M285,35 L305,35"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 3.2 }}
                />
                 {/* U */}
                 <motion.path
                    d="M320,10 L320,40 C320,55 350,55 350,40 L350,10"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 3.4 }}
                />
                {/* T */}
                 <motion.path
                    d="M360,10 L390,10 M375,10 L375,50"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 3.6 }}
                />
                {/* Y */}
                 <motion.path
                    d="M400,10 L415,30 L430,10 M415,30 L415,50"
                    fill="none"
                    stroke="#C52B21"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 3.8 }}
                />
           </g>

        </svg>
      </div>


      {/* 3. Main Content Layer */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        

        {/* Main Title - Split & 3D Effect */}
        <motion.div style={{ y: y1, opacity }} className="mb-12 relative perspective-1000">
             <h1 className="font-serif text-6xl md:text-9xl leading-none text-gray-800 mix-blend-color-burn">
                <div className="overflow-hidden flex gap-4 md:gap-8 items-center justify-center">
                    <motion.div
                        initial={{ y: "120%", rotateX: 20 }}
                        animate={{ y: 0, rotateX: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        始於
                        <motion.span 
                            className="absolute -top-4 -right-4 w-4 h-4 rounded-full bg-[#C52B21]"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ y: "120%", rotateX: 20 }}
                        animate={{ y: 0, rotateX: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                         肌源
                    </motion.div>
                </div>
                
                 <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent my-4 md:my-6 opacity-30" />

                <div className="overflow-hidden flex gap-4 md:gap-8 items-center justify-center">
                    <motion.div
                        initial={{ y: "-120%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        className="font-light italic text-gray-500"
                    >
                         忠於
                    </motion.div>
                    <motion.div
                        initial={{ y: "-120%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                         className="font-light italic text-gray-500"
                    >
                         完美
                    </motion.div>
                </div>
            </h1>
        </motion.div>

        {/* Action Area - Floating Glass Card */}
        <motion.div 
            style={{ y: y2 }}
            className="mt-8"
        >
            <Link href="/booking">
                <motion.div
                    className="group relative px-16 py-6 overflow-hidden rounded-full backdrop-blur-md bg-white/30 border border-white/50 shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Animated colorful border gradient */}
                    <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-[#C52B21] via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                         mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                         maskComposite: 'exclude',
                         WebkitMaskComposite: 'xor',
                    }} />

                    <span className="relative z-10 text-gray-700 text-lg tracking-[0.2em] font-medium group-hover:text-[#C52B21] transition-colors">
                        預約體驗
                    </span>
                    
                    {/* Shine effect */}
                     <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 translate-x-[-150%]"
                        animate={{ translateX: ['-150%', '150%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                    />
                </motion.div>
            </Link>
        </motion.div>
      </div>
      
    </section>
  );
}
