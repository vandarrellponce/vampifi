import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_GETBYID_FAIL,
  PRODUCT_GETBYID_SUCCESS,
  PRODUCT_GETBYSLUG_FAIL,
  PRODUCT_GETBYSLUG_SUCCESS
} from '../constants/product'

const initState = {
  createdProduct: null,
  productCreateError: null,

  productsBySlug: null,
  productsBySlugError: null,

  productById: null,
  productByIdError: null
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    // CREATE PRODUCT
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

    // GET PRODUCTS BY SLUG
    case PRODUCT_GETBYSLUG_SUCCESS: {
      const products = action.payload
      return {
        ...state,
        productsBySlug: action.payload,
        productsBySlugError: null,
        productsByPrice: {
          under5k: products.filter((product) => product.price <= 5000),
          under10k: products.filter(
            (product) => product.price > 5000 && product.price <= 10000
          ),
          under15k: products.filter(
            (product) => product.price > 10000 && product.price <= 15000
          ),
          under20k: products.filter(
            (product) => product.price > 15000 && product.price <= 20000
          ),
          under30k: products.filter(
            (product) => product.price > 20000 && product.price <= 30000
          )
        }
      }
    }
    case PRODUCT_GETBYSLUG_FAIL: {
      return {
        ...state,
        productsBySlug: null,
        productsBySlugError: action.payload
      }
    }

    // GET PRODUCT BY ID
    case PRODUCT_GETBYID_SUCCESS: {
      return {
        ...state,
        productById: action.payload,
        productByIdError: null
      }
    }

    case PRODUCT_GETBYID_FAIL: {
      return {
        ...state,
        productById: null,
        productByIdError: action.payload
      }
    }

    default:
      return state
  }
}

export default productReducer
