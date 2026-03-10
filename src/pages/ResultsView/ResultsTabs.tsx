import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TerminalIcon from '@mui/icons-material/Terminal';

type TabType = 'details' | 'mcp' | 'output' | 'sdk-audit' | 'summary';

interface ResultsTabsProps {
  activeTab: TabType;
  mcpCount: number;
  onChange: (tab: TabType) => void;
  sdkAuditCount?: number;
}

const BASE_TABS: { icon: React.ReactElement; id: TabType; label: string }[] = [
  { icon: <SummarizeIcon />, id: 'summary', label: 'Summary' },
  { icon: <TerminalIcon />, id: 'output', label: 'Output' },
  { icon: <CodeIcon />, id: 'details', label: 'Test Details' },
  { icon: <BugReportIcon />, id: 'mcp', label: 'MCP Debug' },
];

export default function ResultsTabs({ activeTab, mcpCount, onChange, sdkAuditCount }: ResultsTabsProps) {
  const tabs = [...BASE_TABS];
  if (sdkAuditCount !== undefined && sdkAuditCount > 0) {
    tabs.push({ icon: <SecurityIcon />, id: 'sdk-audit', label: 'SDK Audit' });
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        onChange={(_, value) => onChange(value as TabType)}
        scrollButtons="auto"
        value={activeTab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            icon={
              tab.id === 'mcp' && mcpCount > 0 ? (
                <Badge badgeContent={mcpCount} color="error">
                  {tab.icon}
                </Badge>
              ) : tab.id === 'sdk-audit' && sdkAuditCount ? (
                <Badge badgeContent={sdkAuditCount} color="warning">
                  {tab.icon}
                </Badge>
              ) : (
                tab.icon
              )
            }
            iconPosition="start"
            key={tab.id}
            label={tab.label}
            value={tab.id}
          />
        ))}
      </Tabs>
    </Box>
  );
}
