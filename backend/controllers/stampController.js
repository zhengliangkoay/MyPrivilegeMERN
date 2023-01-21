import asyncHandler from "express-async-handler"
import Stamp from '../models/stampModel.js'
import User from "../models/userModel.js"
import { format } from "morgan"

// @desc    Fetch one user stamp
// @route   GET /api/stamp/:id
// @access  Public
const getStampById = asyncHandler(async (req, res) => {
    
    const stamp = await Stamp.findById(req.params.id)

    if(stamp){
        res.json({stamp})
    }
    else {
        res.status(404)
        throw new Error('Failed to find user')
    }  
})

// @desc    Add new stamp to user
// @route   POST /api/stamp/:id
// @access  Private
const addStamp = asyncHandler(async (req, res) => {

    const stamp = new Stamp({
        adminId: req.user._id,
        stampCount: 0,
        createdDate: format(new Date(), 'dd/MM/yyyy'),
        createdTime: format(new Date(), 'HH:mm:ss')
      })

    const createdStamp = await stamp.save()
      res.status(201).json(createdStamp)

    })

// @desc    Update stamp to user
// @route   PUT /api/stamp/:id
// @access  Private/Admin
const updateStamp = asyncHandler(async (req, res) => {

    const {numberOfStamps} = req.body

    const user = await User.findOne({ id: userId });
    // const user = await User.findById(userId);
    const admin = await User.findOne({ id: adminId });
    const singleTransactionObject = {
        stamp_count: parseInt(numberOfStamps),
        admin_user: admin.id,
        created_date: format(new Date(), 'dd/MM/yyyy'),
        created_time: format(new Date(), 'HH:mm:ss')
      };
    
    if (!user) {
        res.status(401).json({
          success: false,
          message: 'Failed to find user',
        });
    } else if (!admin.isAdmin) {
        res.status(401).json({
        success: false,
        message: 'User not an admin',
    });
    } else {
        let currentStamps = parseInt(user.current_stamps);
        if (currentStamps < 10) {
          let newTotal = currentStamps + parseInt(numberOfStamps);
          if (newTotal < 10) {
            // Updates the stamps amount
            // Updates the transactions array
                user.current_stamps = newTotal
                
             
          }
        }
    }
})

export {
    getStampById,
    addStamp,
    updateStamp
}