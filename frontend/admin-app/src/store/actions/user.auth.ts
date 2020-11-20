import Axios from 'axios'
import { USER_AUTH_SUCCESS, USER_AUTH_FAIL } from '../constants/user'

const authUser = () => async (dispatch) => {
  try {
    const currentUser = await (await Axios.get('/api/users/profile')).data
    dispatch({ type: USER_AUTH_SUCCESS, payload: currentUser })
  } catch (error) {
    dispatch({
      type: USER_AUTH_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message
    })
  }
}

export default authUser
