import React from "react";
import {
  Asterisk,
  Bell,
  Share,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Music2,
  Github,
  AtSign,
  MoreVertical,
  Plane,
} from "lucide-react";
import anasAvatar from "@/assets/anas-avatar.jpeg";

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
    title: "TikTok",
    subtitle: "@anasaymah",
    icon: <Music2 className="w-6 h-6" fill="currentColor" strokeWidth={0} />,
    href: TIKTOK_URL,
  },
  {
    title: "Instagram",
    subtitle: "@anasaymah",
    icon: <Instagram className="w-6 h-6" />,
    href: INSTAGRAM_URL,
  },
  {
    title: "Facebook",
    subtitle: "Anas Ayman",
    icon: <Facebook className="w-6 h-6" fill="currentColor" strokeWidth={0} />,
    href: FACEBOOK_URL,
  },
  {
    title: "LinkedIn",
    subtitle: "in/anasayman",
    icon: <Linkedin className="w-6 h-6" fill="currentColor" strokeWidth={0} />,
    href: LINKEDIN_URL,
  },
  {
    title: "YouTube",
    subtitle: "@AnasAymah",
    icon: <Youtube className="w-6 h-6" fill="currentColor" strokeWidth={0} />,
    href: YOUTUBE_URL,
  },
  {
    title: "GitHub",
    subtitle: "@anasaymah",
    icon: <Github className="w-6 h-6" />,
    href: GITHUB_URL,
  },
  {
    title: "Threads",
    subtitle: "@anasaymah",
    icon: <AtSign className="w-6 h-6" />,
    href: THREADS_URL,
  },
];

const socialIcons = [
  { icon: <Facebook className="w-6 h-6" fill="currentColor" strokeWidth={0} />, href: FACEBOOK_URL, label: "Facebook" },
  { icon: <Instagram className="w-6 h-6" />, href: INSTAGRAM_URL, label: "Instagram" },
  { icon: <Music2 className="w-6 h-6" fill="currentColor" strokeWidth={0} />, href: TIKTOK_URL, label: "TikTok" },
  { icon: <Youtube className="w-6 h-6" fill="currentColor" strokeWidth={0} />, href: YOUTUBE_URL, label: "YouTube" },
];

export const PersonalLanding: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full flex items-start justify-center p-4 sm:p-8 font-sans"
      style={{ background: "var(--gradient-warm)" }}
    >
      <div
        className="w-full max-w-md bg-card rounded-3xl p-5 sm:p-6 relative border border-border/60"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shadow-sm border border-border/50">
            <Asterisk className="w-5 h-5 text-primary" strokeWidth={2.5} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shadow-sm border border-border/50">
              <Bell className="w-5 h-5 text-primary" />
            </button>
            <button className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shadow-sm border border-border/50">
              <Share className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center mt-4">
          <div className="rounded-full p-1 bg-gradient-to-br from-accent to-primary/40">
            <img
              src={anasAvatar}
              alt="Anas Ayman Elfeky's avatar"
              className="w-28 h-28 rounded-full object-cover ring-2 ring-card"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-primary tracking-tight">
            Anas Ayman
          </h1>
          <p className="mt-1 text-base font-semibold text-accent">ECE Engineer</p>

          {/* Social row */}
          <div className="flex gap-6 mt-4 text-primary">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="hover:text-accent transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Tagline */}
          <p className="mt-8 text-base font-bold text-primary flex items-center gap-2">
            Forward to a better future <Plane className="w-4 h-4 text-accent" fill="currentColor" strokeWidth={0} />
          </p>
        </div>

        {/* Link cards */}
        <div className="mt-6 flex flex-col gap-3">
          {linkCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-surface rounded-2xl p-4 flex items-center border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-10 h-10 flex items-center justify-center text-primary">
                {card.icon}
              </div>
              <div className="flex-1 text-center pr-6">
                <div className="font-semibold text-primary">{card.title}</div>
                {card.subtitle && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {card.subtitle}
                  </div>
                )}
              </div>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary"
                onClick={(e) => e.preventDefault()}
                aria-label="More"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalLanding;
