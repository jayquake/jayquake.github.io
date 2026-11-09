import React, { Suspense } from "react";
import { Spinner } from "../ui/spinner";

const defaultFallback = (
  <div className="flex min-h-0 flex-1 items-center justify-center bg-shell-main">
    <Spinner className="size-6" />
  </div>
);

/** Fallback while lazy route chunks load — never leave the main pane blank. */
export default function RouteSuspense({ children, fallback = defaultFallback }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  );
}
