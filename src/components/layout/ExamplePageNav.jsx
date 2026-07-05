import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HudLayoutIndicator } from "../motion/HudMotion";
import { prefetchEngineExample } from "../../utils/engineExampleUtils";
import { MGS, mgsFonts, raidenType } from "../../theme/mgsTokens";

const tabSx = {
  minWidth: 88,
  px: 2,
  py: 0.65,
  minHeight: 32,
  fontSize: "0.68rem",
  fontFamily: mgsFonts.display,
  fontWeight: 700,
  letterSpacing: "0.12em",
  borderRadius: 0,
  border: 0,
  boxShadow: "none",
  position: "relative",
  zIndex: 1,
  flex: 1,
};

const textLinkSx = {
  color: "primary.light",
  textDecoration: "none",
  fontFamily: mgsFonts.hud,
  fontSize: "0.68rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  "&:hover": { color: "primary.main", textDecoration: "underline" },
  "&[aria-current='page']": { color: MGS.raidenWhite, fontWeight: 700 },
};

export default function ExamplePageNav({ ruleId, ruleType, variant }) {
  const location = useLocation();
  const basePath = location.pathname.replace(/(_success|_failure)$/, "");
  const backPath = ruleType === "engine" ? "/" : basePath;
  const detailPath = ruleType === "engine" && ruleId ? `/engine/${ruleId}` : basePath;
  const successPath = `${basePath}_success`;
  const failurePath = `${basePath}_failure`;
  const ruleLabPath = ruleId ? `/rule-lab?rule=${ruleId}&type=${ruleType}` : "/rule-lab";
  const mcpDebugPath =
    ruleType === "engine" && ruleId ? `/engine/${ruleId}?debug=mcp` : ruleLabPath;

  const warm = (v) => {
    if (ruleType === "engine" && ruleId) prefetchEngineExample(ruleId, v);
  };

  return (
    <Box sx={{ mb: 1 }}>
      {ruleId && (
        <Typography
          component={RouterLink}
          to={detailPath}
          sx={{
            ...raidenType.ruleId,
            ...textLinkSx,
            mb: 0.75,
            display: "block",
            textTransform: "none",
          }}
        >
          [ {ruleId} ]
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
          py: 0.5,
          borderBottom: 1,
          borderColor: "primary.dark",
        }}
      >
        <Button
          component={RouterLink}
          to={backPath}
          size="small"
          startIcon={<ChevronLeftIcon sx={{ fontSize: 18 }} />}
          sx={{
            textTransform: "none",
            color: "primary.light",
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
            position: "relative",
            border: 1,
            borderColor: "primary.main",
            borderRadius: 0,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <HudLayoutIndicator
            layout
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: variant === "success" ? 0 : "50%",
              width: "50%",
              backgroundColor: variant === "success" ? MGS.raidenCyan : MGS.alertRed,
              zIndex: 0,
            }}
          />
          <Button
            component={RouterLink}
            to={`${basePath}_success`}
            role="tab"
            aria-selected={variant === "success"}
            size="small"
            variant="text"
            color="inherit"
            disableElevation
            onMouseEnter={() => warm("success")}
            onFocus={() => warm("success")}
            sx={{
              ...tabSx,
              color: variant === "success" ? MGS.raidenWhite : "primary.light",
            }}
          >
            Success
          </Button>
          <Button
            component={RouterLink}
            to={`${basePath}_failure`}
            role="tab"
            aria-selected={variant === "failure"}
            size="small"
            variant="text"
            color="inherit"
            disableElevation
            onMouseEnter={() => warm("failure")}
            onFocus={() => warm("failure")}
            sx={{
              ...tabSx,
              color: variant === "failure" ? MGS.raidenWhite : MGS.alertRed,
            }}
          >
            Failure
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

ExamplePageNav.propTypes = {
  ruleId: PropTypes.string,
  ruleType: PropTypes.oneOf(["engine", "legacy"]).isRequired,
  variant: PropTypes.oneOf(["success", "failure"]).isRequired,
};
