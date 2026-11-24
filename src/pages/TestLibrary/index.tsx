import type { Project, QaseConfig, TestRunConfig } from '../../../shared/types';

import { ArrowRight, Folder, Rocket } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { api } from '../../api/client';
import { useToast } from '../../components/standalone/ToastContainer';
import { Alert } from '../../components/ui/alert';
import { Chip, type ChipTone } from '../../components/ui/chip';
import { cn } from '../../lib/utils';
import { isStaticDeployment } from '../../utils/environment';
import AdvancedOptionsAccordion from './AdvancedOptionsAccordion';
import ExecutionModeCard from './ExecutionModeCard';
import RunQueue from './RunQueue';
import StickyRunHeader from './StickyRunHeader';
import TargetEnvironmentCard from './TargetEnvironmentCard';
import TestFileTree from './TestFileTree';
import type { ExecutionMode, TestCaseInfo, TestFileInfo, TestSuiteGroup } from './types';

// ─── project card accents (token classes; literal strings for Tailwind JIT) ──

interface Accent {
  bar: string;
  hoverBorder: string;
  text: string;
}

const SDK_ACCENT: Record<string, Accent> = {
  node: { bar: 'bg-status-info', hoverBorder: 'hover:border-status-info focus-within:border-status-info', text: 'text-status-info' },
  python: { bar: 'bg-status-pass', hoverBorder: 'hover:border-status-pass focus-within:border-status-pass', text: 'text-status-pass' },
  java: { bar: 'bg-status-warn', hoverBorder: 'hover:border-status-warn focus-within:border-status-warn', text: 'text-status-warn' },
};

