import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'
import {
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_SUCCESS
} from '../constants/category'

const deleteCategoriesAction = (idArray) => async (dispatch) => {
  try {
    const res = await (await axiosHelper.post('/category/delete', { idArray }))
      .data
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: defineError(error) })
  }
}

export default deleteCategoriesAction
