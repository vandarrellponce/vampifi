import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import CustomModal from '../../components/Modals/CustomModal/CustomModal'
import Input from '../../components/UI/Input/Input'
import listCategoryOptions from '../../helpers/listCategoryOptions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import getCategories from '../../store/actions/category.getCategories'

const PageScreen = () => {
  const [loading, setLoading] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState([])

  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [banners, setBanners] = useState([])
  const [products, setProducts] = useState([])
  const [displayType, setDisplayType] = useState('')

  const { categoryList } = useSelector((state) => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!categoryList) {
      setLoading(true)
      dispatch(getCategories()).then((_) => setLoading(false))
    }
    if (categoryList) setCategoryOptions(listCategoryOptions(categoryList))
  }, [categoryList, dispatch])

  const submitForm = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('title', title)
    form.append('description', description)
    form.append('category', categoryId)
    form.append('displayType', displayType)
    banners.forEach((item) => form.append('banners', item))
    products.forEach((item) => form.append('products', item))
    console.log({
      title,
      description,
      categoryId,
      displayType,
      banners,
      products
    })
  }

  const handleCategorySelect = (e) => {
    const category = listCategoryOptions(categoryList).find(
      (item) => item.value === e.target.value
    )
    if (category) setDisplayType(category.displayType)
    setCategoryId(e.target.value)
  }

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]])
  }

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]])
  }

  const renderCreatePageModal = () => {
    return (
      <CustomModal
        showModal={showModal}
        modalTitle="Create New Page"
        handleClose={(_) => setShowModal(false)}
        toggleModal={(_) => setShowModal((prev) => !prev)}
        submitForm={submitForm}
      >
        <Row>
          <Col>
            Page Title
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
              type="input"
              placeholder="Enter Title"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            Description
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required={true}
              type="input"
              placeholder="Enter Description"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            Category
            <select
              value={categoryId}
              onChange={handleCategorySelect}
              className="form-control form-control-sm"
            >
              <option value="Main">Main</option>
              {categoryOptions.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          {banners.length > 0
            ? banners.map((banner, i) => (
                <Col md={12} key={i}>
                  {banner.name}
                </Col>
              ))
            : null}
          <Col>
            <div className="custom-file">
              <input
                className="custom-file-input"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
              <label className="custom-file-label">Choose Banner Images</label>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: '10px' }}>
          {products.length > 0
            ? products.map((product, i) => (
                <Col md={12} key={i}>
                  {product.name}
                </Col>
              ))
            : null}
          <Col>
            <div className="custom-file">
              <input
                className="custom-file-input"
                type="file"
                name="products"
                onChange={handleProductImages}
              />
              <label className="custom-file-label">Choose Product Images</label>
            </div>
          </Col>
        </Row>
      </CustomModal>
    )
  }
  if (!categoryOptions) return <Loader />
  if (loading) return <Loader />
  return (
    <Layout showSidebar>
      {renderCreatePageModal()}
      <button
        className="btn btn-dark btn-sm"
        onClick={(e) => setShowModal(true)}
      >
        New Page
      </button>
    </Layout>
  )
}

export default PageScreen
