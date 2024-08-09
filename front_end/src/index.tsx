import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'components/app/App';

import 'css/spectre.min.css';
import 'css/spectre-icons.min.css';
import 'css/index.css';


const rootDomElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootDomElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
