import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const feedbackSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const stampSchema = mongoose.Schema(
  {
    stampsAdded: {
      type: Number,
    },
    stampsRedeem: {
      type: Number,
    },
    createdUsername: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    feedbacks: [feedbackSchema],
    numFeedbacks: {
      type: Number,
      required: true,
      default: 0,
    },
    currentStamps: {
      type: Number,
      required: true,
      default: 0,
    },
    stampsCollectHistory: [stampSchema],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//happen before save, so use .pre
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User