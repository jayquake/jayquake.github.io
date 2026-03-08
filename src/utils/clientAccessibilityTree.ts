export interface AuditIssue {
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  rule: string;
  message: string;
  element: string;
  impact: string;
}

export interface ContrastResult {
  element: string;
  foreground: string;
  background: string;
  ratio: number;
  requiredRatio: number;
  passes: boolean;
  isLargeText: boolean;
}

export interface TouchTargetResult {
  element: string;
  role: string;
  width: number;
  height: number;
  meetsWCAG: boolean;
  meetsMobile: boolean;
}

export interface ClientAnalysisResult {
  accessibilityTree: string;
  computedRoles: string[];
  screenReaderNarration: string;
  elementInfo: {
    elements: Array<{ role: string; name?: string; focusable?: boolean; visible?: boolean }>;
    rawLength: number;
  };
  audit: {
    issues: AuditIssue[];
    summary: { critical: number; serious: number; moderate: number; minor: number };
    contrastResults: ContrastResult[];
    touchTargets: TouchTargetResult[];
    headingOutline: Array<{ level: number; text: string }>;
    focusOrder: Array<{ element: string; tabIndex: number; role: string; name: string }>;
  };
  source: 'client';
}

// ── Role mapping ──

function getImplicitRole(el: Element): string {
  const explicit = el.getAttribute('role');
  if (explicit) return explicit;

  const tag = el.tagName.toLowerCase();
  const type = (el.getAttribute('type') || '').toLowerCase();

  switch (tag) {
    case 'a': return el.hasAttribute('href') ? 'link' : 'generic';
    case 'article': return 'article';
    case 'aside': return 'complementary';
    case 'button': return 'button';
    case 'datalist': return 'listbox';
    case 'details': return 'group';
    case 'dialog': return 'dialog';
    case 'fieldset': return 'group';
    case 'figure': return 'figure';
    case 'footer': return 'contentinfo';
    case 'form': return 'form';
    case 'h1': case 'h2': case 'h3':
    case 'h4': case 'h5': case 'h6':
      return 'heading';
    case 'header': return 'banner';
    case 'hr': return 'separator';
    case 'img':
      return el.getAttribute('alt') === '' ? 'presentation' : 'img';
    case 'input':
      switch (type) {
        case 'button': case 'submit': case 'reset': case 'image':
          return 'button';
        case 'checkbox': return 'checkbox';
        case 'radio': return 'radio';
        case 'range': return 'slider';
        case 'search': return 'searchbox';
        default: return 'textbox';
      }
    case 'li': return 'listitem';
    case 'main': return 'main';
    case 'math': return 'math';
    case 'menu': return 'list';
    case 'meter': return 'meter';
    case 'nav': return 'navigation';
    case 'ol': case 'ul': return 'list';
    case 'option': return 'option';
    case 'output': return 'status';
    case 'progress': return 'progressbar';
    case 'section':
      return (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby'))
        ? 'region' : 'generic';
    case 'select':
      return el.hasAttribute('multiple') ? 'listbox' : 'combobox';
    case 'summary': return 'button';
    case 'table': return 'table';
    case 'tbody': case 'thead': case 'tfoot': return 'rowgroup';
    case 'td': return 'cell';
    case 'textarea': return 'textbox';
    case 'th': return 'columnheader';
    case 'tr': return 'row';
    default: return 'generic';
  }
}

// ── Accessible name ──

function computeAccessibleName(el: Element, doc: Document): string {
  const labelledBy = el.getAttribute('aria-labelledby');
  if (labelledBy) {
    const names = labelledBy.split(/\s+/)
      .map(id => doc.getElementById(id)?.textContent?.trim())
      .filter(Boolean);
    if (names.length) return names.join(' ');
  }

  const ariaLabel = el.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  const tag = el.tagName.toLowerCase();
  if (tag === 'img') {
    const alt = el.getAttribute('alt');
    if (alt !== null) return alt;
  }
  if (tag === 'input') {
    const type = (el.getAttribute('type') || '').toLowerCase();
    if (type === 'submit') return (el as HTMLInputElement).value || 'Submit';
    if (type === 'reset') return (el as HTMLInputElement).value || 'Reset';
    if (type === 'image') return el.getAttribute('alt') || 'Submit';
  }

  if ('labels' in el) {
    const labels = (el as HTMLInputElement).labels;
    if (labels && labels.length) {
      return Array.from(labels)
        .map(l => l.textContent?.trim())
        .filter(Boolean)
        .join(' ');
    }
  }

  const title = el.getAttribute('title');
  if (title) return title;

  const textRoles = new Set([
    'button', 'link', 'heading', 'tab', 'menuitem', 'option',
    'listitem', 'cell', 'columnheader',
  ]);
  if (textRoles.has(getImplicitRole(el))) {
    const text = el.textContent?.trim();
    if (text) return text;
  }

  return '';
}

// ── Visibility ──

type VisibilityState = 'visible' | 'hidden' | 'sr-only' | 'aria-hidden';

function getVisibility(el: Element): VisibilityState {
  if (el.getAttribute('aria-hidden') === 'true') return 'aria-hidden';

  const style = getComputedStyle(el);
  if (style.display === 'none') return 'hidden';
  if (style.visibility === 'hidden') return 'hidden';
  if (parseFloat(style.opacity) === 0) return 'hidden';

  try {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      if (style.overflow === 'hidden' || style.clip !== 'auto' ||
          style.clipPath === 'inset(50%)') {
        return 'sr-only';
      }
      return 'hidden';
    }
    if (rect.right < 0 || rect.bottom < 0) return 'sr-only';
  } catch {
    // getBoundingClientRect can fail in some environments
  }

  return 'visible';
}

