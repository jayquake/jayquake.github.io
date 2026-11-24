import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Globe, Plus, Search, Star, X } from 'lucide-react';

import { api } from '../../../api/client';
import { useRuleLabSocket, type RuleLabEvent } from '../../../hooks/useRuleLabSocket';
import { Alert } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Chip } from '../../../components/ui/chip';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { NativeSelect } from '../../../components/ui/native-select';
import { Progress } from '../../../components/ui/progress';
import { Switch } from '../../../components/ui/switch';
import { cn } from '../../../lib/utils';

interface SiteRow {
  id: string;
  name: string;
  url: string;
  category?: string;
  enabled?: boolean;
}

interface ExampleRow {
  id?: string;
  htmlSnippet?: string;
  html?: string;
  selector?: string;
  curated?: boolean;
  explanation?: string;
}

interface SiteResultRow {
  siteId?: string;
  siteName?: string;
  name?: string;
  siteUrl?: string;
  url?: string;
  examples?: ExampleRow[];
}

function errorMessage(err: unknown): string | undefined {
  return err instanceof Error ? err.message : undefined;
}

/** Indeterminate linear progress (replaces MUI LinearProgress). */
function IndeterminateBar({ className, label = 'Loading' }: { className?: string; label?: string }) {
  return (
    <div role="progressbar" aria-label={label} className={cn('relative h-1 w-full overflow-hidden bg-primary/20', className)}>
      <div className="h-full w-2/5 animate-progress-indeterminate bg-primary" />
    </div>
  );
}

const FIELD_INPUT_CLASS = 'h-8 border border-border-strong bg-shell-input px-2.5 focus-visible:border-primary';

interface DiscoveryPanelProps {
  ruleId: string;
  ruleType: 'engine' | 'legacy';
}

interface CuratedSite {
  id: string;
  name: string;
  url: string;
  category: string;
  enabled: boolean;
}

interface DiscoveryResult {
  siteId?: string;
  siteName: string;
  siteUrl: string;
  examples: DiscoveredExample[];
}

interface DiscoveredExample {
  id?: string;
  htmlSnippet: string;
  selector?: string;
  curated: boolean;
  explanation?: string;
}

const SITE_CATEGORIES = ['ecommerce', 'government', 'news', 'saas', 'social', 'other'] as const;

