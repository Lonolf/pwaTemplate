import React from 'react'
import AuthenticatedRoutes from 'AuthenticatedRoutes'
import UnAuthenticatedRoutes from 'UnAuthenticatedRoutes'
import { useAppSelector } from 'store'

const AppRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  console.log('isAuthenticated', isAuthenticated)
  return (
    <>
      {isAuthenticated ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
    </>
  )
}

export default AppRoutes
