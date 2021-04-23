import React, { lazy, Suspense } from 'react'

import { Container } from '@material-ui/core'

import MenuBar from 'views/MenuBar'
import Helmet from 'components/Helmet'

import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Login = lazy(() => import('views/Login'))

const ContentManager = () => {
  return (
    <Container style={{ backgroundColor: '#e0f7fa' }} maxWidth='sm'>
      <Route path='/:view?'><MenuBar /></Route>
      <Route path='/:view?'><Helmet /></Route>
      <Switch>
        <LoggedRoutes />
      </Switch>
    </Container>
  )
}

const LoggedRoutes = () => {
  const user = useSelector(state => state.user)

  if (user?.userId == null)
    return (
      <Suspense fallback={<div />}>
        <Login />
      </Suspense>
    )
  else
    return (
      <Switch />
    )
}

export default ContentManager
