import expressAsyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import slugify from 'slugify'
import { organizeCategory } from './controllerUtils.js'

// @desc	Create Category
// @route	GET /api/category/create
// @access	Private, Admin
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name)
    }

    if (req.file) categoryObj.imageUrl = `/${req.file.path}`

    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId
    }

    const category = new Category(categoryObj)
    const savedCategory = await category.save()
    res.status(201).send({ category: savedCategory })
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})

// @desc	Get all categories
// @route	GET /api/category
// @access	Public
export const getCategories = async (_, res) => {
  try {
    const categories = await Category.find()
    const categoryList = organizeCategory(categories)
    res.send(categoryList)
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
}
