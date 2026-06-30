import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TableMisuseFailure = () => {
  const ruleId = "table-misuse";
  const title = `Only elements that function as data tables should be tagged as table`;
  const description = `When a layout table is marked up with HTML elements like <table> or <tr>, or assigned table ARIA roles, screen readers announce a data table structure with rows, columns, and headers, even though the table is only used for page layout.`;
  const helpText = `Avoid using table markup or roles for visual layout. Use CSS for page structure, and if a table must be used for layout, remove semantic roles by adding role="presentation" or role="none".`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "books", fixture: "table-misuse/0-books.html" },
  { filename: "footer amazon", fixture: "table-misuse/1-footer-amazon.html" },
  { filename: "table as article layout", fixture: "table-misuse/2-table-as-article-layout.html" },
  { filename: "table as breadcrumbs layout", fixture: "table-misuse/3-table-as-breadcrumbs-layout.html" },
  { filename: "table as layout", fixture: "table-misuse/4-table-as-layout.html" },
  { filename: "table as profile layout", fixture: "table-misuse/5-table-as-profile-layout.html" },
  { filename: "ubl com", fixture: "table-misuse/6-ubl-com.html" },
  { filename: "weather component", fixture: "table-misuse/7-weather-component.html" }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default TableMisuseFailure;
