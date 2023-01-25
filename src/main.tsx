import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
const el = document.getElementById('root') as Element;
const root = createRoot(el); // createRoot(container!) if you use TypeScript


root.render(<App/>)