import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    parentId: {
      type: String
    },
    imageUrl: {
      type: String
    },
    displayType: {
      type: String,
      default: 'page'
    }
  },

  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
