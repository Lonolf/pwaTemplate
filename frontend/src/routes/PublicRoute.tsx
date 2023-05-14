import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'store'
import AuthLayout from 'layouts/AuthLayout'
import { Outlet } from '@mui/icons-material'
import { routes } from './routes'

const PublicRoute: React.FC<any> = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  return !isAuthenticated ? (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ) : (
    <Navigate to={routes.home} />
  )
}

export default PublicRoute
