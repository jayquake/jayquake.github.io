import { Navigate, useLocation } from "react-router-dom";
import redirects from "../../data/legacy-redirects.json";

/**
 * Client-side replace redirects for legacy criteria/route moves.
 * Relies on SPA 404.html fallback so GitHub Pages deep links still boot the app.
 */
export default function LegacyRedirect({ children }) {
  const { pathname, search, hash } = useLocation();
  const dest = redirects[pathname];
  if (dest) {
    return <Navigate to={`${dest}${search}${hash}`} replace />;
  }
  return children;
}
