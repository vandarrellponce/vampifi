import mongoose from 'mongoose'

const pageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    bannerImages: [
      {
        img: { type: String },
        navigateTo: { type: String }
      }
    ],
    productImages: [
      {
        img: { type: String },
        navigateTo: { type: String }
      }
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      unique: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },

  { timestamps: true }
)

const Page = mongoose.model('Page', pageSchema)

export default Page
