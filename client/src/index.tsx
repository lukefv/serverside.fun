import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/global.css';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Toaster position="top-center" />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
