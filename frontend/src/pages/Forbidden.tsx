import React from 'react'
import { PageContainer, PageHeader } from 'components/Commons'
import { routes } from 'routes/routes'

import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'store'

const ForbiddenPage = ({ noRedirect }: { noRedirect?: boolean }) => {
  const navigate = useNavigate()
  const isLoading = useAppSelector(state => state.global.loading.length)
  React.useEffect(() => {
    if (!noRedirect && !isLoading) navigate(routes.dashboard)
  }, [navigate, isLoading, noRedirect])

  if (isLoading) return null
  return (
    <PageContainer>
      <PageHeader pageTitle='Forbidden'></PageHeader>
      Forbidden
    </PageContainer>
  )
}
export default ForbiddenPage
