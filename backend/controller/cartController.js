import expressAsyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'
import { organizeCategory } from './controllerUtils.js'

export const addToCart = expressAsyncHandler(async (req, res) => {
  try {
    const newItem = req.body.cartItem
    const cartExist = await Cart.findOne({ user: req.user._id })

    // If Cart Exists
    if (cartExist) {
      // check every item if item already in the cart
      const cartItemExist = cartExist.cartItems.find(
        (i) => i.product == newItem.product
      )
      // If item is in the cart, add quantity to that item
      if (cartItemExist) {
        const updatedCartItems = cartExist.cartItems.map((currentItem) => {
          return currentItem.product == newItem.product
            ? {
                ...currentItem._doc,
                quantity: currentItem.quantity + newItem.quantity
              }
            : currentItem
        })
        cartExist.cartItems = updatedCartItems
        const updatedCart = await cartExist.save()
        return res.send(updatedCart)
      }
      // If item is new, push to cartItems
      cartExist.cartItems = [...cartExist.cartItems, newItem]
      const updatedCart = await cartExist.save()
      return res.status(201).send(updatedCart)
    } else {
      // Cart is new
      const cart = new Cart({
        ...req.body,
        user: req.user._id,
        cartItems: [req.body.cartItem]
      })

      const scart = await cart.save()
      return res.status(201).send(scart)
    }
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})
