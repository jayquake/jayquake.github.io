import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const NoRoleApplication: Rule = {
  id: "no-role-application",
  metadata: {
    category: "General",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: 'Avoid using role="application"',
  description: 'Using role="application" is generally discouraged because it disables standard screen reader modes and forces users into an application mode. This removes familiar navigation shortcuts, such as heading or landmark navigation, and requires them to interact in ways they may not expect.',
  advice: 'Remove role="application" from the failing element.',
  associatedDetectors: [],
  refs: [
    {
      type: "WCAG",
      id: "1.3.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    },
    {
      type: "Non-Standard",
      link: "https://stackoverflow.com/a/61693580",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, document }) {
    response.failedNodes = Array.from(document.querySelectorAll<HTMLElement>("[role=application]"));
  },
};
