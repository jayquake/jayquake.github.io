/**
 * Design token checks (replaces the MUI theme test):
 * - light and dark define the same tokens
 * - text and status/severity colours meet contrast on every shell surface
 * - the 12px text floor still holds for the shared type presets
 */
import fs from "fs";
import path from "path";
import { MIN_TEXT_SIZE, raidenType } from "./mgsTokens";
import { IMPACTS, SEVERITY, severityOf } from "./severity";

const css = fs.readFileSync(path.join(__dirname, "..", "index.css"), "utf8");

function block(selector) {
  const start = css.indexOf(selector);
  if (start < 0) throw new Error(`missing ${selector}`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  const vars = {};
  for (const m of css.slice(open + 1, close).matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) vars[m[1]] = m[2].trim();
  return vars;
}

const light = block(':root,\n[data-theme="light"]');
const dark = block('[data-theme="dark"] {');

function hslToRgb(value) {
  const [h, s, l] = value.split(/\s+/).map((p) => parseFloat(p));
  const sat = s / 100;
  const lig = l / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n) => lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [x, y] = [luminance(hslToRgb(a)), luminance(hslToRgb(b))].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

const SURFACES = ["shell-main", "shell-sidebar", "shell-panel", "shell-elevated"];
const TEXT = ["text-primary", "text-secondary", "text-muted", "text-accent"];
const STATUS = ["status-pass", "status-fail", "status-warn", "status-info"];
const SEVERITIES = IMPACTS.map((i) => `severity-${i}`);

describe("token parity", () => {
  test("dark defines every light token and nothing else", () => {
    expect(Object.keys(dark).sort()).toEqual(Object.keys(light).sort());
  });

  test("every token is an HSL triple", () => {
    for (const [name, value] of [...Object.entries(light), ...Object.entries(dark)]) {
      expect([name, /^\d+(\.\d+)? \d+(\.\d+)?% \d+(\.\d+)?%$/.test(value)]).toEqual([name, true]);
    }
  });
});

describe.each([
  ["light", light],
  ["dark", dark],
])("%s contrast", (_name, vars) => {
  test.each(TEXT.flatMap((t) => SURFACES.map((s) => [t, s])))("%s on %s >= 4.5", (t, s) => {
    expect(contrast(vars[t], vars[s])).toBeGreaterThanOrEqual(4.5);
  });

  test.each([...STATUS, ...SEVERITIES].flatMap((t) => ["shell-panel", "shell-elevated"].map((s) => [t, s])))(
    "%s on %s >= 4.5",
    (t, s) => {
      expect(contrast(vars[t], vars[s])).toBeGreaterThanOrEqual(4.5);
    }
  );

  test("on-accent text on primary >= 4.5 (filled buttons, active tabs)", () => {
    expect(contrast(vars["on-accent"], vars.primary)).toBeGreaterThanOrEqual(4.5);
  });

  // `text-primary` / `text-primary-bright` are used for links, ids and labels.
  test.each(["primary", "primary-bright", "primary-dim"].flatMap((t) => [...SURFACES, "accent"].map((s) => [t, s])))(
    "%s as text on %s >= 4.5",
    (t, s) => {
      expect(contrast(vars[t], vars[s])).toBeGreaterThanOrEqual(4.5);
    }
  );
});

describe("severity family", () => {
  test("each impact maps to its own token and label", () => {
    for (const impact of IMPACTS) {
      expect(SEVERITY[impact].color).toBe(`hsl(var(--severity-${impact}))`);
      expect(SEVERITY[impact].label.toLowerCase()).toBe(impact);
    }
    expect(severityOf("CRITICAL")).toBe(SEVERITY.critical);
    expect(severityOf("unknown")).toBe(SEVERITY.minor);
    expect(severityOf(undefined)).toBe(SEVERITY.minor);
  });
});

describe("12px text floor", () => {
  const px = (v) => (v.endsWith("rem") ? parseFloat(v) * 16 : parseFloat(v));
  test("MIN_TEXT_SIZE is 12px", () => {
    expect(px(MIN_TEXT_SIZE)).toBe(12);
  });
  test("type presets never go below the floor", () => {
    for (const [name, preset] of Object.entries(raidenType)) {
      const sizes = typeof preset.fontSize === "object" ? Object.values(preset.fontSize) : [preset.fontSize];
      for (const size of sizes) expect([name, px(size) >= 12]).toEqual([name, true]);
    }
  });
});
