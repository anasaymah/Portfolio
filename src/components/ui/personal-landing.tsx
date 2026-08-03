import React, { useCallback, useEffect, useRef, useState } from "react";
import { Share, MoreVertical, Plane, Sun, Moon, ExternalLink, UserPlus, Copy, Link2, MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import {
  TikTokIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  YouTubeIcon,
  GitHubIcon,
  ThreadsIcon,
  MailIcon,
} from "@/components/ui/brand-icons";
import anasAvatar from "@/assets/anas-avatar.jpeg";
import { SignatureSVG } from "@/components/ui/signature-svg";

interface LinkCard {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  href: string;
}

const TIKTOK_URL = "https://www.tiktok.com/@anasaymah";
const INSTAGRAM_URL = "https://www.instagram.com/anasaymah";
const FACEBOOK_URL = "https://www.facebook.com/anasaymah";
const LINKEDIN_URL = "https://linkedin.com/in/anasayman";
const YOUTUBE_URL = "https://www.youtube.com/@AnasAymah";
const GITHUB_URL = "https://github.com/anasaymah";
const THREADS_URL = "https://www.threads.net/@anasaymah";
const WHATSAPP_URL = "https://wa.me/201143730504";

const linkCards: LinkCard[] = [
  { title: "Instagram", subtitle: "@anasaymah", icon: <InstagramIcon className="w-6 h-6" />, href: INSTAGRAM_URL },
  { title: "TikTok", subtitle: "@anasaymah", icon: <TikTokIcon className="w-6 h-6" />, href: TIKTOK_URL },
  { title: "YouTube", subtitle: "@AnasAymah", icon: <YouTubeIcon className="w-6 h-6" />, href: YOUTUBE_URL },
  { title: "Facebook", subtitle: "Anas Ayman", icon: <FacebookIcon className="w-6 h-6" />, href: FACEBOOK_URL },
  { title: "LinkedIn", subtitle: "in/anasayman", icon: <LinkedInIcon className="w-6 h-6" />, href: LINKEDIN_URL },
  { title: "Threads", subtitle: "@anasaymah", icon: <ThreadsIcon className="w-6 h-6" />, href: THREADS_URL },
  { title: "GitHub", subtitle: "@anasaymah", icon: <GitHubIcon className="w-6 h-6 text-foreground" />, href: GITHUB_URL },
  { title: "WhatsApp", subtitle: "Message me", icon: <MessageCircle className="w-6 h-6" />, href: WHATSAPP_URL },
];

const socialIcons = [
  { icon: <FacebookIcon className="w-5 h-5" />, href: FACEBOOK_URL, label: "Facebook" },
  { icon: <InstagramIcon className="w-5 h-5" />, href: INSTAGRAM_URL, label: "Instagram" },
  { icon: <TikTokIcon className="w-5 h-5" />, href: TIKTOK_URL, label: "TikTok" },
  { icon: <YouTubeIcon className="w-5 h-5" />, href: YOUTUBE_URL, label: "YouTube" },
];

interface Ripple { id: number; x: number; y: number; size: number; }

/* ── Static plane icon ── */
const TakeoffPlane: React.FC = () => (
  <Plane
    className="inline-block w-4 h-4 text-accent align-[-0.1em]"
    fill="currentColor"
    strokeWidth={0}
    aria-hidden
  />
);


/* ── Share popover (top bar) ── */
const SharePopover: React.FC = () => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied!", description: url });
    } catch { /* fail silently */ }
    setOpen(false);
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Anas Ayman", text: "Check out Anas Ayman's links", url });
      }
    } catch { /* cancelled */ }
    setOpen(false);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent("Check out Anas Ayman's links: " + url)}`, "_blank");
    setOpen(false);
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Check out Anas Ayman's links")}`, "_blank");
    setOpen(false);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      const container = contentRef.current;
      if (!container) return;
      const focusable = container.querySelectorAll<HTMLElement>('button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, []);

  const menuItemClass = "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-medium text-primary dark:text-foreground hover:bg-primary/5 dark:hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring w-full text-left";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Share this site"
          className="ios-glass glass-border group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-smooth hover:scale-110 hover:text-accent active:scale-95"
        >
          <Share className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-accent" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        ref={contentRef}
        align="end"
        side="bottom"
        sideOffset={10}
        onKeyDown={handleKeyDown}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const first = contentRef.current?.querySelector<HTMLElement>("button");
          first?.focus();
        }}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={() => setOpen(false)}
        onFocusOutside={() => setOpen(false)}
        onInteractOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
        style={{ transformOrigin: "var(--popover-origin, top right)" }}
        className="ios-glass-strong w-56 p-1.5 rounded-[22px] glass-border data-[state=open]:animate-glass-pop-in data-[state=closed]:animate-glass-pop-out motion-reduce:!animate-none [&[data-side=bottom][data-align=end]]:[--popover-origin:top_right] [&[data-side=bottom][data-align=start]]:[--popover-origin:top_left] [&[data-side=top][data-align=end]]:[--popover-origin:bottom_right]"
      >
        <div className="flex flex-col" role="menu">
          <div className="flex flex-col gap-1 px-3 py-2.5 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="glass-icon-circle"><Link2 className="w-3.5 h-3.5" /></span>
              <span className="text-[13px] font-medium text-primary dark:text-foreground truncate flex-1">{url}</span>
            </div>
            <button type="button" role="menuitem" onClick={handleCopy} className="mt-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[13px] font-semibold text-accent-foreground bg-accent/90 hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </button>
          </div>
          <div className="h-px bg-primary/10 dark:bg-white/10 mx-2" />
          {typeof navigator !== "undefined" && !!navigator.share && (
            <>
              <button type="button" role="menuitem" onClick={handleNativeShare} className={menuItemClass}>
                <span className="glass-icon-circle"><Share className="w-3.5 h-3.5" /></span>
                <span>Share via…</span>
              </button>
              <div className="h-px bg-primary/10 dark:bg-white/10 mx-2" />
            </>
          )}
          <button type="button" role="menuitem" onClick={handleWhatsApp} className={menuItemClass}>
            <span className="glass-icon-circle"><MessageCircle className="w-3.5 h-3.5" /></span>
            <span>WhatsApp</span>
          </button>
          <div className="h-px bg-primary/10 dark:bg-white/10 mx-2" />
          <button type="button" role="menuitem" onClick={handleTwitter} className={menuItemClass}>
            <span className="glass-icon-circle"><Link2 className="w-3.5 h-3.5" /></span>
            <span>Twitter / X</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

