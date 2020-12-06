import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import './CategoryListSceen.css'
import getCategories from '../../store/actions/category.getCategories'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import addCategory from '../../store/actions/category.addCategory'
import CustomModal from '../../components/Modals/CustomModal/CustomModal'
import renderCategories from '../../helpers/renderCategories'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import {
  IoIosAdd,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
  IoIosList,
  IoIosTrash
} from 'react-icons/io'
import updateCategory from '../../store/actions/category.updateCategory'
import deleteCategoriesAction from '../../store/actions/category.deleteCategories'
import UpdateCategoryModal from './components/UpdateCategoryModal'
import AddCategoryModal from './components/AddCategoryModal'

const CategoryListSceen = () => {
  const [loading, setLoading] = useState(false)
  /* NEW CATEGORY STATES */
  const [newCatName, setNewCatName] = useState('')
  const [newCatParent, setNewCatParent] = useState('')
  const [newCatImage, setNewCatImage] = useState('')
  /* STATES FOR REACT-CHECKBOX-TREE */
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])
  /* CONVERTED REACT-CHECKBOX-TREE STATES TO APP STATES */
  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])
  /* MODALS SHOW STATUS */
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUCModal, setShowUCModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  /* STORE STATES */
  const { categoryList, categoryListError, categoryDeleteError } = useSelector(
    (state) => state.category
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (!categoryList) {
      setLoading(true)
      dispatch(getCategories()).then((_) => setLoading(false))
    }
  }, [dispatch, categoryList])

  // FUNCTIONS & HANDLERS

  const listCategoryOptions = (categories, options = []) => {
    categories.forEach((cat) => {
      options.push({
        value: cat._id,
        name: cat.name,
        parentId: cat.parentId
      })
      if (cat.children.length) {
        listCategoryOptions(cat.children, options)
      }
    })

    return options
  }

  const handleAddModalClose = async () => {
    setShowAddModal(false)
  }

  const submitAddModalForm = async () => {
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
  const submitUpdateForm = async () => {
    const form = new FormData()

    expandedArray.forEach((item, i) => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('parentId', item.parentId)
      form.append('displayType', item.displayType)
    })

    checkedArray.forEach((item, i) => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('parentId', item.parentId)
      form.append('displayType', item.displayType)
    })
    await dispatch(updateCategory(form))
    await dispatch(getCategories())
    setShowUCModal(false)
  }

  const toggleModal = () => {
    setShowAddModal((prevState) => !prevState)
  }

  const handleAddModalImage = (e) => {
    setNewCatImage(e.target.files[0])
  }

  const handleAddModalChange = (e) => {
    setNewCatParent(e.currentTarget.value)
  }

  const handleUCModalShow = () => {
    setShowUCModal(true)
    setCheckedAndExpandedCategories()
  }

  const handleUCModalClose = () => {
    setShowUCModal(false)
  }

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false)
  }

  const confirmDeleteCategory = () => {
    setShowDeleteModal(true)
    setCheckedAndExpandedCategories()
  }

  const deleteCategory = async () => {
    const checkedIds = checkedArray.map((item) => item.value)
    /*  const expandedIds = expandedArray.map((item) => item.value)
    const ids = checkedArray.concat(expandedArray) */
    if (checkedIds.length) {
      await dispatch(deleteCategoriesAction(checkedIds))
      await dispatch(getCategories())
      setShowDeleteModal(false)
    }
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

  const renderDeleteCategoryModal = () => (
    <CustomModal
      modalTitle="Confirm Delete"
      showModal={showDeleteModal}
      handleClose={handleDeleteModalClose}
      toggleModal={(_) => setShowDeleteModal((prev) => !prev)}
      submitForm={deleteCategory}
    >
      <h5>Are you sure to delete categories below?</h5>
      {/* <h6>
        <strong>Expanded</strong>
      </h6>
      {expandedArray.map((item, i) => {
        return (
          <span key={i} style={{ display: 'block' }}>
            {item.name}
          </span>
        )
      })}
      <br />
      <h6>
        <strong>Checked</strong>
      </h6> */}
      {checkedArray.map((item, i) => {
        return (
          <span key={i} style={{ display: 'block' }}>
            {item.name}
          </span>
        )
      })}
    </CustomModal>
  )

  if (!categoryList) return <Loader />
  if (categoryDeleteError) return <Message children={categoryDeleteError} />
  return (
    <Layout showSidebar>
      <Container fluid>
        {categoryListError && <Message children={categoryListError} />}
        {loading && <Loader />}
        <Row>
          <Col md={12}>
            <div className="categorylist__col__one">
              <h2>Categories</h2>
              <div className="categorylist__button__container">
                <span>Actions</span>
                <Button size="sm" variant="dark" onClick={toggleModal}>
                  <IoIosAdd /> Add Category
                </Button>
                <Button size="sm" variant="dark" onClick={handleUCModalShow}>
                  <IoIosList /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="dark"
                  onClick={confirmDeleteCategory}
                >
                  <IoIosTrash /> Delete
                </Button>
              </div>
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
      </Container>
      <AddCategoryModal
        modalTitle="Add New Category"
        showModal={showAddModal}
        handleClose={handleAddModalClose}
        toggleModal={(e) => setShowAddModal((prev) => !prev)}
        submitForm={submitAddModalForm}
        categoryList={listCategoryOptions(categoryList)}
        handleImage={handleAddModalImage}
        setNewCatName={setNewCatName}
        newCatName={newCatName}
        newCatParent={newCatParent}
        handleChange={handleAddModalChange}
      />

      <UpdateCategoryModal
        modalTitle="Edit Category"
        showModal={showUCModal}
        handleClose={handleUCModalClose}
        toggleModal={(_) => setShowUCModal((prev) => !prev)}
        submitForm={submitUpdateForm}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        categoryList={listCategoryOptions(categoryList)}
        handleImage={handleAddModalImage}
        updateCategoryName={updateCategoryName}
      />
      {renderDeleteCategoryModal()}
    </Layout>
  )
}

export default CategoryListSceen
