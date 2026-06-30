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
import { ENGINE_RULE_COUNT } from "./utils/engineRuleCount";

const drawerWidth = 280;
const collapsedWidth = 52;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getPageInfo(pathname) {
  const pathnames = pathname.split("/").filter(Boolean);
  if (pathnames.length === 0) {
    return { title: "Engine Library", subtitle: `${ENGINE_RULE_COUNT} rules` };
  }

  const current = pathnames[0];

  if (current === "engine" && pathnames[1] === "library") {
    return { title: "Engine Library", subtitle: `${ENGINE_RULE_COUNT} rules` };
  }
  if (current === "engine") {
    return { title: "Engine Rule", subtitle: pathnames[1] || "Detail" };
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
  const sidebarWidth = drawerOpen ? drawerWidth : collapsedWidth;

  const sidebar = (
    <AppSidebar
      isOpen={drawerOpen || mobileOpen}
      onToggle={() => (mobileOpen ? setMobileOpen(false) : setDrawerOpen((o) => !o))}
      onCloseMobile={() => setMobileOpen(false)}
    />
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          ml: { md: `${sidebarWidth}px` },
          width: { md: `calc(100% - ${sidebarWidth}px)` },
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
                color: "primary.dark",
                fontSize: "0.58rem",
                lineHeight: 1,
                mb: 0.25,
              }}
            >
              TACTICAL HUD
            </Typography>
            <Typography
              variant="body1"
              noWrap
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                fontFamily: '"IBM Plex Mono", monospace',
                color: "primary.main",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textShadow: "0 0 8px rgba(94,200,232,0.35)",
              }}
            >
              NANOMACHINE LINK
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: "0.62rem" }}>
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
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {sidebar}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: sidebarWidth,
          flexShrink: 0,
          transition: (t) =>
            t.transitions.create("width", {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.enteringScreen,
            }),
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: (t) =>
              t.transitions.create("width", {
                easing: t.transitions.easing.sharp,
                duration: t.transitions.duration.enteringScreen,
              }),
          },
        }}
        open
      >
        {sidebar}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          minWidth: 0,
          ml: { md: `${sidebarWidth}px` },
          transition: (t) =>
            t.transitions.create("margin", {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Toolbar sx={{ minHeight: 48 }} />
        <AppRoutes navigate={navigate} />
      </Box>
    </Box>
  );
}
