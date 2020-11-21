import axiosHelper from '../../helpers/axios'
import { USER_REGISTER_FAIL, USER_REGISTER_SUCCESS } from '../constants/user'

const registerUser = (email, password, firstname, lastname) => async (
  dispatch
) => {
  try {
    const currentUser = await (
      await axiosHelper.post('/users/register', {
        email,
        password,
        firstname,
        lastname
      })
    ).data

    dispatch({ type: USER_REGISTER_SUCCESS, payload: currentUser })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message
    })
  }
}

export default registerUser
