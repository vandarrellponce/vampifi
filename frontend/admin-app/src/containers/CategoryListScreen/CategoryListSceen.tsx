import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import './CategoryListSceen.css'
import getCategories from '../../store/actions/category.getCategories'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import Input from '../../components/UI/Input/Input'
import addCategory from '../../store/actions/category.addCategory'
import CustomModal from '../../components/Modals/CustomModal/CustomModal'
import renderCategories from '../../helpers/renderCategories'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCheckbox,
  IoIosCheckboxOutline
} from 'react-icons/io'

const CategoryListSceen = () => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [newCatName, setNewCatName] = useState('')
  const [newCatParent, setNewCatParent] = useState('')
  const [newCatImage, setNewCatImage] = useState('')

  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])

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
    setShowModal(false)
  }

  const submitForm = async () => {
    const form = new FormData()
    form.append('name', newCatName)
    if (newCatParent !== 'Main') form.append('parentId', newCatParent)
    form.append('categoryImage', newCatImage)

    setLoading(true)
    await dispatch(addCategory(form))
    setNewCatName('')
    setNewCatParent('')
    setNewCatImage('')
    await dispatch(getCategories())
    setLoading(false)
    toggleModal()
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

  if (!categoryList) return <Loader />
  return (
    <Layout showSidebar>
      <Container fluid>
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
          <Col md={12} style={{ color: 'black' }}>
            <CheckboxTree
              nodes={renderCategories(categoryList)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />
              }}
            />
          </Col>
        </Row>
      </Container>

      <CustomModal
        modalTitle="Add New Category"
        showModal={showModal}
        toggleModal={toggleModal}
        handleClose={handleClose}
        submitForm={submitForm}
      >
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
          <option value={'Main'}>select category</option>
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
      </CustomModal>
    </Layout>
  )
}

export default CategoryListSceen
