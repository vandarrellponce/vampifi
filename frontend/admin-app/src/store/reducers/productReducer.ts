import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS
} from '../constants/product'

const initState = {
  createdProduct: null,
  productCreateError: null
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    // GET CATEGORIES
    case PRODUCT_CREATE_SUCCESS: {
      return {
        ...state,
        createdProduct: action.payload,
        productCreateError: null
      }
    }
    case PRODUCT_CREATE_FAIL: {
      return {
        ...state,
        createdProduct: null,
        productCreateError: action.payload
      }
    }

    default:
      return state
  }
}

export default productReducer
