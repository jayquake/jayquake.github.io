import { Box, CircularProgress, Typography } from "@mui/material";

export default function GlassSpinner({
  size = 32,
  thickness = 4,
  message = "Loading...",
  showMessage = true,
  fullScreen = false,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        p: fullScreen ? 0 : 3,
        ...(fullScreen && {
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          bgcolor: "background.default",
        }),
      }}
    >
      <CircularProgress size={size} thickness={thickness} color="primary" />
      {showMessage && (
        <Typography
          variant="body2"
          sx={{ fontFamily: '"IBM Plex Mono", monospace', color: "primary.main", letterSpacing: "0.08em" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

export function GlassSkeleton({ width = "100%", height = 40, borderRadius = 1, count = 1 }) {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Box
      key={index}
      sx={{
        width,
        height,
        borderRadius,
        bgcolor: "action.hover",
        mb: count > 1 ? 1 : 0,
      }}
    />
  ));

  return <Box sx={{ width: "100%" }}>{skeletons}</Box>;
}
