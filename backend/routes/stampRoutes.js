import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {getStampById,addStamp,updateStamp } from '../controllers/stampController.js'

router
    .route('/:id')
    .get(getStampById)

router
    .route('/')
    .post(protect, admin, addStamp)

export default router