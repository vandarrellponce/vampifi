import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import './CategoryListSceen.css'
import getCategories from '../../store/actions/category.getCategories'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import Input from '../../components/UI/Input/Input'
import addCategory from '../../store/actions/category.addCategory'

const CategoryListSceen = () => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [newCatName, setNewCatName] = useState('')
  const [newCatParent, setNewCatParent] = useState('')
  const [newCatImage, setNewCatImage] = useState('')

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
  }, [dispatch, categoryList])

  // FUNCTIONS & HANDLERS
  const renderCategories = (categories) => {
    return categories.map((cat) => {
      return (
        <li key={cat._id}>
          {cat.name}
          {cat.children.length > 0 && <ul>{renderCategories(cat.children)}</ul>}
        </li>
      )
    })
  }

  const listCategoryOptions = (categories, options = []) => {
    categories.forEach((cat) => {
      options.push({ value: cat._id, name: cat.name })
      if (cat.children.length) {
        listCategoryOptions(cat.children, options)
      }
    })

    return options
  }

  const handleClose = async () => {
    const form = new FormData()
    form.append('name', newCatName)
    form.append('parentId', newCatParent)
    form.append('categoryImage', newCatImage)

    setLoading(true)
    await dispatch(addCategory(form))
    await dispatch(getCategories())
    setLoading(false)
  }

  const toggleModal = () => {
    setShowModal((prevState) => !prevState)
  }

  const handleImage = (e) => {
    setNewCatImage(e.target.files[0])
  }

  const handleChange = (e) => {
    setNewCatParent(e.currentTarget.value)
  }

  return (
    <Layout showSidebar>
      <Container>
        {categoryListError && <Message children={categoryListError} />}
        {loading && <Loader />}
        <Row>
          <Col md={12}>
            <div className="categorylist__col__one">
              <h2>Categories</h2>
              <button
                type="button"
                className="my-3 btn btn-dark"
                onClick={toggleModal}
              >
                Add Category
              </button>
            </div>
          </Col>
          <Col md={12}>
            <ul>{categoryList && renderCategories(categoryList)}</ul>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header>
          <Modal.Title>Add new Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            label="Category Name"
            placeholder="Enter category name"
            required={true}
            value={newCatName}
            onChange={setNewCatName}
          />
          Parent Category <br />
          <select
            className="form-control"
            value={newCatParent}
            onChange={handleChange}
          >
            <option>select category</option>
            {categoryList?.length > 0 &&
              listCategoryOptions(categoryList).map((option) => {
                return (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                )
              })}
          </select>
          <input type="file" name="categoryImage" onChange={handleImage} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="dark" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default CategoryListSceen
