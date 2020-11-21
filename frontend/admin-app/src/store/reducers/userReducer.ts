import {
  USER_AUTH_FAIL,
  USER_AUTH_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGOUT_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS
} from '../constants/user'

const initState = {
  currentUserInfo: null,
  loginError: null,
  authError: null,

  logoutError: null,
  registerError: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    // USER LOGIN
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        currentUserInfo: action.payload,
        loginError: null,
        authError: null
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
        authError: null,
        loginError: null
      }
    }
    case USER_AUTH_FAIL: {
      return {
        ...state,
        currentUserInfo: null,
        authError: action.payload
      }
    }
    // USER LOGOUT
    case USER_LOGOUT: {
      return {}
    }
    case USER_LOGOUT_FAIL: {
      return {
        ...state,
        logoutError: action.payload
      }
    }

    // USER REGISTER:
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        currentUserInfo: action.payload,
        registerError: null,
        authError: null
      }
    }

    case USER_REGISTER_FAIL: {
      return {
        ...state,
        currentUserInfo: null,
        registerError: action.payload
      }
    }
    default:
      return state
  }
}

export default userReducer
