import React, { useState, useMemo } from 'react';
import { History, Settings } from 'lucide-react';

import { Chip, type ChipTone } from '../../../components/ui/chip';
import { SearchField } from '../../../components/ui/search-field';
import { Separator } from '../../../components/ui/separator';
import { cn } from '../../../lib/utils';
import type { RuleInfo } from '../index';

interface RulePickerProps {
  engineRules: RuleInfo[];
  legacyRules: RuleInfo[];
  selectedRule: RuleInfo | null;
  onSelect: (rule: RuleInfo, type: 'engine' | 'legacy') => void;
}

const IMPACT_TONES: Record<string, ChipTone> = {
  critical: 'fail',
  serious: 'warn',
  moderate: 'info',
  minor: 'default',
};

export function RulePicker({ engineRules, legacyRules, selectedRule, onSelect }: RulePickerProps) {
  const [filter, setFilter] = useState('');

  const filteredEngine = useMemo(() => {
    if (!filter) return engineRules;
    const q = filter.toLowerCase();
    return engineRules.filter(
      (r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
    );
  }, [engineRules, filter]);

  const filteredLegacy = useMemo(() => {
    if (!filter) return legacyRules;
    const q = filter.toLowerCase();
    return legacyRules.filter(
      (r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
    );
  }, [legacyRules, filter]);

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 pb-2">
        <h6 className="m-0 mb-2 text-base font-semibold text-foreground">Rules</h6>
        <SearchField
          placeholder="Filter rules..."
          aria-label="Filter rules"
          value={filter}
          onValueChange={setFilter}
        />
      </div>

      <div className="flex-1 overflow-auto">
        {filteredEngine.length > 0 && (
          <RuleSection
            title="Engine Rules"
            icon={<Settings aria-hidden="true" className="size-4" />}
            rules={filteredEngine}
            ruleType="engine"
            selectedRule={selectedRule}
            onSelect={onSelect}
            count={engineRules.length}
            filteredCount={filteredEngine.length}
            isFiltered={!!filter}
          />
        )}

        {filteredEngine.length > 0 && filteredLegacy.length > 0 && <Separator />}

        {filteredLegacy.length > 0 && (
          <RuleSection
            title="Legacy Rules"
            icon={<History aria-hidden="true" className="size-4" />}
            rules={filteredLegacy}
            ruleType="legacy"
            selectedRule={selectedRule}
            onSelect={onSelect}
            count={legacyRules.length}
            filteredCount={filteredLegacy.length}
            isFiltered={!!filter}
          />
        )}

        {filteredEngine.length === 0 && filteredLegacy.length === 0 && (
          <div className="p-6 text-center">
            <p className="m-0 text-sm text-foreground-secondary">
              No rules match "{filter}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function RuleSection({
  title,
  icon,
  rules,
  ruleType,
  selectedRule,
  onSelect,
  count,
  filteredCount,
  isFiltered,
}: {
  title: string;
  icon: React.ReactNode;
  rules: RuleInfo[];
  ruleType: 'engine' | 'legacy';
  selectedRule: RuleInfo | null;
  onSelect: (rule: RuleInfo, type: 'engine' | 'legacy') => void;
  count: number;
  filteredCount: number;
  isFiltered: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-2 bg-hover/5 px-4 py-2 text-foreground-secondary">
        {icon}
        <span className="text-[0.75rem] font-semibold uppercase tracking-[0.04em]">{title}</span>
        <Chip className="h-[18px]">{isFiltered ? `${filteredCount}/${count}` : count}</Chip>
      </div>
      <ul className="m-0 list-none p-0">
        {rules.map((rule) => {
          const selected = selectedRule?.id === rule.id;
          return (
            <li key={rule.id}>
              <button
                type="button"
                aria-current={selected ? 'true' : undefined}
                onClick={() => onSelect(rule, ruleType)}
                className={cn(
                  'flex w-full cursor-pointer flex-col gap-0.5 border-0 bg-transparent px-4 py-1.5 text-left transition-colors hover:bg-hover/5',
                  selected && 'bg-primary/10 hover:bg-primary/15'
                )}
              >
                <span className="flex w-full items-center gap-1">
                  <span className="min-w-0 flex-1 truncate text-[0.825rem] text-foreground">{rule.name}</span>
                  {rule.impact && (
                    <Chip tone={IMPACT_TONES[rule.impact] ?? 'default'} className="h-[18px]">
                      {rule.impact}
                    </Chip>
                  )}
                </span>
                <span className="font-mono text-[0.75rem] text-foreground-muted">{rule.id}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
