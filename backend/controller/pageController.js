import expressAsyncHandler from 'express-async-handler'
import Page from '../models/pageModel.js'

export const createPage = expressAsyncHandler(async (req, res) => {
  try {
    const { title, description, category, type } = req.body
    const page = new Page({
      title,
      description,
      category,
      createdBy: req.user._id
    })

    if (req.files) {
      const { banners, products } = req.files
      if (banners?.length > 0) {
        page.bannerImages = banners.map((banner, i) => {
          return {
            img: banner.filename,
            navigateTo: `/bannerClicked?categoryId=${category}&type=${type}`
          }
        })
      }

      if (products?.length > 0) {
        page.productImages = products.map((products) => {
          return {
            img: products.filename,
            navigateTo: `/producteClicked?categoryId=${category}&type=${type}`
          }
        })
      }
    }

    const savedPage = await page.save()
    res.send(savedPage)
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})
