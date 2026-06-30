import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./components/util/ModalContext";
import { LoadingProvider } from "./components/util/LoadingContext";
import GlobalLoading from "./components/util/GlobalLoading";
import { SearchProvider } from "./components/util/SearchContext";
import { ToastProvider } from "./components/standalone/ToastContainer";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
