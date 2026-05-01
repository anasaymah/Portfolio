import React, { useCallback, useEffect, useRef, useState } from "react";
import signatureSvgUrl from "@/assets/signature.svg";

const signaturePngUrl = "/favicon.png";

export type SignatureSource = "png" | "svg";
export type SignatureBlendMode = React.CSSProperties["mixBlendMode"];

export interface SignatureSVGProps {
  className?: string;
  /** Render fully visible without any animation. Default false. */
  static?: boolean;
  /** Override auto-detection and force play state. */
  play?: boolean;
  /** Bumping this value re-triggers the writing animation (works with `play`). */
  replay?: number | boolean;
  /** Source asset. Default "png" matches original 1:1. */
  source?: SignatureSource;

  /** Writing animation duration (ms). Default 2400. */
  durationMs?: number;
  /** Delay before starting (ms). Default 150. */
  startDelayMs?: number;
  /** Hold visible after writing (ms). 0 = stays. Default 0. */
  holdMs?: number;
  /** Fade-out after hold (ms). Default 600. */
  fadeOutMs?: number;
  /** Soft edge width on the reveal (%). Default 4. */
  edgeSoftness?: number;

  /** Auto-trigger via IntersectionObserver. Default true. */
  autoPlayInView?: boolean;
  /** Replay each time it re-enters the viewport. Default false. */
  replayInView?: boolean;
  /** IntersectionObserver rootMargin. Default "0px 0px -66.67% 0px" (top third). */
  rootMargin?: string;
  /** IntersectionObserver threshold. Default 0.01. */
  threshold?: number | number[];

  /** Loop the writing animation. Default false. */
  loop?: boolean;
  /** Pause between loop iterations (ms). Default 1500. */
  loopIntervalMs?: number;

  /**
   * Scrub the writing progress with scroll position instead of time.
   * When enabled, `durationMs`, `startDelayMs`, `holdMs`, `loop` are ignored.
   */
  scrubOnScroll?: boolean;
  /** Scrub start: 0 = element fully below viewport, 1 = element top at viewport top. Default 0.15. */
  scrubStart?: number;
  /** Scrub end: same axis as start. Default 0.75. */
  scrubEnd?: number;

  /** Mix blend mode for better contrast over backgrounds. */
  blendMode?: SignatureBlendMode;
  /** Opacity in light theme. Default 1. */
  lightOpacity?: number;
  /** Opacity in dark theme (when `.dark` is on <html>). Default 1. */
  darkOpacity?: number;

