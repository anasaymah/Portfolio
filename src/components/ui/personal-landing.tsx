import React, { useEffect, useState } from "react";
import { Asterisk, Share, MoreVertical, Plane, Sun, Moon, ExternalLink, UserPlus } from "lucide-react";
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

const linkCards: LinkCard[] = [
  {
    title: "Instagram",
    subtitle: "@anasaymah",
    icon: <InstagramIcon className="w-6 h-6" />,
    href: INSTAGRAM_URL,
  },
  {
    title: "TikTok",
    subtitle: "@anasaymah",
    icon: <TikTokIcon className="w-6 h-6" />,
    href: TIKTOK_URL,
  },
  {
    title: "YouTube",
    subtitle: "@AnasAymah",
    icon: <YouTubeIcon className="w-6 h-6" />,
    href: YOUTUBE_URL,
  },
  {
    title: "Facebook",
    subtitle: "Anas Ayman",
    icon: <FacebookIcon className="w-6 h-6" />,
    href: FACEBOOK_URL,
  },
  {
    title: "LinkedIn",
    subtitle: "in/anasayman",
    icon: <LinkedInIcon className="w-6 h-6" />,
    href: LINKEDIN_URL,
  },
  {
    title: "Threads",
    subtitle: "@anasaymah",
    icon: <ThreadsIcon className="w-6 h-6" />,
    href: THREADS_URL,
  },
  {
    title: "GitHub",
    subtitle: "@anasaymah",
    icon: <GitHubIcon className="w-6 h-6" />,
    href: GITHUB_URL,
  },
];

const socialIcons = [
  { icon: <FacebookIcon className="w-5 h-5" />, href: FACEBOOK_URL, label: "Facebook" },
  { icon: <InstagramIcon className="w-5 h-5" />, href: INSTAGRAM_URL, label: "Instagram" },
  { icon: <TikTokIcon className="w-5 h-5" />, href: TIKTOK_URL, label: "TikTok" },
  { icon: <YouTubeIcon className="w-5 h-5" />, href: YOUTUBE_URL, label: "YouTube" },
];

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

      <div
        className="w-full max-w-md bg-card/70 backdrop-blur-xl rounded-3xl p-5 sm:p-6 relative border border-border/60 z-10 animate-scale-in transition-colors duration-700 ease-smooth"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
          <a
            href="mailto:anasaymah@gmail.com"
            aria-label="Send email"
            className="group w-10 h-10 rounded-full bg-surface/80 backdrop-blur flex items-center justify-center shadow-sm border border-border/50 transition-all duration-300 ease-smooth hover:scale-110 hover:shadow-md active:scale-95"
          >
            <MailIcon className="w-[18px] h-[18px] text-primary transition-colors duration-300 group-hover:text-accent" />
          </a>
          <div className="flex gap-2">
            <button
              onClick={() => setIsDark((v) => !v)}
              aria-label="Toggle night mode"
              className="group w-10 h-10 rounded-full bg-surface/80 backdrop-blur flex items-center justify-center shadow-sm border border-border/50 transition-all duration-300 ease-smooth hover:scale-110 hover:text-accent hover:shadow-md active:scale-95 overflow-hidden"
            >
              <span key={isDark ? "sun" : "moon"} className="inline-flex animate-scale-in">
                {isDark ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
              </span>
            </button>
            <button
              onClick={async () => {
                const url = window.location.href;
                const shareData = {
                  title: "Anas Ayman",
                  text: "Check out Anas Ayman's links",
                  url,
                };
                try {
                  if (navigator.share) {
                    await navigator.share(shareData);
                  } else {
                    await navigator.clipboard.writeText(url);
                    alert("Link copied to clipboard!");
                  }
                } catch (e) {
                  // user cancelled
                }
              }}
              aria-label="Share this site"
              className="group w-10 h-10 rounded-full bg-surface/80 backdrop-blur flex items-center justify-center shadow-sm border border-border/50 transition-all duration-300 ease-smooth hover:scale-110 hover:text-accent hover:shadow-md active:scale-95"
            >
              <Share className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-accent" />
            </button>
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
          <h1
            className="mt-4 text-3xl font-bold text-primary tracking-tight animate-fade-in-up transition-colors duration-500"
            style={{ animationDelay: "250ms" }}
          >
            Anas Ayman
          </h1>
          <p
            className="mt-1 text-base font-semibold text-accent animate-fade-in-up transition-colors duration-500"
            style={{ animationDelay: "320ms" }}
          >
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
                className="w-10 h-10 rounded-full bg-surface/70 backdrop-blur flex items-center justify-center text-primary border border-border/50 shadow-sm transition-all duration-300 ease-smooth hover:scale-110 hover:shadow-md hover:text-accent hover:border-accent/40 active:scale-95"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Tagline */}
          <p
            className="mt-8 text-base font-bold text-primary flex items-center gap-2 animate-fade-in-up"
            style={{ animationDelay: "480ms" }}
          >
            Forward to a better future{" "}
            <Plane className="w-4 h-4 text-accent" fill="currentColor" strokeWidth={0} />
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
              className="group relative bg-surface/80 backdrop-blur rounded-2xl p-3 flex items-center gap-3 border border-border/60 shadow-sm transition-all duration-300 ease-smooth hover:shadow-lg hover:-translate-y-1 hover:border-accent/50 hover:bg-surface active:scale-[0.98] animate-fade-in-up"
            >
              {/* Icon tile — unified accent gradient */}
              <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-accent-foreground bg-gradient-to-br from-accent to-accent/70 shadow-sm transition-all duration-300 ease-smooth group-hover:scale-105 group-hover:shadow-md">
                {card.icon}
              </div>
              <div className="flex-1 text-center pr-6">
                <div className="font-semibold text-primary transition-colors duration-300">
                  {card.title}
                </div>
                {card.subtitle && (
                  <div className="text-xs text-muted-foreground mt-0.5 transition-colors duration-300">
                    {card.subtitle}
                  </div>
                )}
              </div>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors duration-300"
                onClick={(e) => e.preventDefault()}
                aria-label="More"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </a>
          ))}
        </div>

        {/* Decorative signature — handwritten reveal */}
        <div className="mt-10 sm:mt-12 pt-6 flex justify-center">
          <SignatureSVG
            durationMs={2400}
            startDelayMs={200}
            edgeSoftness={5}
            rootMargin="0px 0px -55% 0px"
            threshold={0.05}
            blendMode="multiply"
            lightOpacity={0.85}
            darkOpacity={0.95}
            className="w-40 sm:w-48 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalLanding;
