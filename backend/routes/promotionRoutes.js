import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import { 
    getPromotion,
    createPromotion,
    updatePromotion,
    getPromotionById,
    deletePromotion
} from '../controllers/promotionController.js'

router
    .route('/')
    .get(getPromotion)
    .post(protect, admin, createPromotion)

router
    .route('/:id')
    .get(getPromotionById)
    .put(protect,admin,updatePromotion)
    .delete(protect, admin, deletePromotion)

export default router