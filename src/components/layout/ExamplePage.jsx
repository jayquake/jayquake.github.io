import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { renderToString } from "react-dom/server";
import { useLocation } from "react-router-dom";
import UnifiedExamplePage from "./UnifiedExamplePage";
import { useLibraryLocation } from "../../hooks/useLibraryLocation";
import { useResolvedHtmlExamples } from "../../hooks/useResolvedHtmlExamples";
import { legacyExamples } from "../../lib/examplePage";
import { parseSlug, ruleKey } from "../../lib/libraryLocation";

/** Rule id for the current page: from the library location, else the last path segment. */
function useRouteRuleId() {
  const { route } = useLibraryLocation();
  const { pathname } = useLocation();
  if (route.rule) return ruleKey(route.rule);
  const last = pathname.split("/").filter(Boolean).pop();
  return parseSlug(last).id;
}

function LegacyExamplePage({ variant, itemContent, itemDescription, helpText, bestPractices, fixSteps }) {
  const ruleId = useRouteRuleId();
  const examples = useMemo(() => legacyExamples(itemContent, renderToString), [itemContent]);
  return (
    <UnifiedExamplePage
      variant={variant}
      ruleType="legacy"
      ruleId={ruleId}
      description={itemDescription}
      helpText={helpText}
      bestPractices={variant === "success" ? bestPractices : undefined}
      fixSteps={variant === "failure" ? fixSteps : undefined}
      examples={examples}
    />
  );
}

function EngineExamplePage({ variant, ruleId, title, description, helpText, bestPractices, fixSteps, htmlExamples }) {
  const examples = useResolvedHtmlExamples(htmlExamples);
  if (!examples) return null;
  return (
    <UnifiedExamplePage
      variant={variant}
      ruleType="engine"
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={variant === "success" ? bestPractices : undefined}
      fixSteps={variant === "failure" ? fixSteps : undefined}
      examples={examples}
    />
  );
}

const exampleHtml = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ filename: PropTypes.string, content: PropTypes.string, fixture: PropTypes.string }),
]);

const LEGACY_PROP_TYPES = {
  itemContent: PropTypes.node.isRequired,
  itemDescription: PropTypes.string.isRequired,
  helpText: PropTypes.string,
};

const ENGINE_PROP_TYPES = {
  ruleId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  htmlExamples: PropTypes.arrayOf(exampleHtml).isRequired,
};

/**
 * Build the example page component a fixture imports as its default export.
 * The four `layout/{engine,}issue{Success,Failure}` modules are one-line calls to this,
 * so the ~510 fixture files never change.
 *
 * @param {"legacy"|"engine"} ruleType
 * @param {"success"|"failure"} variant
 */
export function examplePageFor(ruleType, variant) {
  const listProp = variant === "success" ? "bestPractices" : "fixSteps";
  const Page = ruleType === "engine" ? EngineExamplePage : LegacyExamplePage;
  const Component = (props) => <Page variant={variant} {...props} />;
  const name = `${ruleType === "engine" ? "EngineIssue" : "Issue"}${variant === "success" ? "Success" : "Failure"}`;
  Component.displayName = name;
  Component.propTypes = {
    ...(ruleType === "engine" ? ENGINE_PROP_TYPES : LEGACY_PROP_TYPES),
    [listProp]: PropTypes.arrayOf(PropTypes.string),
  };
  // Engine pages default the list to []; legacy pages to null (matches the old wrappers).
  Component.defaultProps = {
    helpText: null,
    [listProp]: ruleType === "engine" ? [] : null,
  };
  return Component;
}
