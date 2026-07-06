import { Navigate, useLocation } from "react-router-dom";
import { isFakeLoginAuthenticated } from "../../utils/fakeLoginAuth";

export default function RequireFakeLogin({ children }) {
  const location = useLocation();

  if (!isFakeLoginAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
