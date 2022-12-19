import express from 'express'
const router = express.Router()
import { authUser,getUserProfile,registerUser,updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router
    .route('/profile')
    .get(protect, getUserProfile) //protect means protect middleware, put the middleware as the first argument to implement it
    .put(protect,updateUserProfile)
router.route('/').post(registerUser)


export default router