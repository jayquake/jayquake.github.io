import React, { useMemo } from "react";
import PropTypes from "prop-types";
import UnifiedExamplePage from "./UnifiedExamplePage";

const EngineIssueSuccess = ({
  ruleId,
  title,
  description,
  helpText,
  bestPractices,
  htmlExamples,
}) => {
  const examples = useMemo(
    () =>
      (htmlExamples || []).map((ex) => ({
        html: typeof ex === "string" ? ex : ex.content,
        filename: typeof ex === "string" ? null : ex.filename,
      })),
    [htmlExamples]
  );

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
      PropTypes.shape({ filename: PropTypes.string, content: PropTypes.string }),
    ])
  ).isRequired,
};

EngineIssueSuccess.defaultProps = {
  helpText: null,
  bestPractices: [],
};

export default EngineIssueSuccess;
