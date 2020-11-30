import React, { useEffect } from 'react'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import { useSelector, useDispatch } from 'react-redux'
import getProductsBySlug from '../../store/actions/products.getProductsBySlug'
import './SlugScreen.css'

const SlugScreen = (props) => {
  const slug = props.match.params.slug
  const dispatch = useDispatch()
  const { productsBySlug, productsByPrice, productsBySlugError } = useSelector(
    (state) => state.product
  )

  useEffect(() => {
    if (!productsBySlug.length) dispatch(getProductsBySlug(slug))
  }, [dispatch, productsBySlug, slug])
  return (
    <div>
      <ClientLayout>
        <div className="slugscreen__card">
          <div className="slugscreen__card__header">
            <div>{`${slug} mobiles under 10k`}</div>
            <button>View All</button>
          </div>
          <div className="slugscreen__products__container">
            {productsBySlug.length > 0 &&
              productsBySlug.map((product) => (
                <div className="slugscreen__product__container">
                  <div className="slugscreen__product__image__container">
                    <img
                      src={`/uploads/${product.images[0].img}`}
                      alt="slugscreen____product image"
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
      </ClientLayout>
    </div>
  )
}

export default SlugScreen
