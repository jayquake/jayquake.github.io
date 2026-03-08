/**
 * PlaywrightMCPClient - Official MCP SDK client for Microsoft Playwright MCP
 * Uses @modelcontextprotocol/sdk to communicate with @playwright/mcp server
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

export type MCPResponse = {
  content?: { [key: string]: any; text?: string; type: string; }[];
  isError?: boolean;
  result?: any;
}

export type MCPToolCall = {
  arguments: Record<string, any>;
  name: string;
}

export class PlaywrightMCPClient {
  private client: Client | null = null;
  private connecting: null | Promise<void> = null;
  private mcpServerUrl: string;
  private transport: null | SSEClientTransport = null;

  constructor(mcpServerUrl = 'http://localhost:3002') {
    // Handle IPv6 addresses - convert [::1] to localhost
    let url = mcpServerUrl.replace('[::1]', 'localhost').replace('[::]', 'localhost');

    // Remove trailing slashes
    url = url.replace(/\/+$/, '');

    this.mcpServerUrl = url;
  }

  /**
   * Call an MCP tool
   */
  async callTool(toolName: string, args: Record<string, any>): Promise<MCPResponse> {
    try {
      await this.ensureConnected();

      if (!this.client) {
        return {
          content: [{ text: 'MCP client not connected', type: 'text' }],
          isError: true,
        };
      }

      const response = await this.client.callTool({
        arguments: args,
        name: toolName,
      });

      // Handle MCP response format
      if (response.isError) {
        return {
          content: response.content || [{ text: 'Tool execution failed', type: 'text' }],
          isError: true,
        };
      }

      return {
        content: response.content || [],
        result: response,
      };
    } catch (error: any) {
      console.error(`[PlaywrightMCPClient] Error calling tool ${toolName}:`, error.message);
      // Reset connection so next call will reconnect
      this.client = null;
      this.transport = null;

      // Retry once after reconnecting
      try {
        console.log(`[PlaywrightMCPClient] Retrying ${toolName} after reconnect...`);
        await this._reconnect();
        if (this.client) {
          const retryResponse = await (this.client as Client).callTool({
            arguments: args,
            name: toolName,
          });
          if (retryResponse.isError) {
            return {
              content: retryResponse.content as MCPResponse['content'] || [{ text: 'Tool execution failed on retry', type: 'text' }],
              isError: true,
            };
          }
          return {
            content: retryResponse.content as MCPResponse['content'] || [],
            result: retryResponse,
          };
        }
      } catch (retryError: any) {
        console.error(`[PlaywrightMCPClient] Retry also failed for ${toolName}:`, retryError.message);
        // Reset again so future calls start fresh
        this.client = null;
        this.transport = null;
      }

      return {
        content: [{ text: `Failed to call MCP tool: ${error.message}`, type: 'text' }],
        isError: true,
      };
    }
  }

  /**
   * Check if MCP server is available
   */
  async checkMCPServer(): Promise<boolean> {
    try {
      await this.ensureConnected();

      // Try listing tools to verify connection
      const tools = await this.listTools();
      console.log(`[PlaywrightMCPClient] MCP server is running with ${tools.length} tools`);
      return true;
    } catch (error: any) {
      console.error('[PlaywrightMCPClient] MCP server not available:', error.message);
      // Reset client on error
      this.client = null;
      this.transport = null;
      return false;
    }
  }

  /**
   * Disconnect from MCP server
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      try {
        await this.client.close();
        console.log('[PlaywrightMCPClient] Disconnected from MCP server');
      } catch (error: any) {
        console.error('[PlaywrightMCPClient] Error disconnecting:', error);
      } finally {
        this.client = null;
        this.transport = null;
      }
    }
  }

  /**
   * List available tools from MCP server
   */
  async listTools(): Promise<string[]> {
    try {
      await this.ensureConnected();

      if (!this.client) {
        return [];
      }

      const response = await this.client.listTools();

      if (response && response.tools) {
        return response.tools.map((tool: any) => tool.name);
      }

      return [];
    } catch (error: any) {
      console.error('[PlaywrightMCPClient] Error listing tools:', error);
      return [];
    }
  }

  /**
   * Connect to MCP server using SSE transport
   */
  private async _connect(): Promise<void> {
    try {
      console.log(`[PlaywrightMCPClient] Connecting to MCP server at ${this.mcpServerUrl}/sse`);

      // Create SSE transport
      this.transport = new SSEClientTransport(new URL(`${this.mcpServerUrl}/sse`));

      // Create MCP client
      this.client = new Client(
        {
          name: 'playwright-test-runner',
          version: '1.0.0',
        },
        {
          capabilities: {
            roots: { listChanged: true },
            sampling: {},
          },
        },
      );

      // Connect client to transport
      await this.client.connect(this.transport);

      console.log('[PlaywrightMCPClient] Successfully connected to MCP server');
    } catch (error: any) {
      console.error('[PlaywrightMCPClient] Failed to connect:', error.message);
      this.client = null;
      this.transport = null;
      throw error;
    }
  }

  /**
   * Force a fresh reconnection (used after errors to recover stale SSE connections).
   */
  async _reconnect(): Promise<void> {
    this.client = null;
    this.transport = null;
    this.connecting = null;
    await this._connect();
  }

  /**
   * Ensure client is connected
   */
  private async ensureConnected(): Promise<void> {
    if (this.client && this.transport) {
      return;
    }

    // If already connecting, wait for it
    if (this.connecting) {
      return this.connecting;
    }

    this.connecting = this._connect();
    try {
      await this.connecting;
    } finally {
      this.connecting = null;
    }
  }
}
