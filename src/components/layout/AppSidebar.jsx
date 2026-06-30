import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import RaidenLogo from "../brand/RaidenLogo";
import RuleTreeSidebar from "./RuleTreeSidebar";
import SidebarNav from "./SidebarNav";
import SidebarStatusFooter from "./SidebarStatusFooter";

export default function AppSidebar({ isOpen, onToggle, onCloseMobile }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: isOpen ? 1.5 : 1,
          py: 1.25,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
          minHeight: 56,
          gap: 0.5,
        }}
      >
        <RaidenLogo variant={isOpen ? "full" : "mark"} collapsed={!isOpen} />
        <IconButton size="small" onClick={onToggle} aria-label="Toggle sidebar">
          {isOpen ? <ChevronLeftIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
        </IconButton>
      </Box>

      <SidebarNav isOpen={isOpen} onCloseMobile={onCloseMobile} />

      <Divider sx={{ my: 0.5 }} />

      <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        <RuleTreeSidebar
          isOpen={isOpen}
          showDashboardLink={false}
          onRequestOpen={() => !isOpen && onToggle()}
          onCloseMobile={onCloseMobile}
        />
      </Box>

      <SidebarStatusFooter isOpen={isOpen} />
    </Box>
  );
}
