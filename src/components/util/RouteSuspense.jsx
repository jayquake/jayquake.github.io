import React, { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

const defaultFallback = (
  <Box
    sx={{
      flex: 1,
      minHeight: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "background.default",
    }}
  >
    <CircularProgress size={24} color="primary" />
  </Box>
);

/** Fallback while lazy route chunks load — never leave the main pane blank. */
export default function RouteSuspense({ children, fallback = defaultFallback }) {
  return (
    <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </Box>
  );
}
