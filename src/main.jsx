import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cinnamoroll from './Cinnamoroll'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cinnamoroll />
  </StrictMode>,
)

