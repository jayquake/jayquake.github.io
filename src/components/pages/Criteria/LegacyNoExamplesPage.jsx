import { Alert, AlertTitle } from "../../ui/alert";
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
    <div className="mx-auto w-full max-w-[720px] px-4 py-4 sm:px-6 md:px-8 md:py-8">
      <div className="border border-border bg-shell-panel p-4 md:p-6">
        <Alert variant="info">
          <AlertTitle>No examples yet</AlertTitle>
          {label} fixtures for this legacy rule have not been added.
        </Alert>
        <p className="mt-4 text-sm text-foreground-secondary">
          <RouterLink to={ruleHref} className="text-foreground-accent underline">
            Back to the rule page
          </RouterLink>
        </p>
      </div>
    </div>
  );
}
