// Generated metadata for aria-describedby-has-reference
// This file is auto-generated from index.ts to avoid module resolution issues

export const AriaDescribedByHasReference = {
  id: "aria-describedby-has-reference",
  title: "aria-describedby should reference a valid element id",
  description: "The element’s aria-describedby attribute points to an id that does not exist or is not valid, preventing assistive technologies from announcing the intended description and causing users to miss important context.",
  advice: `Make the value of aria-describedby exactly match the id of an existing, unique element on the page. Remove or update the attribute if the target is missing or no longer relevant`,
  impact: "serious",
  refs: [

  ]
};
