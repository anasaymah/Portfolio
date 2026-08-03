// Public profile data exposed by both the landing page and the MCP server.

export interface ProfileLink {
  platform: string;
  handle: string;
  url: string;
  kind: "social" | "contact";
}

export const PROFILE = {
  name: "Anas Ayman",
  headline: "Personal landing page",
  siteUrl: "https://anasayman.lovable.app",
};

export const PROFILE_LINKS: ProfileLink[] = [
  { platform: "Instagram", handle: "@anasaymah", url: "https://www.instagram.com/anasaymah", kind: "social" },
  { platform: "TikTok", handle: "@anasaymah", url: "https://www.tiktok.com/@anasaymah", kind: "social" },
  { platform: "YouTube", handle: "@AnasAymah", url: "https://www.youtube.com/@AnasAymah", kind: "social" },
  { platform: "Facebook", handle: "Anas Ayman", url: "https://www.facebook.com/anasaymah", kind: "social" },
  { platform: "LinkedIn", handle: "in/anasayman", url: "https://linkedin.com/in/anasayman", kind: "social" },
  { platform: "Threads", handle: "@anasaymah", url: "https://www.threads.net/@anasaymah", kind: "social" },
  { platform: "GitHub", handle: "@anasaymah", url: "https://github.com/anasaymah", kind: "social" },
  { platform: "WhatsApp", handle: "Message me", url: "https://wa.me/201143730504", kind: "contact" },
];
