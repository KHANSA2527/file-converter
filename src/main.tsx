import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
    <>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>

    {/* 🔥 GLOBAL TOASTER */}
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 6000,
      }}
    />
  </>
    
)
