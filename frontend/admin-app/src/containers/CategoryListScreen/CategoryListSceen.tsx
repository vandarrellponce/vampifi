import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
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
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline
} from 'react-icons/io'

const CategoryListSceen = () => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [newCatName, setNewCatName] = useState('')
  const [newCatParent, setNewCatParent] = useState('')
  const [newCatImage, setNewCatImage] = useState('')
  /* STATES FOR REACT-CHECKBOX-TREE */
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])
  /* CONVERTED REACT-CHECKBOX-TREE STATES TO APP STATES */
  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])

  const [showUCModal, setShowUCModal] = useState(false)
  /* STORE STATES */
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
      options.push({ value: cat._id, name: cat.name, parentId: cat.parentId })
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

  const handleUCModalShow = () => {
    setShowUCModal(true)
    setCheckedAndExpandedCategories()
  }

  const handleUCModalClose = () => {
    setShowUCModal(false)
  }

  const setCheckedAndExpandedCategories = () => {
    const categories = listCategoryOptions(categoryList)

    const checkedArray = []
    const expandedArray = []

    checked.length > 0 &&
      checked.forEach((categoryId) => {
        const category = categories.find(
          (category) => category.value === categoryId
        )
        category && checkedArray.push(category)
      })

    expanded.length > 0 &&
      expanded.forEach((categoryId) => {
        const category = categories.find(
          (category) => category.value === categoryId
        )
        category && expandedArray.push(category)
      })
    /* console.log({ checkedArray, expandedArray }) */
    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)
  }

  const updateCategoryName = (key, value, index, type) => {
    if (type === 'checked') {
      const updatedArray = checkedArray.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
      setCheckedArray(updatedArray)
    } else if (type === 'expanded') {
      const updatedArray = expandedArray.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
      setExpandedArray(updatedArray)
    }
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
                check: <IoIosCheckmarkCircle />,
                uncheck: <IoIosCheckmarkCircleOutline />,
                halfCheck: <IoIosCheckmarkCircleOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button size="sm" variant="dark">
              Delete
            </Button>{' '}
            <Button size="sm" variant="dark" onClick={handleUCModalShow}>
              Edit
            </Button>
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
          onChange={(e) => setNewCatName(e.target.value)}
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

      <CustomModal
        modalTitle="Edit Category"
        showModal={showUCModal}
        handleClose={handleUCModalClose}
        toggleModal={() => setShowUCModal((prev) => !prev)}
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, i) => {
            return (
              <Row key={i}>
                <Col>
                  <Input
                    type="text"
                    placeholder="Enter category name"
                    required={true}
                    value={item.name}
                    onChange={(e) =>
                      updateCategoryName('name', e.target.value, i, 'expanded')
                    }
                  />
                </Col>
                <Col>
                  <select
                    className="form-control form-control-sm"
                    value={item.parentId}
                    onChange={(e) =>
                      updateCategoryName(
                        'parentId',
                        e.target.value,
                        i,
                        'expanded'
                      )
                    }
                    style={{ width: '100%' }}
                  >
                    <option value={'Main'}>Select Category</option>
                    {categoryList?.length > 0 &&
                      listCategoryOptions(categoryList).map((option) => {
                        return (
                          <option value={option.value} key={option.value}>
                            {option.name}
                          </option>
                        )
                      })}
                  </select>
                </Col>
                <Col>
                  <select className="form-control form-control-sm">
                    <option value="Main">Select Display</option>
                    <option value="store">Store Type</option>
                    <option value="product">Products Type</option>
                    <option value="page">Page Type</option>
                  </select>
                </Col>
              </Row>
            )
          })}
        <Row>
          <Col>
            <h6>Checked</h6>
          </Col>
        </Row>
        {checkedArray.length > 0 &&
          checkedArray.map((item, i) => {
            return (
              <Row key={i}>
                <Col>
                  <Input
                    type="text"
                    placeholder="Enter category name"
                    required={true}
                    value={item.name}
                    onChange={(e) =>
                      updateCategoryName('name', e.target.value, i, 'checked')
                    }
                  />
                </Col>
                <Col>
                  <select
                    className="form-control form-control-sm"
                    value={item.parentId}
                    onChange={(e) =>
                      updateCategoryName(
                        'parentId',
                        e.target.value,
                        i,
                        'checked'
                      )
                    }
                    style={{ width: '100%' }}
                  >
                    <option value={'Main'}>Select Category</option>
                    {categoryList?.length > 0 &&
                      listCategoryOptions(categoryList).map((option) => {
                        return (
                          <option value={option.value} key={option.value}>
                            {option.name}
                          </option>
                        )
                      })}
                  </select>
                </Col>
                <Col>
                  <select className="form-control form-control-sm">
                    <option value="Main">Select Display</option>
                    <option value="store">Store Type</option>
                    <option value="product">Products Type</option>
                    <option value="page">Page Type</option>
                  </select>
                </Col>
              </Row>
            )
          })}

        <input type="file" name="categoryImage" onChange={handleImage} />
      </CustomModal>
    </Layout>
  )
}

export default CategoryListSceen
