import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getPage from '../../../store/actions/page.getPage'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import './PageDisplay.css'
import Loader from '../../../components/Loader/Loader'
import generatePublicUrl from '../../../helpers/generatePublicUrl'
import { Link } from 'react-router-dom'
import Card from '../../../components/Card/Card'
import { Col, Row } from 'react-bootstrap'

const PageDisplay = (props) => {
  const { fetchedPage: page } = useSelector((state) => state.page)
  const dispatch = useDispatch()

  const queries = props.location.search.replace('?', '').split('&')
  const categoryId = queries[0].split('=')[1]
  const displayType = queries[1].split('=')[1]

  useEffect(() => {
    if (!page) dispatch(getPage({ category: categoryId, type: displayType }))
  }, [page, dispatch, categoryId, displayType])
  if (!page) return <Loader />
  return (
    <div className="page__main">
      <h5>{page.title}</h5>
      <Carousel renderThumbs={() => null}>
        {page.bannerImages.length > 1 &&
          page.bannerImages.map((banner, i) => (
            <Link to={banner.navigateTo} key={i}>
              <img
                src={generatePublicUrl(banner.img)}
                alt="page banner"
                style={{ objectFit: 'contain', height: '300px' }}
              />
            </Link>
          ))}
      </Carousel>

      <div className="page__products__container">
        {page.productImages.length > 1 &&
          page.productImages.map((product, i) => (
            <Card>
              <Link to="/" key={i}>
                <img
                  src={generatePublicUrl(product.img)}
                  alt="product"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Link>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default PageDisplay
