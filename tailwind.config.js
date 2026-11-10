/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        shell: {
          main: "hsl(var(--shell-main) / <alpha-value>)",
          sidebar: "hsl(var(--shell-sidebar) / <alpha-value>)",
          elevated: "hsl(var(--shell-elevated) / <alpha-value>)",
          panel: "hsl(var(--shell-panel) / <alpha-value>)",
          input: "hsl(var(--shell-input) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--border-default) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "hsl(var(--text-primary) / <alpha-value>)",
          secondary: "hsl(var(--text-secondary) / <alpha-value>)",
          muted: "hsl(var(--text-muted) / <alpha-value>)",
          accent: "hsl(var(--text-accent) / <alpha-value>)",
        },
        status: {
          pass: "hsl(var(--status-pass) / <alpha-value>)",
          fail: "hsl(var(--status-fail) / <alpha-value>)",
          warn: "hsl(var(--status-warn) / <alpha-value>)",
        },
      },
      keyframes: {
        "progress-indeterminate": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(250%)" },
        },
      },
      animation: {
        "progress-indeterminate": "progress-indeterminate 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
