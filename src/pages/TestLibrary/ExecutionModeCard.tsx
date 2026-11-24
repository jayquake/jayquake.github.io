import { EyeOff, Monitor, PlayCircle } from 'lucide-react';
import { useId } from 'react';

import { Label } from '../../components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '../../components/ui/toggle-group';
import type { ExecutionMode } from './types';

interface ExecutionModeCardProps {
  mode: ExecutionMode;
  onModeChange: (mode: ExecutionMode) => void;
  onSlowMoChange: (value: number) => void;
  onWorkersChange: (value: number) => void;
  slowMo: number;
  workers: number;
}

interface Mark {
  label: string;
  value: number;
}

const SLOW_MO_MARKS: Mark[] = [
  { label: '0', value: 0 },
  { label: '500ms', value: 500 },
  { label: '1s', value: 1000 },
  { label: '2s', value: 2000 },
];

const WORKER_MARKS: Mark[] = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '4', value: 4 },
  { label: '8', value: 8 },
];

const EXECUTION_MODES: readonly ExecutionMode[] = ['headed', 'headless', 'ui'];

function isExecutionMode(value: string): value is ExecutionMode {
  return (EXECUTION_MODES as readonly string[]).includes(value);
}

/** Index of the mark closest to `value` (the old MUI slider only allowed mark values). */
function nearestMarkIndex(marks: Mark[], value: number): number {
  let best = 0;
  marks.forEach((m, i) => {
    if (Math.abs(m.value - value) < Math.abs(marks[best].value - value)) best = i;
  });
  return best;
}

interface MarkSliderProps {
  formatValue: (v: number) => string;
  id: string;
  label: string;
  marks: Mark[];
  onChange: (value: number) => void;
  value: number;
}

/**
 * Snaps to the given marks only (replaces MUI Slider with step={null}).
 * The range input moves over mark indexes; the emitted value is the mark's value.
 */
function MarkSlider({ formatValue, id, label, marks, onChange, value }: MarkSliderProps) {
  const index = nearestMarkIndex(marks, value);
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className="normal-case tracking-normal">
        {label}
      </Label>
      <input
        id={id}
        type="range"
        min={0}
        max={marks.length - 1}
        step={1}
        value={index}
        aria-valuetext={formatValue(marks[index].value)}
        onChange={(e) => onChange(marks[Number(e.target.value)].value)}
        className="w-full cursor-pointer accent-primary"
      />
      <div className="flex justify-between font-mono text-[0.75rem] text-foreground-muted" aria-hidden="true">
        {marks.map((m) => (
          <span key={m.value}>{m.label}</span>
        ))}
      </div>
    </div>
  );
}

export default function ExecutionModeCard({
  mode,
  onModeChange,
  onSlowMoChange,
  onWorkersChange,
  slowMo,
  workers,
}: ExecutionModeCardProps) {
  const uid = useId();

  return (
    <section className="border border-border bg-shell-panel p-4">
      <h6 className="m-0 mb-2 text-base font-semibold text-foreground">
        Execution Mode
      </h6>

      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(val) => {
          if (val && isExecutionMode(val)) onModeChange(val);
        }}
        aria-label="Execution mode"
        className="mb-5 flex w-full"
      >
        <ToggleGroupItem value="headed" className="flex-1 gap-1.5">
          <Monitor className="size-4" aria-hidden="true" />
          Headed
        </ToggleGroupItem>
        <ToggleGroupItem value="headless" className="flex-1 gap-1.5">
          <EyeOff className="size-4" aria-hidden="true" />
          Headless
        </ToggleGroupItem>
        <ToggleGroupItem value="ui" className="flex-1 gap-1.5">
          <PlayCircle className="size-4" aria-hidden="true" />
          UI Mode
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Slow Motion */}
      <div className="mb-4">
        <MarkSlider
          id={`${uid}-slowmo`}
          label={`Slow Motion — ${slowMo === 0 ? 'off' : `${slowMo}ms`}`}
          marks={SLOW_MO_MARKS}
          value={slowMo}
          onChange={onSlowMoChange}
          formatValue={(v) => (v === 0 ? 'off' : `${v}ms`)}
        />
      </div>

      {/* Workers */}
      <div>
        <MarkSlider
          id={`${uid}-workers`}
          label={`Workers — ${workers}`}
          marks={WORKER_MARKS}
          value={workers}
          onChange={onWorkersChange}
          formatValue={(v) => String(v)}
        />
      </div>
    </section>
  );
}
