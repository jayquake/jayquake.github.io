import React, { useMemo } from 'react';

import { cn } from '../../../lib/utils';

interface AccessibilityTreeViewProps {
  treeData: string | Record<string, unknown> | null;
  title?: string;
}

/** Role -> token text colour. Literal class strings so Tailwind can see them. */
const ROLE_CLASSES: Record<string, string> = {
  button: 'text-primary',
  link: 'text-status-info',
  heading: 'text-severity-serious',
  img: 'text-status-pass',
  textbox: 'text-primary-dim',
  checkbox: 'text-status-warn',
  radio: 'text-status-warn',
  list: 'text-severity-moderate',
  listitem: 'text-severity-moderate',
  navigation: 'text-foreground-secondary',
  banner: 'text-foreground-secondary',
  main: 'text-foreground-secondary',
  complementary: 'text-foreground-secondary',
  contentinfo: 'text-foreground-secondary',
  form: 'text-severity-critical',
  table: 'text-status-info',
  row: 'text-status-info',
  cell: 'text-status-info',
  generic: 'text-foreground-muted',
};

function getRoleClass(role: string): string {
  return ROLE_CLASSES[role.toLowerCase()] ?? 'text-foreground-muted';
}

function parseTreeText(text: string): string[] {
  return text.split('\n').filter((line) => line.trim().length > 0);
}

const LINE_CLASS = 'font-mono text-[0.8rem] leading-[1.6]';

function TreeLine({ line }: { line: string }) {
  const indent = line.search(/\S/);
  const trimmed = line.trim();

  const roleMatch = trimmed.match(/^\[?(\w+)\]?\s*"?([^"]*)"?\s*(.*)/);
  if (!roleMatch) {
    return (
      <div className={LINE_CLASS} style={{ paddingLeft: indent * 4 }}>
        {trimmed}
      </div>
    );
  }

  const [, role, name, rest] = roleMatch;

  return (
    <div className={cn(LINE_CLASS, 'flex gap-1')} style={{ paddingLeft: indent * 4 }}>
      <span className={cn('font-semibold', getRoleClass(role))}>[{role}]</span>
      {name && <span className="text-foreground">"{name}"</span>}
      {rest && <span className="text-[0.75rem] text-foreground-secondary">{rest}</span>}
    </div>
  );
}

function renderObjectTree(node: Record<string, unknown>, depth = 0): React.ReactNode[] {
  const lines: React.ReactNode[] = [];
  const role = String(node.role ?? 'generic');
  const name = String(node.name ?? '');
  const states = Object.entries(node)
    .filter(([k]) => !['role', 'name', 'children'].includes(k))
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  lines.push(
    <div
      key={`${depth}-${role}-${name}-${lines.length}`}
      className={cn(LINE_CLASS, 'flex gap-1')}
      style={{ paddingLeft: depth * 16 }}
    >
      <span className={cn('font-semibold', getRoleClass(role))}>[{role}]</span>
      {name && <span className="text-foreground">"{name}"</span>}
      {states && <span className="text-[0.75rem] text-foreground-secondary">{`{${states}}`}</span>}
    </div>
  );

  if (Array.isArray(node.children)) {
    for (const child of node.children as Record<string, unknown>[]) {
      lines.push(...renderObjectTree(child, depth + 1));
    }
  }

  return lines;
}

export function AccessibilityTreeView({ treeData, title = 'Accessibility Tree' }: AccessibilityTreeViewProps) {
  const content = useMemo(() => {
    if (!treeData) return null;

    if (typeof treeData === 'string') {
      const lines = parseTreeText(treeData);
      return lines.map((line, i) => <TreeLine key={i} line={line} />);
    }

    if (typeof treeData === 'object') {
      return renderObjectTree(treeData);
    }

    return null;
  }, [treeData]);

  if (!treeData) {
    return (
      <div className="border border-border bg-shell-panel p-4 text-center">
        <p className="m-0 text-sm text-foreground-secondary">
          No accessibility tree data available. Run an analysis to generate it.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h6 className="m-0 mb-2 text-sm font-semibold text-foreground">{title}</h6>
      <div className="max-h-[400px] overflow-auto border border-border bg-shell-input p-4">{content}</div>
    </div>
  );
}
