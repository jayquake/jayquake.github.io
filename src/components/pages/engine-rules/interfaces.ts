//import type { SvgOrHtmlElement } from "@acsbe/core-engine-classifier";
//import type EngineClassifier from "@acsbe/core-engine-classifier";
// TODO: Export the type DetectorOrLocator from the package
//import { type DetectorOrLocator } from "@acsbe/core-engine-classifier/dist/interface";


interface RuleReferenceWCAG {
  type: "WCAG";
  id: string;
  level: "A" | "AA" | "AAA";
  link: string;
}

interface RuleReferenceNonStandard {
  type: "Non-Standard";
  link: string;
}

interface RuleReferenceACT {
  type: "ACT";
  link: string;
  ruleId: string;
}

interface RuleReferenceW3C {
  type: "W3C";
  link: string;
}

interface RuleReferenceWCAGTechnique {
  type: "WCAG Technique";
  link: string;
}

interface RuleReferenceWAI {
  type: "WAI";
  link: string;
}

type RuleReference = RuleReferenceWCAG | RuleReferenceNonStandard | RuleReferenceW3C | RuleReferenceWCAGTechnique | RuleReferenceACT | RuleReferenceWAI;

export type Rule = {
  validate: ({ document }: { document: Document; }) => Promise<void>;
  passCondition: PassCondition;
  impact: "minor" | "moderate" | "serious" | "critical";
  refs: RuleReference[];
  id: string;
  title: string;
  advice: string;
  description: string;
  isBackendOnly?: boolean;
};

export enum PassCondition {
  PassedNodesAndNoFailedNodes = "PassedNodesAndNoFailedNodes",
  NoFailedNodes = "NoFailedNodes",
  NoInapplicableNodes = "NoInapplicableNodes",
}
