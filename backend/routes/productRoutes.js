import express from 'express'
const router = express.Router()
import { 
    getProductById,
    getProducts, 
    createProductReview
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProductById, getProducts,deleteProduct,updateProduct,createProduct, createProductReview } from '../controllers/productController.js'

router.route('/:id/reviews').post(protect, createProductReview)
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router