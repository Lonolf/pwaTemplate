import React from 'react'

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

import translator from 'utility/translator'
import { useNavigate } from 'hooks/routerHooks'
import useCall from 'hooks/callHook'
import { logout } from 'sagas/userSagas'
import { useSelector } from 'react-redux'

const MenuBar = () => {
  const navigate = useNavigate()
  const call = useCall()
  const userId = useSelector(state => state.user?.userId)

  const onLogout = () => call(logout)

  return (
    <>
      <AppBar>
        <Toolbar style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6'>{translator.fromLabel('menu_title')}</Typography>
          <Button color='secondary' variant='contained' onClick={() => navigate('/')}>{translator.fromLabel('menu_home')}</Button>
          {userId != null
            ? <Button color='secondary' variant='outlined' onClick={onLogout}>{translator.fromLabel('menu_logout')}</Button>
            : null}
        </Toolbar>
      </AppBar>
      <div style={{ height: 70 }} />
    </>
  )
}

export default MenuBar
