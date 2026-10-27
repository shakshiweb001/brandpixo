import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { LazyMotion, domAnimation } from 'framer-motion'
import './styles/fonts.css'
import './styles/global.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <App />
      </LazyMotion>
    </HelmetProvider>
  </StrictMode>,
)
