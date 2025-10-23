import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CV from './components/CV.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CV />
  </StrictMode>,
)
