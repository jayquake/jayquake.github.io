import { useEffect, useMemo, useState } from "react";

function fixtureUrl(fixture) {
  const base = process.env.PUBLIC_URL || "";
  return `${base}/fixtures/engine/${fixture}`;
}

/**
 * Resolve inline HTML or async fixture paths for engine example pages.
 * @param {Array<string|{filename?: string, content?: string, fixture?: string}>} htmlExamples
 */
export function useResolvedHtmlExamples(htmlExamples) {
  const descriptors = useMemo(
    () =>
      (htmlExamples || []).map((ex) => {
        if (typeof ex === "string") {
          return { filename: null, html: ex, fixture: null };
        }
        if (ex.fixture) {
          return { filename: ex.filename || null, html: null, fixture: ex.fixture };
        }
        return { filename: ex.filename || null, html: ex.content || "", fixture: null };
      }),
    [htmlExamples]
  );

  const [resolved, setResolved] = useState(null);
  const needsFetch = descriptors.some((d) => d.fixture);

  useEffect(() => {
    if (!needsFetch) {
      setResolved(
        descriptors.map((d) => ({
          filename: d.filename,
          html: d.html,
        }))
      );
      return undefined;
    }

    let cancelled = false;

    Promise.all(
      descriptors.map(async (d) => {
        if (d.fixture) {
          const response = await fetch(fixtureUrl(d.fixture));
          if (!response.ok) {
            throw new Error(`Failed to load fixture: ${d.fixture}`);
          }
          const html = await response.text();
          return { filename: d.filename, html };
        }
        return { filename: d.filename, html: d.html };
      })
    )
      .then((examples) => {
        if (!cancelled) setResolved(examples);
      })
      .catch(() => {
        if (!cancelled) {
          setResolved(
            descriptors.map((d) => ({
              filename: d.filename,
              html: d.html || `<p>Failed to load fixture.</p>`,
            }))
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [descriptors, needsFetch]);

  if (!needsFetch) {
    return descriptors.map((d) => ({ filename: d.filename, html: d.html }));
  }

  return resolved;
}
