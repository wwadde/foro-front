import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import "./styles.css";
import App from './App'
import AxiosInterceptor from './services/AxiosInterceptor';
import { StrictMode } from 'react';

AxiosInterceptor();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)