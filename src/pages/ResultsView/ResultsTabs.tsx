import { useRef } from 'react';
import { Bug, FileText, Shield, Terminal } from 'lucide-react';

import { cn } from '../../lib/utils';

type TabType = 'details' | 'mcp' | 'output' | 'summary';

interface ResultsTabsProps {
  activeTab: TabType;
  mcpCount: number;
  onChange: (tab: TabType) => void;
  sdkAuditCount?: number;
}

const BASE_TABS: { icon: React.ReactElement; id: TabType; label: string }[] = [
  { icon: <FileText aria-hidden="true" className="size-4" />, id: 'summary', label: 'Summary' },
  { icon: <Terminal aria-hidden="true" className="size-4" />, id: 'output', label: 'Output' },
  { icon: <Shield aria-hidden="true" className="size-4" />, id: 'details', label: 'Audit Report' },
  { icon: <Bug aria-hidden="true" className="size-4" />, id: 'mcp', label: 'MCP Debug' },
];

/** Count bubble that replaced MUI <Badge> (max 99, like MUI's default). */
const CountBadge = ({ count, tone }: { count: number; tone: 'fail' | 'warn' }) => (
  <span
    className={cn(
      'inline-flex h-5 min-w-5 items-center justify-center rounded-full border px-1.5 font-mono text-[0.75rem] leading-none',
      tone === 'fail'
        ? 'border-status-fail/60 bg-status-fail/15 text-status-fail'
        : 'border-status-warn/60 bg-status-warn/15 text-status-warn'
    )}
  >
    {count > 99 ? '99+' : count}
  </span>
);

export default function ResultsTabs({ activeTab, mcpCount, onChange, sdkAuditCount }: ResultsTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (event.key === 'ArrowRight') next = (index + 1) % BASE_TABS.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + BASE_TABS.length) % BASE_TABS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = BASE_TABS.length - 1;
    if (next === -1) return;
    event.preventDefault();
    tabRefs.current[next]?.focus();
    onChange(BASE_TABS[next].id);
  };

  return (
    <div className="border-b border-border">
      <div aria-orientation="horizontal" className="flex items-center overflow-x-auto" role="tablist">
        {BASE_TABS.map((tab, index) => {
          const selected = tab.id === activeTab;
          return (
            <button
              aria-selected={selected}
              className={cn(
                '-mb-px inline-flex h-12 shrink-0 cursor-pointer items-center gap-2 border-0 border-b-2 border-solid bg-transparent px-4 font-mono text-[0.75rem] uppercase tracking-wider transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
                selected ? 'border-primary text-foreground' : 'border-transparent text-foreground-secondary'
              )}
              key={tab.id}
              onClick={() => onChange(tab.id)}
              onKeyDown={event => handleKeyDown(event, index)}
              ref={el => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'mcp' && mcpCount > 0 ? (
                <CountBadge count={mcpCount} tone="fail" />
              ) : tab.id === 'details' && sdkAuditCount ? (
                <CountBadge count={sdkAuditCount} tone="warn" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
