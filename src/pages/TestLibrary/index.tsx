import type { Project, QaseConfig, TestRunConfig } from '../../../shared/types';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FolderIcon from '@mui/icons-material/Folder';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { api } from '../../api/client';
import { useToast } from '../../components/standalone/ToastContainer';
import { isStaticDeployment } from '../../utils/environment';
import AdvancedOptionsAccordion from './AdvancedOptionsAccordion';
import ExecutionModeCard from './ExecutionModeCard';
import RunQueue from './RunQueue';
import StickyRunHeader from './StickyRunHeader';
import TargetEnvironmentCard from './TargetEnvironmentCard';
import TestFileTree from './TestFileTree';
import type { ExecutionMode, TestCaseInfo, TestFileInfo, TestSuiteGroup } from './types';

// ─── helpers ────────────────────────────────────────────────────────────────

function getAllTestsFromSuite(suite: TestSuiteGroup): TestFileInfo[] {
  const tests: TestFileInfo[] = [...suite.tests];
  for (const sub of Object.values(suite.suites)) {
    tests.push(...getAllTestsFromSuite(sub));
  }
  return tests;
}

function getAllSuitePaths(suite: TestSuiteGroup, prefix = ''): string[] {
  const paths: string[] = [];
  const current = prefix ? `${prefix}/${suite.name}` : suite.name;
  if (suite.name !== 'root') paths.push(current);
  for (const sub of Object.values(suite.suites)) {
    paths.push(...getAllSuitePaths(sub, current));
  }
  return paths;
}