// ── Color contrast ──

function parseColor(color: string): [number, number, number] | null {
  const m = color.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(fg: [number, number, number], bg: [number, number, number]): number {
  const l1 = relativeLuminance(...fg);
  const l2 = relativeLuminance(...bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function isLargeText(el: Element): boolean {
  const style = getComputedStyle(el);
  const size = parseFloat(style.fontSize);
  const weight = parseInt(style.fontWeight) || (style.fontWeight === 'bold' ? 700 : 400);
  return size >= 24 || (size >= 18.66 && weight >= 700);
}

// ── CSS path ──

function cssPath(el: Element): string {
  const parts: string[] = [];
  let current: Element | null = el;
  while (current && current !== current.ownerDocument?.body) {
    let selector = current.tagName.toLowerCase();
    if (current.id) {
      selector += `#${current.id}`;
      parts.unshift(selector);
      break;
    }
    const parent = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        c => c.tagName === current!.tagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        selector += `:nth-of-type(${index})`;
      }
    }
    parts.unshift(selector);
    current = parent;
  }
  return parts.join(' > ') || el.tagName.toLowerCase();
}

// ── Interactive check ──

const INTERACTIVE_ROLES = new Set([
  'button', 'link', 'checkbox', 'radio', 'textbox', 'combobox',
  'slider', 'tab', 'menuitem', 'option', 'searchbox', 'switch',
]);

function isInteractive(el: Element): boolean {
  return INTERACTIVE_ROLES.has(getImplicitRole(el));
}

// ── Tree building ──

interface TreeContext {
  elements: Array<{ role: string; name?: string; focusable?: boolean; visible?: boolean }>;
  roles: Set<string>;
  narrationParts: string[];
  issues: AuditIssue[];
  contrastResults: ContrastResult[];
  touchTargets: TouchTargetResult[];
  headingOutline: Array<{ level: number; text: string }>;
  focusOrder: Array<{ element: string; tabIndex: number; role: string; name: string }>;
  doc: Document;
  headingsSeen: number[];
}

function walkElement(el: Element, ctx: TreeContext, depth: number): string[] {
  const lines: string[] = [];
  const indent = '  '.repeat(depth);

  for (const child of Array.from(el.children)) {
    const vis = getVisibility(child);
    if (vis === 'hidden') continue;

    const role = getImplicitRole(child);
    const name = computeAccessibleName(child, ctx.doc);
    const tag = child.tagName.toLowerCase();

    // Skip generic unnamed containers -- recurse into their children instead
    if (role === 'generic' && !name && !child.getAttribute('aria-label')) {
      // Still run audits on the element itself
      runElementAudits(child, role, name, vis, ctx);
      lines.push(...walkElement(child, ctx, depth));
      continue;
    }

    // Build tree line
    let line = `${indent}- ${role}`;
    if (name) line += ` "${name}"`;

    const attrs: string[] = [];
    if (role === 'heading') {
      const levelMatch = tag.match(/^h(\d)$/);
      if (levelMatch) {
        const level = parseInt(levelMatch[1]);
        attrs.push(`level=${level}`);
        ctx.headingOutline.push({ level, text: name || '(unnamed)' });
        ctx.headingsSeen.push(level);
      }
    }
    const expanded = child.getAttribute('aria-expanded');
    if (expanded) attrs.push(`expanded=${expanded}`);
    const checked = child.getAttribute('aria-checked');
    if (checked) attrs.push(`checked=${checked}`);
    const selected = child.getAttribute('aria-selected');
    if (selected) attrs.push(`selected=${selected}`);
    const required = child.getAttribute('aria-required');
    if (required === 'true') attrs.push('required');
    if ((child as HTMLElement).hasAttribute?.('disabled')) attrs.push('disabled');

    const tabIdx = (child as HTMLElement).tabIndex;
    if (tabIdx >= 0) {
      attrs.push('focusable');
      ctx.focusOrder.push({ element: cssPath(child), tabIndex: tabIdx, role, name });
    }
    if (vis === 'sr-only') attrs.push('sr-only');
    if (vis === 'aria-hidden') attrs.push('aria-hidden');

    // Pseudo-element content
    try {
      const before = getComputedStyle(child, '::before').content;
      if (before && before !== 'none' && before !== 'normal') {
        attrs.push(`pseudo-content: ${before}`);
      }
    } catch { /* ignore */ }

    // ARIA live
    const live = child.getAttribute('aria-live');
    if (live) attrs.push(`live=${live}`);
    if (role === 'alert' || role === 'status') attrs.push(`live=${role === 'alert' ? 'assertive' : 'polite'}`);

    // Contenteditable
    if ((child as HTMLElement).isContentEditable && role === 'generic') {
      line = `${indent}- textbox`;
      if (name) line += ` "${name}"`;
    }

    if (attrs.length) line += ` [${attrs.join('] [')}]`;
    lines.push(line);

    // Track
    if (role !== 'generic' && role !== 'presentation') {
      ctx.roles.add(role);
      ctx.elements.push({
        role,
        name: name || undefined,
        focusable: tabIdx >= 0,
        visible: vis === 'visible',
      });
    }

    // Narration
    if (role === 'text' || role === 'generic') {
      if (name) ctx.narrationParts.push(name);
    } else if (name) {
      ctx.narrationParts.push(`${name}, ${role}`);
    } else if (role !== 'generic' && role !== 'presentation') {
      ctx.narrationParts.push(role);
    }

    // Run audits
    runElementAudits(child, role, name, vis, ctx);

    // Recurse
    if (child.children.length) {
      lines.push(...walkElement(child, ctx, depth + 1));
    }

    // Shadow DOM
    if (child.shadowRoot) {
      lines.push(...walkElement(child.shadowRoot as unknown as Element, ctx, depth + 1));
    }
  }

  return lines;
}

// ── Per-element audits ──

function runElementAudits(
  el: Element,
  role: string,
  name: string,
  vis: VisibilityState,
  ctx: TreeContext,
): void {
  if (vis !== 'visible' && vis !== 'sr-only') return;
  const path = cssPath(el);
  const tag = el.tagName.toLowerCase();

  // Tier 2: Missing accessible name on interactive elements
  if (isInteractive(el) && !name) {
    ctx.issues.push({
      severity: 'critical',
      rule: 'missing-name',
      message: `Interactive element <${tag}> has no accessible name`,
      element: path,
      impact: 'Screen reader users cannot determine the purpose of this control',
    });
  }

  // Tier 2: Images without alt
  if (tag === 'img' && !el.hasAttribute('alt')) {
    ctx.issues.push({
      severity: 'critical',
      rule: 'img-alt',
      message: '<img> element has no alt attribute',
      element: path,
      impact: 'Screen reader users have no text alternative for this image',
    });
  }

  // Tier 2: Empty links/buttons
  if ((role === 'link' || role === 'button') && !name && el.textContent?.trim() === '') {
    ctx.issues.push({
      severity: 'critical',
      rule: 'empty-interactive',
      message: `Empty <${tag}> with no accessible name`,
      element: path,
      impact: 'Screen reader users cannot determine the purpose of this element',
    });
  }

  // Tier 2: Missing form labels
  if (['textbox', 'combobox', 'checkbox', 'radio', 'slider', 'searchbox'].includes(role) && !name) {
    ctx.issues.push({
      severity: 'critical',
      rule: 'label',
      message: `Form control <${tag}> has no label`,
      element: path,
      impact: 'Users cannot determine what data to enter in this form control',
    });
  }

  // Tier 2: Heading hierarchy
  if (role === 'heading') {
    const levelMatch = tag.match(/^h(\d)$/);
    if (levelMatch) {
      const level = parseInt(levelMatch[1]);
      if (ctx.headingsSeen.length > 1) {
        const prev = ctx.headingsSeen[ctx.headingsSeen.length - 2];
        if (level > prev + 1) {
          ctx.issues.push({
            severity: 'moderate',
            rule: 'heading-order',
            message: `Heading level skipped: h${prev} to h${level}`,
            element: path,
            impact: 'Screen reader users rely on heading hierarchy for navigation',
          });
        }
      }
    }
  }

  // Tier 2: Nested interactive elements
  if (isInteractive(el)) {
    let parent = el.parentElement;
    while (parent && parent !== ctx.doc.body) {
      if (isInteractive(parent) && parent !== el) {
        ctx.issues.push({
          severity: 'serious',
          rule: 'nested-interactive',
          message: `Interactive <${tag}> nested inside interactive <${parent.tagName.toLowerCase()}>`,
          element: path,
          impact: 'Nested interactive elements cause unpredictable behavior for assistive technology',
        });
        break;
      }
      parent = parent.parentElement;
    }
  }

  // Tier 2: Positive tabindex
  const tabIdx = (el as HTMLElement).tabIndex;
  if (tabIdx > 0) {
    ctx.issues.push({
      severity: 'moderate',
      rule: 'tabindex',
      message: `Element has tabindex="${tabIdx}" (positive tabindex is an anti-pattern)`,
      element: path,
      impact: 'Disrupts natural tab order for keyboard users',
    });
  }

  // Tier 2: Color contrast (only for text-bearing elements)
  if (el.textContent?.trim() && el.children.length === 0) {
    try {
      const style = getComputedStyle(el);
      const fg = parseColor(style.color);
      const bg = parseColor(style.backgroundColor);
      if (fg && bg) {
        const ratio = Math.round(contrastRatio(fg, bg) * 100) / 100;
        const large = isLargeText(el);
        const required = large ? 3 : 4.5;
        const passes = ratio >= required;
        ctx.contrastResults.push({
          element: path,
          foreground: style.color,
          background: style.backgroundColor,
          ratio,
          requiredRatio: required,
          passes,
          isLargeText: large,
        });
        if (!passes) {
          ctx.issues.push({
            severity: large ? 'serious' : 'critical',
            rule: 'color-contrast',
            message: `Insufficient contrast ratio ${ratio}:1 (required ${required}:1 for ${large ? 'large' : 'normal'} text)`,
            element: path,
            impact: 'Low-vision users may not be able to read this text',
          });
        }
      }
    } catch { /* getComputedStyle can fail */ }
  }

  // Tier 3: Touch target size
  if (isInteractive(el) && vis === 'visible') {
    try {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      ctx.touchTargets.push({
        element: path,
        role,
        width: w,
        height: h,
        meetsWCAG: w >= 24 && h >= 24,
        meetsMobile: w >= 44 && h >= 44,
      });
      if (w < 24 || h < 24) {
        ctx.issues.push({
          severity: 'moderate',
          rule: 'touch-target-size',
          message: `Touch target ${w}x${h}px is below WCAG 2.5.8 minimum (24x24px)`,
          element: path,
          impact: 'Users with motor impairments may have difficulty activating this control',
        });
      }
    } catch { /* getBoundingClientRect can fail */ }
  }

  // Tier 4: Focus indicator detection
  // Note: :focus styles cannot be reliably checked without triggering focus.
  // We check for outline:none/0 as a heuristic.
  if (isInteractive(el)) {
    try {
      const style = getComputedStyle(el);
      if (style.outlineStyle === 'none' || style.outlineWidth === '0px') {
        const hasBorderChange = style.borderStyle !== 'none';
        const hasBoxShadow = style.boxShadow !== 'none';
        if (!hasBorderChange && !hasBoxShadow) {
          ctx.issues.push({
            severity: 'moderate',
            rule: 'focus-visible',
            message: 'Interactive element has outline:none without visible focus replacement',
            element: path,
            impact: 'Keyboard users cannot see which element is focused',
          });
        }
      }
    } catch { /* ignore */ }
  }
}

// ── Main entry point ──

export async function analyzeHtmlClientSide(htmlSnippet: string): Promise<ClientAnalysisResult> {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1024px;height:768px;border:0;opacity:0;pointer-events:none';
    iframe.srcdoc = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>*{box-sizing:border-box}</style></head><body>${htmlSnippet}</body></html>`;

    iframe.onload = () => {
      try {
        const doc = iframe.contentDocument!;
        const ctx: TreeContext = {
          elements: [],
          roles: new Set<string>(),
          narrationParts: [],
          issues: [],
          contrastResults: [],
          touchTargets: [],
          headingOutline: [],
          focusOrder: [],
          doc,
          headingsSeen: [],
        };

        // Tier 2: Check for missing lang
        const htmlEl = doc.documentElement;
        if (!htmlEl.getAttribute('lang') && !htmlEl.getAttribute('xml:lang')) {
          // Skip this check since we set lang="en" on the wrapper
        }

        // Tier 3: Check viewport meta
        const viewport = doc.querySelector('meta[name="viewport"]');
        if (viewport) {
          const content = viewport.getAttribute('content') || '';
          if (content.includes('user-scalable=no') || content.includes('maximum-scale=1')) {
            ctx.issues.push({
              severity: 'serious',
              rule: 'meta-viewport',
              message: 'Viewport meta restricts user scaling',
              element: 'meta[name="viewport"]',
              impact: 'Users who need to zoom cannot enlarge content',
            });
          }
        }

        const treeLines = walkElement(doc.body, ctx, 0);
        const accessibilityTree = treeLines.join('\n');

        // Check for multiple h1
        const h1Count = ctx.headingOutline.filter(h => h.level === 1).length;
        if (h1Count > 1) {
          ctx.issues.push({
            severity: 'minor',
            rule: 'heading-h1-multiple',
            message: `Page has ${h1Count} <h1> elements (typically only one is recommended)`,
            element: 'h1',
            impact: 'May confuse screen reader users about the main topic of the page',
          });
        }

        // Sort issues by severity
        const severityOrder: Record<string, number> = { critical: 0, serious: 1, moderate: 2, minor: 3 };
        ctx.issues.sort((a, b) => (severityOrder[a.severity] ?? 4) - (severityOrder[b.severity] ?? 4));

        const summary = {
          critical: ctx.issues.filter(i => i.severity === 'critical').length,
          serious: ctx.issues.filter(i => i.severity === 'serious').length,
          moderate: ctx.issues.filter(i => i.severity === 'moderate').length,
          minor: ctx.issues.filter(i => i.severity === 'minor').length,
        };

        // Sort focus order by tabIndex (0 comes after positive values)
        ctx.focusOrder.sort((a, b) => {
          if (a.tabIndex === 0 && b.tabIndex === 0) return 0;
          if (a.tabIndex === 0) return 1;
          if (b.tabIndex === 0) return -1;
          return a.tabIndex - b.tabIndex;
        });

        resolve({
          accessibilityTree,
          computedRoles: Array.from(ctx.roles),
          screenReaderNarration: ctx.narrationParts.join('. ') || 'No narration available',
          elementInfo: {
            elements: ctx.elements,
            rawLength: accessibilityTree.length,
          },
          audit: {
            issues: ctx.issues,
            summary,
            contrastResults: ctx.contrastResults,
            touchTargets: ctx.touchTargets,
            headingOutline: ctx.headingOutline,
            focusOrder: ctx.focusOrder,
          },
          source: 'client',
        });
      } catch (err) {
        resolve({
          accessibilityTree: '',
          computedRoles: [],
          screenReaderNarration: 'Analysis failed',
          elementInfo: { elements: [], rawLength: 0 },
          audit: {
            issues: [{
              severity: 'serious',
              rule: 'analysis-error',
              message: `Client-side analysis failed: ${(err as Error).message}`,
              element: 'body',
              impact: 'Could not analyze the HTML snippet',
            }],
            summary: { critical: 0, serious: 1, moderate: 0, minor: 0 },
            contrastResults: [],
            touchTargets: [],
            headingOutline: [],
            focusOrder: [],
          },
          source: 'client',
        });
      } finally {
        iframe.remove();
      }
    };

    iframe.onerror = () => {
      iframe.remove();
      resolve({
        accessibilityTree: '',
        computedRoles: [],
        screenReaderNarration: 'Analysis failed',
        elementInfo: { elements: [], rawLength: 0 },
        audit: {
          issues: [],
          summary: { critical: 0, serious: 0, moderate: 0, minor: 0 },
          contrastResults: [],
          touchTargets: [],
          headingOutline: [],
          focusOrder: [],
        },
        source: 'client',
      });
    };

    document.body.appendChild(iframe);
  });
}
