import { cn } from "../../lib/utils";

function Table({ className, ...props }) {
  return <table data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props} />;
}

function TableHeader({ className, ...props }) {
  return <thead data-slot="table-header" className={cn("sticky top-0 z-10 bg-shell-main", className)} {...props} />;
}

function TableBody({ className, ...props }) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableRow({ className, ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border transition-colors hover:bg-black/[0.03] data-[state=selected]:bg-primary/10",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "px-2 py-2 text-left align-middle font-['Rajdhani',sans-serif] text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-foreground-accent",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return <td data-slot="table-cell" className={cn("px-2 py-2 align-top text-foreground-secondary", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
