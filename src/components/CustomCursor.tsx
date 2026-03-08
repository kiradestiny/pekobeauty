"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Raw cursor position
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Outer ring: subtle lag behind cursor
  const ringX = useSpring(cursorX, { damping: 28, stiffness: 220 });
  const ringY = useSpring(cursorY, { damping: 28, stiffness: 220 });

  useEffect(() => {
    setMounted(true);

    // Only activate on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Hide native cursor
    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const el = e.target as HTMLElement;
      const clickable = !!el.closest(
        "button, a, [role='button'], input, select, textarea, label"
      );
      setIsPointer(clickable);
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    setIsVisible(true);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── Small dot — snaps directly to cursor ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPressed ? 5 : isPointer ? 6 : 6,
          height: isPressed ? 5 : isPointer ? 6 : 6,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPointer ? "#C52B21" : "#111827",
          scale: isPressed ? 0.7 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* ── Outer ring — soft trailing effect ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPressed ? 24 : isPointer ? 40 : 32,
          height: isPressed ? 24 : isPointer ? 40 : 32,
          opacity: isVisible ? (isPointer ? 0.5 : 0.28) : 0,
          borderColor: isPointer ? "#C52B21" : "#9ca3af",
          scale: isPressed ? 0.85 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
