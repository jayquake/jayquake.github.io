/**
 * Colour scheme: light by default, dark on request, persisted per browser.
 * The choice lives on <html data-theme>; public/index.html applies the stored
 * value before first paint so there is no flash.
 */
import { useCallback, useEffect, useState } from "react";

export const COLOR_SCHEME_KEY = "raiden-color-scheme";
export const SCHEMES = ["light", "dark"];

export function readScheme(storage) {
  try {
    const v = storage?.getItem(COLOR_SCHEME_KEY);
    return SCHEMES.includes(v) ? v : "light";
  } catch {
    return "light";
  }
}

export function applyScheme(scheme, root = typeof document !== "undefined" ? document.documentElement : null) {
  if (root) root.setAttribute("data-theme", scheme);
}

function storage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** @returns {[ "light" | "dark", (next: "light" | "dark") => void, () => void ]} */
export function useColorScheme() {
  const [scheme, setScheme] = useState(() => readScheme(storage()));

  useEffect(() => {
    applyScheme(scheme);
    try {
      storage()?.setItem(COLOR_SCHEME_KEY, scheme);
    } catch {
      /* ignore */
    }
  }, [scheme]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === COLOR_SCHEME_KEY) setScheme(readScheme(storage()));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback(() => setScheme((s) => (s === "dark" ? "light" : "dark")), []);
  return [scheme, setScheme, toggle];
}
