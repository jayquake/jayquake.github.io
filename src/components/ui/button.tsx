import { cn } from "../../lib/utils";

const VARIANTS = {
  default: "border border-primary bg-primary/15 text-foreground hover:bg-primary/25",
  outline: "border border-border-strong bg-transparent text-foreground-secondary hover:border-primary hover:text-foreground",
  ghost: "border border-transparent bg-transparent text-foreground-secondary hover:bg-black/5 hover:text-foreground",
} as const;

const SIZES = {
  default: "h-9 px-3 text-xs",
  sm: "h-8 px-2.5 text-[0.75rem]",
  icon: "size-8 p-0",
} as const;

type ButtonVariant = keyof typeof VARIANTS;
type ButtonSize = keyof typeof SIZES;

function buttonClass({
  variant = "outline",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex cursor-pointer appearance-none items-center justify-center gap-2 border-0 bg-transparent font-mono uppercase tracking-wider text-inherit transition-colors disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className
  );
}

function Button({
  className,
  variant = "outline",
  size = "default",
  type = "button",
  ...props
}: React.ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button type={type} className={buttonClass({ variant, size, className })} {...props} />;
}

export { Button, buttonClass };
