import React, { Suspense } from "react";

/** Minimal fallback — avoids blocking the viewport while chunks load. */
export default function RouteSuspense({ children, fallback = null }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
