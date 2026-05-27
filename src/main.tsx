import React from 'react';
import ReactDOM from 'react-dom/client';
import '@sap-ui/fx-components/styles.css';
import '@sap-ui/fx-components/tokens.css';
import { ThemeProvider } from '@sap-ui/fx-components';
import App from './App';

const THEMES = [
  { id: 'light', name: 'Sapphire Light' },
  { id: 'dark', name: 'Sapphire Dark' },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider themes={THEMES} defaultTheme="light">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
