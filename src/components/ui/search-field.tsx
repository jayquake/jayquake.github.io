import { Search, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Input } from "./input";

type SearchFieldProps = Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> & {
  value: string;
  onValueChange: (value: string) => void;
  onClear?: () => void;
  containerClassName?: string;
};

function SearchField({
  value,
  onValueChange,
  onClear,
  className,
  containerClassName,
  placeholder = "Search…",
  ...props
}: SearchFieldProps) {
  const handleClear = () => {
    onValueChange("");
    onClear?.();
  };

  return (
    <div
      className={cn(
        "flex h-9 w-full items-center gap-2 rounded-md border border-border bg-shell-panel px-2.5 shadow-sm transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15",
        containerClassName
      )}
    >
      <Search className="size-4 shrink-0 text-foreground-muted" aria-hidden />
      <Input
        type="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className={cn("h-7 min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0", className)}
        {...props}
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex shrink-0 items-center justify-center rounded-sm text-foreground-muted hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

export { SearchField };
