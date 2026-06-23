import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

export const PageTitle: Rule = {
  id: "page-title",
  metadata: {
    category: "Metadata",
    profile: ["Blind"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "serious",
  title: "Page should have a title",
  description: "A missing page title makes it difficult for screen reader users and sighted users with multiple tabs open to identify the page, reducing orientation and usability.",
  advice: "Make sure each page has a unique, descriptive <title> element inside the <head> that reflects the purpose of the page.",
  associatedDetectors: [],
  refs: [
    {
      type: "WCAG",
      id: "2.4.2",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html",
    },
    {
      type: "ACT",
      ruleId: "c4a8a4",
      link: "https://act-rules.github.io/rules/c4a8a4",
    },
  ],
  passCondition: PassCondition.PassedNodesAndNoFailedNodes,
  async validate({ response, document }) {
    const title = document.querySelector<HTMLElement>("head > title");
    if (title) {
      response.passedNodes.push(title);
    }
  },
};
