import BugReportIcon from "@mui/icons-material/BugReport";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ScienceIcon from "@mui/icons-material/Science";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { LIBRARY_LAYOUT } from "../../../theme/layout";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { getRuleSlug } from "./engineLibraryUtils";

export default function EngineRuleDetailPane({
  rule,
  collapsed,
  onToggleCollapse,
  compact = false,
}) {
  if (!rule) {
    return (
      <Box sx={{ p: 2, color: "text.secondary" }}>
        <Typography variant="body2">Select a rule from the table.</Typography>
      </Box>
    );
  }

  const slug = getRuleSlug(rule);
  const wcagRefs = rule.refs?.filter((r) => r.type === "WCAG") || [];

  if (collapsed) {
    return (
      <Box
        sx={{
          width: LIBRARY_COLLAPSED,
          minWidth: LIBRARY_COLLAPSED,
          height: "100%",
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 1,
          bgcolor: "background.default",
        }}
      >
        <IconButton size="small" onClick={onToggleCollapse} aria-label="Expand detail pane">
          <ChevronRightIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="caption"
          sx={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontFamily: '"IBM Plex Mono", monospace',
            color: "primary.main",
            letterSpacing: "0.1em",
            mt: 1,
            maxHeight: 120,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {slug}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        borderRight: compact ? 0 : 1,
        borderColor: "divider",
        bgcolor: "background.default",
        overflow: "hidden",
        boxSizing: "border-box",
        textAlign: "left",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 1.5,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: 1,
          borderBottom: 1,
          borderColor: "divider",
          flexShrink: 0,
          width: "100%",
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1, pr: 1 }}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              fontFamily: '"IBM Plex Mono", monospace',
              letterSpacing: "0.12em",
              color: "primary.main",
              mb: 0.75,
              textAlign: "left",
            }}
          >
            [ {slug} ]
          </Typography>
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              lineHeight: 1.4,
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              textAlign: "left",
              overflowWrap: "break-word",
            }}
          >
            {rule.title}
          </Typography>
        </Box>
        {!compact && (
          <IconButton size="small" onClick={onToggleCollapse} aria-label="Collapse detail pane">
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: { xs: 2, sm: 2.5 },
          py: 2,
          width: "100%",
          boxSizing: "border-box",
          textAlign: "left",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "divider",
            borderRadius: 3,
          },
        }}
      >
        {rule.impact && (
          <Chip
            label={rule.impact.toUpperCase()}
            size="small"
            variant="outlined"
            sx={{
              mb: 2,
              borderColor: "primary.main",
              color: "primary.main",
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: "0.65rem",
            }}
          />
        )}

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.65,
            mb: 2,
            fontSize: "0.875rem",
            textAlign: "left",
            overflowWrap: "break-word",
          }}
        >
          {rule.description}
        </Typography>

        {rule.advice && (
          <>
            <Typography variant="caption" color="primary.dark" sx={{ letterSpacing: "0.1em" }}>
              ADVICE
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
                mb: 2,
                mt: 0.5,
                fontSize: "0.875rem",
                textAlign: "left",
                overflowWrap: "break-word",
              }}
            >
              {rule.advice}
            </Typography>
          </>
        )}

        {wcagRefs.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="primary.dark" sx={{ letterSpacing: "0.1em" }}>
              WCAG
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 0.75 }}>
              {wcagRefs.map((ref, i) => (
                <Chip
                  key={i}
                  label={`${ref.id} (${ref.level || "?"})`}
                  size="small"
                  variant="outlined"
                  component={ref.link ? "a" : "div"}
                  href={ref.link}
                  target={ref.link ? "_blank" : undefined}
                  rel={ref.link ? "noopener noreferrer" : undefined}
                  sx={{ fontSize: "0.65rem", height: 22 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="primary.dark" sx={{ letterSpacing: "0.1em", display: "block", mb: 1 }}>
          ACTIONS
        </Typography>
        <Stack spacing={1} sx={{ width: "100%", alignItems: "stretch" }}>
          <Button
            component={RouterLink}
            to={`/engine/${slug}_success`}
            size="small"
            variant="outlined"
            startIcon={<CheckCircleIcon />}
            fullWidth
            onMouseEnter={() => prefetchEngineExample(slug, "success")}
            onFocus={() => prefetchEngineExample(slug, "success")}
            sx={{ justifyContent: "flex-start" }}
          >
            Success examples
          </Button>
          <Button
            component={RouterLink}
            to={`/engine/${slug}_failure`}
            size="small"
            variant="outlined"
            startIcon={<CancelIcon />}
            fullWidth
            onMouseEnter={() => prefetchEngineExample(slug, "failure")}
            onFocus={() => prefetchEngineExample(slug, "failure")}
            sx={{ justifyContent: "flex-start" }}
          >
            Failure examples
          </Button>
          <Button
            component={RouterLink}
            to={`/rule-lab?rule=${slug}`}
            size="small"
            variant="outlined"
            startIcon={<ScienceIcon />}
            fullWidth
            sx={{ justifyContent: "flex-start" }}
          >
            Rule Lab
          </Button>
          <Button
            component={RouterLink}
            to={`/engine/${slug}?debug=mcp`}
            size="small"
            variant="outlined"
            startIcon={<BugReportIcon />}
            fullWidth
            sx={{ justifyContent: "flex-start" }}
          >
            MCP Debug
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

const LIBRARY_COLLAPSED = LIBRARY_LAYOUT.detailCollapsedPx;
