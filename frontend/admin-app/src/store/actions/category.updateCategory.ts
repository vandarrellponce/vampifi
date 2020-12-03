import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'
import {
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_SUCCESS
} from '../constants/category'

const updateCategory = (form) => async (dispatch) => {
  try {
    const updatedCategory = await (
      await axiosHelper.put('/category/updateMany', form)
    ).data
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: updatedCategory })
  } catch (error) {
    dispatch({ type: CATEGORY_UPDATE_FAIL, payload: defineError(error) })
  }
}

export default updateCategory
