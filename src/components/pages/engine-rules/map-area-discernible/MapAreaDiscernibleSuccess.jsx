import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const MapAreaDiscernibleSuccess = () => {
  const ruleId = "map-area-discernible";
  const title = `Each area element within an image map should have a text alternative`;
  const description = `Providing a text alternative for each area element inside a map element ensures that the content is announced by screen readers, enabling users to understand and navigate the content.`;
  const helpText = `Provide a text alternative to each <area> element using the alt attribute.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "area role none no map", fixture: "map-area-discernible/0-area-role-none-no-map.html" },
  { filename: "area with alt in map", fixture: "map-area-discernible/1-area-with-alt-in-map.html" },
  { filename: "area with aria attributes in map", fixture: "map-area-discernible/2-area-with-aria-attributes-in-map.html" },
  { filename: "area with role no alt", fixture: "map-area-discernible/3-area-with-role-no-alt.html" }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default MapAreaDiscernibleSuccess;
