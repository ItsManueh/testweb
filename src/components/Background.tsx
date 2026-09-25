import type { CSSProperties } from "react";
import { Heart } from "lucide-react";

/** Manchas de luz difuminadas + corazón pulsante del fondo. */
export function GlowBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="float-slow absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-primary/25 blur-[60px] sm:blur-[130px]" />
      <div className="pulse-glow absolute right-[-4rem] top-[20%] size-[19rem] blur-[30px] sm:right-[-2rem] sm:top-[25%] sm:size-[32rem] sm:blur-[45px]">
        <div className="heart-mask size-full bg-primary/25 sm:bg-primary/50" />
      </div>
      <div className="absolute bottom-[-20%] left-1/3 h-[30rem] w-[30rem] rounded-full bg-glow/15 blur-[70px] sm:blur-[150px]" />
    </div>
  );
}

// Valores pseudoaleatorios deterministas: iguales en servidor y cliente.
function buildHearts(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const n = ((i * 9301 + 49297) % 233280) / 233280;
    const r = ((i * 4177 + 1234) % 991) / 991;
    return {
      id: i,
      left: `${(n * 100).toFixed(2)}%`,
      size: 10 + Math.round(r * 26),
      delay: `-${(r * 18).toFixed(2)}s`,
      duration: `${(16 + n * 18).toFixed(2)}s`,
      drift: `${(r * 80 - 40).toFixed(1)}px`,
      opacity: 0.12 + r * 0.25,
    };
  });
}

/** Corazones que suben lentamente por la pantalla. */
export function FloatingHearts({ count = 8 }: { count?: number }) {
  const hearts = buildHearts(count);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {hearts.map((h) => (
        <Heart
          key={h.id}
          fill="currentColor"
          strokeWidth={1}
          className="heart-rise absolute bottom-[-4rem] text-primary"
          style={
            {
              left: h.left,
              width: h.size,
              height: h.size,
              opacity: h.opacity,
              animationDelay: h.delay,
              animationDuration: h.duration,
              "--drift": h.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
