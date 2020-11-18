import express from 'express'
import { addToCart } from '../controller/cartController.js'
import auth from '../middlewares/authMiddleware.js'

const router = express.Router()

/* app.use('/api/cart', cartRoutes) - prefix */
router.post('/user/cart', auth, addToCart)

export default router
