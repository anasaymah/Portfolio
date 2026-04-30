import React, { useEffect, useRef, useState } from "react";
import signatureSvgUrl from "@/assets/signature.svg";

const signaturePngUrl = "/favicon.png";

export type SignatureSource = "png" | "svg";

interface SignatureSVGProps {
  className?: string;
  /** Override auto-detection and force play state. */
  play?: boolean;
  /** Source asset to use for the reveal. Default "png" (matches original 1:1). */
  source?: SignatureSource;
  /** Writing animation duration (ms). Default 2400. */
  durationMs?: number;
  /** Delay before starting the writing animation (ms). Default 150. */
  startDelayMs?: number;
  /** How long the signature stays visible after writing (ms). 0 = stays forever. */
  holdMs?: number;
  /** Fade-out duration after hold (ms). Default 600. */
  fadeOutMs?: number;
  /**
   * If true, auto-trigger via IntersectionObserver when the signature
   * enters the top third of the viewport. Default true.
   */
  autoPlayInView?: boolean;
  /** Replay every time it re-enters the viewport. Default false. */
  replay?: boolean;
  /** Soft edge width on the reveal (%). Default 4. */
  edgeSoftness?: number;
}

/**
 * Smooth easing — easeInOutCubic gives a natural pen acceleration/deceleration.
 */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Decorative signature with a left-to-right "being written" reveal.
 * - Defaults to PNG source so it matches the original 1:1 (color/shape/weight).
 * - Uses a CSS mask gradient driven by a CSS variable so the animation runs
 *   on the compositor when possible, with one React state read on RAF.
 */
export const SignatureSVG: React.FC<SignatureSVGProps> = ({
  className,
  play,
  source = "png",
  durationMs = 2400,
  startDelayMs = 150,
  holdMs = 0,
  fadeOutMs = 600,
  autoPlayInView = true,
  replay = false,
  edgeSoftness = 4,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [inView, setInView] = useState(false);
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);

  // IntersectionObserver: trigger when entering top third of viewport.
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
            setDone(false);
            setFading(false);
            if (imgRef.current) {
              imgRef.current.style.setProperty("--sig-pct", "0%");
            }
          }
        }
      },
      {
        rootMargin: "0px 0px -66.67% 0px",
        threshold: 0.01,
      }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [autoPlayInView, replay, play]);

  const isPlaying = play !== undefined ? play : inView;

  // Drive the writing animation directly into a CSS variable (no React re-renders per frame).
  useEffect(() => {
    if (!isPlaying) return;
    const img = imgRef.current;
    if (!img) return;

    // Respect reduced motion: snap to fully revealed.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      img.style.setProperty("--sig-pct", "100%");
      setDone(true);
      return;
    }

    let raf = 0;
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let start = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = easeInOutCubic(t);
      img.style.setProperty("--sig-pct", `${(eased * 100).toFixed(2)}%`);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        if (holdMs > 0) {
          holdTimer = setTimeout(() => setFading(true), holdMs);
        }
      }
    };

    img.style.setProperty("--sig-pct", "0%");
    startTimer = setTimeout(() => {
      start = performance.now();
      raf = requestAnimationFrame(tick);
    }, startDelayMs);

    return () => {
      if (startTimer) clearTimeout(startTimer);
      if (holdTimer) clearTimeout(holdTimer);
      cancelAnimationFrame(raf);
    };
  }, [isPlaying, durationMs, startDelayMs, holdMs]);

  const soft = Math.max(0, edgeSoftness);
  // Mask gradient references the CSS variable so frame updates don't re-render React.
  const maskGradient = `linear-gradient(to right, #000 calc(var(--sig-pct, 0%) - ${soft}%), transparent var(--sig-pct, 0%))`;

  const src = source === "svg" ? signatureSvgUrl : signaturePngUrl;

  return (
    <div ref={wrapperRef} className={className} aria-hidden="true">
      <img
        ref={imgRef}
        src={src}
        alt=""
        draggable={false}
        decoding="async"
        loading="lazy"
        className="w-full h-auto select-none pointer-events-none"
        style={{
          // Initial state hidden; opacity flips when playing.
          opacity: isPlaying && !fading ? 1 : 0,
          transition: fading
            ? `opacity ${fadeOutMs}ms ease-in`
            : `opacity 240ms ease-out`,
          WebkitMaskImage: maskGradient,
          maskImage: maskGradient,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          willChange: done ? "auto" : "mask-image, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
};

export default SignatureSVG;
