import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import { DrawerHeader } from './MenuDrawer'

const notificationsExample = [
  {
    id: 1,
    title: 'New bill generated',
    text: 'Bill number 34 has been generated! Click here to view it',
    timestamp: new Date(),
    read: true,
  },
  {
    id: 2,
    title: 'Your contract has changed',
    text: 'Click here to review the changes to your contract',
    timestamp: new Date(),
    read: false,
  },
]

const NotificationsDrawer = ({
  notificationsOpen,
  setNotificationsOpen,
}: {
  notificationsOpen: boolean
  setNotificationsOpen: (value: boolean) => void
}) => {
  return (
    <Drawer
      anchor="right"
      open={notificationsOpen}
      onClose={() => setNotificationsOpen(false)}
    >
      <DrawerHeader />
      <List sx={{ maxWidth: 250 }}>
        {notificationsExample.map((notification, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              key={notification.id}
              sx={{
                backgroundColor: theme =>
                  notification.read ? theme.palette.panel.main : 'inherit',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <ListItemText
                primary={notification.title}
                secondary={notification.text}
              />
              <Typography variant="caption" color="textSecondary">
                {format(notification.timestamp, 'HH:mm')}
              </Typography>
              <NotificationDot />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  )
}

const NotificationDot = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        height: 12,
        width: 12,
        position: 'absolute',
        top: 16,
        right: 16,
        borderRadius: 12,
      }}
    />
  )
}

export default NotificationsDrawer
