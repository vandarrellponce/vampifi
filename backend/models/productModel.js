import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  { timestamps: true }
)

const productSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
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
    price: {
      type: Number,
      required: true,
      default: 0
    },
    images: [
      {
        img: { type: String }
      }
    ],
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    },
    reviews: [reviewSchema],
    brand: { type: String, required: true },

    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    sizes: [
      {
        name: { type: String, trim: true, lowercase: true },
        price: { type: Number, default: 0 }
      }
    ],
    addons: [
      {
        name: { type: String, trim: true, lowercase: true },
        price: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
