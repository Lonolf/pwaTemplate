import React from 'react'
import Header from 'components/Header'
import MenuDrawer, { DrawerHeader } from 'components/MenuDrawer'
import NotificationsDrawer from 'components/Notifications'
import { Box } from '@mui/material'

interface MainLayoutProps {
  children: any
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [notificationsOpen, setNotificationsOpen] = React.useState(false)

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MenuDrawer {...{ menuOpen, setMenuOpen }} />
      <NotificationsDrawer {...{ notificationsOpen, setNotificationsOpen }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            flex: 1,
          }}
        >
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  )
}

export default MainLayout
