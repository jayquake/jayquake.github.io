import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LanguageIcon from '@mui/icons-material/Language';

import { api } from '../../../api/client';
import { useRuleLabSocket, type RuleLabEvent } from '../../../hooks/useRuleLabSocket';

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
        (data ?? []).map((s: any) => ({
          id: s.id,
          name: s.name,
          url: s.url,
          category: s.category ?? 'other',
          enabled: s.enabled ?? true,
        }))
      );
    } catch (err: any) {
      setError(err.message || 'Failed to load sites');
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
          examples: (result?.examples ?? []).map((ex: any) => ({
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
      } catch (err: any) {
        setError(err.message || `Discovery failed for ${site.name}`);
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
      const results: DiscoveryResult[] = (result?.sites ?? []).map((r: any) => ({
        siteId: r.siteId,
        siteName: r.siteName ?? r.name ?? '',
        siteUrl: r.siteUrl ?? r.url ?? '',
        examples: (r.examples ?? []).map((ex: any) => ({
          id: ex.id,
          htmlSnippet: ex.htmlSnippet ?? ex.html ?? '',
          selector: ex.selector,
          curated: ex.curated ?? false,
          explanation: ex.explanation,
        })),
      }));
      setDiscoveryResults(results);
    } catch (err: any) {
      setError(err.message || 'Discovery failed');
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
    } catch (err: any) {
      setError(err.message || 'Failed to add site');
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
    } catch (err: any) {
      setError(err.message || 'Failed to curate example');
    }
  }, []);

  return (
    <Box sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Sites section */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LanguageIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Curated Sites
            </Typography>
            <Chip label={sites.length} size="small" sx={{ height: 20 }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setShowAddSite(!showAddSite)}
            >
              Add Site
            </Button>
            <Button
              size="small"
              variant="contained"
              disableElevation
              startIcon={<SearchIcon />}
              onClick={discoverAll}
              disabled={discovering || sites.filter((s) => s.enabled).length === 0}
            >
              Discover on All
            </Button>
          </Box>
        </Box>

        {discovering && (
          <Box sx={{ mb: 2 }}>
            {discoveryProgress.active && discoveryProgress.siteUrl ? (
              <Alert severity="info" icon={false} sx={{ py: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Scanning: {discoveryProgress.siteUrl}
                  </Typography>
                  {discoveryProgress.total > 0 && (
                    <Chip
                      label={`${discoveryProgress.found} / ${discoveryProgress.total} elements`}
                      size="small"
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  )}
                </Box>
                <LinearProgress
                  variant={discoveryProgress.total > 0 ? 'determinate' : 'indeterminate'}
                  value={discoveryProgress.total > 0 ? (discoveryProgress.found / discoveryProgress.total) * 100 : undefined}
                  sx={{ mt: 1 }}
                />
              </Alert>
            ) : (
              <LinearProgress />
            )}
          </Box>
        )}

        {showAddSite && (
          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5 }}>
              Add a new curated site
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <TextField
                size="small"
                label="Site Name"
                value={newSiteName}
                onChange={(e) => setNewSiteName(e.target.value)}
                sx={{ flex: 1, minWidth: 150 }}
              />
              <TextField
                size="small"
                label="URL"
                value={newSiteUrl}
                onChange={(e) => setNewSiteUrl(e.target.value)}
                sx={{ flex: 2, minWidth: 200 }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newSiteCategory}
                  label="Category"
                  onChange={(e) => setNewSiteCategory(e.target.value)}
                >
                  {SITE_CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                disableElevation
                size="small"
                onClick={addSite}
                disabled={addingSite || !newSiteName.trim() || !newSiteUrl.trim()}
              >
                Add
              </Button>
            </Box>
          </Paper>
        )}

        {loadingSites ? (
          <LinearProgress />
        ) : sites.length === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
            No curated sites configured. Add one to start discovering examples.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {sites.map((site) => (
              <Box
                key={site.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1,
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={site.enabled}
                      onChange={() => toggleSite(site)}
                    />
                  }
                  label=""
                  sx={{ m: 0, mr: 0.5 }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 120 }}>
                  {site.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ flex: 1, fontFamily: 'monospace' }}
                >
                  {site.url}
                </Typography>
                <Chip label={site.category} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                <IconButton
                  size="small"
                  onClick={() => discoverOnSite(site)}
                  disabled={discovering || !site.enabled}
                  title="Discover on this site"
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* Discovery results */}
      {discoveryResults.length > 0 && (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Discovery Results
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {discoveryResults.map((dr, drIdx) => (
              <Card key={drIdx} variant="outlined">
                <CardContent sx={{ pb: '16px !important' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {dr.siteName}
                    </Typography>
                    <Typography
                      component="a"
                      href={dr.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="caption"
                      color="primary"
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.25, textDecoration: 'none' }}
                    >
                      {dr.siteUrl} <OpenInNewIcon sx={{ fontSize: 12 }} />
                    </Typography>
                    <Chip
                      label={`${dr.examples.length} found`}
                      size="small"
                      color={dr.examples.length > 0 ? 'success' : 'default'}
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  </Box>

                  {dr.examples.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No matching examples found on this site.
                    </Typography>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {dr.examples.map((ex, exIdx) => (
                        <Paper key={exIdx} variant="outlined" sx={{ p: 1.5 }}>
                          <Paper
                            sx={{
                              p: 1,
                              mb: 1,
                              bgcolor: 'grey.50',
                              fontFamily: 'monospace',
                              fontSize: '0.8rem',
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                              overflow: 'auto',
                              maxHeight: 150,
                            }}
                            variant="outlined"
                          >
                            {ex.htmlSnippet}
                          </Paper>
                          {ex.explanation && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {ex.explanation}
                            </Typography>
                          )}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {ex.selector && (
                              <Chip
                                label={ex.selector}
                                size="small"
                                variant="outlined"
                                sx={{ fontFamily: 'monospace', fontSize: '0.7rem', maxWidth: 300 }}
                              />
                            )}
                            <Box sx={{ flex: 1 }} />
                            {ex.id && (
                              <IconButton
                                size="small"
                                color={ex.curated ? 'warning' : 'default'}
                                onClick={() => ex.id && curateExample(ex.id)}
                                disabled={ex.curated}
                                title={ex.curated ? 'Curated' : 'Mark as curated'}
                              >
                                {ex.curated ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                              </IconButton>
                            )}
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
