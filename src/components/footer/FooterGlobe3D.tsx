"use client";

import React, { useRef, useEffect, useState } from 'react';

interface Dot {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
}

const RADIUS = 90;
const DOT_COUNT = 180;
const LATITUDE_LINES = 8;
const LONGITUDE_LINES = 12;

function latLonToXYZ(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

const FooterGlobe3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef({ y: 0, x: 0.15 });
  const mouseRef = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const autoRotateRef = useRef(true);
  const [isHovered, setIsHovered] = useState(false);

  // 生成地球點陣
  const dotsRef = useRef<Dot[]>([]);
  useEffect(() => {
    const dots: Dot[] = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      const lat = Math.random() * 180 - 90;
      const lon = Math.random() * 360 - 180;
      const { x, y, z } = latLonToXYZ(lat, lon, RADIUS);
      dots.push({ x, y, z, size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.5 + 0.3 });
    }
    dotsRef.current = dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    const project = (x: number, y: number, z: number) => {
      const ry = rotationRef.current.y;
      const rx = rotationRef.current.x;

      // Rotate Y
      const x1 = x * Math.cos(ry) + z * Math.sin(ry);
      const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
      // Rotate X
      const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);

      const scale = (RADIUS * 2.2) / (RADIUS * 2.2 + z2);
      return { px: cx + x1 * scale, py: cy + y2 * scale, z: z2, scale };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // 繪製緯線
      for (let i = 0; i <= LATITUDE_LINES; i++) {
        const lat = -90 + (180 / LATITUDE_LINES) * i;
        const points: { px: number; py: number; z: number }[] = [];
        for (let j = 0; j <= 64; j++) {
          const lon = -180 + (360 / 64) * j;
          const { x, y, z } = latLonToXYZ(lat, lon, RADIUS);
          points.push(project(x, y, z));
        }
        ctx.beginPath();
        points.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        });
        ctx.strokeStyle = `rgba(197,43,33,${isHovered ? 0.12 : 0.07})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 繪製經線
      for (let i = 0; i < LONGITUDE_LINES; i++) {
        const lon = -180 + (360 / LONGITUDE_LINES) * i;
        const points: { px: number; py: number; z: number }[] = [];
        for (let j = 0; j <= 64; j++) {
          const lat = -90 + (180 / 64) * j;
          const { x, y, z } = latLonToXYZ(lat, lon, RADIUS);
          points.push(project(x, y, z));
        }
        ctx.beginPath();
        points.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        });
        ctx.strokeStyle = `rgba(197,43,33,${isHovered ? 0.12 : 0.07})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 繪製點陣
      const projected = dotsRef.current.map(dot => ({
        ...project(dot.x, dot.y, dot.z),
        size: dot.size,
        opacity: dot.opacity,
      }));

      projected
        .sort((a, b) => a.z - b.z)
        .forEach(p => {
          const visible = p.z > -RADIUS * 0.3;
          const alpha = visible ? p.opacity * (0.4 + 0.6 * ((p.z + RADIUS) / (RADIUS * 2))) : 0;
          if (alpha < 0.05) return;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(197,43,33,${alpha})`;
          ctx.fill();
        });

      // 香港標記點
      const hk = latLonToXYZ(22.3, 114.2, RADIUS);
      const hkP = project(hk.x, hk.y, hk.z);
      if (hkP.z > 0) {
        // 外圈脈衝
        const pulse = (Math.sin(Date.now() / 600) + 1) / 2;
        ctx.beginPath();
        ctx.arc(hkP.px, hkP.py, (4 + pulse * 6) * hkP.scale, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(197,43,33,${0.3 * (1 - pulse)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(hkP.px, hkP.py, 3.5 * hkP.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#C52B21';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(hkP.px, hkP.py, 1.5 * hkP.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      }

      // 自動旋轉
      if (autoRotateRef.current) {
        rotationRef.current.y += 0.004;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered]);

  // 滑鼠拖曳互動
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
    autoRotateRef.current = false;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseRef.current.dragging) return;
    const dx = e.clientX - mouseRef.current.lastX;
    const dy = e.clientY - mouseRef.current.lastY;
    rotationRef.current.y += dx * 0.008;
    rotationRef.current.x += dy * 0.008;
    rotationRef.current.x = Math.max(-1.2, Math.min(1.2, rotationRef.current.x));
    mouseRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
  };
  const handleMouseUp = () => {
    mouseRef.current.dragging = false;
    setTimeout(() => { autoRotateRef.current = true; }, 2000);
  };

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); handleMouseUp(); }}
    >
      {/* 外圈光暈 */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isHovered
            ? 'shadow-[0_0_60px_rgba(197,43,33,0.2)]'
            : 'shadow-[0_0_30px_rgba(197,43,33,0.08)]'
        }`}
      />
      <canvas
        ref={canvasRef}
        width={220}
        height={220}
        className="cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        title="拖曳旋轉地球 · 香港標記"
      />
      {/* 標籤 */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 tracking-widest uppercase whitespace-nowrap pointer-events-none">
        Hong Kong · 香港
      </div>
    </div>
  );
};

export default FooterGlobe3D;
