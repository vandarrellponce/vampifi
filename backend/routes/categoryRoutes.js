import express from 'express'
import { createCategory } from '../controller/categoryController.js'
import admin from '../middlewares/adminMiddleware.js'
import auth from '../middlewares/authMiddleware.js'
const router = express.Router()

/* app.use('/api) - prefix */
router.post('/category/create', auth, admin, createCategory)

export default router
