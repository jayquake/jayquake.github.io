import { Box, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";

const fallback = (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "40vh",
    }}
  >
    <CircularProgress size={32} />
  </Box>
);

export default function RouteSuspense({ children }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
