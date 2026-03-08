import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { renderToString } from "react-dom/server";
import UnifiedExamplePage from "./UnifiedExamplePage";

const IssueSuccess = ({ itemContent, itemDescription, helpText, bestPractices }) => {
  const location = useLocation();
  const ruleId = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "";
    return last.replace(/(_success|_failure)$/, "");
  }, [location.pathname]);

  const examples = useMemo(() => {
    const items = [];

    if (React.isValidElement(itemContent) && itemContent.props.children) {
      const children = React.Children.toArray(itemContent.props.children);
      const listItems = children.filter(
        (child) =>
          React.isValidElement(child) &&
          child.props.className &&
          child.props.className.includes("list-item")
      );

      const source = listItems.length > 0 ? listItems : React.Children.toArray(itemContent);
      for (const child of source) {
        let html = "";
        try {
          html = typeof child === "string" ? child : renderToString(child);
        } catch {
          html = "Content not available";
        }
        items.push({ html, reactContent: child });
      }
    } else {
      const children = React.Children.toArray(itemContent);
      for (const child of children) {
        let html = "";
        try {
          html = typeof child === "string" ? child : renderToString(child);
        } catch {
          html = "Content not available";
        }
        items.push({ html, reactContent: child });
      }
    }

    return items;
  }, [itemContent]);

  return (
    <UnifiedExamplePage
      variant="success"
      ruleType="legacy"
      ruleId={ruleId}
      description={itemDescription}
      helpText={helpText}
      bestPractices={bestPractices}
      examples={examples}
    />
  );
};

IssueSuccess.propTypes = {
  itemContent: PropTypes.node.isRequired,
  itemDescription: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  bestPractices: PropTypes.arrayOf(PropTypes.string),
};

IssueSuccess.defaultProps = {
  helpText: null,
  bestPractices: null,
};

export default IssueSuccess;
