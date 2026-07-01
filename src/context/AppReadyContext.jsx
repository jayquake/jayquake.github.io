import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { waitForAppReady } from "../utils/waitForAppReady";

const AppReadyContext = createContext(false);

export function useAppReady() {
  return useContext(AppReadyContext);
}

export function AppReadyProvider({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    waitForAppReady().then(() => {
      if (!cancelled) {
        document.body.classList.add("app-ready");
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <AppReadyContext.Provider value={ready}>{children}</AppReadyContext.Provider>;
}

AppReadyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
