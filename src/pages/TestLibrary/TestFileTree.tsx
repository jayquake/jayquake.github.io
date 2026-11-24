import { Check, ChevronDown, ChevronRight, Folder, FolderOpen, Minus, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react';

import { Button } from '../../components/ui/button';
import { Chip } from '../../components/ui/chip';
import { Progress } from '../../components/ui/progress';
import { SearchField } from '../../components/ui/search-field';
import { Spinner } from '../../components/ui/spinner';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';
import { cn } from '../../lib/utils';
import type { TestCaseInfo, TestFileInfo, TestSuiteGroup } from './types';

/** Strip leading "Qase NNN: " or "Qase NNN - " prefix from a test title.
 *  The Qase ID is already shown as a chip, so the prefix is redundant. */
function stripQasePrefix(title: string): string {
  return title.replace(/^Qase\s+\d+\s*[:\-–]\s*/i, '').trim();
}

interface TestFileTreeProps {
  expandedSuites: Set<string>;
  expandedTestFiles: Set<string>;
  loadingTestCases: Set<string>;
  onClearAll: () => void;
  onRunSuite: (suite: TestSuiteGroup) => void;
  onSelectAll: () => void;
  onSelectSuite: (suite: TestSuiteGroup, path: string) => void;
  onToggleTest: (path: string) => void;
  onToggleTestCase: (filePath: string, title: string) => void;
  onToggleTestFile: (path: string) => void;
  onToggleSuite: (path: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  selectedTestCases: Map<string, Set<string>>;
  selectedTests: Set<string>;
  suiteGroup: null | TestSuiteGroup;
  testCasesCache: Map<string, TestCaseInfo[]>;
  totalAvailable: number;
}

type CheckState = 'mixed' | boolean;

/** One visible tree item, in document order — drives roving focus and keyboard actions. */
interface VisibleNode {
  /** Enter / click on the row. */
  activate: () => void;
  expandable: boolean;
  expanded: boolean;
  key: string;
  parentKey: null | string;
  /** Shift+Enter (suites only). */
  run?: () => void;
  /** Space / checkbox click. */
  toggleCheck: () => void;
  toggleExpand?: () => void;
}

const suiteKey = (path: string) => `s:${path}`;
const fileKey = (path: string) => `f:${path}`;
const caseKey = (path: string, title: string) => `c:${path}::${title}`;

/** Visual-only checkbox; the treeitem carries aria-checked. */
function CheckMark({ state, onClick }: { onClick: (e: MouseEvent<HTMLSpanElement>) => void; state: CheckState }) {
  const on = state !== false;
  return (
    <span
      aria-hidden="true"
      onClick={onClick}
      className={cn(
        'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center border',
        on ? 'border-primary bg-primary text-primary-foreground' : 'border-border-strong bg-shell-input'
      )}
    >
      {state === 'mixed' ? <Minus className="size-3" /> : state ? <Check className="size-3" /> : null}
    </span>
  );
}

const rowBase =
  'tree-row flex min-h-8 cursor-pointer items-center gap-2 pr-2 hover:bg-hover/5';
const itemFocus =
  'outline-none [&:focus-visible>.tree-row]:outline [&:focus-visible>.tree-row]:outline-2 [&:focus-visible>.tree-row]:-outline-offset-2 [&:focus-visible>.tree-row]:outline-primary';

export default function TestFileTree({
  expandedSuites,
  expandedTestFiles,
  loadingTestCases,
  onClearAll,
  onRunSuite,
  onSelectAll,
  onSelectSuite,
  onToggleTest,
  onToggleTestCase,
  onToggleTestFile,
  onToggleSuite,
  search,
  onSearchChange,
  selectedTestCases,
  selectedTests,
  suiteGroup,
  testCasesCache,
  totalAvailable,
}: TestFileTreeProps) {
  const [hoveredSuite, setHoveredSuite] = useState<null | string>(null);
  const [focusKey, setFocusKey] = useState<null | string>(null);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());

  const selectedFileCount = selectedTests.size;
  const selectedCaseCount = Array.from(selectedTestCases.values()).reduce(
    (sum, s) => sum + s.size,
    0
  );
  const totalSelected = selectedFileCount + selectedCaseCount;
  const selectionRatio = totalAvailable > 0 ? Math.min(totalSelected / totalAvailable, 1) : 0;

  // ── visible node list (same order as the render below) ──
  const visible: VisibleNode[] = [];

  const collectFile = (file: TestFileInfo, parentKey: null | string) => {
    const testCases = testCasesCache.get(file.relativePath) || [];
    const isLoading = loadingTestCases.has(file.relativePath);
    const expandable = !isLoading && testCases.length > 0;
    const expanded = expandedTestFiles.has(file.relativePath);
    const key = fileKey(file.relativePath);
    visible.push({
      activate: () => onToggleTest(file.relativePath),
      expandable,
      expanded: expandable && expanded,
      key,
      parentKey,
      toggleCheck: () => onToggleTest(file.relativePath),
      toggleExpand: () => onToggleTestFile(file.relativePath),
    });
    if (expanded && testCases.length > 0) {
      for (const tc of testCases) {
        visible.push({
          activate: () => onToggleTestCase(file.relativePath, tc.title),
          expandable: false,
          expanded: false,
          key: caseKey(file.relativePath, tc.title),
          parentKey: key,
          toggleCheck: () => onToggleTestCase(file.relativePath, tc.title),
        });
      }
    }
  };

  const collectSuite = (suite: TestSuiteGroup, path: string, parentKey: null | string) => {
    if (suite.name === 'root') {
      Object.entries(suite.suites).forEach(([key, sub]) => collectSuite(sub, key, null));
      suite.tests.forEach(f => collectFile(f, null));
      return;
    }
    const key = suiteKey(path);
    const expanded = expandedSuites.has(path);
    visible.push({
      activate: () => onToggleSuite(path),
      expandable: true,
      expanded,
      key,
      parentKey,
      run: () => onRunSuite(suite),
      toggleCheck: () => onSelectSuite(suite, path),
      toggleExpand: () => onToggleSuite(path),
    });
    if (expanded) {
      Object.entries(suite.suites).forEach(([k, sub]) => collectSuite(sub, `${path}/${k}`, key));
      suite.tests.forEach(f => collectFile(f, key));
    }
  };

  if (suiteGroup) collectSuite(suiteGroup, 'root', null);

  const tabStopKey =
    focusKey && visible.some(n => n.key === focusKey) ? focusKey : visible[0]?.key ?? null;

  const focusItem = (key: string) => {
    setFocusKey(key);
    itemRefs.current.get(key)?.focus();
  };

  const setItemRef = (key: string) => (el: HTMLLIElement | null) => {
    if (el) itemRefs.current.set(key, el);
    else itemRefs.current.delete(key);
  };

  const handleTreeKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    const key = target.getAttribute('data-tree-key');
    if (!key || target.getAttribute('role') !== 'treeitem') return;
    const index = visible.findIndex(n => n.key === key);
    if (index < 0) return;
    const node = visible[index];

    switch (e.key) {
      case 'ArrowDown':
        if (index < visible.length - 1) focusItem(visible[index + 1].key);
        break;
      case 'ArrowUp':
        if (index > 0) focusItem(visible[index - 1].key);
        break;
      case 'Home':
        focusItem(visible[0].key);
        break;
      case 'End':
        focusItem(visible[visible.length - 1].key);
        break;
      case 'ArrowRight':
        if (node.expandable && !node.expanded) node.toggleExpand?.();
        else if (node.expanded && visible[index + 1]?.parentKey === node.key) focusItem(visible[index + 1].key);
        break;
      case 'ArrowLeft':
        if (node.expandable && node.expanded) node.toggleExpand?.();
        else if (node.parentKey) focusItem(node.parentKey);
        break;
      case ' ':
        node.toggleCheck();
        break;
      case 'Enter':
        if (e.shiftKey && node.run) node.run();
        else node.activate();
        break;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const treeItemProps = (key: string, level: number, checked: CheckState, expanded?: boolean) => ({
    'aria-checked': checked,
    'aria-expanded': expanded,
    'aria-level': level,
    className: itemFocus,
    'data-tree-key': key,
    onFocus: (e: FocusEvent<HTMLLIElement>) => {
      if (e.target === e.currentTarget) setFocusKey(key);
    },
    ref: setItemRef(key),
    role: 'treeitem' as const,
    tabIndex: tabStopKey === key ? 0 : -1,
  });

  const renderTestFile = (file: TestFileInfo, suitePath: string, level: number): ReactNode => {
    const isSelected = selectedTests.has(file.relativePath);
    const isExpanded = expandedTestFiles.has(file.relativePath);
    const isLoading = loadingTestCases.has(file.relativePath);
    const testCases = testCasesCache.get(file.relativePath) || [];
    const fileCaseSelections = selectedTestCases.get(file.relativePath) || new Set<string>();
    const expandable = !isLoading && testCases.length > 0;
    const key = fileKey(file.relativePath);
    const indent = (suitePath.split('/').length) * 16 + 48;

    return (
      <li
        key={file.relativePath}
        {...treeItemProps(key, level, isSelected, expandable ? isExpanded : undefined)}
        aria-label={file.qaseId ? `${file.name}, Q-${file.qaseId}` : file.name}
      >
        <div
          className={rowBase}
          style={{ paddingLeft: indent }}
          onClick={() => { setFocusKey(key); onToggleTest(file.relativePath); }}
        >
          <CheckMark
            state={isSelected}
            onClick={(e) => { e.stopPropagation(); setFocusKey(key); onToggleTest(file.relativePath); }}
          />
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1 py-1">
            <span className="font-mono text-xs text-foreground">{file.name}</span>
            {file.qaseId && <Chip tone="info" className="h-[18px]">{`Q-${file.qaseId}`}</Chip>}
            {testCases.length > 0 && <Chip className="h-[18px]">{testCases.length}</Chip>}
          </span>
          {isLoading ? (
            <Spinner className="size-3.5" />
          ) : testCases.length > 0 ? (
            <span
              aria-hidden="true"
              className="inline-flex size-6 items-center justify-center text-foreground-secondary hover:text-foreground"
              onClick={(e) => { e.stopPropagation(); setFocusKey(key); onToggleTestFile(file.relativePath); }}
            >
              {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            </span>
          ) : null}
        </div>

        {/* Expanded test cases */}
        {isExpanded && testCases.length > 0 && (
          <ul role="group" className="m-0 list-none p-0">
            {testCases.map((tc: TestCaseInfo) => {
              const isCaseSelected = fileCaseSelections.has(tc.title);
              const cKey = caseKey(file.relativePath, tc.title);
              return (
                <li key={tc.title} {...treeItemProps(cKey, level + 1, isCaseSelected)}>
                  <div
                    className={cn(rowBase, 'min-h-7')}
                    style={{ paddingLeft: (suitePath.split('/').length) * 16 + 64 }}
                    onClick={() => { setFocusKey(cKey); onToggleTestCase(file.relativePath, tc.title); }}
                  >
                    <CheckMark
                      state={isCaseSelected}
                      onClick={(e) => { e.stopPropagation(); setFocusKey(cKey); onToggleTestCase(file.relativePath, tc.title); }}
                    />
                    <span className="flex min-w-0 items-center gap-1">
                      {tc.qaseId && <Chip tone="info" className="shrink-0">{`Q-${tc.qaseId}`}</Chip>}
                      <span className="text-[0.75rem] text-foreground-secondary">
                        {stripQasePrefix(tc.title)}
                      </span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  const renderSuite = (suite: TestSuiteGroup, path: string, depth = 0): ReactNode => {
    const isExpanded = expandedSuites.has(path) || suite.name === 'root';
    const allTests = getAllTests(suite);
    const allSelected = allTests.length > 0 && allTests.every(t => selectedTests.has(t.relativePath));
    const someSelected = !allSelected && allTests.some(t => selectedTests.has(t.relativePath));

    if (suite.name === 'root') {
      return (
        <>
          {Object.entries(suite.suites).map(([key, sub]) =>
            renderSuite(sub, key, 0)
          )}
          {suite.tests.map(f => renderTestFile(f, '', 1))}
        </>
      );
    }

    const key = suiteKey(path);
    const checked: CheckState = allSelected ? true : someSelected ? 'mixed' : false;
    const showRun = hoveredSuite === path || focusKey === key;

    return (
      <li
        key={path}
        {...treeItemProps(key, depth + 1, checked, isExpanded)}
        aria-keyshortcuts="Shift+Enter"
        aria-label={`${suite.name}, ${allTests.length} test file${allTests.length !== 1 ? 's' : ''}`}
      >
        <div
          className={cn(rowBase, 'min-h-9')}
          style={{ paddingLeft: depth * 16 + 16 }}
          onMouseEnter={() => setHoveredSuite(path)}
          onMouseLeave={() => setHoveredSuite(null)}
          onClick={() => { setFocusKey(key); onToggleSuite(path); }}
        >
          <CheckMark
            state={checked}
            onClick={(e) => { e.stopPropagation(); setFocusKey(key); onSelectSuite(suite, path); }}
          />
          {isExpanded ? (
            <FolderOpen className="size-4 shrink-0 text-primary" aria-hidden="true" />
          ) : (
            <Folder className="size-4 shrink-0 text-foreground-muted" aria-hidden="true" />
          )}
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
            {suite.name}
          </span>
          {isExpanded ? (
            <ChevronDown className="size-4 shrink-0 text-foreground-secondary" aria-hidden="true" />
          ) : (
            <ChevronRight className="size-4 shrink-0 text-foreground-secondary" aria-hidden="true" />
          )}
          <span className="flex w-8 shrink-0 justify-center">
            {showRun ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="size-6"
                    onClick={(e) => { e.stopPropagation(); onRunSuite(suite); }}
                  >
                    <Play className="size-4 text-primary" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{`Run all in ${suite.name}`}</TooltipContent>
              </Tooltip>
            ) : (
              <Chip className="h-[18px]">{allTests.length}</Chip>
            )}
          </span>
        </div>

        {isExpanded && (
          <ul role="group" className="m-0 list-none p-0">
            {Object.entries(suite.suites).map(([k, sub]) =>
              renderSuite(sub, `${path}/${k}`, depth + 1)
            )}
            {suite.tests.map(f => renderTestFile(f, path, depth + 2))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="flex h-full flex-col overflow-hidden border border-border bg-shell-panel">
      {/* Search + Select All / Clear */}
      <div className="flex gap-2 border-b border-border p-3">
        <SearchField
          value={search}
          onValueChange={onSearchChange}
          placeholder="Search tests…"
          aria-label="Search tests"
          containerClassName="flex-1"
        />
        <div role="group" aria-label="Selection" className="flex shrink-0">
          <Button size="sm" onClick={onSelectAll}>All</Button>
          <Button size="sm" onClick={onClearAll} className="-ml-px">Clear</Button>
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-auto">
        {!suiteGroup ? (
          <div className="flex justify-center p-8">
            <Spinner className="size-8" />
          </div>
        ) : (
          <ul
            role="tree"
            aria-label="Test files"
            className="m-0 list-none p-0 py-1"
            onKeyDown={handleTreeKeyDown}
          >
            {renderSuite(suiteGroup, 'root')}
          </ul>
        )}
      </div>

      {/* Selection footer */}
      <div className="border-t border-border p-3">
        <span className="mb-1 block text-[0.75rem] text-foreground-secondary">
          {selectedFileCount > 0 || selectedCaseCount > 0
            ? `${selectedFileCount} file${selectedFileCount !== 1 ? 's' : ''} · ${selectedCaseCount > 0 ? `${selectedCaseCount} case${selectedCaseCount !== 1 ? 's' : ''} selected` : 'all cases'}`
            : 'No tests selected'}
        </span>
        <Progress value={selectionRatio * 100} aria-label="Selected tests" className="h-1" />
      </div>
    </div>
  );
}

function getAllTests(suite: TestSuiteGroup): TestFileInfo[] {
  const tests: TestFileInfo[] = [...suite.tests];
  for (const sub of Object.values(suite.suites)) {
    tests.push(...getAllTests(sub));
  }
  return tests;
}
