import express from 'express'
import { createPage, getPageByCategory } from '../controller/pageController.js'
import admin from '../middlewares/adminMiddleware.js'
import auth from '../middlewares/authMiddleware.js'
import { upload } from './uploadRoutes.js'
const router = express.Router()

router.post(
  '/create',
  auth,
  admin,
  upload.fields([{ name: 'banners' }, { name: 'products' }]),
  createPage
)

router.get('/:category/:type', getPageByCategory)

export default router
