import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "./components/layout/AppSidebar";
import AppRoutes from "./routes/AppRoutes";
import { mainShellMetrics } from "./theme/layout";
import { ENGINE_RULE_COUNT } from "./utils/engineRuleCount";

const MOBILE_DRAWER_WIDTH = 280;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getPageInfo(pathname) {
  const pathnames = pathname.split("/").filter(Boolean);
  if (pathnames.length === 0) {
    return { title: "Engine Rules Library", subtitle: `${ENGINE_RULE_COUNT} rules` };
  }

  const current = pathnames[0];

  if (current === "engine" && (pathnames[1]?.includes("_success") || pathnames[1]?.includes("_failure"))) {
    return { title: "Engine Rule", subtitle: pathnames[1] || "Examples" };
  }
  if (
    current === "engine" &&
    pathnames[1] &&
    pathnames[1] !== "library"
  ) {
    return { title: "Engine Rule", subtitle: pathnames[1] };
  }
  if (pathname === "/" || current === "engine") {
    return { title: "Engine Rules Library", subtitle: `${ENGINE_RULE_COUNT} rules` };
  }
  if (current === "rule-lab") {
    return { title: "Rule Lab", subtitle: "Pattern analysis" };
  }
  if (pathname.startsWith("/test-runner/atomic-tests")) {
    return { title: "Atomic Tests", subtitle: "HTML fixtures" };
  }
  if (pathname.startsWith("/test-runner")) {
    return { title: "Test Runner", subtitle: "Playwright suites" };
  }
  if (pathnames.length === 1) {
    return { title: `${capitalizeFirstLetter(current)} Rules`, subtitle: "Legacy criteria" };
  }
  return { title: capitalizeFirstLetter(current), subtitle: "Rule testing" };
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { title, subtitle } = getPageInfo(location.pathname);
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
        <Toolbar sx={{ gap: 2, minHeight: 48, px: { xs: 2, sm: 3 } }}>
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
                display: "block",
                fontFamily: '"IBM Plex Mono", monospace',
                letterSpacing: "0.16em",
                color: "primary.main",
                fontSize: "0.58rem",
                lineHeight: 1.2,
                mb: 0.25,
              }}
            >
              TACTICAL HUD
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                fontSize: { xs: "0.78rem", sm: "0.85rem" },
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.3,
                overflowWrap: "anywhere",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right", flexShrink: 0, maxWidth: "40%" }}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                fontFamily: '"IBM Plex Mono", monospace',
                color: "primary.main",
                fontSize: { xs: "0.62rem", sm: "0.72rem" },
                letterSpacing: "0.08em",
              }}
            >
              NANOMACHINE LINK
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.62rem", overflowWrap: "anywhere" }}
            >
              {subtitle}
            </Typography>
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
        <Toolbar sx={{ minHeight: 48, flexShrink: 0 }} />
        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <AppRoutes navigate={navigate} />
        </Box>
      </Box>
    </Box>
  );
}
