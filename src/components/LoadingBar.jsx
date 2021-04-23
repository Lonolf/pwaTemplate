import React from 'react'

import { CircularProgress, Snackbar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import translator from 'utility/translator'

const LoadingBar = () => {
  const loading = useSelector(state => state.loading)
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={(loading || []).length > 0}
      message={translator.fromLabel('generic_loading')}
      action={(
        <CircularProgress
          variant='indeterminate'
          color='primary'
          style={{ marginRight: 5 }}
          size={20}
        />
        )}
    />
  )
}

export default LoadingBar
