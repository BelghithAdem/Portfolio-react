import React from 'react';
import ReactDOM from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import App from './App';

gsap.registerPlugin(ScrollTrigger);

// Suppress extension-related errors in console
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes?.('originalPrompt') || args[0]?.includes?.('prompt.js')) {
      return; // Suppress extension errors
    }
    originalError.apply(console, args);
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 