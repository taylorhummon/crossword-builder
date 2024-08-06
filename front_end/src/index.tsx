import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import App from './components/app/App';

import './spectre/spectre.min.css';
import './spectre/spectre-icons.min.css';
import './index.css';


const rootDomElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootDomElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
