import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import Loader from '../../components/Loader/Loader'
import getProductById from '../../store/actions/product.getProductById'

const ProductDetailScreen = (props) => {
  const slug = props.match.params.slug
  const productId = props.match.params.productId
  const { productById: product } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!product) {
      dispatch(getProductById(productId))
    }
  }, [dispatch, product, productId])
  if (!product) return <Loader />
  return <ClientLayout>{`${product.name} -  ${product._id}`}</ClientLayout>
}

export default ProductDetailScreen
