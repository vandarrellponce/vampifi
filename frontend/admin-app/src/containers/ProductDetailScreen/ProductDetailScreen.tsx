import React from 'react'

const ProductDetailScreen = (props) => {
  const slug = props.match.params.slug
  const productId = props.match.params.productId
  return <div>{`${slug} -  ${productId}`}</div>
}

export default ProductDetailScreen
