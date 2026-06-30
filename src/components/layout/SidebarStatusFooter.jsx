import { Box, Typography } from "@mui/material";
import packageJson from "../../../package.json";
import { useMissionClock } from "../../hooks/useMissionClock";
import { MGS, mgsFonts } from "../../theme/mgsTokens";

export default function SidebarStatusFooter({ isOpen }) {
  const missionTime = useMissionClock();
  const version = packageJson.version || "0.0.0";
  const buildId = version.replace(/\./g, "").slice(0, 6).toUpperCase() || "DEV";

  if (!isOpen) {
    return (
      <Box sx={{ py: 1, display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: MGS.passGreen,
            boxShadow: `0 0 6px ${MGS.passGreen}`,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        borderTop: 1,
        borderColor: "divider",
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: MGS.passGreen,
            boxShadow: `0 0 8px rgba(110, 231, 183, 0.6)`,
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontFamily: mgsFonts.display,
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "primary.light",
          }}
        >
          OPERATIONAL
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          height: 48,
          mb: 1,
          border: 1,
          borderColor: "primary.dark",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            width: 8,
            height: 8,
            borderColor: "primary.main",
            borderStyle: "solid",
          },
          "&::before": { top: 2, left: 2, borderWidth: "1px 0 0 1px" },
          "&::after": { bottom: 2, right: 2, borderWidth: "0 1px 1px 0" },
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 40 40"
          sx={{ width: 28, height: 28, opacity: 0.7 }}
          aria-hidden
        >
          <polygon
            points="20,4 32,32 8,32"
            fill="none"
            stroke={MGS.raidenCyan}
            strokeWidth="1"
          />
          <line x1="20" y1="12" x2="20" y2="24" stroke={MGS.raidenCyan} strokeWidth="1" />
          <circle cx="20" cy="28" r="2" fill={MGS.raidenCyan} />
        </Box>
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          fontFamily: mgsFonts.hud,
          fontSize: "0.58rem",
          color: "text.secondary",
          letterSpacing: "0.06em",
          mb: 0.5,
        }}
      >
        v{version} build {buildId}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          fontFamily: mgsFonts.hud,
          fontSize: "0.62rem",
          color: "primary.main",
          letterSpacing: "0.1em",
        }}
      >
        MISSION {missionTime}
      </Typography>
    </Box>
  );
}
