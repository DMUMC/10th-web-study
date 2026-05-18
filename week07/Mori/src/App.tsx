import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthProvider'
import { AppChrome } from './components/AppChrome'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { MyPage } from './pages/MyPage'
import { LpDetailPage } from './pages/LpDetailPage'
import { SignupPage } from './pages/SignupPage'
import { GoogleCallbackPage } from './pages/GoogleCallbackPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppChrome>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/lp/:lpid" element={<LpDetailPage />} />
            </Route>
          </Routes>
        </AppChrome>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
