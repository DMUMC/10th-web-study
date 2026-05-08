import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthProvider'
import { LandingPage } from './pages/LandingPage'
import { LpCreatePage } from './pages/LpCreatePage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { GoogleCallbackPage } from './pages/GoogleCallbackPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex min-h-svh w-full flex-col bg-black font-sans font-normal antialiased">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/lps/new" element={<LpCreatePage />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
