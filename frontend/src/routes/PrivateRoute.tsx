import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'store'
import { Outlet } from '@mui/icons-material'
import Menubar from 'components/Header'
import MenuDrawer, { DrawerHeader } from 'components/MenuDrawer'
import NotificationsDrawer from 'components/Notifications'
import { Box } from '@mui/material'

const PrivateRoute: React.FC<any> = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [notificationsOpen, setNotificationsOpen] = React.useState(false)

  return isAuthenticated ? (
    <>
      <Menubar
        {...{ menuOpen, setMenuOpen, notificationsOpen, setNotificationsOpen }}
      />
      <MenuDrawer {...{ menuOpen, setMenuOpen }} />
      <NotificationsDrawer {...{ notificationsOpen, setNotificationsOpen }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </>
  ) : (
    <Navigate to="/auth/login" />
  )
}

export default PrivateRoute
