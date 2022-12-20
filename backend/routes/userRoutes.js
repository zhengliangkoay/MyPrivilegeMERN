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
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin ,getUsers)
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

export default router