import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

// Say something
console.log('[ERWT] : Renderer execution started');

const container = document.getElementById( "root" );
const root = createRoot( container! );

// Application to Render
const app = <App />;

// Render application in DOM
root.render(app);

reportWebVitals(sendToVercelAnalytics);
