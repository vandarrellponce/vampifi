import expressAsyncHandler from 'express-async-handler'
import Page from '../models/pageModel.js'

export const createPage = expressAsyncHandler(async (req, res) => {
  try {
    const { title, description, category, type } = req.body
    const existingPage = await Page.findOne({ category })

    if (req.files) {
      const { banners, products } = req.files
      if (banners?.length > 0) {
        req.body.bannerImages = banners.map((banner, i) => {
          return {
            img: banner.filename,
            navigateTo: `/bannerClicked?categoryId=${category}&type=${type}`
          }
        })
      } else {
        req.body.bannerImages = []
      }

      if (products?.length > 0) {
        req.body.productImages = products.map((products) => {
          return {
            img: products.filename,
            navigateTo: `/producteClicked?categoryId=${category}&type=${type}`
          }
        })
      } else {
        req.body.productImages = []
      }
    }

    if (existingPage) {
      const updatedPage = await Page.findOneAndUpdate({ category }, req.body, {
        new: true,
        useFindAndModify: false
      })
      return res.send(updatedPage)
    }
    const page = new Page({
      title,
      description,
      category,
      createdBy: req.user._id,
      bannerImages: req.body.bannerImages,
      productImages: req.body.productImages
    })
    const savedPage = await page.save()
    res.send(savedPage)
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})

export const getPageByCategory = expressAsyncHandler(async (req, res) => {
  const { category, type } = req.params

  try {
    if (type === 'page') {
      const page = await Page.findOne({ category })
      return res.send(page)
    }
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})
