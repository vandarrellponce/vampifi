import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Axios from 'axios'
import { Helmet } from 'react-helmet'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import Paginate from '../../components/Paginate/Paginate'
import Layout from '../../components/Layout/Layout'
import { Modal } from 'react-bootstrap'
import Input from '../../components/UI/Input/Input'
import getCategories from '../../store/actions/category.getCategories'
import addProduct from '../../store/actions/product.addProduct'

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])

  const [pageSize] = useState(8)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)

  const [deleteError, setDeleteError] = useState('')
  const { currentUserInfo } = useSelector((state) => state.user)
  const { categoryList } = useSelector((state) => state.category)

  const [showModal, setShowModal] = useState(false)

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [productImages, setProductImages] = useState([])

  const getProducts = (options) => {
    setLoading(true)
    Axios.post(`/api/products`, options)
      .then((res) => {
        setProducts(res.data.products)
        setTotalPages(res.data.totalPages)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setError(
          error.response?.data?.message
            ? error.response.data.message
            : error.message
        )
      })
  }
  // USE EFFECT
  useEffect(() => {
    const options = {
      pageSize,
      page
    }
    getProducts(options)

    /*  eslint-disable */
  }, [currentUserInfo, history, pageSize, page])

  // HANDLERS
  const deleteHandler = async (id) => {
    try {
      if (window.confirm('Are you sure to delete this product?')) {
        await Axios.delete(`/api/admin/products/${id}`)
        getProducts({ pageSize, page })
      }
    } catch (error) {
      setDeleteError(error)
    }
  }
  const createProductHandler = (e) => {
    history.push(`/admin/products/createProduct/edit`)
  }

  const handleSetPage = (page) => {
    setPage(page)
    const options = {
      pageSize,
      page
    }
    getProducts(options)
  }

  const toggleModal = async () => {
    if (!categoryList?.length) await dispatch(getCategories())
    setShowModal((prevState) => !prevState)
  }

  const handleClose = async () => {}

  const submitForm = async () => {
    const form = new FormData()
    form.append('name', name)
    form.append('quantity', quantity)
    form.append('price', price)
    form.append('description', description)
    form.append('category', categoryId)
    productImages.forEach((image) => form.append('productImages', image))
    await dispatch(addProduct(form))
    getProducts({ pageSize, page })
    toggleModal()
  }

  const handleImages = (e) => {
    setProductImages([...productImages, e.target.files[0]])
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

  /*  if (!currentUserInfo)
    return <Message>Please Log in as Admin, Or go back to home page</Message> */
  if (deleteError) return <Message children={deleteError} variant="warning" />
  return (
    <Layout showSidebar>
      <div className="py-3">
        <Helmet>
          <title>Pro Store | Product List</title>
          <meta
            name="description"
            content="We sell the best milk tea in town"
          />
        </Helmet>
        <Row className="align-items-center">
          <Col>
            <h2>Products</h2>
          </Col>
          <Col className="text-right">
            <Button className="my-3" onClick={toggleModal} variant="dark">
              <i className="fas fa-plus"></i>
              Create Product
            </Button>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message children={error} variant="danger" />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => {
                    return (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          <LinkContainer
                            to={`/admin/products/${product._id}/edit`}
                          >
                            <Button variant="dark" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          {'     '}
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
            <Paginate
              page={page}
              totalPages={totalPages}
              setPage={handleSetPage}
            />
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header>
          <Modal.Title>Add new Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Name"
            required={true}
            type="text"
            value={name}
            placeholder={`Product Name`}
            onChange={setName}
          />
          <Input
            label="Quantity"
            type="number"
            required={true}
            value={quantity}
            placeholder={`Quantity`}
            onChange={setQuantity}
          />
          <Input
            label="Price"
            type="number"
            required={true}
            value={price}
            placeholder={`Price`}
            onChange={setPrice}
          />
          <Input
            label="Description"
            type="text"
            required={true}
            value={description}
            placeholder={`Description`}
            onChange={setDescription}
          />

          <select
            value={categoryId}
            className="form-control"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value={null}>select category</option>
            {categoryList?.length > 0 &&
              listCategoryOptions(categoryList).map((option) => {
                return (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                )
              })}
          </select>
          {productImages.length > 0 &&
            productImages.map((image, i) => <div key={i}>{image.name}</div>)}
          <input type="file" name="images" onChange={handleImages} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="dark" onClick={submitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default ProductListScreen
