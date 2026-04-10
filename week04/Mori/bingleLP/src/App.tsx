import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { AuthProvider } from './context/AuthProvider'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'

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
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
