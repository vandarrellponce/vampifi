import Axios from 'axios'
import { USER_LOGOUT, USER_LOGOUT_FAIL } from '../constants/user'

export const logoutUser = () => async (dispatch, getState) => {
  try {
    await Axios.get('/api/users/logout')
    dispatch({ type: USER_LOGOUT })
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message
    })
  }
}

export default logoutUser
