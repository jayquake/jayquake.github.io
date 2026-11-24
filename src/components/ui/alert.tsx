import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const VARIANTS = {
  info: { className: "border-status-info/50 bg-status-info/10 text-foreground", icon: Info, iconClass: "text-status-info" },
  success: { className: "border-status-pass/50 bg-status-pass/10 text-foreground", icon: CheckCircle2, iconClass: "text-status-pass" },
  warning: { className: "border-status-warn/50 bg-status-warn/10 text-foreground", icon: AlertTriangle, iconClass: "text-status-warn" },
  error: { className: "border-status-fail/50 bg-status-fail/10 text-foreground", icon: XCircle, iconClass: "text-status-fail" },
} as const;

type AlertVariant = keyof typeof VARIANTS;

/** Replaces MUI <Alert severity>. Errors get role="alert", the rest role="status". */
function Alert({
  className,
  variant = "info",
  icon,
  action,
  children,
  role,
  ...props
}: Omit<React.ComponentProps<"div">, "role"> & {
  variant?: AlertVariant;
  icon?: React.ReactNode | false;
  action?: React.ReactNode;
  role?: string;
}) {
  const v = VARIANTS[variant];
  const Icon = v.icon;
  return (
    <div
      role={role ?? (variant === "error" ? "alert" : "status")}
      className={cn("flex items-start gap-2 border px-3 py-2 text-sm", v.className, className)}
      {...props}
    >
      {icon === false ? null : icon ?? <Icon className={cn("mt-0.5 size-4 shrink-0", v.iconClass)} aria-hidden="true" />}
      <div className="min-w-0 flex-1">{children}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mb-0.5 font-semibold", className)} {...props} />;
}

export { Alert, AlertTitle };
