import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { Route } from "react-router-dom";

const CRITERIA_PREFIXES = [
  "/graphics",
  "/forms",
  "/keyboard",
  "/navigation",
  "/headings",
  "/errors",
  "/carousels",
  "/clickables",
  "/context",
  "/document",
  "/readability",
  "/tables",
];

const loadingElement = (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "40vh",
    }}
  >
    <CircularProgress size={32} />
  </Box>
);

/**
 * Dynamically imports a route module and returns its <Route> elements as a
 * fragment child of <Routes>. React Router only accepts <Route> or <Fragment>
 * as direct children — not wrapper components.
 */
export function useDeferredRouteElements(importModule, match) {
  const { pathname } = useLocation();
  const shouldLoad =
    typeof match === "function" ? match(pathname) : pathname.startsWith(match);
  const [RoutesFn, setRoutesFn] = useState(null);

  useEffect(() => {
    if (!shouldLoad) {
      setRoutesFn(null);
      return undefined;
    }

    let cancelled = false;
    importModule().then((module) => {
      if (!cancelled) {
        setRoutesFn(() => module.default);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad, importModule]);

  if (!shouldLoad) {
    return null;
  }

  if (!RoutesFn) {
    if (typeof match === "function") {
      return (
        <>
          {CRITERIA_PREFIXES.map((prefix) => (
            <Route
              key={prefix}
              path={`${prefix.slice(1)}/*`}
              element={loadingElement}
            />
          ))}
        </>
      );
    }

    return <Route path="/engine/*" element={loadingElement} />;
  }

  return RoutesFn();
}
