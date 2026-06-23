// Generated metadata for region-footer-misuse
// This file is auto-generated from index.ts to avoid module resolution issues

export const RegionFooterMisuse = {
  id: "region-footer-misuse",
  title: `An element without global site information is tagged as a contentinfo landmark`,
  description: `When a region without global site information is tagged as a contentinfo landmark, screen reader users may be misled about its purpose and expect website-level details, such as copyright or contact information.`,
  advice: `If the failing element is a custom contentinfo region, remove role="contentinfo". If the failing element is coded using a HTML <footer> tag, change the tag to a <div> or an element with a suitable role.`,
  impact: "serious",
  refs: [
    { type: "W3C", link: "https://www.w3.org/WAI/tutorials/page-structure/regions/" }
  ]
};
