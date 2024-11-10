import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { ModalProvider } from './components/util/ModalContext';
import { LoadingProvider } from './components/util/LoadingContext';  // Import LoadingProvider
import GlobalLoading from './components/util/GlobalLoading';  // Import GlobalLoading

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename="/audit-rules">  {/* Set the base path here */}
    <LoadingProvider>  {/* Wrap with LoadingProvider */}
        <ModalProvider>
          <GlobalLoading />  {/* Display loading bar at the top when loading */}
          <App />
        </ModalProvider>
      </LoadingProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
