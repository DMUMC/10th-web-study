import './App.css'
import { Routes, Route } from 'react-router-dom'
import About from './component/About'
import Home from './component/Hom'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className='text-center font-bold p-4'>This is Basic Routing learning</h1>
      
      <button className='bg-blue-400 text-white p-2 rounded m-5' onClick={() => {navigate("/")}}>Home으로 이동</button>
      <button className='bg-green-400 text-white p-2 rounded m-5' onClick={() => {navigate("/about")}}>About으로 이동</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