export function DiscoveryPanel({ ruleId, ruleType }: DiscoveryPanelProps) {
  const [sites, setSites] = useState<CuratedSite[]>([]);
  const [loadingSites, setLoadingSites] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [discoveryResults, setDiscoveryResults] = useState<DiscoveryResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showAddSite, setShowAddSite] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteUrl, setNewSiteUrl] = useState('');
  const [newSiteCategory, setNewSiteCategory] = useState<string>('other');
  const [addingSite, setAddingSite] = useState(false);

  const { discoveryProgress } = useRuleLabSocket({
    ruleId,
    onEvent: useCallback((event: RuleLabEvent) => {
      if (event.type === 'discovery:site-complete') {
        // Refresh results when a site finishes (the HTTP call will
        // also resolve, but this keeps the UI responsive while
        // the "discover all" operation is still in flight).
      }
    }, []),
  });

  const loadSites = useCallback(async () => {
    try {
      setLoadingSites(true);
      const data = await api.ruleLab.listSites();
      setSites(
        ((data ?? []) as SiteRow[]).map((s) => ({
          id: s.id,
          name: s.name,
          url: s.url,
          category: s.category ?? 'other',
          enabled: s.enabled ?? true,
        }))
      );
    } catch (err: unknown) {
      setError(errorMessage(err) || 'Failed to load sites');
    } finally {
      setLoadingSites(false);
    }
  }, []);

  useEffect(() => {
    loadSites();
  }, [loadSites]);

  useEffect(() => {
    setDiscoveryResults([]);
  }, [ruleId]);

  const toggleSite = useCallback(async (site: CuratedSite) => {
    const updated = !site.enabled;
    setSites((prev) =>
      prev.map((s) => (s.id === site.id ? { ...s, enabled: updated } : s))
    );
    try {
      await api.ruleLab.updateSite(site.id, { enabled: updated });
    } catch {
      setSites((prev) =>
        prev.map((s) => (s.id === site.id ? { ...s, enabled: !updated } : s))
      );
    }
  }, []);

  const discoverOnSite = useCallback(
    async (site: CuratedSite) => {
      setDiscovering(true);
      setError(null);
      try {
        const result = await api.ruleLab.discoverOnSite(ruleId, ruleType, site.url);
        const dr: DiscoveryResult = {
          siteId: site.id,
          siteName: site.name,
          siteUrl: site.url,
          examples: ((result?.examples ?? []) as ExampleRow[]).map((ex) => ({
            id: ex.id,
            htmlSnippet: ex.htmlSnippet ?? ex.html ?? '',
            selector: ex.selector,
            curated: ex.curated ?? false,
            explanation: ex.explanation,
          })),
        };
        setDiscoveryResults((prev) => {
          const filtered = prev.filter((r) => r.siteId !== site.id);
          return [...filtered, dr];
        });
      } catch (err: unknown) {
        setError(errorMessage(err) || `Discovery failed for ${site.name}`);
      } finally {
        setDiscovering(false);
      }
    },
    [ruleId, ruleType]
  );

  const discoverAll = useCallback(async () => {
    setDiscovering(true);
    setError(null);
    setDiscoveryResults([]);
    try {
      const result = await api.ruleLab.discoverAll(ruleId, ruleType);
      const results: DiscoveryResult[] = ((result?.sites ?? []) as SiteResultRow[]).map((r) => ({
        siteId: r.siteId,
        siteName: r.siteName ?? r.name ?? '',
        siteUrl: r.siteUrl ?? r.url ?? '',
        examples: (r.examples ?? []).map((ex) => ({
          id: ex.id,
          htmlSnippet: ex.htmlSnippet ?? ex.html ?? '',
          selector: ex.selector,
          curated: ex.curated ?? false,
          explanation: ex.explanation,
        })),
      }));
      setDiscoveryResults(results);
    } catch (err: unknown) {
      setError(errorMessage(err) || 'Discovery failed');
    } finally {
      setDiscovering(false);
    }
  }, [ruleId, ruleType]);

  const addSite = useCallback(async () => {
    if (!newSiteName.trim() || !newSiteUrl.trim()) return;
    setAddingSite(true);
    try {
      await api.ruleLab.addSite(newSiteName, newSiteUrl, newSiteCategory);
      setNewSiteName('');
      setNewSiteUrl('');
      setNewSiteCategory('other');
      setShowAddSite(false);
      await loadSites();
    } catch (err: unknown) {
      setError(errorMessage(err) || 'Failed to add site');
    } finally {
      setAddingSite(false);
    }
  }, [newSiteName, newSiteUrl, newSiteCategory, loadSites]);

  const curateExample = useCallback(async (exampleId: string) => {
    try {
      await api.ruleLab.curateExample(exampleId);
      setDiscoveryResults((prev) =>
        prev.map((dr) => ({
          ...dr,
          examples: dr.examples.map((ex) =>
            ex.id === exampleId ? { ...ex, curated: true } : ex
          ),
        }))
      );
    } catch (err: unknown) {
      setError(errorMessage(err) || 'Failed to curate example');
    }
  }, []);

  return (
    <div className="mt-2">
      {error && (
        <Alert
          variant="error"
          className="mb-4"
          action={
            <Button aria-label="Close" size="icon" variant="ghost" className="size-6" onClick={() => setError(null)}>
              <X aria-hidden="true" className="size-4" />
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Sites section */}
      <div className="mb-4 border border-border bg-shell-panel p-4">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2 sm:items-center">
          <div className="flex items-center gap-2">
            <Globe aria-hidden="true" className="size-4 text-primary" />
            <h6 className="m-0 text-sm font-semibold text-foreground">Curated Sites</h6>
            <Chip className="h-5">{sites.length}</Chip>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowAddSite(!showAddSite)}>
              <Plus aria-hidden="true" className="size-4" />
              Add Site
            </Button>
            <Button
              size="sm"
              variant="default"
              onClick={discoverAll}
              disabled={discovering || sites.filter((s) => s.enabled).length === 0}
            >
              <Search aria-hidden="true" className="size-4" />
              Discover on All
            </Button>
          </div>
        </div>

        {discovering && (
          <div className="mb-4">
            {discoveryProgress.active && discoveryProgress.siteUrl ? (
              <Alert variant="info" icon={false} className="py-1">
                <div className="flex items-center gap-3">
                  <p className="m-0 text-sm font-medium">
                    Scanning: {discoveryProgress.siteUrl}
                  </p>
                  {discoveryProgress.total > 0 && (
                    <Chip className="h-5">
                      {`${discoveryProgress.found} / ${discoveryProgress.total} elements`}
                    </Chip>
                  )}
                </div>
                {discoveryProgress.total > 0 ? (
                  <Progress
                    aria-label="Discovery progress"
                    className="mt-2 h-1 rounded-none"
                    value={(discoveryProgress.found / discoveryProgress.total) * 100}
                  />
                ) : (
                  <IndeterminateBar className="mt-2" />
                )}
              </Alert>
            ) : (
              <IndeterminateBar />
            )}
          </div>
        )}

        {showAddSite && (
          <div className="mb-4 border border-border bg-shell-input p-4">
            <p className="m-0 mb-3 text-sm font-medium text-foreground">Add a new curated site</p>
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex min-w-[150px] flex-1 flex-col gap-1">
                <Label htmlFor="discovery-new-site-name">Site Name</Label>
                <Input
                  id="discovery-new-site-name"
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  className={FIELD_INPUT_CLASS}
                />
              </div>
              <div className="flex min-w-[200px] flex-[2] flex-col gap-1">
                <Label htmlFor="discovery-new-site-url">URL</Label>
                <Input
                  id="discovery-new-site-url"
                  value={newSiteUrl}
                  onChange={(e) => setNewSiteUrl(e.target.value)}
                  className={FIELD_INPUT_CLASS}
                />
              </div>
              <div className="flex min-w-[120px] flex-col gap-1">
                <Label htmlFor="discovery-new-site-category">Category</Label>
                <NativeSelect
                  id="discovery-new-site-category"
                  value={newSiteCategory}
                  onChange={(e) => setNewSiteCategory(e.target.value)}
                  className="h-8"
                >
                  {SITE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </NativeSelect>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={addSite}
                disabled={addingSite || !newSiteName.trim() || !newSiteUrl.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        )}

        {loadingSites ? (
          <IndeterminateBar />
        ) : sites.length === 0 ? (
          <p className="m-0 py-4 text-center text-sm text-foreground-secondary">
            No curated sites configured. Add one to start discovering examples.
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {sites.map((site) => (
              <div
                key={site.id}
                className="flex flex-wrap items-center gap-2 rounded px-1 py-1.5 hover:bg-hover/5 sm:px-3"
              >
                <Switch
                  aria-label={`Enable ${site.name}`}
                  checked={site.enabled}
                  onCheckedChange={() => toggleSite(site)}
                  className="mr-1"
                />
                <span className="min-w-[80px] text-sm font-medium text-foreground sm:min-w-[120px]">
                  {site.name}
                </span>
                <span className="hidden min-w-0 flex-1 truncate font-mono text-[0.75rem] text-foreground-secondary sm:block">
                  {site.url}
                </span>
                <Chip className="h-5">{site.category}</Chip>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => discoverOnSite(site)}
                  disabled={discovering || !site.enabled}
                  title="Discover on this site"
                  aria-label="Discover on this site"
                >
                  <Search aria-hidden="true" className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discovery results */}
      {discoveryResults.length > 0 && (
        <div>
          <h6 className="m-0 mb-3 text-sm font-semibold text-foreground">Discovery Results</h6>
          <div className="flex flex-col gap-4">
            {discoveryResults.map((dr, drIdx) => (
              <Card key={drIdx} className="p-4">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h6 className="m-0 text-sm font-semibold text-foreground">{dr.siteName}</h6>
                  <a
                    href={dr.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 items-center gap-0.5 break-all text-[0.75rem] text-primary no-underline"
                  >
                    {dr.siteUrl} <ExternalLink aria-hidden="true" className="size-3" />
                  </a>
                  <Chip tone={dr.examples.length > 0 ? 'pass' : 'default'} className="h-5">
                    {`${dr.examples.length} found`}
                  </Chip>
                </div>

                {dr.examples.length === 0 ? (
                  <p className="m-0 text-sm text-foreground-secondary">
                    No matching examples found on this site.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {dr.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="border border-border p-3">
                        <pre className="m-0 mb-2 max-h-[150px] overflow-auto whitespace-pre-wrap break-words border border-border bg-shell-input p-2 font-mono text-[0.8rem] text-foreground">
                          {ex.htmlSnippet}
                        </pre>
                        {ex.explanation && (
                          <p className="m-0 mb-2 text-sm text-foreground-secondary">{ex.explanation}</p>
                        )}
                        <div className="flex items-center gap-2">
                          {ex.selector && <Chip className="max-w-[300px]">{ex.selector}</Chip>}
                          <div className="flex-1" />
                          {ex.id && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => ex.id && curateExample(ex.id)}
                              disabled={ex.curated}
                              title={ex.curated ? 'Curated' : 'Mark as curated'}
                              aria-label={ex.curated ? 'Curated' : 'Mark as curated'}
                              className={cn(ex.curated && 'text-status-warn disabled:opacity-100')}
                            >
                              <Star
                                aria-hidden="true"
                                className={cn('size-4', ex.curated && 'fill-current')}
                              />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
