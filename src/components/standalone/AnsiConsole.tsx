import AnsiToHtml from 'ansi-to-html';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef } from 'react';

type AnsiConsoleProps = {
  autoScroll?: boolean;
  output: string;
  /** Extra inline styles merged over the defaults (was an MUI `sx` object). */
  sx?: object;
};

/* Fixed terminal palette: the console stays dark in both app themes. */
const TERMINAL_BG = '#1e1e1e';
const TERMINAL_FG = '#e0e0e0';

const ansiConverter = new AnsiToHtml({
  bg: TERMINAL_BG,
  escapeXML: true,
  fg: TERMINAL_FG,
  newline: true,
  stream: false,
});

export const AnsiConsole = ({ autoScroll = true, output, sx }: AnsiConsoleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const htmlOutput = useMemo(() => {
    if (!output) return '';
    // Normalize \r\n and bare \r (Playwright uses \r for in-place line updates)
    const normalized = output.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    return ansiConverter.toHtml(normalized);
  }, [output]);

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [output, autoScroll]);

  return (
    <div
      className="max-h-96 overflow-y-auto whitespace-pre-wrap break-all rounded p-4 font-mono text-[0.8rem] leading-relaxed [&_span]:font-[inherit]"
      dangerouslySetInnerHTML={{ __html: htmlOutput }}
      ref={containerRef}
      style={{ backgroundColor: TERMINAL_BG, color: TERMINAL_FG, lineHeight: 1.6, ...(sx as CSSProperties | undefined) }}
    />
  );
};
