import { ChevronDown } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import type { Project } from '../../../shared/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '../../lib/utils';
import { routeClick } from '../../lib/routeClick';

interface ProjectBreadcrumbItemProps {
  onProjectChange: (projectId: string) => void;
  projectId: string;
  projectName: string;
  projects: Project[];
}

const triggerClass =
  'flex items-center gap-0.5 rounded border-0 bg-transparent p-0 font-[inherit] text-inherit';

export default function ProjectBreadcrumbItem({
  onProjectChange,
  projectId,
  projectName,
  projects,
}: ProjectBreadcrumbItemProps) {
  const hasMultiple = projects.length > 1;

  const label = (
    <p className="m-0 max-w-[160px] truncate text-sm font-medium">{projectName}</p>
  );

  // A single project has nothing to switch to: the button stays inert, as before.
  if (!hasMultiple) {
    return (
      <button aria-expanded={false} aria-label="Switch project" className={cn(triggerClass, 'cursor-default')} type="button">
        {label}
      </button>
    );
  }

  // Each item is a real link to the project's library; a plain click still goes
  // through onProjectChange (and selecting the current project does nothing).
  const handleItemClick = (id: string) =>
    routeClick(() => {
      if (id !== projectId) onProjectChange(id);
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label="Switch project" className={cn(triggerClass, 'cursor-pointer hover:text-primary')} type="button">
          {label}
          <ChevronDown aria-hidden="true" className="size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[200px]">
        {projects.map((p) => (
          <DropdownMenuItem
            asChild
            className={cn(
              'text-sm text-inherit no-underline',
              p.id === projectId ? 'bg-primary/10 font-semibold' : 'font-normal'
            )}
            key={p.id}
          >
            <Link
              onClick={handleItemClick(p.id)}
              to={`/test-runner/library?project=${p.id}`}
            >
              {p.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
