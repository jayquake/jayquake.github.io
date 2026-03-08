import React, { useMemo } from "react";
import PropTypes from "prop-types";
import UnifiedExamplePage from "./UnifiedExamplePage";

const EngineIssueFailure = ({
  ruleId,
  title,
  description,
  helpText,
  fixSteps,
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
      PropTypes.shape({ filename: PropTypes.string, content: PropTypes.string }),
    ])
  ).isRequired,
};

EngineIssueFailure.defaultProps = {
  helpText: null,
  fixSteps: [],
};

export default EngineIssueFailure;
