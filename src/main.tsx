import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 1. ADD THIS IMPORT RIGHT HERE:
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. WRAP YOUR APP IN THE BROWSER ROUTER: */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)