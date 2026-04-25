import React from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Sigup from './pages/Sigup'
import Home from './pages/Home'
import Login from './pages/Login'

const router = createBrowserRouter([
  {path:"/", element: <Home />},
  {path:"/signup", element: <Sigup />},
  {path:"/login", element: <Login />},
  
])

const App = () => {
  return (
    <div className='min-h-screen bg-[#0f172a] bg-[radial-gradient(circle_at_top_left,#1e293b_0%,#0f172a_100%)] text-white flex items-center justify-center p-4'>
      <RouterProvider router={router} />
    </div>

  )
}

export default App