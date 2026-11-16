import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative flex w-full min-w-0 items-center">
      <select
        data-slot="native-select"
        className={cn(
          "h-9 w-full min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-shell-panel py-1 pl-2.5 pr-8 text-[0.75rem] text-foreground shadow-sm outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 size-3.5 text-primary" />
    </div>
  );
}

export { NativeSelect };
