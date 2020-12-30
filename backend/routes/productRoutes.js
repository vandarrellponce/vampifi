import express from 'express'
import {
  createReview,
  getProductById,
  getProductsBySlug,
  getProductsWithOptions
} from '../controller/productController.js'
import auth from '../middlewares/authMiddleware.js'
const router = express.Router()

/* app.use('/api/products', productRoutes) - reference */
router.route('/').post(getProductsWithOptions)

router.route('/slug/:slug').get(getProductsBySlug)

router.route('/:id/reviews').post(auth, createReview)
router.route('/:id').get(getProductById)

export default router
