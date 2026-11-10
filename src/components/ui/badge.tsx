import { cn } from "../../lib/utils";

const VARIANTS = {
  default: "border-primary text-primary",
  high: "border-status-fail text-status-fail",
  medium: "border-status-warn text-status-warn",
  low: "border-status-pass text-status-pass",
  outline: "border-border-strong text-foreground-secondary",
} as const;

type BadgeVariant = keyof typeof VARIANTS;

function severityVariant(label: string): BadgeVariant {
  if (label === "HIGH") return "high";
  if (label === "MEDIUM") return "medium";
  if (label === "LOW") return "low";
  return "outline";
}

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center border bg-transparent px-1.5 font-mono text-[0.75rem] uppercase tracking-wide",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge, severityVariant };