/* ── Card HoverActions (3-dot menu) ── */
const HoverActions: React.FC<{ card: LinkCard }> = ({ card }) => {
  const [open, setOpen] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const stop = (e: React.SyntheticEvent) => { e.preventDefault(); e.stopPropagation(); };

  const spawnRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) return;
    const container = contentRef.current;
    if (!container) return;
    if (e.key === "Tab") {
      const focusable = container.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, [open]);

  useEffect(() => {
    if (!open && triggerRef.current) {
      const t = setTimeout(() => triggerRef.current?.focus(), 16);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleShare = async (e: React.MouseEvent) => {
    stop(e);
    const shareData = { title: card.title, text: `Check out ${card.title}${card.subtitle ? ` — ${card.subtitle}` : ""}`, url: card.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(card.href); toast({ title: "Link copied", description: card.href }); }
    } catch { /* cancelled */ }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          onClick={(e) => { stop(e); spawnRipple(e); setOpen((v) => !v); }}
          aria-label="More actions"
          aria-expanded={open}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full overflow-hidden transition-all duration-300 ease-smooth ${
            open
              ? "ios-glass glass-border text-primary scale-110"
              : "text-muted-foreground border border-transparent hover:text-primary"
          }`}
        >
          <MoreVertical className="w-4 h-4 relative z-10" />
          {ripples.map((r) => (
            <span
              key={r.id}
              aria-hidden
              className="absolute rounded-full bg-primary/40 dark:bg-white/40 pointer-events-none animate-ripple-ios motion-reduce:hidden"
              style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
            />
          ))}
        </button>
      </PopoverTrigger>
      <PopoverContent
        ref={contentRef}
        align="end"
        side="left"
        sideOffset={10}
        onClick={stop}
        onKeyDown={handleKeyDown}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const first = contentRef.current?.querySelector<HTMLElement>('a[href], button');
          first?.focus();
        }}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={() => setOpen(false)}
        onFocusOutside={() => setOpen(false)}
        onInteractOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
        style={{ transformOrigin: "var(--popover-origin, top right)" }}
        className="ios-glass-strong w-56 p-1.5 rounded-[22px] glass-border data-[state=open]:animate-glass-pop-in data-[state=closed]:animate-glass-pop-out motion-reduce:!animate-none motion-reduce:transition-none [&[data-side=top][data-align=end]]:[--popover-origin:bottom_right] [&[data-side=top][data-align=start]]:[--popover-origin:bottom_left] [&[data-side=bottom][data-align=end]]:[--popover-origin:top_right] [&[data-side=bottom][data-align=start]]:[--popover-origin:top_left] [&[data-side=left]]:[--popover-origin:top_right] [&[data-side=right]]:[--popover-origin:top_left]"
      >
        <div className="flex flex-col" role="menu">
          <a
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-medium text-primary dark:text-foreground hover:bg-primary/5 dark:hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>Open</span>
            <span className="glass-icon-circle"><ExternalLink className="w-3.5 h-3.5" /></span>
          </a>
          <div className="h-px bg-primary/10 dark:bg-white/10 mx-2" />
          <button
            type="button"
            role="menuitem"
            onClick={handleShare}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-medium text-primary dark:text-foreground hover:bg-primary/5 dark:hover:bg-white/10 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>Share</span>
            <span className="glass-icon-circle"><Share className="w-3.5 h-3.5" /></span>
          </button>
          <div className="h-px bg-primary/10 dark:bg-white/10 mx-2" />
          <a
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl text-[13px] font-semibold text-accent hover:bg-primary/5 dark:hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>Follow</span>
            <span className="glass-icon-circle-accent"><UserPlus className="w-3.5 h-3.5" /></span>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const PersonalLanding: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  return (
    <div
      className="min-h-screen w-full flex items-start justify-center p-4 sm:p-8 font-sans relative overflow-hidden transition-colors duration-700 ease-smooth"
      style={{ background: "var(--gradient-warm)" }}
    >
      {/* Foggy blurred background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-accent/40 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] rounded-full bg-primary/30 blur-3xl animate-float-slower" />
        <div className="absolute bottom-[-8rem] left-1/4 w-[24rem] h-[24rem] rounded-full bg-accent/25 blur-3xl animate-float-slow" />
      </div>

      <div className="ios-glass-strong glass-border w-full max-w-md rounded-3xl p-5 sm:p-6 relative z-10 animate-scale-in transition-colors duration-700 ease-smooth">
        {/* Top bar */}
        <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
          <a
            href="mailto:anasaymah@gmail.com"
            aria-label="Send email"
            className="ios-glass glass-border group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-smooth hover:scale-110 active:scale-95"
          >
            <MailIcon className="w-[18px] h-[18px] text-primary transition-colors duration-300 group-hover:text-accent" />
          </a>
          <div className="flex gap-2">
            <button
              onClick={() => setIsDark((v) => !v)}
              aria-label="Toggle night mode"
              className="ios-glass glass-border group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-smooth hover:scale-110 hover:text-accent active:scale-95 overflow-hidden"
            >
              <span key={isDark ? "sun" : "moon"} className="inline-flex animate-scale-in">
                {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
              </span>
            </button>
            <SharePopover />
          </div>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center mt-4">
          <div
            className="rounded-full p-1 bg-gradient-to-br from-accent to-primary/40 animate-fade-in-up transition-transform duration-500 ease-smooth hover:scale-105"
            style={{ animationDelay: "150ms" }}
          >
            <img
              src={anasAvatar}
              alt="Anas Ayman Elfeky's avatar"
              className="w-28 h-28 rounded-full object-cover ring-2 ring-card transition-all duration-500"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-primary tracking-tight animate-fade-in-up transition-colors duration-500" style={{ animationDelay: "250ms" }}>
            Anas Ayman
          </h1>
          <p className="mt-1 text-base font-semibold text-accent animate-fade-in-up transition-colors duration-500" style={{ animationDelay: "320ms" }}>
            ECE Engineer
          </p>

          {/* Social row */}
          <div className="flex gap-5 mt-4 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="ios-glass glass-border w-10 h-10 rounded-full flex items-center justify-center text-primary transition-all duration-300 ease-smooth hover:scale-110 hover:text-accent active:scale-95"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Tagline with animated plane */}
          <p className="mt-8 text-base font-bold text-primary flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: "480ms" }}>
            Forward to a better future <TakeoffPlane />
          </p>
        </div>

        {/* Link cards */}
        <div className="mt-6 flex flex-col gap-3">
          {linkCards.map((card, i) => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ animationDelay: `${560 + i * 80}ms` }}
              className="ios-glass glass-border group relative rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent/50 active:scale-[0.98] animate-fade-in-up"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-accent-foreground bg-gradient-to-br from-accent to-accent/70 shadow-sm transition-all duration-300 ease-smooth group-hover:scale-105 group-hover:shadow-md">
                {card.icon}
              </div>
              <div className="flex-1 text-center pr-6">
                <div className="font-semibold text-primary transition-colors duration-300">{card.title}</div>
                {card.subtitle && <div className="text-xs text-muted-foreground mt-0.5 transition-colors duration-300">{card.subtitle}</div>}
              </div>
              <HoverActions card={card} />
            </a>
          ))}
        </div>

        {/* Decorative signature */}
        <div className="mt-10 sm:mt-12 pt-6 flex justify-center">
          <SignatureSVG static noMask blendMode="multiply" lightOpacity={0.85} darkOpacity={0.95} className="w-40 sm:w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default PersonalLanding;
