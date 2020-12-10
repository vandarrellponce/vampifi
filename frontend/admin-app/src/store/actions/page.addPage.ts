import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'
import { PAGE_CREATE_FAIL, PAGE_CREATE_SUCCESS } from '../constants/page'

const addPage = (pageForm) => async (dispatch) => {
  try {
    const page = await (await axiosHelper.post('/page/create', pageForm)).data
    dispatch({ type: PAGE_CREATE_SUCCESS, payload: page })
  } catch (error) {
    dispatch({ type: PAGE_CREATE_FAIL, payload: defineError(error) })
  }
}

export default addPage
