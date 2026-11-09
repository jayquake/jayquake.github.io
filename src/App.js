import { useLocation, useNavigate } from "react-router-dom";
import AppSidebar from "./components/layout/AppSidebar";
import { Badge } from "./components/ui/badge";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppRoutes from "./routes/AppRoutes";
import { ENGINE_RULE_COUNT } from "./utils/engineRuleCount";
import { parseEngineSlug } from "./utils/engineExampleUtils";

const LOGIN_ROUTES = ["/login", "/login/success"];

function normalizePathname(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function isLoginRoute(pathname) {
  return LOGIN_ROUTES.includes(normalizePathname(pathname));
}

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
    return {
      mode,
      title: "Engine Rules Library",
      breadcrumb: "Library",
      subtitle: `${ENGINE_RULE_COUNT} rules`,
    };
  }

  if (mode === "libraryDetail") {
    const ruleId = pathnames[1];
    return { mode, title: ruleId, breadcrumb: "Library", subtitle: "Rule detail" };
  }

  if (mode === "example") {
    const { ruleId, variant } = parseEngineSlug(pathnames[1]);
    return {
      mode,
      title: ruleId,
      breadcrumb: "Examples",
      subtitle: variant === "success" ? "Success fixtures" : "Failure fixtures",
      variant,
    };
  }

  const current = pathnames[0];
  if (current === "login") {
    return { mode: "default", title: "Sign in", breadcrumb: "Account", subtitle: "Authentication" };
  }
  if (current === "rule-lab") {
    return { mode: "default", title: "Rule Lab", breadcrumb: "Tools", subtitle: "Pattern analysis" };
  }
  if (pathname.startsWith("/test-runner/atomic-tests")) {
    return { mode: "default", title: "Atomic Tests", breadcrumb: "Test runner", subtitle: "HTML fixtures" };
  }
  if (pathname.startsWith("/test-runner")) {
    return { mode: "default", title: "Test Runner", breadcrumb: "Test runner", subtitle: "Playwright suites" };
  }
  if (pathnames.length === 1) {
    return {
      mode: "default",
      title: `${capitalizeFirstLetter(current)} Rules`,
      breadcrumb: "Legacy",
      subtitle: "Criteria rules",
    };
  }
  return {
    mode: "default",
    title: capitalizeFirstLetter(current),
    breadcrumb: "App",
    subtitle: "Rule testing",
  };
}

function AppChrome({ pageInfo }) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-shell-elevated px-3 sm:px-4">
      <SidebarTrigger />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-foreground-muted">{pageInfo.breadcrumb}</p>
        <p className="truncate font-['Rajdhani',sans-serif] text-sm font-semibold uppercase tracking-wide text-foreground sm:text-[0.95rem]">
          {pageInfo.title}
        </p>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <p className="max-w-[220px] truncate font-mono text-[0.75rem] text-foreground-secondary">{pageInfo.subtitle}</p>
        {pageInfo.mode === "example" ? (
          <Badge
            className={
              pageInfo.variant === "success"
                ? "border-status-pass text-status-pass"
                : "border-status-fail text-status-fail"
            }
          >
            {pageInfo.variant}
          </Badge>
        ) : null}
      </div>
    </header>
  );
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageInfo = getPageInfo(location.pathname);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <AppChrome pageInfo={pageInfo} />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <AppRoutes navigate={navigate} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoginRoute(location.pathname)) {
    return <AppRoutes navigate={navigate} />;
  }

  return <AppShell />;
}
