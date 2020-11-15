import express from 'express'
import auth from '../middlewares/authMiddleware.js'
import admin from '../middlewares/adminMiddleware.js'
import {
  authUser,
  createUser,
  getUserProfile,
  getUsers,
  logoutAllUserSession,
  logoutUser,
  updateUserProfile
} from '../controller/userController.js'

import {
  isValidated,
  validateLogin,
  validateRegister
} from '../validators/userValidator.js'
const router = express.Router()

/*  /api */
router.post('/users/register', validateRegister, isValidated, createUser)
router.post('/users/login', validateLogin, isValidated, authUser)

router.get('/users/logout', auth, logoutUser)
router.get('/users/logoutall', auth, logoutAllUserSession)

router
  .route('/users/profile')
  .get(auth, getUserProfile)
  .put(auth, updateUserProfile)
router.route('/users/').post(auth, admin, getUsers)

export default router
