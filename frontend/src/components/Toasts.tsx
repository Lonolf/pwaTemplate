import React from 'react'
import { useAppSelector } from 'store'
import { Alert, AlertTitle, IconButton, useTheme } from '@mui/material'
import { CancelOutlined } from '@mui/icons-material'
import { trlb } from '@empty/lib.constants'
import { GLOBAL_ACTION } from 'store/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const Toasts = () => {
  const { toasts } = useAppSelector(state => state.global)
  const toast = toasts[0]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()

  const removeToast = () =>
    dispatch({
      type: GLOBAL_ACTION.REMOVE_TOAST,
      data: toast,
    })

  React.useEffect(() => {
    if (toast?.type === 'success')
      setTimeout(() => {
        removeToast()
      }, 5000)
  }, [toast])

  if (!toast) return null

  const backgroundColor =
    toast.type === 'success'
      ? theme.palette.success.main
      : toast.type === 'warning'
      ? theme.palette.warning.main
      : toast.type === 'error'
      ? theme.palette.error.main
      : theme.palette.info.main

  const color =
    toast.type === 'success'
      ? theme.palette.success.contrastText
      : toast.type === 'warning'
      ? theme.palette.warning.contrastText
      : toast.type === 'error'
      ? theme.palette.error.contrastText
      : theme.palette.info.contrastText

  const text = toast.text
    ? typeof toast.text === 'string'
      ? toast.text
      : JSON.stringify(toast.text)
    : `commons_${toast.type}_toast`

  const handleClickToast = () => {
    removeToast()
    if (toast.targetPath) navigate(toast.targetPath)
  }

  return (
    <Alert
      sx={{
        position: 'fixed',
        bottom: 15,
        left: 15,
        borderRadius: '1rem',
        width: 'fit-content',
        maxWidth: 'calc(100% - 30px)',
        display: 'flex',
        zIndex: 1000000,
        cursor: 'pointer',
      }}
      severity={toast.type}
      icon={false}
      onClick={handleClickToast}
      onClose={() => removeToast()}
      style={{ backgroundColor, color }}
      action={
        <IconButton onClick={() => removeToast()} size='small' aria-label='close'>
          <CancelOutlined style={{ fill: color }} />
        </IconButton>
      }
    >
      <AlertTitle sx={{ mb: 0, mt: 0.1 }}>{trlb(text)}</AlertTitle>
    </Alert>
  )
}

export default Toasts
