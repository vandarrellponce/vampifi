import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import getProductById from '../../store/actions/product.getProductById'

const ProductDetailScreen = (props) => {
  const slug = props.match.params.slug
  const productId = props.match.params.productId
  const { productById } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!productById) {
      dispatch(getProductById(productId))
    }
  }, [dispatch, productById, productId])
  return <ClientLayout>{`${slug} -  ${productId}`}</ClientLayout>
}

export default ProductDetailScreen
