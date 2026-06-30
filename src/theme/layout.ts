/** Shell layout — pixel sidebar for predictable main width. */
export const LAYOUT = {
  sidebarOpenPx: 240,
  sidebarCollapsedPx: 52,
} as const;

export function mainShellMetrics(drawerOpen: boolean) {
  const sidebarPx = drawerOpen ? LAYOUT.sidebarOpenPx : LAYOUT.sidebarCollapsedPx;
  return {
    sidebarWidth: sidebarPx,
    /** Fixed AppBar only — permanent drawer already consumes flex space */
    appBarMarginLeft: sidebarPx,
    appBarWidth: `calc(100% - ${sidebarPx}px)`,
  };
}

/** Column 2 + 3 split inside the main workspace */
export const LIBRARY_LAYOUT = {
  detailCollapsedPx: 32,
  /** Detail pane: ~40% of main workspace */
  detailColumn: "minmax(300px, 40%)",
  listColumn: "minmax(260px, 1fr)",
} as const;

/** Full-width left-aligned scroll region for example / detail pages */
export const PAGE_SHELL = {
  width: "100%",
  maxWidth: "100%",
  height: "100%",
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  px: { xs: 2, sm: 2.5, md: 3 },
  py: { xs: 2, sm: 2.5 },
  boxSizing: "border-box",
  textAlign: "left",
  alignItems: "stretch",
} as const;

/** Raiden HUD panel — matches engine library detail pane */
export const HUD_PANEL = {
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  boxShadow: "none",
} as const;
