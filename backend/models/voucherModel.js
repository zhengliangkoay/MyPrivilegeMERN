import mongoose from 'mongoose'

const voucherSchema = mongoose.Schema(
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
    subtitle: {
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
    },
    promoCode: {
        type: String,
        required: true,
    },
    stampsNeeded: {
        type: Number,
        required: true,
    },
    isVoucherRedeem: {
      type: Boolean,
      default: false
  },
  },
  {
    timestamps: true,
  }
)

const Voucher = mongoose.model('Voucher', voucherSchema)

export default Voucher