import express from 'express'
const router = express.Router()
import { 
  authUser, 
  getUserProfile, 
  registerUser, 
  updateUserProfile, 
  getUsers, 
  deleteUser,
  getUserById,
  updateUser,
  getStampById,
  updateStamp,
  redeemStamp
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
    .post(registerUser)
    .get(protect, admin ,getUsers)

router.post('/login', authUser)

router
    .route('/profile')
    .get(protect, getUserProfile) //protect means protect middleware, put the middleware as the first argument to implement it
    .put(protect, updateUserProfile)

router.route('/').post(registerUser)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  

router
  .route('/:id/stamp')
  .get(protect, getStampById)

router
  .route('/:userId/:adminId/stamp/add')
  .put(protect, admin, updateStamp)

router
  .route('/:userId/:adminId/stamp/redeem')
  .put(protect, admin, redeemStamp)
  

export default router