import express from 'express'
import { 
  createVoucher,
  deleteVoucher,
  getVoucherById,
  getVouchers,
  updateVoucher
} from '../controllers/voucherController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()


router
    .route('/')
    .get(getVouchers)
    .post(protect, admin, createVoucher)

router
    .route('/:id')
    .get(getVoucherById)
    .put(protect,admin,updateVoucher)
    .delete(protect, admin, deleteVoucher)

export default router