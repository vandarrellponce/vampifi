import React, { useEffect, useState } from 'react'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import { useSelector, useDispatch } from 'react-redux'
import getProductsBySlug from '../../store/actions/products.getProductsBySlug'
import './SlugScreen.css'
import generatePublicUrl from '../../helpers/generatePublicUrl'
import Loader from '../../components/Loader/Loader'
import { Button } from 'react-bootstrap'

const SlugScreen = (props) => {
  const slug = props.match.params.slug
  const dispatch = useDispatch()
  const { productsBySlug, productsByPrice, productsBySlugError } = useSelector(
    (state) => state.product
  )
  const [priceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000
  })

  useEffect(() => {
    if (!productsBySlug?.length) dispatch(getProductsBySlug(slug))
  }, [dispatch, productsBySlug, slug, productsByPrice])

  if (!productsBySlug.length) return <Loader />
  return (
    <ClientLayout>
      {Object.keys(priceRange).map((key) => {
        if (!productsByPrice[key].length) return
        return (
          <div className="slugscreen__card" key={key}>
            <div className="slugscreen__card__header">
              <div>{`${slug} mobiles under ${priceRange[key]}`}</div>
              <Button size="sm" variant="dark">
                View All
              </Button>
            </div>
            <div className="slugscreen__products__container">
              {productsByPrice[key].map((product, i) => (
                <div className="slugscreen__product__container" key={i}>
                  <div className="slugscreen__product__image__container">
                    <img
                      src={generatePublicUrl(product.images[0].img)}
                      alt="product"
                    />
                  </div>
                  <div className="slugscreen__product__details__container">
                    <div className="slugscreen__product__name">
                      {product.name}
                    </div>
                    <div className="slugscreen__product__rating">
                      <span>{product.rating}</span>{' '}
                      <span>{product.numReviews}</span>
                    </div>
                    <div className="slugscreen__product__price">
                      {product.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </ClientLayout>
  )
}

export default SlugScreen
