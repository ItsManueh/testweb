"use client";

import { useEffect, useRef, useState } from "react";

type Spark = { id: number; x: number; y: number };

/**
 * Corazón difuminado que sigue al cursor con suavizado y deja una estela
 * de pequeños ♥. Solo se activa con puntero fino (ratón) y sin
 * "prefers-reduced-motion".
 */
export function CursorHeart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    if (containerRef.current) containerRef.current.style.display = "block";

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let lastSpark = 0;
    let nextId = 0;
    const timeouts = new Set<number>();

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const now = performance.now();
      if (now - lastSpark > 110) {
        lastSpark = now;
        const spark = { id: nextId++, x: e.clientX, y: e.clientY };
        setSparks((prev) => [...prev.slice(-14), spark]);
        const t = window.setTimeout(() => {
          timeouts.delete(t);
          setSparks((prev) => prev.filter((s) => s.id !== spark.id));
        }, 900);
        timeouts.add(t);
      }
    };

    const tick = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${x - 80}px, ${y - 80}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      style={{ display: "none" }}
    >
      <div
        ref={followerRef}
        className="absolute left-0 top-0 size-40 opacity-40 blur-[15px]"
        style={{ transform: "translate3d(-80px, -80px, 0)" }}
      >
        <div
          className="heart-mask size-full"
          style={{ background: "var(--gradient-neon)" }}
        />
      </div>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="spark-heart absolute text-primary"
          style={{ left: s.x, top: s.y }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
