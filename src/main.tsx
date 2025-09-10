import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mock Service Worker 초기화 (개발 환경에서만)
async function enableMocking() {
  if (import.meta.env.VITE_MOCK === '1' && import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
