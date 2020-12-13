import React from 'react'
import ClientLayout from '../../components/LayoutClient/ClientLayout'

import './SlugScreen.css'

import StoreDisplay from './StoreDisplay/StoreDisplay'

const SlugScreen = (props) => {
  return (
    <ClientLayout>
      <StoreDisplay {...props} />
    </ClientLayout>
  )
}

export default SlugScreen
