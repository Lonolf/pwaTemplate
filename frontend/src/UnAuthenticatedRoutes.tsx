import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from 'pages/Auth/Login/Login'
import VerifyEmail from 'pages/Auth/VerifyEmail/VerifyEmail'
import ResetPassword from 'pages/Auth/ResetPassword/ResetPassword'

const UnAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/verify-email" element={<VerifyEmail /> } />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default UnAuthenticatedRoutes
