import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { LanguageProvider } from './LanguageProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
        <LanguageProvider>
          <App />
        </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);

