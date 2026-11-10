import { Navigate, useLocation } from "react-router-dom";
import redirects from "../../data/engine-id-redirects.json";

/**
 * Client-side replace redirects for engine id → kebabId slug moves.
 * Works with the GitHub Pages SPA 404.html fallback for deep links.
 */
export default function EngineIdRedirect({ children }) {
  const { pathname, search, hash } = useLocation();
  const dest = redirects[pathname];
  if (dest) {
    return <Navigate to={`${dest}${search}${hash}`} replace />;
  }
  return children;
}
