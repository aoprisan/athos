import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { I18nProvider } from './i18n';
import { reportDataIssues } from './lib/assertData';
import { registerServiceWorker } from './lib/pwa';
import './styles/tokens.css';
import './styles/base.css';
import './styles/app.css';

reportDataIssues(import.meta.env.DEV);
registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>,
);
