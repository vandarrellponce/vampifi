import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'
import { PAGE_GET_FAIL, PAGE_GET_SUCCESS } from '../constants/page'

const getPage = ({ category, type }) => async (dispatch) => {
  try {
    const page = await (await axiosHelper.get(`/page/${category}/${type}`)).data
    dispatch({ type: PAGE_GET_SUCCESS, payload: page })
    return page
  } catch (error) {
    dispatch({ type: PAGE_GET_FAIL, payload: defineError(error) })
  }
}

export default getPage
