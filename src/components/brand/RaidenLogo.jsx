import { Box } from "@mui/material";
import PropTypes from "prop-types";

const LOGO_SRC = `${process.env.PUBLIC_URL || ""}/raiden-logo.svg`;

export default function RaidenLogo({ variant = "full", collapsed = false }) {
  if (variant === "mark" || collapsed) {
    return (
      <Box
        component="svg"
        viewBox="0 0 32 32"
        role="img"
        aria-label="RAIDEN"
        sx={{ width: 28, height: 28, flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="markTeal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4fd1ed" />
            <stop offset="100%" stopColor="#00a38d" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="3" height="24" fill="url(#markTeal)" rx="0.5" />
        <text
          x="11"
          y="22"
          fill="#e8ecef"
          fontFamily="Rajdhani, sans-serif"
          fontSize="16"
          fontWeight="700"
        >
          R
        </text>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={LOGO_SRC}
      alt="RAIDEN Accessibility QA Engine"
      sx={{ height: 40, width: "auto", maxWidth: "100%", display: "block" }}
    />
  );
}

RaidenLogo.propTypes = {
  variant: PropTypes.oneOf(["full", "mark"]),
  collapsed: PropTypes.bool,
};
