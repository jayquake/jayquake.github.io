import { Home, Play } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import type { Project } from '../../../shared/types';
import ProjectBreadcrumbItem from '../../components/standalone/ProjectBreadcrumbItem';
import { Button } from '../../components/ui/button';
import { Spinner } from '../../components/ui/spinner';
import { cn } from '../../lib/utils';

interface StickyRunHeaderProps {
  isSubmitting: boolean;
  onBack: () => void;
  onProjectChange: (projectId: string) => void;
  onRun: () => void;
  projectId: string;
  projectName: string;
  projects: Project[];
  selectedCount: number;
  validUrl: boolean;
}

const STEPS = ['Project', 'Configure', 'Execute', 'Results'];
const ACTIVE_STEP = 1;

/** Route of the project picker; the breadcrumb is a real link to it. */
const PROJECTS_HREF = '/test-runner';

export default function StickyRunHeader({
  isSubmitting,
  onBack,
  onProjectChange,
  onRun,
  projectId,
  projectName,
  projects,
  selectedCount,
  validUrl,
}: StickyRunHeaderProps) {
  const canRun = selectedCount > 0 && validUrl && !isSubmitting;

  // Plain left-clicks go through onBack (same behaviour as before); modified
  // clicks (new tab / window) fall through to the link's href.
  const handleBackClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onBack();
  };

  return (
    <header className="sticky top-0 z-[60] border-b border-border bg-shell-elevated shadow-sm">
      <div className="flex min-h-14 items-center gap-4 px-4 sm:min-h-16">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="mr-2 shrink-0">
          <ol className="m-0 flex list-none items-center gap-2 p-0 text-sm text-foreground-secondary">
            <li className="flex items-center">
              <Link
                to={PROJECTS_HREF}
                onClick={handleBackClick}
                className="flex items-center gap-1 text-inherit no-underline hover:underline"
              >
                <Home className="size-4" aria-hidden="true" />
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>

            {/* Project dropdown */}
            <li className="flex items-center">
              <ProjectBreadcrumbItem
                projectId={projectId}
                projectName={projectName}
                projects={projects}
                onProjectChange={onProjectChange}
              />
            </li>
            <li aria-hidden="true">/</li>

            <li>
              <span aria-current="page" className="font-medium text-foreground">
                Configure Tests
              </span>
            </li>
          </ol>
        </nav>

        {/* Stepper — centred */}
        <div className="hidden flex-1 md:block">
          <ol aria-label="Progress" className="m-0 flex list-none items-start justify-center p-0">
            {STEPS.map((label, i) => {
              const done = i < ACTIVE_STEP;
              const active = i === ACTIVE_STEP;
              return (
                <li
                  key={label}
                  aria-current={active ? 'step' : undefined}
                  className="relative flex flex-1 flex-col items-center gap-1"
                >
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute right-1/2 top-3 mr-4 h-px w-[calc(100%-2rem)] bg-border-strong"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'z-[1] flex size-6 items-center justify-center rounded-full text-[0.75rem] font-semibold',
                      done || active
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground-muted'
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      'text-[0.75rem]',
                      active ? 'font-semibold text-foreground' : 'text-foreground-secondary'
                    )}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Run button */}
        <Button
          variant="default"
          disabled={!canRun}
          onClick={onRun}
          className="ml-auto h-11 min-w-40 shrink-0 text-sm font-bold"
        >
          {isSubmitting ? (
            <Spinner className="size-4 text-current" aria-hidden="true" role={undefined} aria-label={undefined} />
          ) : (
            <Play className="size-4" aria-hidden="true" />
          )}
          {isSubmitting ? 'Starting…' : `Run ${selectedCount} Test${selectedCount !== 1 ? 's' : ''}`}
        </Button>
      </div>
    </header>
  );
}
