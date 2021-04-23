import React from 'react'

import ThemeSelector from 'components/ThemeSelector'
import ContentManager from 'views/ContentManager'
import LoadingBar from 'components/LoadingBar'
import ErrorBar from 'components/ErrorBar'
import useCall from 'hooks/callHook'
import { autoLogin } from 'sagas/userSagas'
import withErrorBoundary from 'components/withErrorBoundary'

const App = () => {
  const call = useCall()

  React.useEffect(() => { call(autoLogin) }, [])
  return (
    <ThemeSelector>
      <ContentManager />
      <LoadingBar />
      <ErrorBar />
    </ThemeSelector>
  )
}

export default withErrorBoundary(App)
