import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "../../lib/utils";

function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root className={cn("inline-flex items-center border border-border", className)} {...props} />;
}

function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        "inline-flex h-8 items-center justify-center gap-1.5 border-r border-border px-2.5 font-mono text-[0.75rem] uppercase tracking-wider text-foreground-secondary last:border-r-0 hover:text-foreground disabled:opacity-50 data-[state=on]:bg-primary/15 data-[state=on]:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
