import { Box } from '@mui/material'
import React from 'react'

interface AuthLayoutProps {
  children: any
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          padding: '20px 32px',
          minWidth: '500px',
          maxWidth: '500px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AuthLayout
