import expressAsyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import slugify from 'slugify'
import shortId from 'shortid'
import { organizeCategory } from './controllerUtils.js'

// @desc	Create Category
// @route	GET /api/category/create
// @access	Private, Admin
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(`${req.body.name}-${shortId.generate()}`)
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

// @desc	Update Category
// @route	PUT /api/category/updateMany
// @access	Private/Admin
export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { name, parentId, displayType, _id } = req.body
  const updates = Object.keys(req.body)
  console.log(req.body)

  const allowedUpdates = ['name', 'parentId', 'imageUrl', 'displayType', '_id']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  try {
    const updateCategories = []
    if (!isValidOperation) throw new Error('Invalid update fields')
    if (name instanceof Array) {
      for (let i = 0; i < name.length; i++) {
        const newCategory = {
          name: name[i],
          displayType: displayType[i],
          slug: slugify(name[i])
        }
        if (parentId) {
          newCategory.parentId = parentId[i]
        }
        const updated = await Category.findOneAndUpdate(
          { _id: _id[i] },
          newCategory,
          {
            new: true
          }
        )
        updateCategories.push(updated)
      }
      return res.send(updateCategories)
    } else {
      const newCategory = {
        name,
        slug: slugify(name),
        displayType
      }
      if (parentId) {
        newCategory.parentId = parentId
      }

      const updated = await Category.findOneAndUpdate({ _id }, newCategory, {
        new: true
      })
      return res.send(updated)
    }
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})

// @desc	Delete Category or Categories
// @route	POST /api/category/delete
// @access	Private/Admin
export const deleteCategories = expressAsyncHandler(async (req, res) => {
  const { idArray } = req.body
  console.log(idArray)
  try {
    const deletedCategories = []
    for (let i = 0; i < idArray.length; i++) {
      const deletedItem = await Category.findByIdAndDelete(idArray[i])
      deletedCategories.push(deletedItem)
    }
    if (deletedCategories.length !== idArray.length)
      throw new Error('Error in deleting categories')
    res.send({ message: 'Deletion success' })
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})
