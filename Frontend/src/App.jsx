import React from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Sigup from './pages/Sigup'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CampaignWizard from './pages/CampaignWizard/index'
import LeadTable from './pages/LeadTable'
import Layout from './components/Layout'

// import Pricing from './pages/Pricing'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/create-campaign", element: <CampaignWizard /> },
      { path: "/campaign/:id/leads", element: <LeadTable /> },
    ]
  },
  { path: "/signup", element: <Sigup /> },
  { path: "/login", element: <Login /> },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App