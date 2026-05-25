import React from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Sigup from './pages/Sigup'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CampaignWizard from './pages/CampaignWizard/index'
import LeadTable from './pages/LeadTable'
import Layout from './components/Layout'

import Product from './pages/Product'
import UseCases from './pages/UseCases'
import About from './pages/About'
import Contact from './pages/Contact'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/use-cases", element: <UseCases /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
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