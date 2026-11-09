import { PanelLeft } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const SIDEBAR_WIDTH = "15.5rem";
const SIDEBAR_WIDTH_ICON = "3.25rem";
const SIDEBAR_COOKIE = "raiden_sidebar_state";

type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  setIsMobile: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

function SidebarProvider({
  defaultOpen = true,
  children,
}: {
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${SIDEBAR_COOKIE}=`));
      if (stored) setOpen(stored.split("=")[1] === "1");
    } catch {
      /* noop */
    }
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setOpenPersisted = React.useCallback((value: boolean) => {
    setOpen(value);
    document.cookie = `${SIDEBAR_COOKIE}=${value ? 1 : 0}; path=/; max-age=31536000`;
  }, []);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setMobileOpen((o) => !o);
    } else {
      setOpenPersisted(!open);
    }
  }, [isMobile, open, setOpenPersisted]);

  const state: SidebarContextValue["state"] = open ? "expanded" : "collapsed";

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      state,
      open,
      setOpen: setOpenPersisted,
      toggleSidebar,
      isMobile,
      setIsMobile,
      mobileOpen,
      setMobileOpen,
    }),
    [state, open, setOpenPersisted, toggleSidebar, isMobile, mobileOpen]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        className="group/sidebar-wrapper flex h-screen w-full overflow-hidden has-[[data-variant=inset]]:bg-shell-main"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"aside"> & { collapsible?: "icon" | "offcanvas" | "none" }) {
  const { open, isMobile, mobileOpen, setMobileOpen } = useSidebar();

  if (isMobile) {
    if (!mobileOpen) return null;
    return (
      <div className="fixed inset-0 z-40 md:hidden">
        <button
          type="button"
          className="absolute inset-0 bg-black/40"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          data-sidebar="sidebar"
          data-mobile="true"
          className={cn(
            "relative flex h-full w-[min(18rem,88vw)] flex-col border-r border-border bg-shell-sidebar",
            className
          )}
          {...props}
        >
          {children}
        </aside>
      </div>
    );
  }

  return (
    <aside
      data-sidebar="sidebar"
      data-state={open ? "expanded" : "collapsed"}
      data-collapsible={open ? "" : "icon"}
      className={cn(
        "hidden h-full shrink-0 flex-col overflow-hidden border-r border-border bg-shell-sidebar transition-[width] duration-200 ease-linear md:flex",
        open ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-sidebar="inset"
      className={cn("relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-shell-main", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-sidebar="footer" className={cn("mt-auto flex flex-col gap-2 p-2", className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="content"
      className={cn("flex min-h-0 flex-1 flex-col gap-1 overflow-hidden", className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-sidebar="group" className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="group-label"
      className={cn(
        "px-2 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground-muted",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-0.5", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />;
}

export const sidebarMenuButtonClass =
  "flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-2 text-left text-[0.75rem] font-medium uppercase tracking-wide text-foreground-secondary no-underline outline-none transition-colors hover:bg-black/[0.04] hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary";

export const sidebarMenuButtonActiveClass = "bg-primary/12 text-foreground-accent font-semibold border-l-2 border-primary";

const sidebarMenuButtonVariants = {
  default: sidebarMenuButtonClass,
  active: sidebarMenuButtonActiveClass,
};

function SidebarMenuButton({
  className,
  isActive = false,
  tooltip,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  isActive?: boolean;
  tooltip?: string;
  asChild?: boolean;
}) {
  const { open } = useSidebar();
  const classes = cn(
    sidebarMenuButtonVariants.default,
    isActive && sidebarMenuButtonVariants.active,
    !open && "justify-center px-0",
    className
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string; title?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
      ...(tooltip && !open ? { title: tooltip } : {}),
    });
  }

  return (
    <button type="button" className={classes} title={!open ? tooltip : undefined} {...props}>
      {children}
    </button>
  );
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon" className={className} onClick={toggleSidebar} aria-label="Toggle sidebar" {...props}>
      <PanelLeft className="size-4" />
    </Button>
  );
}

function SidebarRail() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      type="button"
      aria-label="Toggle sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      className="absolute inset-y-0 -right-3 z-20 hidden w-3 cursor-col-resize bg-transparent after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-border md:block"
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
};
