import expressAsyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import slugify from 'slugify'

export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name)
    }

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

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.send(categories)
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
}
