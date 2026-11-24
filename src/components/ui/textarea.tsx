import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full border border-border bg-shell-input p-2 font-mono text-xs text-foreground outline-none placeholder:text-foreground-muted focus:border-primary disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

export { Textarea };
