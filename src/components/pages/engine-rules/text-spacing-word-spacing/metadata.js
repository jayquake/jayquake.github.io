// Generated metadata for text-spacing-word-spacing
// This file is auto-generated from index.ts to avoid module resolution issues

export const TextSpacingWordSpacing = {
  id: "text-spacing-word-spacing",
  title: `Word spacing should scale to at least 0.16 times the font size without loss of content or functionality`,
  description: `When word spacing is increased to 0.16 times the font size, text may be clipped, overlap, or overflow its container if styles like fixed heights, fixed widths, hidden overflow, forced no-wrap, or absolute positioning prevent proper reflow.`,
  advice: `Use flexible heights and widths, position elements in ways that allow text reflow, enable text wrapping, and avoid hidden overflow to ensure content remains readable when word spacing is scaled to 0.16 times the font size.`,
  impact: "minor",
  refs: [
    { type: "WCAG", id: "1.4.12", level: "AA", link: "https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html" },
    { type: "ACT", link: "https://act-rules.github.io/rules/9e45ec" }
  ]
};
