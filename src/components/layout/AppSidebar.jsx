import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";
import SearchComponent from "./search";
import RuleTreeSidebar from "./RuleTreeSidebar";

const NAV_LINKS = [
  { label: "Engine Library", path: "/" },
  { label: "Test Runner", path: "/test-runner/library" },
  { label: "Atomic Tests", path: "/test-runner/atomic-tests" },
  { label: "Rule Lab", path: "/rule-lab" },
];

function isNavActive(pathname, linkPath) {
  if (linkPath === "/") return pathname === "/";
  if (linkPath === "/test-runner/library") {
    return pathname.startsWith("/test-runner") && !pathname.startsWith("/test-runner/atomic-tests");
  }
  return pathname.startsWith(linkPath);
}

export default function AppSidebar({
  isOpen,
  onToggle,
  onCloseMobile,
}) {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          px: isOpen ? 2 : 1,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
          minHeight: 56,
        }}
      >
        {isOpen ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box
              sx={{
                width: 3,
                height: 28,
                background: (t) =>
                  `linear-gradient(180deg, ${t.palette.primary.main}, transparent)`,
                boxShadow: "0 0 10px rgba(94,200,232,0.5)",
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  letterSpacing: "0.14em",
                  color: "secondary.main",
                  lineHeight: 1,
                }}
              >
                RAIDEN
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: "primary.main",
                  letterSpacing: "0.08em",
                  fontSize: "0.62rem",
                }}
              >
                CARBON SUIT HUD
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography
            variant="caption"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "primary.main",
              mx: "auto",
            }}
          >
            R
          </Typography>
        )}
        <IconButton size="small" onClick={onToggle} aria-label="Toggle sidebar">
          {isOpen ? <ChevronLeftIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
        </IconButton>
      </Box>

      <List dense disablePadding sx={{ py: 0.5 }}>
        {NAV_LINKS.map((link) => {
          const active = isNavActive(location.pathname, link.path);
          return (
            <ListItemButton
              key={link.path}
              component={RouterLink}
              to={link.path}
              selected={active}
              onClick={onCloseMobile}
              sx={{
                py: 0.75,
                px: isOpen ? 2 : 1.5,
                minHeight: 36,
                fontFamily: '"IBM Plex Mono", monospace',
                "&.Mui-selected": {
                  pl: isOpen ? "calc(16px - 2px)" : "calc(12px - 2px)",
                },
              }}
            >
              <ListItemText
                primary={isOpen ? link.label : link.label.charAt(0)}
                primaryTypographyProps={{
                  fontSize: "0.75rem",
                  fontWeight: active ? 600 : 400,
                  fontFamily: '"IBM Plex Mono", monospace',
                  letterSpacing: "0.04em",
                  color: active ? "primary.main" : "text.secondary",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {isOpen && (
        <Box sx={{ px: 2, py: 1 }}>
          <SearchComponent />
        </Box>
      )}

      <Divider sx={{ my: 0.5 }} />

      {isOpen && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            px: 2,
            py: 0.75,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontSize: "0.65rem",
          }}
        >
          Rules
        </Typography>
      )}

      <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        <RuleTreeSidebar
          isOpen={isOpen}
          showDashboardLink={false}
          onRequestOpen={() => !isOpen && onToggle()}
          onCloseMobile={onCloseMobile}
        />
      </Box>
    </Box>
  );
}
