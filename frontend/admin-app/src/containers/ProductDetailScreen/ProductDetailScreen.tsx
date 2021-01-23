import React, { useEffect, useState } from 'react'
import {
  IoIosArrowForward,
  IoMdCart,
  IoIosThunderstorm,
  IoIosStar
} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import Loader from '../../components/Loader/Loader'
import { MaterialButton } from '../../components/MaterialUI/MaterialUI'
import generatePublicUrl from '../../helpers/generatePublicUrl'
import addToCart from '../../store/actions/cart.addToCart'
import getProductById from '../../store/actions/product.getProductById'
import './ProductDetailScreen.css'

const ProductDetailScreen = (props) => {
  const slug = props.match.params.slug
  const productId = props.match.params.productId
  const { productById: product } = useSelector((state) => state.product)

  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!product) {
      dispatch(getProductById(productId))
    }
  }, [dispatch, product, productId, mainImageIndex])
  if (!product) return <Loader />
  return (
    <ClientLayout>
      <div className="productdetail__main__container">
        <div className="productdetail__row">
          <div className="productdetail__verticalImageStack">
            {product.images.map((image, i) => (
              <div className="thumbnail" key={i}>
                <img
                  src={generatePublicUrl(image.img)}
                  alt={image.img}
                  onMouseEnter={(_) => {
                    setMainImageIndex((_) => i)
                  }}
                />
              </div>
            ))}
          </div>
          <div className="productdetail__desc__container">
            <div className="productdetail__desc__image">
              <img
                src={generatePublicUrl(product.images[mainImageIndex].img)}
                alt="single"
              />
            </div>

            {/* action buttons */}
            <div className="productdetail__row">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: '5px'
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  dispatch(addToCart(product._id, qty))
                  props.history.push('/cart')
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: '5px'
                }}
                icon={<IoIosThunderstorm />}
              />
            </div>
          </div>
          <div className="productdetail__right__row">
            {/* home > category > subCategory > productName */}
            <div className="breed">
              <ul>
                <li>
                  <a href="#">Home</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Mobiles</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Samsung</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">{product.name}</a>
                </li>
              </ul>
            </div>

            {/* product description */}
            <div className="productdetail__detail__container">
              {/* name */}
              <p className="productdetail__productTitle">{product.name}</p>

              {/* rating */}
              <div>
                <span className="ratingCount">
                  4.3 <IoIosStar />
                </span>
                <span className="ratingNumbersReviews">
                  72,234 Ratings & 8,140 Reviews
                </span>
              </div>

              {/* price */}
              <div className="productdetail__row priceContainer">
                ₱ <span className="price">{product.price}</span>
                <span className="discount" style={{ margin: '0 10px' }}>
                  22% off
                </span>
                {/* <span>i</span> */}
              </div>

              <div>
                <p
                  style={{
                    color: '#212121',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Available Offers
                </p>
              </div>

              {/* description */}
              <p style={{ display: 'flex' }}>
                <span
                  style={{
                    width: '100px',
                    fontSize: '12px',
                    color: '#878787',
                    fontWeight: 'bold',
                    marginRight: '20px'
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#212121'
                  }}
                >
                  {product.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default ProductDetailScreen
