import express from 'express'
import {
  createCategory,
  getCategories
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

export default router
