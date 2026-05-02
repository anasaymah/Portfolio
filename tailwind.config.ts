import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--surface-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(20px, -25px) scale(1.06)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(-25px, 20px) scale(1.08)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(8deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "plane-fly": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(4px, -3px) rotate(8deg)" },
        },
        "plane-takeoff": {
          "0%": { transform: "translate(0, 0) rotate(0deg)", opacity: "1" },
          "15%": { transform: "translate(-2px, 1px) rotate(-3deg)", opacity: "1" },
          "30%": { transform: "translate(0, 0) rotate(0deg)", opacity: "1" },
          "50%": { transform: "translate(6px, -6px) rotate(12deg)", opacity: "1" },
          "70%": { transform: "translate(16px, -18px) rotate(25deg)", opacity: "0.8" },
          "85%": { transform: "translate(28px, -36px) rotate(35deg)", opacity: "0.3" },
          "100%": { transform: "translate(40px, -50px) rotate(40deg)", opacity: "0" },
        },
        "plane-return": {
          "0%": { transform: "translate(-30px, 30px) rotate(-20deg)", opacity: "0" },
          "40%": { transform: "translate(-8px, 4px) rotate(-5deg)", opacity: "0.6" },
          "70%": { transform: "translate(2px, -1px) rotate(3deg)", opacity: "1" },
          "100%": { transform: "translate(0, 0) rotate(0deg)", opacity: "1" },
        },
        "icon-pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        "glass-pop-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.82) translateY(-6px)",
            filter: "blur(8px)",
          },
          "60%": {
            opacity: "1",
            transform: "scale(1.02) translateY(0)",
            filter: "blur(0)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
            filter: "blur(0)",
          },
        },
        "glass-pop-out": {
          "0%": { opacity: "1", transform: "scale(1)", filter: "blur(0)" },
          "100%": {
            opacity: "0",
            transform: "scale(0.9) translateY(-4px)",
            filter: "blur(6px)",
          },
        },
        "ripple-ios": {
          "0%": { transform: "scale(0)", opacity: "0.55" },
          "60%": { opacity: "0.35" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "float-slower": "float-slower 16s ease-in-out infinite",
        "wiggle": "wiggle 0.5s ease-in-out",
        "spin-slow": "spin-slow 8s linear infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "plane-fly": "plane-fly 3s ease-in-out infinite",
        "plane-takeoff": "plane-takeoff 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "plane-return": "plane-return 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "icon-pop": "icon-pop 0.4s ease-out",
        "glass-pop-in": "glass-pop-in 280ms cubic-bezier(0.22, 1.2, 0.36, 1) both",
        "glass-pop-out": "glass-pop-out 160ms cubic-bezier(0.4, 0, 1, 1) both",
        "ripple-ios": "ripple-ios 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
