import React, { useEffect, useState } from 'react'
import { IoIosArrowForward, IoMdCart, IoIosThunderstorm } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import Loader from '../../components/Loader/Loader'
import { MaterialButton } from '../../components/MaterialUI/MaterialUI'
import generatePublicUrl from '../../helpers/generatePublicUrl'
import getProductById from '../../store/actions/product.getProductById'
import './ProductDetailScreen.css'

const ProductDetailScreen = (props) => {
  const slug = props.match.params.slug
  const productId = props.match.params.productId
  const { productById: product } = useSelector((state) => state.product)

  const [mainImageIndex, setMainImageIndex] = useState(0)
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
                onClick={() => {}}
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
          <div>
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
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default ProductDetailScreen
