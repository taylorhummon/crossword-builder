import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'src/components/app/App';

import 'src/css/spectre.min.css';
import 'src/css/spectre-icons.min.css';
import 'src/css/main.css';


const rootDomElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootDomElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
