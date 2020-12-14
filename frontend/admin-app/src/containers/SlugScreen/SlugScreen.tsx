import React, { useState } from 'react'
import ClientLayout from '../../components/LayoutClient/ClientLayout'

import './SlugScreen.css'

import StoreDisplay from './StoreDisplay/StoreDisplay'

const SlugScreen = (props) => {
  const queries = props.location.search.replace('?', '').split('&')
  const categoryId = queries[0].split('=')[1]
  const displayType = queries[1].split('=')[1]
  console.log({ categoryId, displayType })

  return (
    <ClientLayout>
      <StoreDisplay {...props} />
    </ClientLayout>
  )
}

export default SlugScreen
