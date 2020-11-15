import express from 'express'
import {
  authUser,
  createUser,
  getUserProfile,
  getUsers,
  logoutAllUserSession,
  logoutUser,
  updateUserProfile
} from '../controller/userController.js'
import auth from '../middlewares/authMiddleware.js'
import admin from '../middlewares/adminMiddleware.js'
const router = express.Router()

/*  /api */
router.post('/users/register', createUser)
router.post('/users/login', authUser)

router.get('/users/logout', auth, logoutUser)
router.get('/users/logoutall', auth, logoutAllUserSession)

router
  .route('/users/profile')
  .get(auth, getUserProfile)
  .put(auth, updateUserProfile)
router.route('/users/').post(auth, admin, getUsers)

export default router
