import { cn } from "../../lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-2 border border-border bg-shell-panel p-3 text-xs text-foreground-secondary",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn("font-mono text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-foreground-accent", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn("text-sm leading-relaxed text-foreground-secondary", className)} {...props} />;
}

const CardTitle = CardHeader;

export { Card, CardHeader, CardTitle, CardContent };
