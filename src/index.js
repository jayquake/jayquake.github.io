import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { LoadingProvider } from "./components/util/LoadingContext";
import GlobalLoading from "./components/util/GlobalLoading";
import { ToastProvider } from "./components/standalone/ToastContainer";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppReadyProvider } from "./context/AppReadyContext";
import { MotionProvider } from "./components/motion/HudMotion";
import { TooltipProvider } from "./components/ui/tooltip";
import { prefetchEngineRulesCatalog } from "./utils/engineRulesDataService";

prefetchEngineRulesCatalog();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LoadingProvider>
        <ToastProvider>
          <AppReadyProvider>
            <MotionProvider>
              <TooltipProvider>
                <GlobalLoading />
                <App />
              </TooltipProvider>
            </MotionProvider>
          </AppReadyProvider>
        </ToastProvider>
      </LoadingProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
