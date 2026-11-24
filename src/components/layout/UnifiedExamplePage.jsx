import PropTypes from "prop-types";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AlertCircle, CheckCircle2, Info, Lightbulb } from "lucide-react";
import { m } from "../motion/HudMotion";
import ExampleCard from "./ExampleCard";
import ExamplePageNav from "./ExamplePageNav";
import engineLegacyMapping from "../../data/engine-legacy-mapping";
import { cn } from "../../lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Alert } from "../ui/alert";
import { buttonClass } from "../ui/button";
import { Chip } from "../ui/chip";
import { Separator } from "../ui/separator";
import { hudVariantMotion, hudVariantTransition } from "../../theme/motionPresets";

/** Per-variant token classes, written out in full so Tailwind can see them. */
const PALETTE = {
  success: {
    text: "text-status-pass",
    border: "border-status-pass/30",
    borderLeft: "border-l-status-pass",
    tint: "bg-status-pass/10",
    gradient: "linear-gradient(120deg, hsl(var(--status-pass) / 0.08), transparent 55%)",
    statusLabel: "Compliant",
    statusIcon: CheckCircle2,
  },
  failure: {
    text: "text-status-fail",
    border: "border-status-fail/30",
    borderLeft: "border-l-status-fail",
    tint: "bg-status-fail/10",
    gradient: "linear-gradient(120deg, hsl(var(--status-fail) / 0.08), transparent 55%)",
    statusLabel: "Needs Fix",
    statusIcon: AlertCircle,
  },
};

/** Tailwind equivalent of PAGE_SHELL (theme/layout). */
const PAGE_SHELL_CLASS =
  "box-border flex h-full min-h-0 w-full max-w-full flex-col items-stretch gap-3 overflow-y-auto overflow-x-hidden px-4 py-4 text-left sm:px-5 sm:py-5 md:px-6";

/** Tailwind equivalent of HUD_PANEL (theme/layout). */
const HUD_PANEL_CLASS = "w-full rounded border border-solid border-border bg-shell-panel";

/** raidenType.sectionLabel */
const sectionLabelClass = "m-0 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-primary-dim";

/** raidenType.bodyHud */
const bodyHudClass = "m-0 font-sans text-[0.85rem] leading-[1.55] text-foreground-secondary";

