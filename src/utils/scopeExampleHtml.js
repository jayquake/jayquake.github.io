/**
 * Prefix fixture element ids and cross-references so multiple ExampleCards
 * on one page do not collide (document.getElementById is document-wide).
 *
 * @param {string} html - Raw fixture HTML
 * @param {number} index - Example index on the page (0-based)
 * @returns {string} HTML with ex-{index}- prefixed ids and references
 */
export function scopeExampleHtml(html, index) {
  if (!html || typeof html !== "string") return html;

  const prefix = `ex-${index}-`;
  const idRegex = /\bid\s*=\s*["']([^"']+)["']/gi;
  const idMap = new Map();

  let match;
  while ((match = idRegex.exec(html)) !== null) {
    const id = match[1];
    if (!id.startsWith(prefix)) {
      idMap.set(id, `${prefix}${id}`);
    }
  }

  let result = html.replace(/\bid\s*=\s*["']([^"']+)["']/gi, (_full, id) => {
    if (id.startsWith(prefix)) return `id="${id}"`;
    const scoped = idMap.get(id) || `${prefix}${id}`;
    return `id="${scoped}"`;
  });

  const rewriteRefValue = (value) =>
    value
      .split(/\s+/)
      .map((token) => {
        const isHash = token.startsWith("#");
        const bare = isHash ? token.slice(1) : token;
        const mapped = idMap.get(bare);
        if (mapped) return isHash ? `#${mapped}` : mapped;
        if (isHash && !bare.startsWith(prefix)) return `#${prefix}${bare}`;
        if (!isHash && idMap.has(bare)) return idMap.get(bare);
        return token;
      })
      .join(" ");

  result = result.replace(
    /(aria-controls|aria-labelledby|for)\s*=\s*["']([^"']+)["']/gi,
    (_full, attr, val) => `${attr}="${rewriteRefValue(val)}"`,
  );

  result = result.replace(/href\s*=\s*["']#([^"']+)["']/gi, (_full, id) => {
    const mapped = idMap.get(id);
    return mapped ? `href="#${mapped}"` : `href="#${prefix}${id}"`;
  });

  return result;
}
