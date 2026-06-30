import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { raidenType } from "../../theme/mgsTokens";

const NAV_LINKS = [
  { label: "Engine Library", path: "/", icon: ViewListOutlinedIcon },
  { label: "Test Runner", path: "/test-runner/library", icon: PlayCircleOutlineIcon },
  { label: "Atomic Tests", path: "/test-runner/atomic-tests", icon: DescriptionOutlinedIcon },
  { label: "Rule Lab", path: "/rule-lab", icon: ScienceOutlinedIcon },
];

function isNavActive(pathname, linkPath) {
  if (linkPath === "/") {
    return (
      pathname === "/" ||
      pathname === "/engine/library" ||
      (pathname.startsWith("/engine/") &&
        !pathname.includes("_success") &&
        !pathname.includes("_failure"))
    );
  }
  if (linkPath === "/test-runner/library") {
    return pathname.startsWith("/test-runner") && !pathname.startsWith("/test-runner/atomic-tests");
  }
  return pathname.startsWith(linkPath);
}

export default function SidebarNav({ isOpen, onCloseMobile }) {
  const location = useLocation();

  return (
    <List dense disablePadding sx={{ py: 0.5 }}>
      {NAV_LINKS.map((link) => {
        const active = isNavActive(location.pathname, link.path);
        const Icon = link.icon;

        const button = (
          <ListItemButton
            component={RouterLink}
            to={link.path}
            selected={active}
            onClick={onCloseMobile}
            sx={{
              py: 0.75,
              px: isOpen ? 2 : 1.5,
              minHeight: 36,
              justifyContent: isOpen ? "flex-start" : "center",
              "&.Mui-selected": {
                pl: isOpen ? "calc(16px - 2px)" : 1.5,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: isOpen ? 32 : 0,
                mr: isOpen ? 0 : 0,
                justifyContent: "center",
                color: active ? "primary.light" : "text.secondary",
              }}
            >
              <Icon sx={{ fontSize: isOpen ? 18 : 20 }} />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary={link.label.toUpperCase()}
                primaryTypographyProps={{
                  ...raidenType.navLabel,
                  color: active ? "primary.light" : "text.secondary",
                }}
              />
            )}
          </ListItemButton>
        );

        return (
          <Tooltip key={link.path} title={!isOpen ? link.label : ""} placement="right">
            <span>{button}</span>
          </Tooltip>
        );
      })}
    </List>
  );
}
