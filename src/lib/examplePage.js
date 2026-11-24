/**
 * Example page adapter: turns the two fixture shapes into one list of examples.
 *
 * - Legacy Criteria fixtures pass JSX (`itemContent`). Each example is a child marked
 *   `className="list-item"` (or every child when none are marked), rendered to HTML.
 * - Engine fixtures pass `htmlExamples`: strings, `{ filename, content }` or
 *   `{ filename, fixture }` (fetched from /fixtures/engine/<fixture>).
 */
import React from "react";

export const RENDER_FAILED_HTML = "Content not available";

function toHtml(child, render) {
  if (typeof child === "string") return child;
  try {
    return render(child);
  } catch {
    return RENDER_FAILED_HTML;
  }
}

/**
 * @param {React.ReactNode} itemContent
 * @param {(node: React.ReactNode) => string} render  e.g. renderToString
 * @returns {Array<{ html: string, reactContent: React.ReactNode }>}
 */
export function legacyExamples(itemContent, render) {
  let source = React.Children.toArray(itemContent);
  if (React.isValidElement(itemContent) && itemContent.props.children) {
    const listItems = React.Children.toArray(itemContent.props.children).filter(
      (child) =>
        React.isValidElement(child) &&
        typeof child.props.className === "string" &&
        child.props.className.includes("list-item")
    );
    if (listItems.length > 0) source = listItems;
  }
  return source.map((child) => ({ html: toHtml(child, render), reactContent: child }));
}

/**
 * Normalise engine `htmlExamples` into descriptors. `fixture` entries need fetching.
 * @returns {Array<{ filename: string|null, html: string|null, fixture: string|null }>}
 */
export function engineExampleDescriptors(htmlExamples) {
  return (htmlExamples || []).map((ex) => {
    if (typeof ex === "string") return { filename: null, html: ex, fixture: null };
    if (ex.fixture) return { filename: ex.filename || null, html: null, fixture: ex.fixture };
    return { filename: ex.filename || null, html: ex.content || "", fixture: null };
  });
}
