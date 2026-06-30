import React from "react";
import PropTypes from "prop-types";
import UnifiedExamplePage from "./UnifiedExamplePage";
import { useResolvedHtmlExamples } from "../../hooks/useResolvedHtmlExamples";

const EngineIssueSuccess = ({
  ruleId,
  title,
  description,
  helpText,
  bestPractices,
  htmlExamples,
}) => {
  const examples = useResolvedHtmlExamples(htmlExamples);

  if (!examples) {
    return null;
  }

  return (
    <UnifiedExamplePage
      variant="success"
      ruleType="engine"
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      examples={examples}
    />
  );
};

EngineIssueSuccess.propTypes = {
  ruleId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  bestPractices: PropTypes.arrayOf(PropTypes.string),
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

EngineIssueSuccess.defaultProps = {
  helpText: null,
  bestPractices: [],
};

export default EngineIssueSuccess;
