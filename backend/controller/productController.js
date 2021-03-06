import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import slugify from 'slugify'
import Category from '../models/categoryModel.js'

// @desc	Create product
// @route	POST /api/admin/products
// @access	Private/Admin
export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    let productImages = []

    // if pictures are uploaded
    if (req.files && req.files.length > 0) {
      req.files.map((file) => {
        productImages.push({
          img: file.filename
        })
      })
    }

    // if pictures are url

    // create product
    const product = new Product({
      ...req.body,
      slug: slugify(req.body.name),
      createdBy: req.user._id,
      images: productImages
    })
    const newProduct = await product.save()
    res.status(201).send(newProduct)
  } catch (error) {
    res.status(404)
    throw new Error(error.message)
  }
})

// @desc	Update product by id
// @route	PUT /api/admin/products/:id
// @access	Private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
  const updates = Object.keys(req.body)

  const allowedUpdates = [
    'name',
    'category',
    'brand',
    'description',
    'price',
    'countInStock',
    'image',
    'sizes',
    'addons'
  ]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation)
    return res
      .status(400)
      .send({ error: 'Updating invalid field is not allowed!' })
  try {
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) throw new Error('Product not found')
    updates.forEach((update) => (product[update] = req.body[update]))
    const updatedProduct = await product.save()
    res.send(updatedProduct)
  } catch (error) {
    res.status(404)

    throw new Error(error.message)
  }
})

// @desc	Fetch all Products with query
// @route	POST /api/products?keyword=keyword
// @access	Public
export const getProductsWithOptions = expressAsyncHandler(async (req, res) => {
  const pageSize = req.body.pageSize || 8
  const page = req.body.page || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .populate('category', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 })

  res.send({ products, page, totalPages: Math.ceil(count / pageSize) })
})

// @desc	Get Product by Slug
// @route	GET /api/products/slug/:slug
// @access	Public
export const getProductsBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const slug = req.params.slug
    const category = await Category.findOne({ slug })
    const products = await Product.find({ category: category._id })
    res.send(products)
  } catch (error) {
    res.status(401).send(error.message)
  }
})

// @desc	Fetch single product
// @route	GET /api/products/:id
// @access	Public
export const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) throw new Error('Product not found')
  res.send(product)
})

// @desc	Delete product by id
// @route	DELETE /api/admin/products/:id
// @access	Private/Admin
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const deletedProduct = await Product.findOneAndDelete({
    _id: req.params.id
  })
  if (!deletedProduct) throw new Error('No such product id found')
  res.send(deletedProduct)
})

// @desc	Create new product review
// @route	POST /api/products/:id/reviews
// @access	Private
export const createReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (!product) throw new Error('No product found')

  // CHECK IF USER ALREADY REVIEWED THE PRODUCT
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  )
  if (alreadyReviewed) throw new Error('Product already reviewed')

  // CREATE REVIEW OBJECT
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  product.reviews = [...product.reviews, review]
  product.numReviews = product.reviews.length
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.numReviews
  const updatedProduct = await product.save()
  res.status(201).send(updatedProduct)

  try {
  } catch (error) {
    res.status(404)

    throw new Error(error.message)
  }
})
