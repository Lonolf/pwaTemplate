import React from 'react'

import { Button, FormControlLabel, Switch, TextField, Typography } from '@material-ui/core'

import translator from 'utility/translator'
import { useRecoverPassword } from 'hooks/userHooks'
import useCall from 'hooks/callHook'
import { login } from 'sagas/userSagas'

const EmailLogin = () => {
  const [values, setValues] = React.useState({ type: 'email', email: '', password: '', name: '' })
  const call = useCall()
  const { passwordRequested, recoverPassword } = useRecoverPassword()
  const onConfirm = () => call(login, (values))

  const disabledLogin = values.email === '' || values.password === '' ||
    (values.type === 'emailRegister' && values.name === '')

  return (
    <>
      <FormControlLabel
        control={(
          <Switch
            checked={values.type === 'emailRegister'}
            onChange={() => setValues({ ...values, type: values.type === 'email' ? 'emailRegister' : 'email' })}
            name='emailRegister'
            color='primary'
          />
        )}
        label={translator.fromLabel('login_register_switch')}
      />
      <div style={{ height: 25 }} />
      <TextField
        data-cy='email'
        value={values.email}
        onChange={(event) => setValues({ ...values, email: event.target.value })}
        variant='outlined'
        label={translator.fromLabel('generic_email')}
        required
      />
      <div style={{ height: 25 }} />
      <TextField
        data-cy='password'
        value={values.password}
        onChange={(event) => setValues({ ...values, password: event.target.value })}
        type='password'
        variant='outlined'
        label={translator.fromLabel('generic_password')}
        required
      />
      <div style={{ height: 25 }} />
      {values.type === 'email'
        ? !passwordRequested
            ? (
              <Button
                data-cy='confirm'
                onClick={() => recoverPassword(values)}
                variant='outlined'
                disabled={values.email === ''}
              >
                {translator.fromLabel('login_recoverPassword_button')}
              </Button>
              ) : (
                <Typography>{translator.fromLabel('login_passwordRecovery_alert')}</Typography>
              )
        : (
          <TextField
            data-cy='name'
            value={values.name}
            onChange={(event) => setValues({ ...values, name: event.target.value })}
            variant='outlined'
            label={translator.fromLabel('generic_name')}
            required
          />
          )}
      <div style={{ height: 25 }} />
      <Button
        data-cy='confirm'
        onClick={onConfirm}
        variant='contained'
        color='primary'
        disabled={disabledLogin}
      >
        {translator.fromLabel('generic_confirm')}
      </Button>
    </>
  )
}

export default EmailLogin
