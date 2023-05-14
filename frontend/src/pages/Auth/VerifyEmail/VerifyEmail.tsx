import React from 'react'
import AuthLayout from 'layouts/AuthLayout'
import { Button, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { trlb } from '@empty/lib.constants'
import logo from 'assets/img/logo.png'
import { routes } from 'routes/routes'
import { useVerifyEmail } from 'hooks/authHooks'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const { isVerified } = useVerifyEmail()

  return (
    <AuthLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <img src={logo} width={160} />
      </Box>
      {isVerified === null ? (
        <Typography align='center' variant='h4'>
          {trlb('login_verifyingEmail')}
        </Typography>
      ) : null}
      {isVerified === true ? (
        <Typography align='center' variant='h4'>
          {trlb('login_emailVerified_success')}
        </Typography>
      ) : null}
      {isVerified === false ? (
        <Typography align='center' variant='h4'>
          {trlb('login_emailVerificationProblem')}
        </Typography>
      ) : null}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isVerified !== null ? (
          <Button color='primary' variant='contained' sx={{ marginTop: '5%' }} onClick={() => navigate(routes.login)}>
            {trlb('login_goToLogin')}
          </Button>
        ) : null}
      </Box>
    </AuthLayout>
  )
}

export default VerifyEmail
