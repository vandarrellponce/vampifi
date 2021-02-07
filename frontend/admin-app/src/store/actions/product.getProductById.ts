import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'
import {
  PRODUCT_GETBYID_FAIL,
  PRODUCT_GETBYID_SUCCESS
} from '../constants/product'

const getProductById = (productId) => async (dispatch) => {
  try {
    const product = await (await axiosHelper.get(`/products/${productId}`)).data
    dispatch({ type: PRODUCT_GETBYID_SUCCESS, payload: product })
  } catch (error) {
    dispatch({ type: PRODUCT_GETBYID_FAIL, payload: defineError(error) })
  }
}

export default getProductById

export const queryProductById = (productId) => async () => {
  const product = await (await axiosHelper.get(`/products/${productId}`)).data
  console.log(product)
  return product
}
