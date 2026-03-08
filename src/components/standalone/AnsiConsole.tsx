import AnsiToHtml from 'ansi-to-html';
import Box from '@mui/material/Box';
import { useEffect, useMemo, useRef } from 'react';

type AnsiConsoleProps = {
  autoScroll?: boolean;
  output: string;
  sx?: object;
};

const ansiConverter = new AnsiToHtml({
  bg: '#1e1e1e',
  escapeXML: true,
  fg: '#e0e0e0',
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
    <Box
      dangerouslySetInnerHTML={{ __html: htmlOutput }}
      ref={containerRef}
      sx={{
        bgcolor: '#1e1e1e',
        color: '#e0e0e0',
        p: 2,
        borderRadius: 1,
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        lineHeight: 1.6,
        maxHeight: 384,
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        '& span': { fontFamily: 'inherit' },
        ...sx,
      }}
    />
  );
};
