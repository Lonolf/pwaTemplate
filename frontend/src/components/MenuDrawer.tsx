import React from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { routes } from 'routes/routes'
import { trlb } from '@empty/lib.constants'
import { useLocation, useNavigate } from 'react-router-dom'

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    overflowY: 'hidden',
  },
})

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

interface MenuDrawerProps {
  menuOpen: boolean
  setMenuOpen: (menuOpen: boolean) => void
}

interface MenuItem {
  route?: string
  name?: string
  Icon?: React.ElementType
  subMenuItems?: (MenuItem | null)[]
}

const MenuDrawer = ({ menuOpen, setMenuOpen }: MenuDrawerProps) => {
  const [subMenuOpen, setSubMenuOpen] = React.useState<string | null>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const menuItems: (MenuItem | null)[] = [
    {
          route: routes.home,
          Icon: DashboardOutlinedIcon,
        },
      ]

  const onClick = (menuItem: MenuItem | null) => {
    if (menuItem?.route) navigate(menuItem.route)
    if (menuItem?.name && subMenuOpen !== menuItem?.name) setSubMenuOpen(menuItem.name)
    else if (menuItem?.name && subMenuOpen === menuItem?.name) setSubMenuOpen(null)
  }

  return (
    <Drawer variant='permanent' open={menuOpen} sx={{ overflow: 'hidden' }}>
      <List
        sx={{
          bgcolor: 'primary.main',
          mt: 8,
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '100%',
        }}
      >
        {menuItems.filter(Boolean).map((menuItem: MenuItem | null) => (
          <React.Fragment key={menuItem?.name || menuItem?.route}>
            <MenuButton {...{ menuItem, onClick, pathname, menuOpen, subMenuOpen }} />
            {subMenuOpen === menuItem?.name && (
              <List sx={{ bgcolor: 'primary.main', pl: 1 }}>
                {menuItem?.subMenuItems?.map((subMenuItem: MenuItem | null) => (
                  <MenuButton
                    {...{ menuItem: subMenuItem, onClick, pathname, menuOpen, subMenuOpen }}
                    key={subMenuItem?.route}
                  />
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  )
}

const MenuButton = ({
  menuItem,
  onClick,
  menuOpen,
  pathname,
  subMenuOpen,
}: {
  menuItem: MenuItem | null
  onClick: (menuItem: MenuItem | null) => void
  menuOpen: boolean
  pathname: string
  subMenuOpen?: string | null
}) => {
  const selected =
    menuItem?.route === pathname || menuItem?.subMenuItems?.some(subMenuItem => subMenuItem?.route === pathname)

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={() => onClick(menuItem)}
        sx={{
          minHeight: 48,
          justifyContent: menuOpen ? 'initial' : 'center',
          backgroundColor: theme => (selected ? theme.palette.primary.contrastText : 'inherit'),
          '&:hover': {
            backgroundColor: theme => (selected ? theme.palette.primary.contrastText : undefined),
          },
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: menuOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {menuItem?.Icon ? (
            <menuItem.Icon
              sx={{
                fill: (theme: Theme) => (selected ? theme.palette.primary.main : theme.palette.primary.contrastText),
              }}
            />
          ) : null}
          {menuItem?.subMenuItems && subMenuOpen === menuItem.name ? (
            <ExpandMoreIcon
              sx={{
                fill: (theme: Theme) => (selected ? theme.palette.primary.main : theme.palette.primary.contrastText),
              }}
            />
          ) : null}
          {menuItem?.subMenuItems && subMenuOpen !== menuItem.name ? (
            <ExpandLessIcon
              sx={{
                fill: (theme: Theme) => (selected ? theme.palette.primary.main : theme.palette.primary.contrastText),
              }}
            />
          ) : null}
        </ListItemIcon>
        <ListItemText
          primary={menuItem?.name ? trlb(menuItem.name) : trlb('menuItem_' + menuItem?.route)}
          sx={{
            opacity: menuOpen ? 1 : 0,
            color: theme => (selected ? theme.palette.primary.main : theme.palette.primary.contrastText),
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default MenuDrawer