const DEFAULT_ACCENT: Accent = { bar: 'bg-primary', hoverBorder: 'hover:border-primary focus-within:border-primary', text: 'text-primary' };

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
      <div className="flex h-screen flex-col items-center justify-center gap-5 bg-shell-main">
        {/* Project logo with pulse animation */}
        <div className="animate-pulse">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={displayName}
              className="block size-20 object-contain"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-xl bg-primary/10">
              <Folder className="size-10 text-foreground-muted" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h5 className="m-0 mb-1 text-2xl font-bold tracking-[-0.5px] text-foreground">
            Loading {displayName}
          </h5>
          <p className="m-0 text-sm text-foreground-secondary">
            Preparing test suite…
          </p>
        </div>

        {/* Progress indicator */}
        <div role="progressbar" aria-label={`Loading ${displayName}`} className="relative h-1 w-[220px] overflow-hidden rounded bg-primary/20">
          <div className="absolute inset-y-0 left-0 w-2/5 animate-progress-indeterminate bg-primary" />
        </div>
      </div>
    );
  }

  if (!project) {
    const frameworkLabel: Record<string, string> = { playwright: 'Playwright', pytest: 'Pytest', maven: 'Maven', selenium: 'Selenium' };
    const sdkTone: Record<string, ChipTone> = { node: 'info', python: 'pass', java: 'warn' };
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
      java: 'accessflow-java-selenium',
    };

    const langLabels: Record<LangKey, string> = { node: 'Node', python: 'Python', java: 'Java' };

    const renderProjectCard = (
      cardKey: string,
      p: Project | null,
      accent: Accent,
      isComingSoon: boolean,
      langKey: LangKey,
      section: 'playwright' | 'selenium',
    ) => {
      const href = !isComingSoon && p ? `?project=${p.id}` : undefined;
      const langInfo = languageOrder.find((item) => item.key === langKey)!;
      const iconsToShow: string[] = [langInfo.logo];
      if (!isComingSoon && p?.logos?.length) {
        iconsToShow.push(...p.logos);
      }
      const uniqueIcons = Array.from(new Set(iconsToShow));
      const sectionLabel = section === 'playwright' ? 'Playwright' : 'Selenium';
      const comingSoonTitle = `AccessFlow (${langLabels[langKey]} ${sectionLabel})`;
      const comingSoonDescription = `AccessFlow ${langLabels[langKey]} SDK E2E test suite using ${sectionLabel} — coming soon.`;
      const title = isComingSoon ? comingSoonTitle : p!.name;
      return (
        <div key={cardKey} className="h-full">
          <div
            className={cn(
              'relative flex h-full flex-col overflow-hidden rounded-xl border-2 bg-shell-panel transition-all duration-200',
              isComingSoon
                ? 'border-border opacity-75'
                : cn('border-border focus-within:-translate-y-1 hover:-translate-y-1 hover:shadow-lg', accent.hoverBorder)
            )}
          >
            <div aria-hidden="true" className={cn('absolute inset-x-0 top-0 h-1', isComingSoon ? 'bg-foreground-muted' : accent.bar)} />
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex flex-row flex-wrap items-center gap-2">
                {uniqueIcons.map((logoSrc, i) => (
                  <img key={i} src={logoSrc} alt="" className="size-11 object-contain" />
                ))}
              </div>

              <div>
                <h6 className="m-0 mb-1 text-xl font-bold text-foreground">
                  {href ? (
                    <Link
                      to={href}
                      className="text-inherit no-underline outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline"
                    >
                      {title}
                    </Link>
                  ) : (
                    title
                  )}
                </h6>
                <div className="mb-2 flex flex-row flex-wrap gap-1">
                  {!isComingSoon && p?.sdkType && (
                    <Chip tone={sdkTone[p.sdkType] || 'default'} className="h-5 font-bold">
                      {p.sdkType.toUpperCase()}
                    </Chip>
                  )}
                  {isComingSoon ? (
                    <Chip className="h-5">Coming Soon</Chip>
                  ) : (
                    p?.testFramework && (
                      <Chip className="h-5">
                        {frameworkLabel[p.testFramework] || p.testFramework}
                      </Chip>
                    )
                  )}
                </div>
                <p className="m-0 text-sm leading-relaxed text-foreground-secondary">
                  {isComingSoon ? comingSoonDescription : p!.description}
                </p>
              </div>

              {!isComingSoon && (
                <div aria-hidden="true" className={cn('mt-auto flex items-center gap-1 pt-2', accent.text)}>
                  <span className="text-sm font-semibold">Select Project</span>
                  <ArrowRight className="size-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 md:px-12">
        <div className="mb-10 flex flex-col gap-2">
          <div className="flex flex-row items-center gap-4">
            <Rocket className="size-10 text-primary" aria-hidden="true" />
            <div>
              <h3 className="m-0 text-5xl font-extrabold leading-tight text-foreground">
                Run{' '}
                <span className="text-primary">
                  SDK Tests
                </span>
              </h3>
              <p className="m-0 mt-1 text-base text-foreground-secondary">
                Select a project to configure and run tests
              </p>
            </div>
          </div>
          <div className="mt-4 h-px bg-border" />
        </div>

        {allProjects.length === 0 ? (
          <div className="py-16 text-center">
            <p className="m-0 text-foreground-secondary">Loading projects...</p>
            <div role="progressbar" aria-label="Loading projects" className="relative mx-auto mt-4 h-1 w-[200px] overflow-hidden rounded bg-primary/20">
              <div className="absolute inset-y-0 left-0 w-2/5 animate-progress-indeterminate bg-primary" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <section>
              <div className="mb-4 flex flex-row items-center gap-3">
                <img src="/logos/playwright.svg" alt="Playwright" className="size-8 object-contain" />
                <h6 className="m-0 text-xl font-bold text-foreground">
                  Playwright
                </h6>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {languageOrder.map(({ key }) => {
                  const id = playwrightProjectIds[key];
                  const proj = id ? projectById.get(id) ?? null : null;
                  const accent = SDK_ACCENT[key] || DEFAULT_ACCENT;
                  return renderProjectCard(`playwright-${key}`, proj, accent, !proj && !!id, key, 'playwright');
                })}
              </div>
            </section>

            <section>
              <div className="mb-4 flex flex-row items-center gap-3">
                <img src="/logos/selenium.svg" alt="Selenium" className="size-8 object-contain" />
                <h6 className="m-0 text-xl font-bold text-foreground">
                  Selenium
                </h6>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {languageOrder.map(({ key }) => {
                  const id = seleniumProjectIds[key];
                  const proj = id ? projectById.get(id) ?? null : null;
                  const accent = SDK_ACCENT[key] || DEFAULT_ACCENT;
                  const isComingSoon = !proj;
                  return renderProjectCard(`selenium-${key}`, proj ?? null, accent, isComingSoon, key, 'selenium');
                })}
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }

  if (isStaticDeployment()) {
    return (
      <div className="mx-auto max-w-[800px] px-4 py-8 sm:px-8 md:px-12">
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
        <Alert variant="info" className="mt-6">
          Test execution requires the backend server. Run locally with{' '}
          <code>npm run dev:full</code> or deploy with Docker for full functionality.
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
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
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden p-4 md:grid-cols-[380px_1fr]">
        {/* Left — Test Browser */}
        <div className="flex flex-col overflow-hidden">
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
        </div>

        {/* Right — Launch Configuration */}
        <div className="flex flex-col gap-4 overflow-auto">

          {/* Project identity */}
          <div className="flex items-center gap-3 rounded-lg border border-border bg-hover/5 p-3">
            {project.logo ? (
              <img
                src={project.logo}
                alt={project.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.display = 'none';
                  (e.currentTarget.nextElementSibling as HTMLElement | null)?.style.setProperty('display', 'flex');
                }}
                className="size-9 shrink-0 object-contain"
              />
            ) : null}
            <div
              className="size-9 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground"
              style={{ display: project.logo ? 'none' : 'flex' }}
            >
              <Folder className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h6 className="m-0 truncate text-sm font-bold leading-tight text-foreground">
                {project.name}
              </h6>
              {project.description && (
                <span className="block truncate text-[0.75rem] text-foreground-secondary">
                  {project.description}
                </span>
              )}
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
}
