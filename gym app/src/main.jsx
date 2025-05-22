import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  Navbar from './components/navbar.jsx'
import App from './app.jsx' 
import CalorieInput from './components/Calorieinput.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <App />
    <CalorieInput />
  </StrictMode>,
)
