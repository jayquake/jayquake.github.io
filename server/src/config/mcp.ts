export interface McpConfig {
  url: string;
  port: number;
  autoSpawn: boolean;
}

export function getMcpConfig(): McpConfig {
  const port = parseInt(process.env.MCP_PORT || '3002', 10);
  const url = process.env.MCP_SERVER_URL || `http://localhost:${port}`;
  const autoSpawn =
    process.env.NODE_ENV !== 'production' && process.env.MCP_AUTO_SPAWN !== 'false';
  return { url, port, autoSpawn };
}
