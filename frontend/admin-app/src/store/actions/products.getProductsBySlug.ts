import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'
import {
  PRODUCT_GETBYSLUG_FAIL,
  PRODUCT_GETBYSLUG_SUCCESS
} from '../constants/product'

const getProductsBySlug = (slug) => async (dispatch) => {
  try {
    const products = await (await axiosHelper.get(`/products/slug/${slug}`))
      .data

    dispatch({ type: PRODUCT_GETBYSLUG_SUCCESS, payload: products })
  } catch (error) {
    dispatch({ type: PRODUCT_GETBYSLUG_FAIL, payload: defineError(error) })
  }
}

export default getProductsBySlug
