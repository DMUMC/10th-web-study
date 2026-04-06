import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import NotFoundPage from './pages/NotFoundPage'
import Loginpage from './pages/Loginpage'
import SignUpPage from './pages/SignUpPage'
import MyPage from './pages/MyPage'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Homepage />,
    errorElement:<NotFoundPage />,
    children:[
      {path:"login", element:<Loginpage />},
      {path:"signup", element:<SignUpPage />},
      {path:"my", element:<MyPage />},
    ]
  }
])

function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App
