import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const VisibilityMismatchSuccess = () => {
  const ruleId = "visibility-mismatch";
  const title = `Visible content should not be hidden from assistive technology`;
  const description = `If content remains visible on the screen but assigned aria-hidden="true", it will be excluded from the accessibility tree. As a result, screen reader users will not have access to the same information as sighted users.`;
  const helpText = `Remove aria-hidden="true" from visible elements. Make sure that the attribute is only used to hide redundant or inactive content.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "aria hidden decorative divider", content: `<!-- TODO: requires a new detector, e.g PerceivableDecorativeImage / PerceivableDivider -->
<svg class="e2pi3yq3 css-119mp5z e1m8cnab0" color="#f2b712" width="100%" height="8">
  <defs>
    <pattern id="line-2" x="0" y="0" width="15" height="8" patternUnits="userSpaceOnUse"><path d="M15 5.9c-3.8 0-3.8-4.4-7.5-4.4S3.7 5.9 0 5.9" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="3"></path></pattern>
  </defs>
  <rect x="0" y="0" width="100%" height="8" fill="url(#line-2)"></rect>
</svg>` },
  { filename: "aria hidden logo labelled by parent", content: `<a href="/welcome/?referrer=trust" class="dark css-qcxixa et4v3sf3" aria-label="Welcome Page"
  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" aria-hidden="true" class="css-4zleql e6sdxp70" style="height: 2rem">
    <path
      fill="currentColor"
      d="M124.32,28.28,109.56,9.22h-3.68V34.77h3.73V15.19l15.18,19.58h3.26V9.22h-3.73ZM87.15,23.54h13.23V20.22H87.14V12.53h14.93V9.21H83.34V34.77h18.92V31.45H87.14ZM71.59,20.3h0C66.44,19.06,65,18.08,65,15.7c0-2.14,1.89-3.59,4.71-3.59a12.06,12.06,0,0,1,7.07,2.55l2-2.83a14.1,14.1,0,0,0-9-3c-5.06,0-8.59,3-8.59,7.27,0,4.6,3,6.19,8.46,7.52C74.51,24.74,76,25.78,76,28.11s-2,3.77-5.09,3.77a12.34,12.34,0,0,1-8.3-3.26l-2.25,2.69a15.94,15.94,0,0,0,10.42,3.85c5.48,0,9-2.95,9-7.51C79.75,23.79,77.47,21.72,71.59,20.3ZM195.7,9.22l-7.69,12-7.64-12h-4.46L186,24.67V34.78h3.84V24.55L200,9.22Zm-64.63,3.46h8.37v22.1h3.84V12.68h8.37V9.22H131.08ZM169.41,24.8c3.86-1.07,6-3.77,6-7.63,0-4.91-3.59-8-9.38-8H154.67V34.76h3.8V25.58h6.45l6.48,9.2h4.44l-7-9.82Zm-10.95-2.5V12.6h7.17c3.74,0,5.88,1.77,5.88,4.84s-2.29,4.86-5.84,4.86Z M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z"
    ></path></svg
></a>` },
  { filename: "display none aria hidden", content: `<div style="display: none" aria-hidden="true">This is hidden content</div>` },
  { filename: "display none parent", content: `<div style="display: none">
  <div>This is hidden content</div>
</div>` },
  { filename: "display none", content: `<div style="display: none">This is hidden content</div>` },
  { filename: "empty styled visible div", content: `<div style="width: 20px; height: 20px; background: red"></div>` },
  { filename: "hidden dimensions aria hidden", content: `<div style="width: 0; height: 0; overflow: hidden" aria-hidden="true">This is hidden content</div>` },
  { filename: "hidden dimensions", content: `<div style="width: 0; height: 0; overflow: hidden">This is hidden content</div>` },
  { filename: "opacity zero aria hidden", content: `<div style="opacity: 0" aria-hidden="true">This is hidden content</div>` },
  { filename: "opacity zero", content: `<div style="opacity: 0">This is hidden content</div>` },
  { filename: "presentation icon no text", content: `<i role="presentation" class="sc-hABBmJ bHDvnc"
  ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.83 3.296a2.452 2.452 0 0 1 2.339 0c.36.195.665.48.882.831l7.615 12.392a2.247 2.247 0 0 1 .002 2.35 2.347 2.347 0 0 1-.882.834c-.36.196-.763.297-1.17.297H4.384c-.408 0-.811-.101-1.17-.297a2.347 2.347 0 0 1-.883-.834 2.247 2.247 0 0 1 .002-2.35L9.95 4.127c.217-.351.523-.636.882-.831ZM12 9a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Zm1 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
      fill="currentColor"
    ></path></svg
></i>` },
  { filename: "property hidden", content: `<div hidden="true" aria-hidden="true">This is hidden content</div>` },
  { filename: "visibility hidden aria hidden", content: `<div style="visibility: hidden" aria-hidden="true">This is hidden content</div>` },
  { filename: "visibility hidden", content: `<div style="visibility: hidden">This is hidden content</div>` },
  { filename: "visible text", content: `<div>This content is visible</div>` }
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

export default VisibilityMismatchSuccess;
