import { ChevronLeft } from "lucide-react";
import RaidenLogo from "../brand/RaidenLogo";
import { Button } from "../ui/button";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";
import RuleTreeSidebar from "./RuleTreeSidebar";
import SidebarNav from "./SidebarNav";
import SidebarStatusFooter from "./SidebarStatusFooter";

export default function AppSidebar() {
  const { open, toggleSidebar, setMobileOpen } = useSidebar();

  return (
    <>
      <SidebarHeader className="border-b border-border">
        <div className={`flex items-center gap-2 ${open ? "justify-between px-1" : "justify-center"}`}>
          <RaidenLogo variant={open ? "full" : "mark"} collapsed={!open} />
          {open ? (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Collapse sidebar">
              <ChevronLeft className="size-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Expand sidebar" className="mt-1">
              <ChevronLeft className="size-4 rotate-180" />
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="py-0">
          <SidebarGroupLabel className={open ? "" : "sr-only"}>Application</SidebarGroupLabel>
          <SidebarNav isOpen={open} onCloseMobile={() => setMobileOpen(false)} />
        </SidebarGroup>

        {open ? (
          <SidebarGroup className="min-h-0 flex-1 overflow-hidden border-t border-border p-0">
            <SidebarGroupLabel className="px-4 pt-2">Engine rules</SidebarGroupLabel>
            <div className="min-h-0 flex-1 overflow-hidden px-1 pb-1">
              <RuleTreeSidebar
                isOpen={open}
                showDashboardLink={false}
                onRequestOpen={() => !open && toggleSidebar()}
                onCloseMobile={() => setMobileOpen(false)}
              />
            </div>
          </SidebarGroup>
        ) : null}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-0">
        <SidebarStatusFooter isOpen={open} />
      </SidebarFooter>
      <SidebarRail />
    </>
  );
}
