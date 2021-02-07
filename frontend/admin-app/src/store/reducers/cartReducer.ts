import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD
} from '../constants/cart'

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const newItem = action.payload

      // if newItem is already in the cartItems, then replace the old item with the new one
      const itemExists = state.cartItems.find(
        (currentItem) => currentItem.productId === newItem.productId
      )
      if (itemExists) {
        return {
          ...state,
          cartItems: [...state.cartItems].map((currentItem) => {
            if (currentItem.productId === newItem.productId) {
              currentItem.qty = currentItem.qty + newItem.qty
              return currentItem
            }
            return currentItem
          })
        }
      }

      return {
        ...state,
        cartItems: [...state.cartItems, newItem]
      }
    }
    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: [...state.cartItems].filter(
          (item) => item.product !== action.payload
        )
      }
    }
    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload
      }
    }

    case 'CART_RESET': {
      return {
        ...state,
        cartItems: []
      }
    }

    default:
      return state
  }
}

export default cartReducer
