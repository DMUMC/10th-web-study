import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import NotFoundPage from './pages/NotFoundPage'
import Loginpage from './pages/Loginpage'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Homepage />,
    errorElement:<NotFoundPage />,
    children:[
      {path:"login", element:<Loginpage />}
    ]
  }
])

function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App
