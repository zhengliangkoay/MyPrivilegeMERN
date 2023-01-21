import mongoose from 'mongoose'

const stampSchema = mongoose.Schema(
{
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        // reference to specific model, which is UserModel
    },
    stampCount: {
        type: Number,
        required: true,
    },
    createdDate: {
        type: String,
    },
    createdTime: {
        type: String,
    }
    },
    {
        timestamps: true,
    }
)

const Stamp = mongoose.model('Stamp', stampSchema)

export default Stamp