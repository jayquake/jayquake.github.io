import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useLoading } from "./LoadingContext";

export default function GlobalLoading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <Box sx={{ width: "100%", position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
      <LinearProgress /> {/* Indeterminate progress without interval */}
    </Box>
  );
}
