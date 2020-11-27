import express from 'express'
import { getOrders } from '../controller/orderController.js'
import {
  createProduct,
  deleteProduct,
  updateProduct
} from '../controller/productController.js'
import {
  deleteUser,
  getUser,
  updateUser
} from '../controller/userController.js'
import admin from '../middlewares/adminMiddleware.js'
import auth from '../middlewares/authMiddleware.js'
import { upload } from './uploadRoutes.js'
const router = express.Router()

/* app.use('/api/admin', adminRoutes) - prefix */
// products
router
  .route('/products')
  .post(auth, admin, upload.array('productImages'), createProduct)
router
  .route('/products/:id')
  .delete(auth, admin, deleteProduct)
  .put(auth, admin, updateProduct)

// orders
router.route('/orders').post(auth, admin, getOrders)

// users
router
  .route('/users/:id')
  .delete(auth, admin, deleteUser)
  .get(auth, admin, getUser)
  .put(auth, admin, updateUser)

export default router
