import { cn } from "../../lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-9 w-full bg-transparent font-mono text-xs tracking-wide text-foreground outline-none placeholder:text-foreground-muted",
        className
      )}
      {...props}
    />
  );
}

export { Input };
