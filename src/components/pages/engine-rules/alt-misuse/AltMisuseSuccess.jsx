import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const AltMisuseSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Alt Misuse"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "div with no alt", content: `<div></div>` },
  { filename: "img with alt", content: `<img alt="this div is remarkable, you should know this" />` },
  { filename: "img with map", content: `<img src="world-map.png" usemap="#worldmap" alt="World map with clickable countries">
<map name="worldmap">
  <area shape="rect" coords="0,0,100,100" href="usa.html" alt="United States" />
  <area shape="rect" coords="101,0,200,100" href="canada.html" alt="Canada" />
</map>` },
  { filename: "input with alt", content: `<input type="image" alt="this div is remarkable, you should know this" />` }
      ]}
    />
  );
};

export default AltMisuseSuccess;
