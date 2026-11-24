import type { MouseEvent } from 'react';

/**
 * onClick for a real link whose plain left click should run an in-app handler
 * (keeping the link's href for new-tab / modifier / middle clicks).
 */
export function routeClick<E extends HTMLElement = HTMLAnchorElement>(handler: () => void) {
  return (e: MouseEvent<E>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    handler();
  };
}
