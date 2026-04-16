import {
  Accessibility as AccessibilityIcon,
  Biotech as BiotechIcon,
  BugReport as BugIcon,
  ChevronLeft as ChevronLeftIcon,
  DarkMode as DarkModeIcon,
  Dashboard as DashboardIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Science as ScienceIcon,
  Speed as SpeedIcon,
  Assessment as TestIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Chip,
  CssBaseline,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchComponent from "./components/layout/search";
import RuleTreeSidebar from "./components/layout/RuleTreeSidebar";
import engineRulesData from "./data/engine-rules-metadata.json";
import AppRoutes from "./routes/AppRoutes";
const drawerWidth = 300;
const collapsedDrawerWidth = 60;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }) => ({
  zIndex: isMobile ? theme.zIndex.appBar : theme.zIndex.drawer + 1,
  background: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  color: "#1e293b",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isMobile
    ? { marginLeft: 0, width: "100%" }
    : {
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
        ...(!open && {
          marginLeft: collapsedDrawerWidth,
          width: `calc(100% - ${collapsedDrawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }),
      }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isTestRunnerRoute = location.pathname.startsWith("/test-runner");
  const isRuleLabRoute = location.pathname.startsWith("/rule-lab");

  // UI State
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [testStatus, setTestStatus] = useState({ running: false, progress: 0 });

  // Data State
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDrawerToggle = () => setOpen(!open);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleThemeToggle = () => setDarkMode(!darkMode);

  // Fetch data and initialize notifications
  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
        setLoading(false);

        // Initialize test notifications
        setNotifications([
          {
            id: 1,
            message: "Test environment ready",
            type: "success",
            time: "now",
          },
          {
            id: 2,
            message: `${jsonData.length} rules loaded successfully`,
            type: "info",
            time: "1m ago",
          },
          {
            id: 3,
            message: "QA dashboard updated",
            type: "info",
            time: "2m ago",
          },
        ]);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        setNotifications([
          {
            id: 1,
            message: `Error loading rules: ${error.message}`,
            type: "error",
            time: "now",
          },
        ]);
      });
  }, []);

  // Handle search query
  const handleSearchChange = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name?.toLowerCase().includes(lowerCaseQuery) ||
        item.criteria?.toLowerCase().includes(lowerCaseQuery) ||
        item.shortDescription?.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  };

  // Calculate current page stats for header
  const getCurrentPageInfo = () => {
    if (pathnames.length === 0)
      return {
        title: "QA Dashboard",
        subtitle: "Accessibility Testing Platform",
      };

    const currentCriteria = pathnames[0];
    const criteriaTitle = capitalizeFirstLetter(currentCriteria);

    // Special case for engine rules
    if (currentCriteria === "engine" && pathnames.length === 1) {
      return {
        title: "Engine Rules",
        subtitle: `${engineRulesData.length} testing rules available`,
      };
    }

    if (currentCriteria === "rule-lab") {
      return {
        title: "Rule Lab",
        subtitle: "Analyze and discover accessibility patterns",
      };
    }

    if (pathnames.length === 1) {
      const rulesInCategory = data.filter((rule) =>
        rule.criteria?.toLowerCase().includes(currentCriteria.toLowerCase())
      ).length;
      return {
        title: `${criteriaTitle} Rules`,
        subtitle: `${rulesInCategory} testing rules available`,
      };
    }

    return { title: criteriaTitle, subtitle: "Rule Testing" };
  };

  const { title, subtitle } = getCurrentPageInfo();

  // Auto-collapse sidebar on test runner routes to maximise workspace
  useEffect(() => {
    if (isTestRunnerRoute) setOpen(false);
  }, [location.pathname, isTestRunnerRoute]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 25%, #f1f5f9 50%, #eef2ff 75%, #f8fafc 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 25% 15%, rgba(102, 126, 234, 0.06) 0%, transparent 40%), radial-gradient(circle at 75% 85%, rgba(167, 139, 250, 0.04) 0%, transparent 40%)",
        },
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open} isMobile={isMobile}>
        <Toolbar sx={{
          pr: 2,
          ...(isMobile
            ? { display: "flex", justifyContent: "space-between", gap: 1 }
            : {
                display: "grid",
                gridTemplateColumns: "auto minmax(200px, 400px) auto",
                gap: 3,
              }),
          alignItems: "center",
          width: "100%",
        }}>
          {/* Left Section */}
          <Box display="flex" alignItems="center" sx={{ justifySelf: isMobile ? undefined : "start" }}>
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={() => setOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: isMobile ? "0.95rem" : undefined }}
              >
                {title}
              </Typography>
              {!isMobile && (
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.8, fontSize: "0.75rem" }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Center Section - Search (hidden on mobile) */}
          <Box sx={{
            width: "100%",
            maxWidth: 400,
            justifySelf: "center",
            display: { xs: "none", md: "block" },
          }}>
            <SearchComponent
              data={data}
              onSearchChange={(e) => handleSearchChange(e.target.value)}
            />
          </Box>

          {/* Right Section - Actions */}
          <Box display="flex" alignItems="center" gap={isMobile ? 0.5 : 1.5} sx={{ justifySelf: isMobile ? undefined : "end" }}>
            {/* Test Status Indicator */}
            <Tooltip
              title={testStatus.running ? "Tests running..." : "Ready to test"}
            >
              <Chip
                icon={<SpeedIcon />}
                label={testStatus.running ? "Testing..." : "Ready"}
                size="small"
                color={testStatus.running ? "warning" : "success"}
                sx={{
                  bgcolor: testStatus.running
                    ? "rgba(255,193,7,0.2)"
                    : "rgba(76,175,80,0.2)",
                  color: "white",
                  fontWeight: 600,
                  display: { xs: "none", sm: "flex" },
                }}
              />
            </Tooltip>
            {/* Theme Toggle */}
            <Tooltip title="Toggle dark mode">
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Avatar
              role="button"
              tabIndex={0}
              sx={{
                width: 32,
                height: 32,
                background: "rgba(255,255,255,0.3)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255,255,255,0.5)",
                  transform: "scale(1.05)",
                },
                "&:focus": {
                  outline: "2px solid rgba(102, 126, 234, 0.5)",
                  outlineOffset: "2px",
                },
              }}
            >
              <AccessibilityIcon fontSize="small" sx={{ color: "#667eea" }} />
            </Avatar>
          </Box>
        </Toolbar>

        {/* Notifications Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 300,
              maxHeight: 400,
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              "& .MuiMenuItem-root": {
                flexDirection: "column",
                alignItems: "flex-start",
                whiteSpace: "normal",
                py: 1.5,
                borderRadius: "8px",
                margin: "4px 8px",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.6)",
                },
              },
            },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              borderBottom: 1,
              borderColor: "divider",
              width: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Test Notifications
            </Typography>
          </Box>
          {notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleMenuClose}>
              <Box display="flex" alignItems="flex-start" width="100%">
                {notification.type === "error" ? (
                  <BugIcon
                    color="error"
                    sx={{ mr: 1, mt: 0.5, fontSize: 18 }}
                  />
                ) : notification.type === "success" ? (
                  <SpeedIcon
                    color="success"
                    sx={{ mr: 1, mt: 0.5, fontSize: 18 }}
                  />
                ) : (
                  <TestIcon
                    color="info"
                    sx={{ mr: 1, mt: 0.5, fontSize: 18 }}
                  />
                )}
                <Box flex={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
          {notifications.length === 0 && (
            <MenuItem>
              <Typography variant="body2" color="text.secondary">
                No new notifications
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : undefined}
        onClose={isMobile ? () => setOpen(false) : undefined}
        ModalProps={isMobile ? { keepMounted: true } : undefined}
        sx={{
          ...(isMobile
            ? { "& .MuiDrawer-paper": { width: drawerWidth } }
            : {
                width: open ? drawerWidth : collapsedDrawerWidth,
                flexShrink: 0,
                transition: (t) =>
                  t.transitions.create("width", {
                    easing: t.transitions.easing.easeInOut,
                    duration: t.transitions.duration.standard,
                  }),
              }),
          "& .MuiDrawer-paper": {
            width: isMobile ? drawerWidth : (open ? drawerWidth : collapsedDrawerWidth),
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            color: "#1e293b",
            boxShadow: "4px 0 6px -1px rgba(0, 0, 0, 0.1)",
            border: "none",
            borderRight: "1px solid rgba(255, 255, 255, 0.5)",
            overflowX: "hidden",
            overflowY: "hidden",
            ...(!isMobile && {
              transition: (t) =>
                t.transitions.create(["width", "padding"], {
                  easing: t.transitions.easing.easeInOut,
                  duration: t.transitions.duration.standard,
                }),
            }),
            "&::-webkit-scrollbar": { width: 8 },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(10px)",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              "&:hover": { background: "rgba(255, 255, 255, 0.5)" },
            },
          },
        }}
      >
        <DrawerHeader>
          {open && (
            <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  mr: 1.5,
                  background: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "2px solid rgba(255, 255, 255, 0.6)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, rgba(102,126,234,0.3) 30%, rgba(167,139,250,0.3) 90%)",
                    zIndex: -1,
                  },
                }}
              >
                <AccessibilityIcon sx={{ fontSize: 20, color: "#667eea" }} />
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: "#2c3e50",
                    lineHeight: 1.2,
                    fontSize: "1rem",
                  }}
                >
                  AccessFlow
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#8b9dc3",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  QA Testing
                </Typography>
              </Box>
            </Box>
          )}
          <IconButton
            onClick={isMobile ? () => setOpen(false) : handleDrawerToggle}
            sx={{
              color: "#667eea",
              width: 40,
              height: 40,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "rgba(102,126,234,0.1)",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
          >
            {isMobile || open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Box
          sx={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
            mx: 3,
            mb: 2,
          }}
        />
        <RuleTreeSidebar
          data={data}
          isOpen={isMobile ? true : open}
          onRequestOpen={isMobile ? undefined : () => setOpen(true)}
          onCloseMobile={isMobile ? () => setOpen(false) : undefined}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          height: "auto",
          overflow: "visible",
          backgroundColor: "transparent",
          pb: isMobile ? "72px" : 0,
        }}
      >
        <Toolbar />
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Typography>Loading...</Typography>
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Typography color="error">Error: {error}</Typography>
          </Box>
        ) : (
          <AppRoutes navigate={navigate} />
        )}
      </Box>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <BottomNavigation
          value={
            location.pathname === "/" ? 0
            : location.pathname.startsWith("/rule-lab") ? 2
            : false
          }
          onChange={(_, newValue) => {
            if (newValue === 0) navigate("/");
            else if (newValue === 1) {
              setOpen(true);
            }
            else if (newValue === 2) navigate("/rule-lab");
          }}
          showLabels
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: (t) => t.zIndex.drawer + 2,
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.06)",
            height: 64,
            "& .MuiBottomNavigationAction-root": {
              color: "#94a3b8",
              minWidth: 0,
              "&.Mui-selected": { color: "#667eea" },
            },
          }}
        >
          <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
          <BottomNavigationAction label="Rules" icon={<ScienceIcon />} />
          <BottomNavigationAction label="Rule Lab" icon={<BiotechIcon />} />
        </BottomNavigation>
      )}
    </Box>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