function normalizeUrl(url: string): string {
  let n = url.trim().replace(/\/+$/, '');
  if (!n.match(/^https?:\/\//)) n = `https://${n}`;
  return n;
}

function validateUrl(url: string): boolean {
  if (!url?.trim()) return false;
  try {
    const obj = new URL(normalizeUrl(url));
    return obj.protocol === 'http:' || obj.protocol === 'https:';
  } catch {
    return false;
  }
}

function requiresBasicAuth(url: string): boolean {
  if (!url) return false;
  try {
    return normalizeUrl(url).includes('acsb-test.com');
  } catch {
    return false;
  }
}

function modeToFlags(mode: ExecutionMode): { headless: boolean; uiMode: boolean } {
  return {
    headless: mode === 'headless',
    uiMode: mode === 'ui',
  };
}

// ─── component ──────────────────────────────────────────────────────────────

export default function TestLibrary() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const projectId = searchParams.get('project');

  // ── data ──
  const [project, setProject] = useState<null | Project>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [suiteGroup, setSuiteGroup] = useState<null | TestSuiteGroup>(null);
  const [loading, setLoading] = useState(true);

  // True immediately when projectId changes, before the useEffect fires — prevents
  // the old project UI from flashing while the effect hasn't run yet.
  const isLoading = loading || (!!projectId && project?.id !== projectId);

  // ── selection ──
  const [selectedTests, setSelectedTests] = useState<Set<string>>(new Set());
  const [selectedTestCases, setSelectedTestCases] = useState<Map<string, Set<string>>>(new Map());
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set(['root']));
  const [expandedTestFiles, setExpandedTestFiles] = useState<Set<string>>(new Set());
  const [testCasesCache, setTestCasesCache] = useState<Map<string, TestCaseInfo[]>>(new Map());
  const [loadingTestCases, setLoadingTestCases] = useState<Set<string>>(new Set());
  const [testSearch, setTestSearch] = useState('');

  // ── environment ──
  const [baseUrl, setBaseUrl] = useState('');
  
  const [httpAuthEnabled, setHttpAuthEnabled] = useState(false);
  const [httpAuthUsername, setHttpAuthUsername] = useState('');
  const [httpAuthPassword, setHttpAuthPassword] = useState('');

  // ── execution ──
  const [mode, setMode] = useState<ExecutionMode>('headed');
  const [slowMo, setSlowMo] = useState(500);
  const [workers, setWorkers] = useState(1);

  // ── qase ──
  const [qaseEnabled, setQaseEnabled] = useState(false);
  const [qaseConfig, setQaseConfig] = useState<QaseConfig>({
    apiToken: '',
    enabled: false,
    environment: '',
    projectCode: '',
    uploadAttachments: true,
  });

  // ── run state ──
  const [isSubmitting, setIsSubmitting] = useState(false);
  const testCasesLoadedToastShown = useRef(false);

  // ── load all projects (for breadcrumb switcher) ───────────────────────────

  useEffect(() => {
    api.projects.getAll().then(setAllProjects).catch(() => {});
  }, []);

  // ── load project ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (projectId) loadProject();
    else setLoading(false);
  }, [projectId]);

  const loadProject = async () => {
    if (!projectId) return;

    setLoading(true);
    setProject(null);
    setSuiteGroup(null);
    setSelectedTests(new Set());
    setSelectedTestCases(new Map());
    setExpandedSuites(new Set(['root']));
    setExpandedTestFiles(new Set());
    setTestCasesCache(new Map());
    setLoadingTestCases(new Set());
    setTestSearch('');
    testCasesLoadedToastShown.current = false;

    try {
      const projectData = await api.projects.getById(projectId);
      setProject(projectData);
      setQaseConfig(prev => ({ ...prev, projectCode: projectData.qaseProjectCode || '' }));

      if (isStaticDeployment()) {
        setBaseUrl(projectData.defaultBaseUrl || '');
        setLoading(false);
        return;
      }

      const suites = await api.projects.getTestSuites(projectId, false);
      setSuiteGroup(suites);

      let defaultUrl = projectData.defaultBaseUrl || '';
      if (projectData.sdkType) {
        try {
          const sdkDefault = await api.projects.getSdkDefaultBaseUrl(projectId);
          if (sdkDefault?.baseUrl) defaultUrl = sdkDefault.baseUrl;
        } catch {
          // ignore; use project default or recent
        }
      }
      if (!defaultUrl) {
        const recentUrls = await api.environments.getRecent(projectId, 20).catch(() => [] as string[]);
        defaultUrl = recentUrls.length > 0 ? recentUrls[0] : '';
      }
      setBaseUrl(defaultUrl);

      const allPaths = getAllSuitePaths(suites);
      setExpandedSuites(new Set(['root', ...allPaths]));
    } catch (err: any) {
      showToast('Failed to load project', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ── pre-load test cases ───────────────────────────────────────────────────

  useEffect(() => {
    if (!projectId || !suiteGroup) return;
    const allFiles = getAllTestsFromSuite(suiteGroup);
    const toLoad = allFiles.filter(
      f => !testCasesCache.has(f.relativePath) && !loadingTestCases.has(f.relativePath)
    );
    if (toLoad.length === 0) return;

    const run = async () => {
      for (let i = 0; i < toLoad.length; i += 5) {
        const batch = toLoad.slice(i, i + 5);
        await Promise.all(
          batch.map(async (file) => {
            setLoadingTestCases(p => new Set(p).add(file.relativePath));
            try {
              const cases = await api.projects.getTestCases(projectId, file.relativePath);
              setTestCasesCache(p => new Map(p).set(file.relativePath, cases));
            } catch {
              // silent
            } finally {
              setLoadingTestCases(p => { const n = new Set(p); n.delete(file.relativePath); return n; });
            }
          })
        );
      }
    };
    run();
  }, [projectId, suiteGroup]);

  useEffect(() => { testCasesLoadedToastShown.current = false; }, [projectId]);

  useEffect(() => {
    if (!suiteGroup || !project || loadingTestCases.size > 0 || testCasesLoadedToastShown.current) return;
    const allFiles = getAllTestsFromSuite(suiteGroup);
    const total = allFiles.reduce((s, f) => s + (testCasesCache.get(f.relativePath)?.length || 0), 0);
    if (total > 0 || allFiles.length > 0) {
      testCasesLoadedToastShown.current = true;
      showToast(
        total > 0
          ? `Loaded ${total} test case${total !== 1 ? 's' : ''} across ${allFiles.length} file${allFiles.length !== 1 ? 's' : ''}`
          : `Loaded ${allFiles.length} test file${allFiles.length !== 1 ? 's' : ''}`,
        'success'
      );
    }
  }, [loadingTestCases.size, suiteGroup, project, testCasesCache]);

  // auto-expand files once their cases are loaded
  useEffect(() => {
    if (!suiteGroup || loadingTestCases.size > 0) return;
    const loaded = getAllTestsFromSuite(suiteGroup)
      .filter(f => (testCasesCache.get(f.relativePath)?.length ?? 0) > 0)
      .map(f => f.relativePath);
    if (loaded.length === 0) return;
    setExpandedTestFiles(prev => {
      const next = new Set(prev);
      let changed = false;
      loaded.forEach(p => { if (!next.has(p)) { next.add(p); changed = true; } });
      return changed ? next : prev;
    });
  }, [testCasesCache, loadingTestCases.size, suiteGroup]);

  // ── derived ───────────────────────────────────────────────────────────────

  const isUrlValid = validateUrl(baseUrl);

  const totalAvailable = useMemo(() => {
    if (!suiteGroup) return 0;
    return getAllTestsFromSuite(suiteGroup).reduce(
      (s, f) => s + (testCasesCache.get(f.relativePath)?.length || 0),
      0
    );
  }, [suiteGroup, testCasesCache]);

  const allTestFiles = useMemo(() =>
    suiteGroup ? getAllTestsFromSuite(suiteGroup) : [],
    [suiteGroup]
  );

  const selectedCount = useMemo(() => {
    const fileCount = selectedTests.size;
    const caseCount = Array.from(selectedTestCases.values()).reduce((s, v) => s + v.size, 0);
    return fileCount + caseCount;
  }, [selectedTests, selectedTestCases]);

  const filteredSuiteGroup = useMemo(() => {
    if (!suiteGroup || !testSearch.trim()) return suiteGroup;
    const q = testSearch.toLowerCase();
    const filter = (suite: TestSuiteGroup): null | TestSuiteGroup => {
      const tests = suite.tests.filter(
        t => t.name.toLowerCase().includes(q) || t.relativePath.toLowerCase().includes(q)
      );
      const suites: { [k: string]: TestSuiteGroup } = {};
      for (const [k, sub] of Object.entries(suite.suites)) {
        const f = filter(sub);
        if (f && (f.tests.length > 0 || Object.keys(f.suites).length > 0)) suites[k] = f;
      }
      if (tests.length === 0 && Object.keys(suites).length === 0) return null;
      return {
        ...suite,
        suites,
        tests,
        totalTests: tests.length + Object.values(suites).reduce((s, x) => s + x.totalTests, 0),
      };
    };
    return filter(suiteGroup);
  }, [suiteGroup, testSearch]);

  // ── handlers ──────────────────────────────────────────────────────────────

  

  const handleToggleTest = (path: string) => {
    setSelectedTests(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
        setSelectedTestCases(p => { const n = new Map(p); n.delete(path); return n; });
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const handleToggleTestFile = async (path: string) => {
    setExpandedTestFiles(prev => {
      const next = new Set(prev);
      const expanding = !next.has(path);
      if (expanding) {
        next.add(path);
        if (!testCasesCache.has(path) && projectId) {
          setLoadingTestCases(p => new Set(p).add(path));
          api.projects.getTestCases(projectId, path)
            .then(cases => setTestCasesCache(p => new Map(p).set(path, cases)))
            .catch(() => showToast('Failed to load test cases', 'error'))
            .finally(() => setLoadingTestCases(p => { const n = new Set(p); n.delete(path); return n; }));
        }
      } else {
        next.delete(path);
      }
      return next;
    });
  };

  const handleToggleTestCase = (filePath: string, title: string) => {
    setSelectedTestCases(prev => {
      const next = new Map(prev);
      const cases = new Set(next.get(filePath) || []);
      if (cases.has(title)) cases.delete(title); else cases.add(title);
      if (cases.size === 0) next.delete(filePath); else next.set(filePath, cases);
      return next;
    });
  };

  const handleToggleSuite = (path: string) => {
    setExpandedSuites(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  };

  const handleSelectSuite = (suite: TestSuiteGroup, _path: string) => {
    const all = getAllTestsFromSuite(suite);
    setSelectedTests(prev => {
      const next = new Set(prev);
      const allSel = all.every(t => prev.has(t.relativePath));
      if (allSel) all.forEach(t => next.delete(t.relativePath));
      else all.forEach(t => next.add(t.relativePath));
      return next;
    });
  };

  const handleRunSuite = (suite: TestSuiteGroup) => {
    const all = getAllTestsFromSuite(suite);
    handleRunTests(all.map(t => t.relativePath));
  };

  const handleSelectAll = () => {
    if (!suiteGroup) return;
    setSelectedTests(new Set(getAllTestsFromSuite(suiteGroup).map(t => t.relativePath)));
  };

  const handleClearAll = () => {
    setSelectedTests(new Set());
    setSelectedTestCases(new Map());
  };

  const handleModeChange = (newMode: ExecutionMode) => {
    setMode(newMode);
  };

  const handleRunTests = async (testsToRun?: string[]) => {
    if (!project || !baseUrl) { showToast('Please enter a valid URL', 'warning'); return; }
    if (!isUrlValid) { showToast('Please enter a valid URL (e.g., https://example.com)', 'warning'); return; }

    const normalizedUrl = normalizeUrl(baseUrl);
    let testFiles: string[] | undefined;
    let grepPattern: string | undefined;

    if (testsToRun) {
      testFiles = testsToRun;
    } else {
      const filesWithCases: string[] = [];
      const allSelected = new Set(selectedTests);

      for (const [fp, titles] of Array.from(selectedTestCases.entries())) {
        if (titles.size > 0) {
          filesWithCases.push(fp);
          allSelected.delete(fp);
        }
      }

      if (filesWithCases.length > 0) {
        const patterns: string[] = [];
        for (const fp of filesWithCases) {
          const titles = selectedTestCases.get(fp);
          if (titles?.size) {
            const escaped = Array.from(titles).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            patterns.push(`(${escaped.join('|')})`);
          }
        }
        if (patterns.length > 0) { grepPattern = patterns.join('|'); testFiles = filesWithCases; }
      }

      if (allSelected.size > 0) {
        testFiles = testFiles ? [...testFiles, ...Array.from(allSelected)] : Array.from(allSelected);
      }
    }

    const { headless, uiMode } = modeToFlags(mode);

    const config: TestRunConfig = {
      baseUrl: normalizedUrl,
      grepPattern,
      headless,
      httpAuth: httpAuthEnabled && httpAuthUsername && httpAuthPassword
        ? { password: httpAuthPassword, username: httpAuthUsername }
        : undefined,
      projectId: project.id,
      qaseConfig: qaseEnabled ? qaseConfig : undefined,
      slowMo,
      testFiles: testFiles && testFiles.length > 0 ? testFiles : undefined,
      uiMode,
      workers,
    };

    try {
      setIsSubmitting(true);
      showToast('Starting test run...', 'info');
      const result = await api.runs.create(project.id, config);
      showToast('Test run started!', 'success');
      navigate(`/test-runner/progress/${result.runId}`);
    } catch (err: any) {
      showToast(`Failed to start test run: ${err.message || 'Unknown error'}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── render ────────────────────────────────────────────────────────────────

  if (isLoading) {
    const candidateProject = allProjects.find(p => p.id === projectId);
    const displayName = candidateProject?.name ?? projectId ?? 'Project';
    const logoSrc = candidateProject?.logo ?? null;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2.5,
          bgcolor: 'background.default',
          '@keyframes fadeSlideUp': {
            from: { opacity: 0, transform: 'translateY(16px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          animation: 'fadeSlideUp 0.35s ease-out both',
        }}
      >
        {/* Project logo with pulse animation */}
        <Box
          sx={{
            '@keyframes logoPulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 1 },
              '50%': { transform: 'scale(1.08)', opacity: 0.8 },
            },
            animation: 'logoPulse 1.4s ease-in-out infinite',
          }}
        >
          {logoSrc ? (
            <Box
              component="img"
              src={logoSrc}
              alt={displayName}
              sx={{ width: 80, height: 80, objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <Box
              sx={{
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
                bgcolor: 'action.selected',
              }}
            >
              <FolderIcon sx={{ fontSize: 40, color: 'text.disabled' }} />
            </Box>
          )}
        </Box>

        {/* Loading text */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h5"
            fontWeight={700}
            letterSpacing="-0.5px"
            sx={{ mb: 0.5 }}
          >
            Loading {displayName}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Preparing test suite…
          </Typography>
        </Box>

        {/* Progress indicator */}
        <LinearProgress sx={{ width: 220, borderRadius: 1 }} />
      </Box>
    );
  }

  if (!project) {
    const frameworkLabel: Record<string, string> = { playwright: 'Playwright', pytest: 'Pytest', maven: 'Maven', selenium: 'Selenium' };
    const sdkColor: Record<string, 'info' | 'success' | 'warning'> = { node: 'info', python: 'success', java: 'warning' };
    const sdkAccent: Record<string, string> = { node: '#2196f3', python: '#4caf50', java: '#ff9800' };
    const projectById = new Map(allProjects.map((p) => [p.id, p]));

    type LangKey = 'node' | 'python' | 'java';
    const languageOrder: { key: LangKey; label: string; logo: string }[] = [
      { key: 'node', label: 'Node', logo: '/logos/nodejs.svg' },
      { key: 'python', label: 'Python', logo: '/logos/python.svg' },
      { key: 'java', label: 'Java', logo: '/logos/java.svg' },
    ];

    const playwrightProjectIds: Record<LangKey, string | null> = {
      node: 'accessflow',
      python: 'accessflow-python',
      java: 'accessflow-java',
    };
    const seleniumProjectIds: Record<LangKey, string | null> = {
      node: 'accessflow-selenium',
      python: 'accessflow-python-selenium',
      java: null,
    };

    const langLabels: Record<LangKey, string> = { node: 'Node', python: 'Python', java: 'Java' };

    const renderProjectCard = (
      cardKey: string,
      p: Project | null,
      accent: string,
      isComingSoon: boolean,
      langKey: LangKey,
      section: 'playwright' | 'selenium',
    ) => {
      const onClick = !isComingSoon && p ? () => navigate(`?project=${p.id}`) : undefined;
      const langInfo = languageOrder.find((item) => item.key === langKey)!;
      const iconsToShow: string[] = [langInfo.logo];
      if (!isComingSoon && p?.logos?.length) {
        iconsToShow.push(...p.logos);
      }
      const uniqueIcons = Array.from(new Set(iconsToShow));
      const sectionLabel = section === 'playwright' ? 'Playwright' : 'Selenium';
      const comingSoonTitle = `AccessFlow (${langLabels[langKey]} ${sectionLabel})`;
      const comingSoonDescription = `AccessFlow ${langLabels[langKey]} SDK E2E test suite using ${sectionLabel} — coming soon.`;
      return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cardKey}>
          <Card
            onClick={onClick}
            elevation={0}
            sx={{
              height: '100%',
              cursor: isComingSoon ? 'default' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              border: '2px solid',
              borderColor: isComingSoon ? 'action.disabledBackground' : 'rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden',
              opacity: isComingSoon ? 0.75 : 1,
              '&:hover': isComingSoon
                ? {}
                : {
                    transform: 'translateY(-4px)',
                    borderColor: accent,
                    boxShadow: `0 8px 28px ${accent}28`,
                  },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: isComingSoon ? 'grey' : accent,
              },
            }}
          >
            <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                {uniqueIcons.map((logoSrc, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={logoSrc}
                    alt=""
                    sx={{ width: 44, height: 44, objectFit: 'contain' }}
                  />
                ))}
              </Stack>

              <Box>
                <Typography fontWeight={700} variant="h6" sx={{ mb: 0.5 }}>
                  {isComingSoon ? comingSoonTitle : p!.name}
                </Typography>
                <Stack direction="row" spacing={0.5} sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                  {!isComingSoon && p?.sdkType && (
                    <Chip
                      label={p.sdkType.toUpperCase()}
                      size="small"
                      color={sdkColor[p.sdkType] || 'default'}
                      sx={{ fontSize: '0.65rem', height: 20, fontWeight: 700 }}
                    />
                  )}
                  {isComingSoon ? (
                    <Chip
                      label="Coming Soon"
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ fontSize: '0.65rem', height: 20 }}
                    />
                  ) : (
                    p?.testFramework && (
                      <Chip
                        label={frameworkLabel[p.testFramework] || p.testFramework}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.65rem', height: 20 }}
                      />
                    )
                  )}
                </Stack>
                <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1.6 }}>
                  {isComingSoon ? comingSoonDescription : p!.description}
                </Typography>
              </Box>

              {!isComingSoon && (
                <Box sx={{ mt: 'auto', pt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ color: accent }}>
                    Select Project
                  </Typography>
                  <ArrowForwardIcon sx={{ fontSize: 16, color: accent }} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      );
    };

    return (
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4, maxWidth: 1100, mx: 'auto' }}>
        <Stack spacing={1} sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <RocketLaunchIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography fontWeight={800} variant="h3" sx={{ lineHeight: 1.1 }}>
                Run{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  SDK Tests
                </Box>
              </Typography>
              <Typography color="text.secondary" variant="body1" sx={{ mt: 0.5 }}>
                Select a project to configure and run tests
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ mt: 2 }} />
        </Stack>

        {allProjects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">Loading projects...</Typography>
            <LinearProgress sx={{ width: 200, mx: 'auto', mt: 2, borderRadius: 1 }} />
          </Box>
        ) : (
          <Stack spacing={4}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box
                  component="img"
                  src="/logos/playwright.svg"
                  alt="Playwright"
                  sx={{ width: 32, height: 32, objectFit: 'contain' }}
                />
                <Typography variant="h6" fontWeight={700}>
                  Playwright
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                {languageOrder.map(({ key }) => {
                  const id = playwrightProjectIds[key];
                  const proj = id ? projectById.get(id) ?? null : null;
                  const accent = sdkAccent[key] || '#667eea';
                  return renderProjectCard(`playwright-${key}`, proj, accent, !proj && !!id, key, 'playwright');
                })}
              </Grid>
            </Box>

            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box
                  component="img"
                  src="/logos/selenium.svg"
                  alt="Selenium"
                  sx={{ width: 32, height: 32, objectFit: 'contain' }}
                />
                <Typography variant="h6" fontWeight={700}>
                  Selenium
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                {languageOrder.map(({ key }) => {
                  const id = seleniumProjectIds[key];
                  const proj = id ? projectById.get(id) ?? null : null;
                  const accent = sdkAccent[key] || '#667eea';
                  const isComingSoon = !proj;
                  return renderProjectCard(`selenium-${key}`, proj ?? null, accent, isComingSoon, key, 'selenium');
                })}
              </Grid>
            </Box>
          </Stack>
        )}
      </Box>
    );
  }

  if (isStaticDeployment()) {
    return (
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4, maxWidth: 800, mx: 'auto' }}>
        <StickyRunHeader
          projectName={project.name}
          projectId={project.id}
          projects={allProjects}
          selectedCount={0}
          validUrl={false}
          isSubmitting={false}
          onRun={() => {}}
          onBack={() => navigate('/test-runner')}
          onProjectChange={(id) => navigate(`/test-runner/library?project=${id}`)}
        />
        <Alert severity="info" sx={{ mt: 3 }}>
          Test execution requires the backend server. Run locally with{' '}
          <code>npm run dev:full</code> or deploy with Docker for full functionality.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Sticky header */}
      <StickyRunHeader
        projectName={project.name}
        projectId={project.id}
        projects={allProjects}
        selectedCount={selectedCount}
        validUrl={isUrlValid}
        isSubmitting={isSubmitting}
        onRun={() => handleRunTests()}
        onBack={() => navigate('/test-runner')}
        onProjectChange={(id) => navigate(`/test-runner/library?project=${id}`)}
      />

      {/* Two-column body */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '380px 1fr' },
          gap: 2,
          flex: 1,
          overflow: 'hidden',
          p: 2,
        }}
      >
        {/* Left — Test Browser */}
        <Box sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <TestFileTree
            suiteGroup={filteredSuiteGroup}
            selectedTests={selectedTests}
            selectedTestCases={selectedTestCases}
            expandedSuites={expandedSuites}
            expandedTestFiles={expandedTestFiles}
            testCasesCache={testCasesCache}
            loadingTestCases={loadingTestCases}
            search={testSearch}
            onSearchChange={setTestSearch}
            totalAvailable={totalAvailable}
            onToggleTest={handleToggleTest}
            onToggleTestFile={handleToggleTestFile}
            onToggleTestCase={handleToggleTestCase}
            onToggleSuite={handleToggleSuite}
            onSelectSuite={handleSelectSuite}
            onRunSuite={handleRunSuite}
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
          />
        </Box>

        {/* Right — Launch Configuration */}
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* Project identity */}
          <Paper
            variant="outlined"
            sx={{
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              borderRadius: 2,
              bgcolor: 'action.hover',
            }}
          >
            {project.logo ? (
              <Box
                component="img"
                src={project.logo}
                alt={project.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.display = 'none';
                  (e.currentTarget.nextElementSibling as HTMLElement | null)?.style.setProperty('display', 'flex');
                }}
                sx={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }}
              />
            ) : null}
            <Box
              sx={{
                width: 36,
                height: 36,
                flexShrink: 0,
                display: project.logo ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <FolderIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2} noWrap>
                {project.name}
              </Typography>
              {project.description && (
                <Typography variant="caption" color="text.secondary" noWrap display="block">
                  {project.description}
                </Typography>
              )}
            </Box>
          </Paper>

          <TargetEnvironmentCard
            baseUrl={baseUrl}
            isUrlValid={isUrlValid}
            httpAuthEnabled={httpAuthEnabled}
            httpAuthUsername={httpAuthUsername}
            httpAuthPassword={httpAuthPassword}
            onBaseUrlChange={setBaseUrl}
            onHttpAuthUsernameChange={setHttpAuthUsername}
            onHttpAuthPasswordChange={setHttpAuthPassword}
          />

          <ExecutionModeCard
            mode={mode}
            onModeChange={handleModeChange}
            slowMo={slowMo}
            onSlowMoChange={setSlowMo}
            workers={workers}
            onWorkersChange={setWorkers}
          />

          <AdvancedOptionsAccordion
            qaseEnabled={qaseEnabled}
            qaseConfig={qaseConfig}
            onQaseEnabledChange={setQaseEnabled}
            onQaseConfigChange={setQaseConfig}
            httpAuthUsername={httpAuthUsername}
            httpAuthPassword={httpAuthPassword}
            onHttpAuthUsernameChange={setHttpAuthUsername}
            onHttpAuthPasswordChange={setHttpAuthPassword}
            showHttpAuth={!httpAuthEnabled}
          />

          <RunQueue
            testFiles={allTestFiles}
            selectedTests={selectedTests}
            selectedTestCases={selectedTestCases}
            testCasesCache={testCasesCache}
            validUrl={isUrlValid}
            isSubmitting={isSubmitting}
            onRun={() => handleRunTests()}
          />
        </Box>
      </Box>
    </Box>
  );
}
