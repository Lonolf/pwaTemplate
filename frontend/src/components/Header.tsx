import React from 'react'
import { Toolbar, Button, Typography, IconButton, Box, Menu, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import { LogoutOutlined } from '@mui/icons-material'
import { setAppLanguage, getLanguage } from '@empty/lib.constants'
import { AUTH_ACTION } from 'store/actions'
import { useDispatch } from 'react-redux'
import { useLogout } from 'hooks/authHooks'
import logo from 'assets/img/logo.png'

interface HeaderProps {
  menuOpen?: boolean
  setMenuOpen: (value: boolean) => void
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

const Header = ({ menuOpen, setMenuOpen }: HeaderProps) => {
  const dispatch = useDispatch()
  const logout = useLogout()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='fixed' open={menuOpen} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ gap: 1, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gep: 1, alignItems: 'center' }}>
          <IconButton
            aria-label='open drawer'
            onClick={() => setMenuOpen(!menuOpen)}
            edge='start'
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} style={{ width: 64 }} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button onClick={handleClick} sx={{ marginRight: '5%' }} variant='text'>
            <Typography sx={{ marginRight: '15%' }}>{getLanguage()}</Typography>
          </Button>
          <Menu id='basic-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                dispatch({ type: AUTH_ACTION.SET_LANG })
                setAppLanguage('en')
                handleClose()
              }}
            >
              EN
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch({ type: AUTH_ACTION.SET_LANG })
                setAppLanguage('de')
                handleClose()
              }}
            >
              DE
            </MenuItem>
          </Menu>
          <IconButton aria-label='open drawer' onClick={logout as any} edge='start'>
            <LogoutOutlined />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
