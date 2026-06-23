import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";

/** Amount of seconds that is considered a long enough delay for a meta refresh
 * to be compliant, based on ACT test cases and is set to 20 hours (72000 seconds). */
const LONG_DELAY_THRESHOLD_SECONDS = 72000;

export const PageNoMetaHttpEquivRefresh: Rule = {
  id: "page-no-meta-http-equiv-refresh",
  metadata: {
    category: "Metadata",
    profile: ["Blind", "Cognitive Disability", "Motor Impaired", "Vision Impaired"],
    wcagVersion: "2.0",
    wcagLevel: "A",
  },
  impact: "critical",
  title: 'Pages should not use <meta http-equiv="refresh"> for automatic redirection or reloading',
  description: 'A <meta> element with http-equiv="refresh" is sometimes used to automatically redirect users after a time delay. These timed changes can interrupt and disorient users who rely on assistive technology',
  advice: 'Remove <meta> elements with http-equiv="refresh". If timed user sessions are necessary, ensure users can extend the session time limit.',
  associatedDetectors: [],
  refs: [
    {
      type: "WCAG",
      id: "2.2.1",
      level: "A",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html",
    },
    {
      type: "W3C",
      link: "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#consistent-behavior-no-extreme-changes-context",
    },
    {
      type: "W3C",
      link: "https://www.w3.org/TR/2012/WD-html-markup-20121025/meta.http-equiv.refresh.html",
    },
    {
      type: "ACT",
      ruleId: "bc659a",
      link: "https://act-rules.github.io/rules/bc659a",
    },
    {
      type: "ACT",
      ruleId: "bisz58",
      link: "https://act-rules.github.io/rules/bisz58",
    },
    {
      // This source mentions that when content='0' meta refresh is compliant
      type: "W3C",
      link: "https://www.w3.org/TR/WCAG20-TECHS/H76.html",
    },
    {
      // This source mentions that content='above 20 hours' is compliant
      type: "WAI",
      link: "https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html",
    },
  ],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, document }) {
    const metaElements = document.querySelectorAll<HTMLMetaElement>('meta[http-equiv="refresh"]');

    for (const metaElement of metaElements) {
      /**
       * If the content attribute is missing or empty, it means the meta refresh is not properly
       * configured and can lead to unexpected behavior. In this case, we consider it a failure.
       */
      const content = metaElement.getAttribute("content")?.trim();
      if (!content) {
        response.failedNodes.push(metaElement);
        continue;
      }

      /**
       * A meta refresh is evaluated solely by its timing because WCAG is concerned with user disorientation
       * caused by redirects or refreshes that occur while a user is actively interacting with the page.
       *
       * A content attribute set to "0" triggers an immediate redirect. This does not create a usability or
       * accessibility issue because the user does not have time to begin interacting with the page.
       * No interaction means no interruption, therefore this case is compliant.
       *
       * A redirect or refresh that occurs after a sufficiently long delay is also compliant. At that point,
       * the user is no longer reasonably expected to be interacting with the page, so no interruption occurs.
       *
       * We are basing the threshold for what is considered "long enough" based on ACT test cases. Any value greater than
       * 72000 seconds, which equals 20 hours, is explicitly considered compliant.
       *
       * In summary:
       * - content="0" is compliant because the redirect is immediate.
       * - content >= "72000" is compliant because the redirect happens far beyond any realistic user interaction window.
       * - Only intermediate values may cause a WCAG failure.
       *
       * Compliant example:
       * <meta http-equiv="refresh" content="0; URL='https://github.com'" />
       */
      const [timePart, rest] = content.split(";", 2);
      const contentTimeValue = Number(timePart?.trim());
      if (Number.isNaN(contentTimeValue)) {
        response.failedNodes.push(metaElement);
        continue;
      }

      const hasRedirectUrl = !!rest?.trim();

      if ((contentTimeValue === 0 || contentTimeValue > LONG_DELAY_THRESHOLD_SECONDS) && hasRedirectUrl) {
        response.passedNodes.push(metaElement);
        continue;
      }

      response.failedNodes.push(metaElement);
    }
  },
};
