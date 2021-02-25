import axiosHelper from '../../helpers/axios'
import { CART_ADD_ITEM } from '../constants/cart'

const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const product = await (await axiosHelper.get(`/products/${id}`)).data
    const item = {
      name: product.name,
      qty: qty,
      image: product.images[0].img,
      price: product.price,
      countInStock: product.countInStock,
      productId: product._id
    }
    // DISPATCH AND SAVE TO LOCAL STORAGE
    dispatch({ type: CART_ADD_ITEM, payload: item })
    localStorage.setItem(
      'flipkart_cartItems',
      JSON.stringify(getState().cart.cartItems)
    )
  } catch (error) {
    console.log(error)
  }
}

export const alterQuantity = (id, qty) => async (dispatch, getState) => {
  try {
    const cartItems = getState().cart.cartItems
    const itemFromState = cartItems.find((item) => item.productId === id)

    const item = {
      name: itemFromState.name,
      qty: qty,
      image: itemFromState.image,
      price: itemFromState.price,
      countInStock: itemFromState.countInStock,
      productId: itemFromState.productId
    }
    // DISPATCH AND SAVE TO LOCAL STORAGE
    dispatch({ type: CART_ADD_ITEM, payload: item })
    localStorage.setItem(
      'flipkart_cartItems',
      JSON.stringify(getState().cart.cartItems)
    )
  } catch (error) {
    console.log(error)
  }
}

export default addToCart
