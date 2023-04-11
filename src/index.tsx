import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { StableNavigateContextProvider } from './contexts/StableNavigateContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <StableNavigateContextProvider>
        <App />
      </StableNavigateContextProvider>
    </BrowserRouter>
  </HelmetProvider>
);
