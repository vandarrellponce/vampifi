import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import './CategoryListSceen.css'
import getCategories from '../../store/actions/category.getCategories'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'

const CategoryListSceen = () => {
  const [loading, setLoading] = useState(false)

  const { categoryList, categoryListError } = useSelector(
    (state) => state.category
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (!categoryList) {
      setLoading(true)
      dispatch(getCategories()).then((_) => setLoading(false))
    }
    /* eslint-disable */
  }, [dispatch])

  return (
    <Layout showSidebar>
      <Container>
        {categoryListError && <Message children={categoryListError} />}
        {loading && <Loader />}
        <Row>
          <Col md={12}>
            <div className="categorylist__col__one">
              <h2>Categories</h2>
              <button type="button" className="my-3 btn btn-dark">
                Add Category
              </button>
            </div>
          </Col>
          <Col md={12}></Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default CategoryListSceen
