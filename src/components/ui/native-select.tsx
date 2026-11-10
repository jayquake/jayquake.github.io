import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative flex w-full min-w-0 items-center">
      <select
        data-slot="native-select"
        className={cn(
          "h-8 w-full min-w-0 cursor-pointer appearance-none rounded-none border border-border bg-shell-panel py-1 pl-2 pr-7 font-mono text-[0.75rem] uppercase tracking-wide text-foreground outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
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
