import React from 'react'
import { PageContainer, PageHeader } from 'components/Commons'
import { trlb } from '@empty/lib.constants'

const Homepage = () => {
  return (
    <PageContainer>
      <PageHeader pageTitle={trlb('commons_home')} />
    </PageContainer>
  )
}

export default Homepage
