import { FileText, FlaskConical, List, Play } from "lucide-react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { parseRoute } from "../../lib/libraryLocation";
import {
  SidebarMenu,
  SidebarMenuItem,
  sidebarMenuButtonActiveClass,
  sidebarMenuButtonClass,
} from "../ui/sidebar";

const NAV_LINKS = [
  { label: "Engine Library", path: "/", icon: List },
  { label: "Test Runner", path: "/test-runner/library", icon: Play },
  { label: "Atomic Tests", path: "/test-runner/atomic-tests", icon: FileText },
  { label: "Rule Lab", path: "/rule-lab", icon: FlaskConical },
];

function isNavActive(pathname, linkPath) {
  if (linkPath === "/") {
    const route = parseRoute(pathname);
    return route.kind === "home" || (route.kind === "rule" && route.rule.type === "engine");
  }
  if (linkPath === "/test-runner/library") {
    return pathname.startsWith("/test-runner") && !pathname.startsWith("/test-runner/atomic-tests");
  }
  return pathname.startsWith(linkPath);
}

export default function SidebarNav({ isOpen, onCloseMobile }) {
  const location = useLocation();

  return (
    <SidebarMenu className="px-1" aria-label="Primary">
      {NAV_LINKS.map((link) => {
        const active = isNavActive(location.pathname, link.path);
        const Icon = link.icon;
        return (
          <SidebarMenuItem key={link.path}>
            <RouterLink
              to={link.path}
              onClick={onCloseMobile}
              aria-current={active ? "page" : undefined}
              title={!isOpen ? link.label : undefined}
              className={cn(
                sidebarMenuButtonClass,
                active && sidebarMenuButtonActiveClass,
                !isOpen && "justify-center px-0"
              )}
            >
              <Icon className={isOpen ? "size-[18px] shrink-0" : "size-5 shrink-0"} />
              {isOpen ? <span className="truncate">{link.label}</span> : null}
            </RouterLink>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
