import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Toaster } from "react-hot-toast"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position='top-right' reverseOrder={false} />
    <App />
  </StrictMode>,
)
