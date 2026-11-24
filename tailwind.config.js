/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // Theme follows <html data-theme>; see src/theme/colorScheme.js.
  darkMode: ["selector", '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          dim: "hsl(var(--primary-dim) / <alpha-value>)",
          bright: "hsl(var(--primary-bright) / <alpha-value>)",
          foreground: "hsl(var(--on-accent) / <alpha-value>)",
        },
        overlay: "hsl(var(--overlay) / <alpha-value>)",
        hover: "hsl(var(--hover) / <alpha-value>)",
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
          info: "hsl(var(--status-info) / <alpha-value>)",
        },
        severity: {
          critical: "hsl(var(--severity-critical) / <alpha-value>)",
          serious: "hsl(var(--severity-serious) / <alpha-value>)",
          moderate: "hsl(var(--severity-moderate) / <alpha-value>)",
          minor: "hsl(var(--severity-minor) / <alpha-value>)",
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
