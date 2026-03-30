import type { ProgressUpdate } from '../../shared/types';

import { useEffect, useRef, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || '';

function resolveWsBaseUrl(): string {
  if (API_URL) {
    return API_URL.replace(/^http/, 'ws');
  }
  const { hostname, port, protocol } = window.location;
  // In dev, the CRA dev server (any port) shares /ws with HMR — connect to the
  // API server on 3001 instead. Skip when the app is already served from the API port.
  if (hostname === 'localhost' && !API_URL && port !== '3001') {
    return 'ws://localhost:3001';
  }
  return `${protocol === 'https:' ? 'wss' : 'ws'}://${hostname}${port ? `:${port}` : ''}`;
}

const WS_URL = resolveWsBaseUrl();

export function useWebSocket(runId: null | string) {
  const [updates, setUpdates] = useState<ProgressUpdate[]>([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<null | WebSocket>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 10; // Increased from 5
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Always maintain a persistent connection, even without runId
    // This prevents disconnection issues

    const connect = () => {
      // Clean up any existing connection
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }

      try {
        const wsUrl = `${WS_URL}/ws`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          setConnected(true);
          reconnectAttemptsRef.current = 0;
          console.log('[WebSocket] Connected');

          // Send ping every 30 seconds to keep connection alive
          if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
          }
          pingIntervalRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              try {
                ws.send(JSON.stringify({ timestamp: Date.now(), type: 'ping' }));
              } catch (error) {
                console.error('[WebSocket] Error sending ping:', error);
              }
            }
          }, 30000); // 30 seconds
        };

        ws.onmessage = event => {
          try {
            const data = JSON.parse(event.data);

            // Handle connection confirmation
            if (data.type === 'connected' || data.type === 'pong') {
              // Connection is alive, update connected state
              setConnected(true);
              return;
            }

            // Accept updates for this runId or completion/error messages
            // If no runId, still accept messages to maintain connection awareness
            if (
              !runId || // Accept all when no runId to maintain connection
              data.runId === runId ||
              data.type === 'run-complete' ||
              data.type === 'run-error' ||
              data.type === 'results-ready' ||
              data.type === 'flow-complete' ||
              data.type === 'flow-error'
            ) {
              setUpdates(prev => [...prev, data]);
            }
          } catch (error) {
            console.error('[WebSocket] Error parsing message:', error);
          }
        };

        ws.onerror = error => {
          console.error('[WebSocket] Connection error:', error);
          setConnected(false);
        };

        ws.onclose = event => {
          setConnected(false);
          console.log('[WebSocket] Disconnected', event.code, event.reason);

          // Clear ping interval
          if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
            pingIntervalRef.current = null;
          }

          // Always attempt to reconnect (maintains persistent connection)
          if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current += 1;
            const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 10000);
            console.log(
              `[WebSocket] Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts})`
            );

            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, delay);
          } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
            console.error('[WebSocket] Max reconnection attempts reached, will retry in 30s');
            // Reset attempts after a longer delay
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptsRef.current = 0;
              connect();
            }, 30000);
          }
        };
      } catch (error) {
        console.error('[WebSocket] Failed to create WebSocket:', error);
        setConnected(false);
        // Retry connection after delay
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 5000);
      }
    };

    // Always connect, regardless of runId
    connect();

    return () => {
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      // Don't close connection on cleanup - let it persist
      // Only clear updates if runId changes
      if (runId) {
        setUpdates([]);
      }
    };
  }, [runId]); // Reconnect if runId changes, but maintain connection

  return { connected, updates };
}
