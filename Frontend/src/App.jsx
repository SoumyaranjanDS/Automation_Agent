import React from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Sigup from './pages/Sigup'
import Home from './pages/Home'
import Login from './pages/Login'
import CampaignWizard from './pages/CampaignWizard/index'
import LeadTable from './pages/LeadTable'

const router = createBrowserRouter([
  {path:"/", element: <Home />},
  {path:"/signup", element: <Sigup />},
  {path:"/login", element: <Login />},
  {path:"/create-campaign", element: <CampaignWizard />},
  {path:"/campaign/:id/leads", element: <LeadTable />},
])

const App = () => {
  return (
    <div className='min-h-screen'>
      <RouterProvider router={router} />
    </div>

  )
}

export default App