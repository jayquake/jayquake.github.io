import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ModalProvider } from "./components/util/ModalContext";
import { LoadingProvider } from "./components/util/LoadingContext";
import GlobalLoading from "./components/util/GlobalLoading";
import { SearchProvider } from "./components/util/SearchContext";
import { ToastProvider } from "./components/standalone/ToastContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LoadingProvider>
        <ToastProvider>
          <ModalProvider>
            <SearchProvider>
              <GlobalLoading />
              <App />
            </SearchProvider>
          </ModalProvider>
        </ToastProvider>
      </LoadingProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();