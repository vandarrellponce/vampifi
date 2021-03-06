import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './StoreDisplay.css'
import { Button } from 'react-bootstrap'
import getProductsBySlug from '../../../store/actions/products.getProductsBySlug'
import Loader from '../../../components/Loader/Loader'
import generatePublicUrl from '../../../helpers/generatePublicUrl'
import { Link } from 'react-router-dom'

const StoreDisplay = (props) => {
  const slug = props.match.params.slug
  const dispatch = useDispatch()
  const { productsBySlug, productsByPrice } = useSelector(
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
    if (!productsBySlug) dispatch(getProductsBySlug(slug))
  }, [dispatch, productsBySlug, slug, productsByPrice])

  if (!productsBySlug) return <Loader />
  return (
    <div>
      {Object.keys(priceRange).map((key) => {
        if (!productsByPrice[key].length) return null
        return (
          <div className="storedisplay__card" key={key}>
            <div className="storedisplay__card__header">
              <div>{`${slug} mobiles under ${priceRange[key]}`}</div>
              <Button size="sm" variant="dark">
                View All
              </Button>
            </div>
            <div className="storedisplay__products__container">
              {productsByPrice[key].map((product, i) => (
                <Link
                  to={`/products/${product.slug}/${product._id}`}
                  className="storedisplay__product__container"
                  key={i}
                >
                  <div className="storedisplay__product__image__container">
                    <img
                      src={generatePublicUrl(product.images[0].img)}
                      alt="product"
                    />
                  </div>
                  <div className="storedisplay__product__details__container">
                    <div className="storedisplay__product__name">
                      {product.name}
                    </div>
                    <div className="storedisplay__product__rating">
                      <span>{product.rating}</span>{' '}
                      <span>{product.numReviews}</span>
                    </div>
                    <div className="storedisplay__product__price">
                      {product.price}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StoreDisplay
