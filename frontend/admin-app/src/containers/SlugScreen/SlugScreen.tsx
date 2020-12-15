import React, { useState } from 'react'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import PageDisplay from './PageDisplay/PageDisplay'

import './SlugScreen.css'

import StoreDisplay from './StoreDisplay/StoreDisplay'

const SlugScreen = (props) => {
  const renderProduct = () => {
    const queries = props.location.search.replace('?', '').split('&')
    const categoryId = queries[0].split('=')[1]
    const displayType = queries[1].split('=')[1]
    switch (displayType) {
      case 'store':
        return <StoreDisplay {...props} />
      case 'page':
        return <PageDisplay {...props} />
      default:
        return <div>PAGE NOT FOUND</div>
    }
  }

  return <ClientLayout>{renderProduct()}</ClientLayout>
}

export default SlugScreen
