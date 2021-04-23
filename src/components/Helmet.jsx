import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import translator from 'utility/translator'

const HelmetComponent = () => {
  const { view = '' } = useParams()

  const pageTitle = translator.fromLabel(`pages_${view}`)
  const description = translator.fromLabelNoFallback(`pages_${view}_description`)

  return (
    <Helmet>
      <meta
        name='description'
        content={description ?? translator.fromLabel('commons_description')}
      />
      <title>{`${translator.fromLabel('commons_title')} | ${pageTitle}`}</title>
    </Helmet>
  )
}

export default HelmetComponent
