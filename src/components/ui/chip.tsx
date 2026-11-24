import * as React from "react";
import { cn } from "../../lib/utils";

const TONES = {
  default: "border-border-strong text-foreground-secondary",
  primary: "border-primary/60 bg-primary/10 text-foreground-accent",
  pass: "border-status-pass/60 bg-status-pass/10 text-status-pass",
  fail: "border-status-fail/60 bg-status-fail/10 text-status-fail",
  warn: "border-status-warn/60 bg-status-warn/10 text-status-warn",
  info: "border-status-info/60 bg-status-info/10 text-status-info",
} as const;

type ChipTone = keyof typeof TONES;

/**
 * Replaces MUI <Chip>. Static by default; pass `href` (render your own link around it)
 * or `onClick` to get a real <button>. Never a clickable <span>.
 */
type ChipProps = Omit<React.ComponentProps<"span">, "onClick"> & {
  tone?: ChipTone;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Chip = React.forwardRef<HTMLElement, ChipProps>(function Chip(
  { className, tone = "default", icon, onClick, children, ...props },
  ref
) {
  const classes = cn(
    "inline-flex h-6 max-w-full items-center gap-1 rounded-full border px-2 font-mono text-[0.75rem] tracking-wide",
    TONES[tone],
    onClick && "cursor-pointer hover:brightness-110",
    className
  );
  const content = (
    <>
      {icon}
      <span className="truncate">{children}</span>
    </>
  );
  if (onClick) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        className={classes}
        {...(props as React.ComponentProps<"button">)}
      >
        {content}
      </button>
    );
  }
  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className={classes} {...props}>
      {content}
    </span>
  );
});

export { Chip };
export type { ChipTone };
