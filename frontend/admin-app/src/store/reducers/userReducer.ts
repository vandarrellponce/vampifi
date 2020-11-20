import {
  USER_AUTH_FAIL,
  USER_AUTH_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS
} from '../constants/user'

const initState = {
  currentUserInfo: null,
  loginError: null,
  authError: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    // USER LOGIN
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        currentUserInfo: action.payload,
        loginError: null
      }
    }
    case USER_LOGIN_FAIL: {
      return {
        ...state,
        currentUserInfo: null,
        loginError: action.payload
      }
    }

    // USER AUTH
    case USER_AUTH_SUCCESS: {
      return {
        ...state,
        currentUserInfo: action.payload,
        authError: null
      }
    }
    case USER_AUTH_FAIL: {
      return {
        ...state,
        currentUserInfo: null,
        authError: action.payload
      }
    }
    default:
      return state
  }
}

export default userReducer
