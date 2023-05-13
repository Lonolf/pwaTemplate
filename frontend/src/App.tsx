import Toasts from 'components/Toasts'
import LoadingBar from 'components/LoadingBar'
import React, { useEffect } from 'react'
import withErrorBoundary from 'components/withErrorBoundary'
import { Box } from '@mui/material'
import AuthenticatedRoutes from 'AuthenticatedRoutes'
import UnAuthenticatedRoutes from 'UnAuthenticatedRoutes'
import { enUS, LocalizationProvider } from '@mui/x-date-pickers'
import enLocale from 'date-fns/locale/en-US'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { translator } from '@empty/lib.constants'
import { useAppSelector } from 'store'
import { useOnLoading } from 'hooks/authHooks'

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const [adapterLocale, setAdapterLocale] = React.useState(enLocale)
  const [localeText, setLocaleText] = React.useState(enUS.components.MuiLocalizationProvider.defaultProps.localeText)
  const { shouldRedirect } = useOnLoading()

  useEffect(() => {
    switch (translator.getLanguageString()) {
      default:
        setAdapterLocale(enLocale)
        setLocaleText(enUS.components.MuiLocalizationProvider.defaultProps.localeText)
        break
    }
  }, [translator.getLanguageString()])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale} localeText={localeText}>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: theme => theme.palette.background.paper,
        }}
      >
        {isAuthenticated && shouldRedirect ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
      </Box>
      <LoadingBar />
      <Toasts />
    </LocalizationProvider>
  )
}

export default withErrorBoundary(App)
