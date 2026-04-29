import React, { useEffect, useState } from "react";
const signatureUrl = "/favicon.png";

interface SignatureSVGProps {
  className?: string;
  play?: boolean;
  durationMs?: number;
}

/**
 * Decorative signature with a "being written" reveal effect.
 * Uses a left-to-right clip-path mask over the signature image
 * to simulate handwriting motion.
 */
export const SignatureSVG: React.FC<SignatureSVGProps> = ({
  className,
  play = false,
  durationMs = 2600,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!play) {
      setProgress(0);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // ease-out cubic for natural pen-stroke feel
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, durationMs]);

  const pct = (progress * 100).toFixed(2);

  return (
    <div className={className} aria-hidden="true">
      <img
        src={signatureUrl}
        alt=""
        draggable={false}
        className="w-full h-auto select-none pointer-events-none transition-opacity duration-300"
        style={{
          opacity: play ? 1 : 0,
          // Reveal from left to right like a hand writing
          WebkitMaskImage: `linear-gradient(to right, #000 ${pct}%, transparent ${pct}%)`,
          maskImage: `linear-gradient(to right, #000 ${pct}%, transparent ${pct}%)`,
        }}
      />
    </div>
  );
};

export default SignatureSVG;
