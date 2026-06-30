import React from "react";
import PropTypes from "prop-types";
import UnifiedExamplePage from "./UnifiedExamplePage";
import { useResolvedHtmlExamples } from "../../hooks/useResolvedHtmlExamples";

const EngineIssueFailure = ({
  ruleId,
  title,
  description,
  helpText,
  fixSteps,
  htmlExamples,
}) => {
  const examples = useResolvedHtmlExamples(htmlExamples);

  if (!examples) {
    return null;
  }

  return (
    <UnifiedExamplePage
      variant="failure"
      ruleType="engine"
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      examples={examples}
    />
  );
};

EngineIssueFailure.propTypes = {
  ruleId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  fixSteps: PropTypes.arrayOf(PropTypes.string),
  htmlExamples: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        filename: PropTypes.string,
        content: PropTypes.string,
        fixture: PropTypes.string,
      }),
    ])
  ).isRequired,
};

EngineIssueFailure.defaultProps = {
  helpText: null,
  fixSteps: [],
};

export default EngineIssueFailure;
