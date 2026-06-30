import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { prefetchEngineExample } from "../../utils/engineExampleUtils";
import { mgsFonts } from "../../theme/mgsTokens";

const tabSx = {
  minWidth: 76,
  px: 1.5,
  py: 0.5,
  minHeight: 30,
  fontSize: "0.68rem",
  fontFamily: mgsFonts.hud,
  fontWeight: 600,
  letterSpacing: "0.1em",
  borderRadius: 0,
  border: 0,
  boxShadow: "none",
};

export default function ExamplePageNav({ ruleId, ruleType, variant }) {
  const location = useLocation();
  const basePath = location.pathname.replace(/(_success|_failure)$/, "");
  const backPath = ruleType === "engine" ? "/" : basePath;

  const warm = (v) => {
    if (ruleType === "engine" && ruleId) prefetchEngineExample(ruleId, v);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
        py: 1,
        mb: 1.5,
        bgcolor: "background.default",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Button
        component={RouterLink}
        to={backPath}
        size="small"
        startIcon={<ChevronLeftIcon sx={{ fontSize: 18 }} />}
        sx={{
          textTransform: "none",
          color: "primary.main",
          fontFamily: mgsFonts.hud,
          fontSize: "0.72rem",
          letterSpacing: "0.06em",
          minWidth: 0,
          px: 0.5,
        }}
      >
        {ruleType === "engine" ? "Library" : ruleId}
      </Button>

      <Stack
        direction="row"
        role="tablist"
        aria-label="Example variant"
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 0.5,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Button
          component={RouterLink}
          to={`${basePath}_success`}
          role="tab"
          aria-selected={variant === "success"}
          size="small"
          variant={variant === "success" ? "contained" : "text"}
          color={variant === "success" ? "primary" : "inherit"}
          disableElevation
          onMouseEnter={() => warm("success")}
          onFocus={() => warm("success")}
          sx={tabSx}
        >
          Success
        </Button>
        <Button
          component={RouterLink}
          to={`${basePath}_failure`}
          role="tab"
          aria-selected={variant === "failure"}
          size="small"
          variant={variant === "failure" ? "contained" : "text"}
          color={variant === "failure" ? "error" : "inherit"}
          disableElevation
          onMouseEnter={() => warm("failure")}
          onFocus={() => warm("failure")}
          sx={tabSx}
        >
          Failure
        </Button>
      </Stack>
    </Box>
  );
}

ExamplePageNav.propTypes = {
  ruleId: PropTypes.string,
  ruleType: PropTypes.oneOf(["engine", "legacy"]).isRequired,
  variant: PropTypes.oneOf(["success", "failure"]).isRequired,
};
