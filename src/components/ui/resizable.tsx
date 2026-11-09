import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "../../lib/utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn("flex h-full w-full min-h-0", className)}
      {...props}
    />
  );
}

function ResizablePanel({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel className={cn("min-h-0 min-w-0", className)} {...props} />;
}

function ResizableHandle({
  className,
  withHandle = true,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & { withHandle?: boolean }) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary data-[resize-handle-active]:bg-primary/40",
        className
      )}
      {...props}
    >
      {withHandle ? (
        <div className="z-10 flex h-8 w-3 items-center justify-center rounded-sm border border-border bg-shell-elevated shadow-sm">
          <ResizeGripIcon />
        </div>
      ) : null}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

function ResizeGripIcon() {
  return (
    <svg width="6" height="12" viewBox="0 0 6 12" aria-hidden className="text-foreground-muted">
      <circle cx="3" cy="2" r="0.8" fill="currentColor" />
      <circle cx="3" cy="6" r="0.8" fill="currentColor" />
      <circle cx="3" cy="10" r="0.8" fill="currentColor" />
    </svg>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
