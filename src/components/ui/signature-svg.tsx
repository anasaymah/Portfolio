import React, { useEffect, useRef, useState } from "react";

const signatureUrl = "/favicon.png";

interface SignatureSVGProps {
  className?: string;
  /** Override auto-detection and force play state. */
  play?: boolean;
  /** How long the writing animation takes (ms). Default 2600. */
  durationMs?: number;
  /** Delay before starting the writing animation (ms). Default 150. */
  startDelayMs?: number;
  /** How long the signature stays visible after writing (ms). 0 = stays forever. Default 0. */
  holdMs?: number;
  /** Fade-out duration after hold (ms). Default 600. */
  fadeOutMs?: number;
  /**
   * If true, auto-trigger via IntersectionObserver when the signature
   * enters the top third of the viewport. Default true.
   */
  autoPlayInView?: boolean;
  /** Replay every time it re-enters the viewport. Default false (play once). */
  replay?: boolean;
  /** Soft edge width on the reveal mask (%). Default 4. */
  edgeSoftness?: number;
}

/**
 * Decorative signature with a "being written" reveal effect.
 * Uses a left-to-right gradient mask over the signature image
 * to simulate handwriting motion. Color and shape stay untouched.
 */
export const SignatureSVG: React.FC<SignatureSVGProps> = ({
  className,
  play,
  durationMs = 2600,
  startDelayMs = 150,
  holdMs = 0,
  fadeOutMs = 600,
  autoPlayInView = true,
  replay = false,
  edgeSoftness = 4,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  // IntersectionObserver: trigger only when signature is in the TOP THIRD of the viewport.
  useEffect(() => {
    if (!autoPlayInView || play !== undefined) return;
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (!replay) observer.disconnect();
          } else if (replay) {
            setInView(false);
            setProgress(0);
            setFading(false);
          }
        }
      },
      {
        // Only fire when element is within the top third of the viewport.
        // rootMargin bottom = -66.67% effectively limits trigger zone to top 33% of viewport.
        rootMargin: "0px 0px -66.67% 0px",
        threshold: 0.01,
      }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [autoPlayInView, replay, play]);

  const isPlaying = play !== undefined ? play : inView;

  // Drive the writing animation
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      setFading(false);
      return;
    }
    let raf: number;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    const startTimer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setProgress(eased);
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else if (holdMs > 0) {
          holdTimer = setTimeout(() => setFading(true), holdMs);
        }
      };
      raf = requestAnimationFrame(tick);
    }, startDelayMs);

    return () => {
      clearTimeout(startTimer);
      if (holdTimer) clearTimeout(holdTimer);
      cancelAnimationFrame(raf);
    };
  }, [isPlaying, durationMs, startDelayMs, holdMs]);

  const pct = progress * 100;
  const soft = Math.max(0, edgeSoftness);
  const stop1 = pct.toFixed(2);
  const stop2 = Math.min(100, pct + soft).toFixed(2);
  const maskGradient = `linear-gradient(to right, #000 ${stop1}%, transparent ${stop2}%)`;

  return (
    <div ref={wrapperRef} className={className} aria-hidden="true">
      <img
        src={signatureUrl}
        alt=""
        draggable={false}
        className="w-full h-auto select-none pointer-events-none"
        style={{
          opacity: isPlaying && !fading ? 1 : fading ? 0 : 0,
          transition: fading
            ? `opacity ${fadeOutMs}ms ease-in`
            : `opacity 300ms ease-out`,
          WebkitMaskImage: maskGradient,
          maskImage: maskGradient,
        }}
      />
    </div>
  );
};

export default SignatureSVG;
