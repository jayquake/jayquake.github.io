import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DEFAULT_FILTERS,
  applyChange,
  exampleHref,
  homeHref,
  parseQuery,
  parseRoute,
  ruleHref,
  ruleLabHref,
  serializeQuery,
} from "../lib/libraryLocation";

/**
 * React binding for the library location module (src/lib/libraryLocation.js).
 *
 * Returns the current route + query state, setters that rewrite the query in place
 * (history replace), and href builders that carry search + filters.
 */
export function useLibraryLocation() {
  const location = useLocation();
  const navigate = useNavigate();

  const route = useMemo(() => parseRoute(location.pathname), [location.pathname]);
  const query = useMemo(() => parseQuery(location.search), [location.search]);

  // Read the latest URL inside setters so rapid successive changes don't clobber each other.
  const latest = useRef(location);
  latest.current = location;

  const update = useCallback(
    (change) => {
      const { pathname, search, hash } = latest.current;
      const next = applyChange(parseQuery(search), change);
      const nextSearch = serializeQuery(next, search);
      if (nextSearch === (search || "")) return;
      // Record what we wrote so a second call before re-render composes with this one.
      latest.current = { ...latest.current, search: nextSearch };
      navigate({ pathname, search: nextSearch, hash }, { replace: true });
    },
    [navigate]
  );

  const setFilter = useCallback((key, value) => update({ filters: { [key]: value } }), [update]);
  const clearFilters = useCallback(() => update({ filters: DEFAULT_FILTERS }), [update]);
  const setSearch = useCallback((q) => update({ q }), [update]);
  const setDetailOpen = useCallback((detailOpen) => update({ detailOpen }), [update]);

  const hrefs = useMemo(
    () => ({
      home: () => homeHref(query),
      rule: (rule) => ruleHref(rule, query),
      example: (rule, variant) => exampleHref(rule, variant, query),
      ruleLab: (rule) => ruleLabHref(rule),
    }),
    [query]
  );

  return { route, query, setFilter, clearFilters, setSearch, setDetailOpen, hrefs };
}

export const SEARCH_DEBOUNCE_MS = 250;

/**
 * Search input bound to `?q=`: keeps the raw text locally (so spaces survive typing)
 * and writes the trimmed value to the URL after a debounce. External URL changes
 * (another search box, back/forward) flow back into the input.
 *
 * @returns {[string, (value: string) => void]}
 */
export function useLibrarySearchInput() {
  const { query, setSearch } = useLibraryLocation();
  const [value, setValue] = useState(query.q);
  const timer = useRef(null);

  useEffect(() => {
    setValue((current) => (current.trim() === query.q ? current : query.q));
  }, [query.q]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onChange = useCallback(
    (next) => {
      setValue(next);
      clearTimeout(timer.current);
      if (!next.trim()) {
        setSearch("");
        return;
      }
      timer.current = setTimeout(() => setSearch(next), SEARCH_DEBOUNCE_MS);
    },
    [setSearch]
  );

  return [value, onChange];
}