function GuidanceAccordion({ icon, iconClass, label, helpText, items }) {
  const Icon = icon;
  return (
    <Accordion type="single" collapsible className={HUD_PANEL_CLASS}>
      <AccordionItem value="guidance" className="border-0">
        <AccordionTrigger className="min-h-12 cursor-pointer px-4">
          <span className="flex flex-row items-center gap-2">
            <Icon className={cn("size-[18px]", iconClass)} aria-hidden="true" />
            <h6 className={sectionLabelClass}>{label}</h6>
          </span>
        </AccordionTrigger>
        <AccordionContent className="border-0 px-4 pb-4 pt-0">
          {helpText && helpText !== "N/A" && (
            <p className={cn(bodyHudClass, items?.length ? "mb-3" : "mb-0")}>{helpText}</p>
          )}
          {items && items.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {items.map((item, i) => (
                <p key={i} className={bodyHudClass}>
                  {i + 1}. {item}
                </p>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

GuidanceAccordion.propTypes = {
  icon: PropTypes.elementType.isRequired,
  iconClass: PropTypes.string,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
};

export default function UnifiedExamplePage({
  variant,
  ruleType,
  ruleId,
  title,
  description,
  helpText,
  bestPractices,
  fixSteps,
  examples,
}) {
  const pal = PALETTE[variant];
  const StatusIcon = pal.statusIcon;
  const location = useLocation();
  const legacyPath = location.pathname.replace(/_(success|failure)$/, "");
  const relatedEngineRules = ruleType === "legacy"
    ? Object.entries(engineLegacyMapping)
        .filter(([, legacyRules]) => legacyRules.some((legacy) => legacy.path === legacyPath))
        .map(([id]) => id)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [variant, ruleId]);

  const variantMotion = hudVariantMotion(variant);

  const variantContent = (
    <>
      <div className={cn(HUD_PANEL_CLASS, "overflow-hidden border-l-[3px]", pal.borderLeft)}>
        <div className="p-4 sm:p-5" style={{ background: pal.gradient }}>
          <div className="flex flex-row items-start justify-between gap-4">
            <div className="min-w-0">
              <p className={cn(sectionLabelClass, pal.text, "mb-1.5 text-[0.68rem]")}>
                Fixture review · {variant === "success" ? "expected pass" : "expected finding"}
              </p>
              {title && (
                <h1
                  className={cn(
                    "m-0 break-words font-['Rajdhani',sans-serif] text-[1.05rem] font-bold uppercase leading-[1.2] tracking-[0.06em] text-foreground sm:text-[1.2rem]",
                    description ? "mb-2" : "mb-0"
                  )}
                >
                  {title}
                </h1>
              )}
            </div>
            <div
              className={cn(
                "hidden size-[38px] shrink-0 items-center justify-center border border-solid sm:flex",
                pal.border,
                pal.text,
                pal.tint
              )}
            >
              <StatusIcon className="size-[21px]" aria-hidden="true" />
            </div>
          </div>

          {description && <p className={cn(bodyHudClass, "max-w-[820px]")}>{description}</p>}
        </div>

        <div
          className={cn(
            "flex flex-row flex-wrap gap-1 border-0 border-t border-solid bg-shell-main px-4 py-2.5 sm:px-5",
            pal.border
          )}
        >
          <Chip
            className={cn("h-6 rounded-full font-semibold", pal.border, pal.text)}
            icon={<StatusIcon className="size-3.5" aria-hidden="true" />}
          >
            {pal.statusLabel}
          </Chip>
          <Chip className="h-6 rounded-full">{`${examples.length} fixture${examples.length !== 1 ? "s" : ""}`}</Chip>
          <p className="m-0 ml-auto self-center font-mono text-[0.75rem] text-foreground-secondary">
            Preview · source · audit tree
          </p>
        </div>
      </div>

      {variant === "success" && (helpText || (bestPractices && bestPractices.length > 0)) && (
        <GuidanceAccordion
          icon={Lightbulb}
          iconClass={pal.text}
          label="Best Practices"
          helpText={helpText}
          items={bestPractices}
        />
      )}

      {variant === "failure" && (helpText || (fixSteps && fixSteps.length > 0)) && (
        <GuidanceAccordion icon={Info} iconClass="text-primary" label="How to Fix" helpText={helpText} items={fixSteps} />
      )}

      <div className={cn(HUD_PANEL_CLASS, "p-4 sm:p-5")}>
        <div className="mb-3 flex flex-row items-center justify-between gap-4">
          <div>
            <h6 className={cn(sectionLabelClass, pal.text)}>
              {variant === "success" ? "Success fixtures" : "Failure fixtures"}
            </h6>
            <p className="m-0 mt-1 text-[0.78rem] text-foreground">
              Inspect each isolated case before moving it into your test run.
            </p>
          </div>
          <Chip className="h-[23px] shrink-0 rounded-full">{`${examples.length} total`}</Chip>
        </div>

        <Separator className="mb-3" />

        {relatedEngineRules.length > 0 && (
          <div className="mb-3 border border-solid border-border bg-shell-main p-2.5">
            <p className={cn(sectionLabelClass, "mb-1.5 text-[0.68rem]")}>Mapped engine fixtures</p>
            <div className="flex flex-row flex-wrap gap-1.5">
              {relatedEngineRules.map((engineId) => (
                <RouterLink
                  key={engineId}
                  to={`/engine/${engineId}_${variant}`}
                  className={buttonClass({ variant: "outline", size: "sm", className: "normal-case no-underline" })}
                >
                  {engineId}
                </RouterLink>
              ))}
            </div>
          </div>
        )}

        <div role="region" aria-label={`${variant} examples list`}>
          {examples.length > 0 ? (
            examples.map((ex, i) => (
              <ExampleCard
                key={i}
                index={i}
                variant={variant}
                ruleId={ruleId}
                ruleType={ruleType}
                html={ex.html}
                reactContent={ex.reactContent}
                filename={ex.filename}
              />
            ))
          ) : (
            <Alert role="alert" variant="info" className="border-solid">
              No {variant} examples available for this rule.
            </Alert>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className={PAGE_SHELL_CLASS}>
      <ExamplePageNav ruleId={ruleId} ruleType={ruleType} variant={variant} />

      <main
        data-scan-ready="true"
        data-rule-id={ruleId}
        data-variant={variant}
        className="flex flex-col gap-3"
      >
        {ruleType === "legacy" ? (
          <AnimatePresence mode="wait">
            <m.div
              key={variant}
              initial={variantMotion.initial}
              animate={variantMotion.animate}
              exit={variantMotion.exit}
              transition={hudVariantTransition()}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {variantContent}
            </m.div>
          </AnimatePresence>
        ) : (
          variantContent
        )}
      </main>
    </div>
  );
}

UnifiedExamplePage.propTypes = {
  variant: PropTypes.oneOf(["success", "failure"]).isRequired,
  ruleType: PropTypes.oneOf(["engine", "legacy"]).isRequired,
  ruleId: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  bestPractices: PropTypes.arrayOf(PropTypes.string),
  fixSteps: PropTypes.arrayOf(PropTypes.string),
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      html: PropTypes.string,
      reactContent: PropTypes.node,
      filename: PropTypes.string,
    })
  ).isRequired,
};
