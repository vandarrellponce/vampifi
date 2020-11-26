import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_SUCCESS
} from '../constants/category'

const addCategory = (form) => async (dispatch) => {
  try {
    const savedCategory = await (
      await axiosHelper.post('/category/create', form)
    ).data
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: savedCategory })
  } catch (error) {
    dispatch({ type: CATEGORY_CREATE_FAIL, payload: defineError(error) })
  }
}

export default addCategory
