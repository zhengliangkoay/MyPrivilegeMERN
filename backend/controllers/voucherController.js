import asyncHandler from "express-async-handler"
import Voucher from '../models/voucherModel.js'

// @desc    Fetch all vouchers
// @route   GET /api/vouchers
// @access  Public
const getVouchers = asyncHandler(async (req, res) => {
  
  const vouchers = await Voucher.find()

  res.json({vouchers})
})

// @desc    Fetch single voucher
// @route   GET /api/vouchers/:id
// @access  Public
const getVoucherById = asyncHandler(async (req, res) => {
    const voucher = await Voucher.findById(req.params.id)

    if(voucher){
        res.json(voucher)
    }
    else {
        res.status(404)
        throw new Error('Voucher is not found')
    }  
})

// @desc    Create new voucher
// @route   POST /api/voucher
// @access  Private/Admin
const createVoucher = asyncHandler(async (req, res) => {
  const voucher = new Voucher({
    user: req.user._id,
    title: 'Sample title',
    subtitle: 'Sample subtitle',
    voucherQty: 0,
    image: '/images/sample.jpg',
    stampsNeeded: 0,
    description: 'Sample description',
  })

  const createdVoucher = await voucher.save()
  res.status(201).json(createdVoucher)
})

// @desc    Update a voucher
// @route   PUT /api/voucher/:id
// @access  Private/Admin
const updateVoucher = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    voucherQty,
    description,
    image,
    stampsNeeded
  } = req.body

  const voucher = await Voucher.findById(req.params.id)

  if (voucher) {
    voucher.title = title
    voucher.subtitle = subtitle
    voucher.voucherQty = voucherQty
    voucher.description = description
    voucher.image = image
    voucher.stampsNeeded = stampsNeeded

    const updatedVoucher = await voucher.save()
    res.json(updatedVoucher)
  } else {
    res.status(404)
    throw new Error('Voucher is not found')
  }
})

// @desc    Delete a voucher
// @route   DELETE /api/voucher/:id
// @access  Private/Admin
const deleteVoucher = asyncHandler(async (req, res) => {
  const voucher = await Voucher.findById(req.params.id)

  if (voucher) {
    await voucher.remove()
    res.json({ message: 'Voucher is removed' })
  } else {
    res.status(404)
    throw new Error('Voucher is not found')
  }
})

export {
    getVouchers,
    getVoucherById,
    createVoucher,
    updateVoucher,
    deleteVoucher
  }