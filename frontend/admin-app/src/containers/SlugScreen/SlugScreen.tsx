import React, { useEffect, useState } from 'react'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import { useSelector, useDispatch } from 'react-redux'
import getProductsBySlug from '../../store/actions/products.getProductsBySlug'
import './SlugScreen.css'
import generatePublicUrl from '../../helpers/generatePublicUrl'
import Loader from '../../components/Loader/Loader'
import { Button } from 'react-bootstrap'
import StoreDisplay from './StoreDisplay/StoreDisplay'

const SlugScreen = (props) => {
  return (
    <ClientLayout>
      <StoreDisplay {...props} />
    </ClientLayout>
  )
}

export default SlugScreen
