import { cn } from "../../lib/utils";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-9 items-center gap-2 border border-border bg-shell-input px-2 focus-within:border-primary",
        className
      )}
      {...props}
    />
  );
}

export { InputGroup };
