import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CarDetail from './component/CarDetails.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
  <Route path="/" element={<App />} />
  <Route path="/cars/:id" element={<CarDetail />} />
</Routes>
    </BrowserRouter>
  </StrictMode>,
)