  /** Fired once when writing actually begins (after delay). */
  onStart?: () => void;
  /** Fired on every progress tick (0..1). */
  onProgress?: (p: number) => void;
  /** Fired once when writing reaches 100%. */
  onComplete?: () => void;
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export const SignatureSVG: React.FC<SignatureSVGProps> = ({
  className,
  static: isStatic = false,
  play,
  replay,
  source = "png",
  durationMs = 2400,
  startDelayMs = 150,
  holdMs = 0,
  fadeOutMs = 600,
  edgeSoftness = 4,
  autoPlayInView = true,
  replayInView = false,
  rootMargin = "0px 0px -66.67% 0px",
  threshold = 0.01,
  loop = false,
  loopIntervalMs = 1500,
  scrubOnScroll = false,
  scrubStart = 0.15,
  scrubEnd = 0.75,
  blendMode,
  lightOpacity = 1,
  darkOpacity = 1,
  onStart,
  onProgress,
  onComplete,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [inView, setInView] = useState(false);
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  // Track <html class="dark"> changes to swap opacity.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const el = document.documentElement;
    const sync = () => setIsDark(el.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const setPct = useCallback(
    (pct: number) => {
      const img = imgRef.current;
      if (!img) return;
      img.style.setProperty("--sig-pct", `${(pct * 100).toFixed(2)}%`);
      onProgress?.(pct);
    },
    [onProgress]
  );

  // IntersectionObserver: trigger play state when in configured zone.
  useEffect(() => {
    if (isStatic) return;
    if (scrubOnScroll) return; // scrub mode handles its own listener
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
            if (!replayInView) observer.disconnect();
          } else if (replayInView) {
            setInView(false);
            setDone(false);
            setFading(false);
            setPct(0);
          }
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [autoPlayInView, replayInView, play, rootMargin, threshold, scrubOnScroll, setPct]);

  const isPlaying = play !== undefined ? play : inView;

  // Scroll-scrub mode.
  useEffect(() => {
    if (!scrubOnScroll) return;
    const node = wrapperRef.current;
    if (!node) return;

    let raf = 0;
    let started = false;
    let completed = false;

    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Position of the element center relative to viewport (0 = top, 1 = bottom).
      const center = (rect.top + rect.height / 2) / vh;
      // Map [scrubEnd .. scrubStart] (top..bottom of viewport) -> [1 .. 0] progress.
      // Higher on screen = more revealed.
      const raw = (1 - center - (1 - scrubEnd)) / (scrubEnd - scrubStart);
      const p = clamp01(raw);
      setPct(p);
      if (!started && p > 0) {
        started = true;
        onStart?.();
      }
      if (!completed && p >= 1) {
        completed = true;
        setDone(true);
        onComplete?.();
      } else if (completed && p < 1) {
        completed = false;
        setDone(false);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrubOnScroll, scrubStart, scrubEnd, setPct, onStart, onComplete]);

  // Time-based writing animation (with optional loop).
  useEffect(() => {
    if (scrubOnScroll) return;
    if (!isPlaying) return;
    const img = imgRef.current;
    if (!img) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setPct(1);
      setDone(true);
      onStart?.();
      onComplete?.();
      return;
    }

    let raf = 0;
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let loopTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const runOnce = () => {
      setPct(0);
      setDone(false);
      setFading(false);
      startTimer = setTimeout(() => {
        if (cancelled) return;
        const start = performance.now();
        onStart?.();
        const tick = (now: number) => {
          if (cancelled) return;
          const t = Math.min(1, (now - start) / durationMs);
          setPct(easeInOutCubic(t));
          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setDone(true);
            onComplete?.();
            if (holdMs > 0) {
              holdTimer = setTimeout(() => setFading(true), holdMs);
            }
            if (loop) {
              loopTimer = setTimeout(runOnce, loopIntervalMs);
            }
          }
        };
        raf = requestAnimationFrame(tick);
      }, startDelayMs);
    };

    runOnce();

    return () => {
      cancelled = true;
      if (startTimer) clearTimeout(startTimer);
      if (holdTimer) clearTimeout(holdTimer);
      if (loopTimer) clearTimeout(loopTimer);
      cancelAnimationFrame(raf);
    };
    // `replay` is included to allow manual re-trigger.
  }, [
    isPlaying,
    durationMs,
    startDelayMs,
    holdMs,
    loop,
    loopIntervalMs,
    scrubOnScroll,
    replay,
    setPct,
    onStart,
    onComplete,
  ]);

  const soft = Math.max(0, edgeSoftness);
  const maskGradient = `linear-gradient(to right, #000 calc(var(--sig-pct, 0%) - ${soft}%), transparent var(--sig-pct, 0%))`;
  const src = source === "svg" ? signatureSvgUrl : signaturePngUrl;
  const opacityValue = scrubOnScroll || isPlaying ? (isDark ? darkOpacity : lightOpacity) : 0;

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
          opacity: fading ? 0 : opacityValue,
          transition: fading
            ? `opacity ${fadeOutMs}ms ease-in`
            : `opacity 240ms ease-out`,
          WebkitMaskImage: maskGradient,
          maskImage: maskGradient,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          mixBlendMode: blendMode,
          willChange: done ? "auto" : "mask-image, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
};

export default SignatureSVG;
