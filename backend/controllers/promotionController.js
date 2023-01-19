import asyncHandler from "express-async-handler"
import Promotion from '../models/promotionModel.js'

// @desc    Fetch all promotion news
// @route   GET /api/promotion
// @access  Public
const getPromotion = asyncHandler(async (req, res) => {
  
  const promotions = await Promotion.find()

  res.json({promotions})
})

// @desc    Fetch single promotion news
// @route   GET /api/promotion/:id
// @access  Public
const getPromotionById = asyncHandler(async (req, res) => {
    const promotion = await Promotion.findById(req.params.id)

    if(promotion){
        res.json(promotion)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }  
})

// @desc    Create a promotion news
// @route   POST /api/promotion
// @access  Private/Admin
const createPromotion = asyncHandler(async (req, res) => {
    const promotion = new Promotion({
      title: 'Sample name',
      description:'Sample description',
      user: req.user._id,
      image: '/images/sample.jpg'
    })
  
    const createdPromotion = await promotion.save()
    res.status(201).json(createdPromotion)
  })

// @desc   Update a promotion news
// @route  PUT /api/promotion/:id
// @access  Private/Admin
const updatePromotion = asyncHandler(async (req, res) => {
    const {
      title,
      description,
      image
    } = req.body
  
    const promotion = await Promotion.findById(req.params.id)
  
    if (promotion) {
      promotion.title = title
      promotion.description = description
      promotion.image = image
  
      const updatedPromotion = await promotion.save()
      res.json(updatedPromotion)
    } else {
      res.status(404)
      throw new Error('Promotion news not found')
    }
  })

// @desc    Delete a promotion news
// @route   DELETE /api/promotion/:id
// @access  Private/Admin
const deletePromotion = asyncHandler(async (req, res) => {
    const promotion = await Promotion.findById(req.params.id)
  
    if (promotion) {
      await promotion.remove()
      res.json({ message: 'Promotion news removed' })
    } else {
      res.status(404)
      throw new Error('Promotion news not found')
    }
  })

export {
    getPromotion,
    createPromotion,
    updatePromotion,
    getPromotionById,
    deletePromotion
  }