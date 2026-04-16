import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh w-full flex-col bg-black font-sans font-normal antialiased">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
