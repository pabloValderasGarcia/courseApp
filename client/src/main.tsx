// main.tsx
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './config/store.ts';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
  </Provider>
);