import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ConversationProvider } from './context/ConversationContext.jsx'
import { SocketContextProvider } from './context/SocketConnection.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Toaster />
      <AuthContextProvider>
        <ConversationProvider>
        <SocketContextProvider>

          <App />
        </SocketContextProvider>
        </ConversationProvider>
      </AuthContextProvider>
    </StrictMode>
  </BrowserRouter>

)
