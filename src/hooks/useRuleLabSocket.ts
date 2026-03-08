import { useCallback, useEffect, useRef, useState } from 'react';

import type { RuleLabEvent } from '../../shared/types';

export type { RuleLabEvent };

const API_URL = process.env.REACT_APP_API_URL || '';
const WS_URL = API_URL.replace(/^http/, 'ws');

type AnalysisProgress = {
  active: boolean;
  phase: string;
  ruleId?: string;
};

type DiscoveryProgress = {
  active: boolean;
  siteUrl?: string;
  found: number;
  total: number;
  ruleId?: string;
};

type UseRuleLabSocketOptions = {
  ruleId?: string;
  onEvent?: (event: RuleLabEvent) => void;
};

export function useRuleLabSocket(options: UseRuleLabSocketOptions = {}) {
  const { ruleId, onEvent } = options;

  const [connected, setConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<RuleLabEvent | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress>({
    active: false,
    phase: '',
  });
  const [discoveryProgress, setDiscoveryProgress] = useState<DiscoveryProgress>({
    active: false,
    found: 0,
    total: 0,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const onEventRef = useRef(onEvent);
  const ruleIdRef = useRef(ruleId);

  onEventRef.current = onEvent;
  ruleIdRef.current = ruleId;

  const handleRuleLabEvent = useCallback((event: RuleLabEvent) => {
    if (ruleIdRef.current && event.ruleId !== ruleIdRef.current) return;

    setLastEvent(event);
    onEventRef.current?.(event);

    switch (event.type) {
      case 'analysis:start':
        setAnalysisProgress({ active: true, phase: 'navigating', ruleId: event.ruleId });
        break;
      case 'analysis:snapshot':
        setAnalysisProgress((prev) => ({ ...prev, phase: 'extracting' }));
        break;
      case 'analysis:complete':
        setAnalysisProgress((prev) => ({ ...prev, active: false, phase: 'complete' }));
        break;
      case 'analysis:error':
        setAnalysisProgress((prev) => ({ ...prev, active: false, phase: 'error' }));
        break;
      case 'discovery:start':
        setDiscoveryProgress({
          active: true,
          siteUrl: event.siteUrl,
          found: 0,
          total: 0,
          ruleId: event.ruleId,
        });
        break;
      case 'discovery:progress':
        setDiscoveryProgress((prev) => ({
          ...prev,
          siteUrl: event.siteUrl,
          found: event.found,
          total: event.total,
        }));
        break;
      case 'discovery:site-complete':
        setDiscoveryProgress((prev) => ({
          ...prev,
          siteUrl: event.siteUrl,
          found: prev.found + event.examples,
        }));
        break;
      case 'discovery:complete':
        setDiscoveryProgress((prev) => ({ ...prev, active: false }));
        break;
      case 'discovery:error':
        setDiscoveryProgress((prev) => ({ ...prev, active: false }));
        break;
    }
  }, []);

  useEffect(() => {
    const maxReconnectAttempts = 10;

    const connect = () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }

      try {
        const ws = new WebSocket(`${WS_URL}/ws`);
        wsRef.current = ws;

        ws.onopen = () => {
          setConnected(true);
          reconnectAttemptsRef.current = 0;

          if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
          pingIntervalRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              try {
                ws.send(JSON.stringify({ timestamp: Date.now(), type: 'ping' }));
              } catch {
                // ignore ping errors
              }
            }
          }, 30000);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'connected' || data.type === 'pong') {
              setConnected(true);
              return;
            }
            if (data.channel === 'rule-lab') {
              handleRuleLabEvent(data as RuleLabEvent);
            }
          } catch {
            // ignore parse errors
          }
        };

        ws.onerror = () => {
          setConnected(false);
        };

        ws.onclose = (event) => {
          setConnected(false);
          if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
            pingIntervalRef.current = null;
          }

          if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current += 1;
            const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 10000);
            reconnectTimeoutRef.current = setTimeout(connect, delay);
          } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptsRef.current = 0;
              connect();
            }, 30000);
          }
        };
      } catch {
        setConnected(false);
        reconnectTimeoutRef.current = setTimeout(connect, 5000);
      }
    };

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
      if (wsRef.current) {
        wsRef.current.close(1000);
        wsRef.current = null;
      }
    };
  }, [handleRuleLabEvent]);

  const resetProgress = useCallback(() => {
    setAnalysisProgress({ active: false, phase: '' });
    setDiscoveryProgress({ active: false, found: 0, total: 0 });
    setLastEvent(null);
  }, []);

  return {
    connected,
    lastEvent,
    analysisProgress,
    discoveryProgress,
    resetProgress,
  };
}
