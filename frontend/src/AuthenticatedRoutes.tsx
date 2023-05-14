import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from 'layouts/MainLayout'
import { routes } from 'routes/routes'
import Home from 'pages/Home'

const AuthenticatedRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={routes.home} element={<Home />} />
      </Routes>
    </MainLayout>
  )
}

export default AuthenticatedRoutes
