import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS
} from '../constants/category'

const getCategories = () => async (dispatch) => {
  try {
    const categories = await (await axiosHelper.get('/category')).data
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: categories })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: defineError(error)
    })
  }
}

export default getCategories
