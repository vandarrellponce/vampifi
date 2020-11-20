import axiosHelper from '../../helpers/axios'
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from '../constants/user'

const loginUser = (email, password) => async (dispatch) => {
  try {
    const currentUser = await (
      await axiosHelper.post('/users/login', { email, password })
    ).data
    dispatch({ type: USER_LOGIN_SUCCESS, payload: currentUser })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message
    })
  }
}

export default loginUser
