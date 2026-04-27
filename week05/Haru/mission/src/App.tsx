import { BrowserRouter, createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import NotFoundPage from './pages/NotFoundPage'
import Loginpage from './pages/Loginpage'
import SignUpPage from './pages/SignUpPage'
import MyPage from './pages/MyPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  

 return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 누구나 접근 가능한 Public Route */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          
         
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
