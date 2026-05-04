import React from 'react'
import { Outlet } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="h-screen flex flex-col">
        <nav>내비게이션</nav>
       
        <main className="flex-1">
           <p>여기는 홈페이지입니다</p>
            <Outlet/>
        </main>
        <footer>푸터</footer>
    </div>
  )
}

export default Homepage