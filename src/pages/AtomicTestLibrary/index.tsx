import { CheckCircle2, Microscope, Play, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Alert } from '../../components/ui/alert';
import { buttonClass } from '../../components/ui/button';
import { Chip } from '../../components/ui/chip';
import { Label } from '../../components/ui/label';
import { NativeSelect } from '../../components/ui/native-select';
import { SearchField } from '../../components/ui/search-field';
import { Separator } from '../../components/ui/separator';
import { Spinner } from '../../components/ui/spinner';
import { cn } from '../../lib/utils';
import { IMPACTS, SEVERITY, type Impact } from '../../theme/severity';
import { fetchEngineRulesFull } from '../../utils/engineRulesDataService';

interface EngineRule {
  id: string;
  title: string;
  description: string;
  impact: string;
  metadata?: { category?: string };
  passCount?: number;
  failCount?: number;
  populated?: boolean;
}

interface EngineRuleRow {
  kebabId?: string;
  id: string;
  title?: string;
  description?: string;
  impact?: string;
  metadata?: { category?: string };
  populated?: boolean;
}

const IMPACT_ORDER: Record<string, number> = {
  critical: 0,
  serious: 1,
  moderate: 2,
  minor: 3,
};

function impactChipClass(impact: string): string {
  const key = impact?.toLowerCase() as Impact;
  return IMPACTS.includes(key) ? SEVERITY[key].badgeClassName : '';
}

export default function AtomicTestLibrary() {
  const [searchParams] = useSearchParams();
  const initialRuleId = searchParams.get('ruleId') || '';

  const [search, setSearch] = useState(initialRuleId);
  const [impactFilter, setImpactFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState<EngineRule[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchEngineRulesFull()
      .then((rows: EngineRuleRow[]) => {
        if (cancelled) return;
        const loaded = rows.map((r) => {
          const id = r.kebabId || r.id;
          return {
            id,
            title:
              r.title ||
              id.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            description: r.description || (r.populated === false ? 'No description yet' : ''),
            impact: r.impact || 'moderate',
            metadata: r.metadata,
            populated: r.populated,
          };
        });
        setRules(loaded);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setRules([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return rules
      .filter((r) => {
        if (impactFilter !== 'all' && r.impact?.toLowerCase() !== impactFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          return r.id.includes(q) || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => (IMPACT_ORDER[a.impact?.toLowerCase()] ?? 4) - (IMPACT_ORDER[b.impact?.toLowerCase()] ?? 4));
  }, [rules, search, impactFilter]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2">
        <h4 className="m-0 text-3xl font-bold text-foreground">
          Engine Rule <span className="text-primary">Atomic Tests</span>
        </h4>
        <p className="m-0 text-base text-foreground-secondary">
          Browse and run atomic test fixtures (pass/fail HTML snippets) for each engine rule.
          Each rule has dedicated test fixtures verifying its <code>validate()</code> logic.
        </p>
      </div>

      {/* Filter bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">
        <SearchField
          placeholder="Search by rule ID or title…"
          aria-label="Search by rule ID or title"
          value={search}
          onValueChange={setSearch}
          containerClassName="flex-1"
        />
        <div className="flex min-w-[160px] flex-col gap-1">
          <Label htmlFor="atomic-impact-filter">Impact</Label>
          <NativeSelect
            id="atomic-impact-filter"
            value={impactFilter}
            onChange={(e) => setImpactFilter(e.target.value)}
          >
            <option value="all">All Impacts</option>
            <option value="critical">Critical</option>
            <option value="serious">Serious</option>
            <option value="moderate">Moderate</option>
            <option value="minor">Minor</option>
          </NativeSelect>
        </div>
      </div>

      <p className="m-0 mb-4 text-sm text-foreground-secondary">
        {loading ? 'Loading…' : `${filtered.length} of ${rules.length} rules`}
      </p>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="size-10" />
        </div>
      ) : filtered.length === 0 ? (
        <Alert variant="info">No rules match the current filters.</Alert>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((rule) => (
            <div
              key={rule.id}
              className="flex h-full flex-col gap-3 rounded-xl border border-border bg-shell-panel p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-wrap gap-2">
                <Chip className={cn('font-bold', impactChipClass(rule.impact))}>
                  {rule.impact.charAt(0).toUpperCase() + rule.impact.slice(1)}
                </Chip>
                {rule.metadata?.category && <Chip>{rule.metadata.category}</Chip>}
              </div>

              <div>
                <h6 className="m-0 mb-1 text-sm font-bold leading-snug text-foreground">{rule.title}</h6>
                <span className="font-mono text-[0.75rem] text-foreground-muted">{rule.id}</span>
              </div>

              <p className="m-0 line-clamp-2 flex-1 text-sm leading-normal text-foreground-secondary">
                {rule.description}
              </p>

              <Separator />

              <div className="flex gap-2">
                <Chip tone="pass" icon={<CheckCircle2 aria-hidden="true" className="size-3.5" />}>Pass</Chip>
                <Chip tone="fail" icon={<XCircle aria-hidden="true" className="size-3.5" />}>Fail</Chip>
              </div>

              <div className="mt-auto flex gap-2">
                <Link
                  to={`/engine/${rule.id}`}
                  className={buttonClass({ size: 'sm', className: 'flex-1 normal-case no-underline' })}
                >
                  <Play aria-hidden="true" className="size-4" />
                  View Rule
                </Link>
                <Link
                  to={`/rule-lab?ruleId=${rule.id}`}
                  title="Open in Rule Lab"
                  className={buttonClass({
                    size: 'sm',
                    className: 'min-w-10 px-2 normal-case no-underline border-status-info text-status-info hover:border-status-info hover:bg-status-info/10 hover:text-status-info',
                  })}
                >
                  <Microscope aria-hidden="true" className="size-4" />
                  Lab
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
