import { ChevronLeft } from "lucide-react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useLibraryLocation } from "../../hooks/useLibraryLocation";
import { cn } from "../../lib/utils";
import { HudLayoutIndicator } from "../motion/HudMotion";
import { prefetchEngineExample } from "../../utils/engineExampleUtils";
import { MGS } from "../../theme/mgsTokens";

const tabClass =
  "relative z-[1] inline-flex min-h-8 min-w-[88px] flex-1 items-center justify-center px-4 py-1.5 font-['Rajdhani',sans-serif] text-[0.75rem] font-bold uppercase tracking-[0.12em] no-underline transition-colors";

const hudLinkClass =
  "font-mono text-[0.75rem] tracking-[0.06em] text-primary-bright no-underline hover:text-primary hover:underline";

export default function ExamplePageNav({ ruleId, ruleType, variant }) {
  const { route, hrefs } = useLibraryLocation();
  // The route is the source of truth for which rule this example belongs to (engine or legacy).
  const rule = route.kind === "example" || route.kind === "rule" ? route.rule : { type: "engine", id: ruleId || "" };
  const detailPath = hrefs.rule(rule);
  const backPath = detailPath;
  const successPath = hrefs.example(rule, "success");
  const failurePath = hrefs.example(rule, "failure");

  const warm = (v) => {
    if (ruleType === "engine" && ruleId) prefetchEngineExample(ruleId, v);
  };

  return (
    <div className="mb-2">
      {ruleId && (
        <RouterLink
          to={detailPath}
          className={cn(hudLinkClass, "mb-1.5 block tracking-[0.04em] aria-[current=page]:font-bold aria-[current=page]:text-foreground")}
        >
          [ {ruleId} ]
        </RouterLink>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2 border-0 border-b border-solid border-primary-dim py-1">
        <RouterLink to={backPath} className={cn(hudLinkClass, "inline-flex h-8 items-center gap-1 px-1")}>
          <ChevronLeft className="size-[18px]" aria-hidden="true" />
          {ruleType === "engine" ? "Back to rule" : ruleId}
        </RouterLink>

        <div
          role="tablist"
          aria-label="Example variant"
          className="relative flex shrink-0 flex-row overflow-hidden border border-solid border-primary"
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
          <RouterLink
            to={successPath}
            role="tab"
            aria-selected={variant === "success"}
            onMouseEnter={() => warm("success")}
            onFocus={() => warm("success")}
            className={cn(tabClass, variant === "success" ? "text-primary-foreground" : "text-primary")}
          >
            Success
          </RouterLink>
          <RouterLink
            to={failurePath}
            role="tab"
            aria-selected={variant === "failure"}
            onMouseEnter={() => warm("failure")}
            onFocus={() => warm("failure")}
            className={cn(tabClass, variant === "failure" ? "text-primary-foreground" : "text-status-fail")}
          >
            Failure
          </RouterLink>
        </div>
      </div>
    </div>
  );
}

ExamplePageNav.propTypes = {
  ruleId: PropTypes.string,
  ruleType: PropTypes.oneOf(["engine", "legacy"]).isRequired,
  variant: PropTypes.oneOf(["success", "failure"]).isRequired,
};
