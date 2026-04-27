import { BrowserRouter, createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import NotFoundPage from './pages/NotFoundPage'
import Loginpage from './pages/Loginpage'

import MyPage from './pages/MyPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import GoogleCallback from './pages/GoogleCallback'


function App() {
  

 return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/v1/auth/google/callback" element={<GoogleCallback />} />
         
          <Route element={<ProtectedRoute />}>
            <Route path="/my" element={<MyPage />} />
           
          </Route>

         
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
