import { Box, CircularProgress, Typography } from "@mui/material";
import { mgsFonts } from "../../../theme/mgsTokens";

/** Shown while engine catalog or route chunk is loading — avoids blank main pane. */
export default function LibraryLoadingShell({ label = "Loading rules…" }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        bgcolor: "background.default",
      }}
    >
      <CircularProgress size={28} color="primary" />
      <Typography
        variant="caption"
        sx={{
          fontFamily: mgsFonts.hud,
          color: "text.secondary",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
