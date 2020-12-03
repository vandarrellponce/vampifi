import express from 'express'
import {
  createCategory,
  getCategories,
  updateCategory
} from '../controller/categoryController.js'
import admin from '../middlewares/adminMiddleware.js'
import auth from '../middlewares/authMiddleware.js'
import { upload } from './uploadRoutes.js'
const router = express.Router()

/* app.use('/api) - prefix */

// public routes
router.get('/category', getCategories)

// admin routes
router.post(
  '/category/create',
  auth,
  admin,
  upload.single('categoryImage'),
  createCategory
)

router.put(
  '/category/updateMany',
  auth,
  admin,
  upload.array('categoryImages'),
  updateCategory
)

export default router
