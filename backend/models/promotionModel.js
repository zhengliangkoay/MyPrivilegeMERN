import mongoose from 'mongoose'

const promotionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    //   reference to specific model, which is UserModel
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }, 
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

const Promotion = mongoose.model('Promotion', promotionSchema)

export default Promotion