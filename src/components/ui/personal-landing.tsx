import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Github, Video, Youtube } from "lucide-react";
import anasAvatar from "@/assets/anas-avatar.jpeg";

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center gap-4">
      <div className="relative">
        <img
          src={anasAvatar}
          alt="Anas Ayman Elfeky's avatar"
          className="w-28 h-28 rounded-full object-cover ring-4 ring-white/70 shadow-xl"
        />
        <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full ring-2 ring-white" />
      </div>
      <h1 className="font-geist text-4xl sm:text-5xl font-black tracking-tight text-zinc-900">
        Hi, I'm Anas Ayman Elfeky
      </h1>
      <p className="max-w-xl text-zinc-600 text-base sm:text-lg leading-relaxed">
        I craft beautiful, performant web experiences with React, TypeScript,
        and modern UI frameworks.
      </p>
    </section>
  );
};

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "#",
    label: "YouTube",
    icon: <Youtube className="w-4 h-4" />,
    bg: "bg-red-500 hover:bg-red-600",
    text: "text-white",
  },
  {
    href: "#",
    label: "GitHub",
    icon: <Github className="w-4 h-4" />,
    bg: "bg-zinc-900 hover:bg-zinc-800",
    text: "text-white",
  },
  {
    href: "#",
    label: "Self Intro",
    icon: <Video className="w-4 h-4" />,
    bg: "bg-white hover:bg-zinc-100 border border-zinc-200",
    text: "text-zinc-900",
  },
];

const SocialsBlock: React.FC = () => (
  <div className="flex flex-wrap justify-center gap-3">
    {socialLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        className={twMerge(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5",
          link.bg,
          link.text,
        )}
      >
        {link.icon}
        {link.label}
      </a>
    ))}
  </div>
);

const AboutBlock: React.FC = () => (
  <div className="rounded-2xl bg-white/60 backdrop-blur p-6 border border-white/80 shadow-sm">
    <p className="text-zinc-700 text-center leading-relaxed">
      Passionate about building elegant, accessible, and high-performance web
      apps. Always learning, always sharing.
    </p>
  </div>
);

const ConnectSection: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateMessage = (msg: string) => {
    if (!msg.trim()) return "Message cannot be empty.";
    if (msg.trim().length < 3) return "Message must be at least 3 characters.";
    if (msg.length > 200) return "Message cannot exceed 200 characters.";
    return "";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateMessage(message);
    if (validationError) {
      setError(validationError);
      return;
    }
    setShowToast(true);
    setMessage("");
    setError("");
    if (inputRef.current) inputRef.current.blur();
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (error) setError("");
  };

  return (
    <section className="relative rounded-2xl bg-white/60 backdrop-blur p-6 border border-white/80 shadow-sm">
      {showToast && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-full shadow-md"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          Message sent!
        </div>
      )}
      <p className="text-zinc-700 text-center mb-4">
        Interested in collaborating, chatting about tech, or just saying hi?
        Send me a message below!
      </p>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Write a message..."
          maxLength={200}
          className="flex-1 px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Send
        </button>
      </form>
      {error && (
        <p className="mt-2 text-xs text-red-500 text-center">{error}</p>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export const PersonalLanding: React.FC = () => {
  return (
    <div className="font-inter relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 flex items-center justify-center px-4 py-12">
      {/* Animated background blob */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-rose-300/40 via-amber-200/40 to-sky-300/40 blur-3xl"
        style={{ animation: "fadeIn 1.2s ease-out" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-sky-300/40 via-violet-200/40 to-rose-300/40 blur-3xl"
        style={{ animation: "fadeIn 1.6s ease-out" }}
      />

      <main className="relative z-10 w-full max-w-xl flex flex-col gap-8">
        <HeroSection />
        <SocialsBlock />
        <AboutBlock />
        <ConnectSection />
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        .font-inter { font-family: 'Inter', system-ui, sans-serif; }
        .font-geist { font-family: 'Inter', system-ui, sans-serif; font-weight: 900; letter-spacing: -0.02em; }
      `}</style>
    </div>
  );
};

export default PersonalLanding;
