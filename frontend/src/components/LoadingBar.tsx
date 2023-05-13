import { trlb } from '@empty/lib.constants'
import { Alert, AlertTitle, Box, CircularProgress } from '@mui/material'
import React from 'react'
import { useAppSelector } from 'store'

const LoadingBar = () => {
  const isLoading = useAppSelector(state => state.global.loading.length)

  if (isLoading <= 0) return null
  else
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'flex-end',
          gap: 2,
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 3000,
        }}
      >
        <Alert
          sx={{
            position: 'relative',
            borderRadius: 'sm',
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
          }}
          severity="info"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: -1,
              width: 104,
            }}
          >
            <AlertTitle>{trlb('commons_loading')}</AlertTitle>
            <CircularProgress size={20} sx={{ mb: 1 }} />
          </Box>
        </Alert>
      </Box>
    )
}

export default LoadingBar
