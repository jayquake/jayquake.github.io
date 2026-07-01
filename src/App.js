import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "./components/layout/AppSidebar";
import { HudPresence } from "./components/motion/HudMotion";
import AppRoutes from "./routes/AppRoutes";
import { mainShellMetrics } from "./theme/layout";
import { mgsFonts, raidenType } from "./theme/mgsTokens";
import { ENGINE_RULE_COUNT } from "./utils/engineRuleCount";
import { parseEngineSlug } from "./utils/engineExampleUtils";

const MOBILE_DRAWER_WIDTH = 280;
const SLIM_TOOLBAR = 36;
const DEFAULT_TOOLBAR = 48;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getShellMode(pathname) {
  if (pathname === "/" || pathname === "/engine/library") return "libraryHome";
  const engineMatch = pathname.match(/^\/engine\/([^/]+)$/);
  if (engineMatch && !engineMatch[1].includes("_")) return "libraryDetail";
  const exampleMatch = pathname.match(/^\/engine\/(.+)_(success|failure)$/);
  if (exampleMatch) return "example";
  return "default";
}

function getPageInfo(pathname) {
  const mode = getShellMode(pathname);
  const pathnames = pathname.split("/").filter(Boolean);

  if (mode === "libraryHome") {
    return { mode, hudLabel: "TACTICAL HUD", linkLabel: "NANOMACHINE LINK", subtitle: `${ENGINE_RULE_COUNT} rules` };
  }

  if (mode === "libraryDetail") {
    const ruleId = pathnames[1];
    return { mode, hudLabel: "TACTICAL HUD", linkLabel: "NANOMACHINE LINK", subtitle: ruleId };
  }

  if (mode === "example") {
    const { ruleId, variant } = parseEngineSlug(pathnames[1]);
    return {
      mode,
      hudLabel: "TACTICAL HUD",
      linkLabel: "EXAMPLE LINK",
      subtitle: ruleId,
      variant,
    };
  }

  const current = pathnames[0];
  if (current === "rule-lab") {
    return { mode: "default", title: "Rule Lab", hudLabel: "TACTICAL HUD", linkLabel: "NANOMACHINE LINK", subtitle: "Pattern analysis" };
  }
  if (pathname.startsWith("/test-runner/atomic-tests")) {
    return { mode: "default", title: "Atomic Tests", hudLabel: "TACTICAL HUD", linkLabel: "NANOMACHINE LINK", subtitle: "HTML fixtures" };
  }
  if (pathname.startsWith("/test-runner")) {
    return { mode: "default", title: "Test Runner", hudLabel: "TACTICAL HUD", linkLabel: "NANOMACHINE LINK", subtitle: "Playwright suites" };
  }
  if (pathnames.length === 1) {
    return {
      mode: "default",
      title: `${capitalizeFirstLetter(current)} Rules`,
      hudLabel: "TACTICAL HUD",
      linkLabel: "NANOMACHINE LINK",
      subtitle: "Legacy criteria",
    };
  }
  return {
    mode: "default",
    title: capitalizeFirstLetter(current),
    hudLabel: "TACTICAL HUD",
    linkLabel: "NANOMACHINE LINK",
    subtitle: "Rule testing",
  };
}

/** Stable motion key — avoids full-page transitions when switching rules in the library. */
function getRouteMotionKey(pathname) {
  const mode = getShellMode(pathname);
  if (mode === "libraryDetail") return "library-detail";
  if (mode === "example") {
    const match = pathname.match(/^\/engine\/(.+)_(success|failure)$/);
    return match ? `example-${match[1]}` : "example";
  }
  return pathname || "/";
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageInfo = getPageInfo(location.pathname);
  const isSlim = pageInfo.mode === "libraryHome" || pageInfo.mode === "libraryDetail" || pageInfo.mode === "example";
  const toolbarHeight = isSlim ? SLIM_TOOLBAR : DEFAULT_TOOLBAR;
  const shell = mainShellMetrics(drawerOpen);

  const sidebar = (
    <AppSidebar
      isOpen={drawerOpen || mobileOpen}
      onToggle={() => (mobileOpen ? setMobileOpen(false) : setDrawerOpen((o) => !o))}
      onCloseMobile={() => setMobileOpen(false)}
    />
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          ml: { xs: 0, md: `${shell.appBarMarginLeft}px` },
          width: { xs: "100%", md: shell.appBarWidth },
          maxWidth: { md: shell.appBarWidth },
          transition: (t) =>
            t.transitions.create(["width", "margin"], {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: toolbarHeight, px: { xs: 2, sm: 3 }, py: 0 }}>
          <IconButton
            edge="start"
            size="small"
            sx={{ display: { md: "none" } }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                ...raidenType.sectionLabel,
                fontSize: "0.58rem",
                lineHeight: 1.2,
                color: "primary.main",
              }}
            >
              {pageInfo.hudLabel}
            </Typography>
            {pageInfo.mode === "default" && pageInfo.title && (
              <Typography
                variant="body1"
                sx={{
                  fontFamily: mgsFonts.hud,
                  fontWeight: 600,
                  fontSize: { xs: "0.78rem", sm: "0.85rem" },
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  lineHeight: 1.3,
                  overflowWrap: "anywhere",
                }}
              >
                {pageInfo.title}
              </Typography>
            )}
            {pageInfo.mode === "example" && (
              <Typography
                variant="caption"
                sx={{ fontFamily: mgsFonts.hud, color: "text.secondary", letterSpacing: "0.06em" }}
              >
                {pageInfo.variant === "success" ? "SUCCESS EXAMPLES" : "FAILURE EXAMPLES"}
              </Typography>
            )}
          </Box>
          <Box sx={{ textAlign: "right", flexShrink: 0, maxWidth: "45%", display: "flex", alignItems: "center", gap: 1 }}>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  fontFamily: mgsFonts.hud,
                  color: "primary.main",
                  fontSize: "0.58rem",
                  letterSpacing: "0.08em",
                }}
              >
                {pageInfo.linkLabel}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.62rem", overflowWrap: "anywhere", fontFamily: mgsFonts.hud }}
              >
                {pageInfo.subtitle}
              </Typography>
            </Box>
            {pageInfo.mode === "example" && (
              <Chip
                label={pageInfo.variant}
                size="small"
                color={pageInfo.variant === "success" ? "success" : "error"}
                variant="outlined"
                sx={{ height: 20, fontSize: "0.58rem", textTransform: "uppercase" }}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: MOBILE_DRAWER_WIDTH,
            maxWidth: "85vw",
            boxSizing: "border-box",
          },
        }}
      >
        {sidebar}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: shell.sidebarWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: shell.sidebarWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
          },
        }}
        open
      >
        {sidebar}
      </Drawer>

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        <Toolbar sx={{ minHeight: toolbarHeight, flexShrink: 0 }} />
        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <HudPresence
            presenceKey={getRouteMotionKey(location.pathname)}
            transitionPreset="route"
            style={{ flex: 1 }}
          >
            <AppRoutes navigate={navigate} />
          </HudPresence>
        </Box>
      </Box>
    </Box>
  );
}
