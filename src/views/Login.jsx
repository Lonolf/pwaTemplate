import React from 'react'

import { Button, Dialog, useTheme } from '@material-ui/core'

import EmailLogin from 'components/EmailLogin'

import { useSelector } from 'react-redux'

import translator from 'utility/translator'
import useCall from 'hooks/callHook'
import { login } from 'sagas/userSagas'

const Login = () => {
  const isLoading = (useSelector(state => state.loading)).length > 0
  const theme = useTheme()

  if (isLoading)
    return null

  return (
    <Dialog open PaperProps={{ style: { padding: theme.spacing(2) } }}>
      <GoogleLogin />
      <div style={{ height: 25 }} />
      <EmailLogin />
    </Dialog>
  )
}

const GoogleLogin = () => {
  const call = useCall()
  const signIn = () => call(login, { type: 'google' })

  return (
    <Button
      data-cy='confirm'
      onClick={signIn}
      variant='contained'
      color='secondary'
    >
      {translator.fromLabel('login_google_button')}
    </Button>
  )
}

export default Login
