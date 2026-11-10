import { Alert, AlertTitle, Box, Paper, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { parseRoute, rulePath } from "../../../lib/libraryLocation";

/**
 * Shown for legacy rules that have a rule page but no success/failure fixtures yet.
 * Registered for every legacy example URL after the real fixture routes so the
 * fixture wins when present.
 */
export default function LegacyNoExamplesPage() {
  const { pathname } = useLocation();
  const parsed = parseRoute(pathname);
  const variant = parsed.kind === "example" ? parsed.variant : null;
  const label = variant === "success" ? "Success" : variant === "failure" ? "Failure" : "Example";
  const ruleHref =
    parsed.kind === "example" || parsed.kind === "rule" ? rulePath(parsed.rule) : "/";

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 4 }, maxWidth: 720, mx: "auto" }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
        <Alert severity="info">
          <AlertTitle>No examples yet</AlertTitle>
          {label} fixtures for this legacy rule have not been added.
        </Alert>
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          <RouterLink to={ruleHref}>Back to the rule page</RouterLink>
        </Typography>
      </Paper>
    </Box>
  );
}
