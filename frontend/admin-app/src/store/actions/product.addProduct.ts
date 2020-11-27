import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS
} from '../constants/product'

const addProduct = (product) => async (dispatch) => {
  try {
    const newProduct = await (
      await axiosHelper.post('/admin/products', product)
    ).data
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: newProduct })
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: defineError(error) })
  }
}

export default addProduct
