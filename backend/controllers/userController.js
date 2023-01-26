import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    const user = await User.findOne({email}) 
    //if the unique email is exisited

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            currentStamps: user.currentStamps,
            stampsCollectHistory: user.stampsCollectHistory,
        })

    }
    else {
        res.status(401)
        throw new Error ('Invalid email or password')
    }
    
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        currentStamps: user.currentStamps,
        stampsCollectHistory: user.stampsCollectHistory,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400) //bad request 
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      email,
      password,
    })
   
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        currentStamps: user.currentStamps,
        stampsCollectHistory: user.stampsCollectHistory,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  // res.json(user)
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Create new feedback
// @route   POST /api/users/:id/feedback
// @access  Private
const createUserFeedback = asyncHandler(async (req, res) => {
  const { category, comment } = req.body

  const user = await User.findById(req.params.id)

  if (user) {

    const feedback = {
      name: req.user.name,
      category,
      comment,
      user: req.user._id,
    }

    user.feedbacks.push(feedback)

    user.numFeedbacks = user.feedbacks.length
    
    await user.save()
    res.status(201).json({ message: 'Feedback added' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Fetch one user stamp
// @route   GET /api/users/:id/stamp
// @access  Public
const getStampById = asyncHandler(async (req, res) => {
    
  const user = await User.findById(req.params.id)

  if(user){
      res.json({user})
  }
  else {
      res.status(404)
      throw new Error('Fail to get stamp')
  }  
})

// // @desc    Add & Update new stamp to user
// // @route   PUT /api/users/:userId/stamp/add
// // @access  Private/Admin
const updateStamp = asyncHandler(async (req, res) => {

  const {noOfStampEarned} = req.body

  const user = await User.findById(req.params.userId)

  if( !user ){
    res.status(404)
    throw new Error('Fail to find user')
  } else {
        const stampCount = user.currentStamps;
        console.log("Current stamps: " + stampCount)
        
        const newTotal = stampCount + parseInt(noOfStampEarned);
        console.log("New total(<10): " + newTotal)
        
        user.currentStamps = newTotal

        const stamp = {
          stampsAdded : noOfStampEarned,
          createdUsername: req.user.name,
          user: req.user._id,
        }

        user.stampsCollectHistory.push(stamp)
        const updatedStamp = await user.save()
        res.json(updatedStamp)
    }
})

// // @desc    Redeem stamp
// // @route   PUT /api/users/:userId/stamp/redeem
// // @access  Private
const redeemStamp = asyncHandler(async (req, res) => {

  const {noOfStampRedeem} = req.body

  const user = await User.findById(req.params.userId)

  if( !user ){
    res.status(404)
    throw new Error('Fail to find user')
  } else {
    const stampCount = user.currentStamps;
    if ( stampCount >= parseInt(noOfStampRedeem) ) {
      if( parseInt(noOfStampRedeem) == 1 ){
        const newTotal = stampCount - parseInt(noOfStampRedeem);
        user.currentStamps = newTotal
        console.log("Free 1 drink")

        const stampRedeem = {
          stampsRedeem : parseInt(noOfStampRedeem),
          createdUsername: req.user.name,
          user: req.user._id,
        }
        user.stampsCollectHistory.push(stampRedeem)
      }
      else if ( parseInt(noOfStampRedeem) == 3 ){
        const newTotal = stampCount - parseInt(noOfStampRedeem);
        user.currentStamps = newTotal
        console.log("Free 1 chicken burger")

        const stampRedeem = {
          stampsRedeem : parseInt(noOfStampRedeem),
          createdUsername: req.user.name,
          user: req.user._id,
        }
        user.stampsCollectHistory.push(stampRedeem)
      }
      else if ( parseInt(noOfStampRedeem) == 5 ){
        const newTotal = stampCount - parseInt(noOfStampRedeem);
        user.currentStamps = newTotal
        console.log("Free 1 pasta")

        const stampRedeem = {
          stampsRedeem : parseInt(noOfStampRedeem),
          createdUsername: req.user.name,
          user: req.user._id,
        }
        user.stampsCollectHistory.push(stampRedeem)
      }
      else if ( parseInt(noOfStampRedeem) == 10 ){
        const newTotal = stampCount - parseInt(noOfStampRedeem);
        user.currentStamps = newTotal
        console.log("Free 1 pizza")

        const stampRedeem = {
          stampsRedeem : parseInt(noOfStampRedeem),
          createdUsername: req.user.name,
          user: req.user._id,
        }
        user.stampsCollectHistory.push(stampRedeem)
      }
      
      const updatedStamp = await user.save()
      res.json(updatedStamp)
    } else {
      res.status(404)
      throw new Error('Stamp is not enough for redemption. Spend to earn more stamps.')
    }
  }
})

export{
  authUser, 
  getUserProfile, 
  registerUser, 
  updateUserProfile, 
  getUsers, 
  deleteUser, 
  getUserById,
  updateUser,
  createUserFeedback,
  getStampById,
  updateStamp,
  redeemStamp,
}