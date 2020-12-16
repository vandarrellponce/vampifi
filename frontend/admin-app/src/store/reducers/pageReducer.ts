import {
  PAGE_CREATE_FAIL,
  PAGE_CREATE_SUCCESS,
  PAGE_GET_FAIL,
  PAGE_GET_SUCCESS
} from '../constants/page'

const initState = {
  createdPage: null,
  createPageError: null,

  page: null,
  getPageError: null
}

const pageReducer = (state = initState, action) => {
  switch (action.type) {
    // CREATE PAGE
    case PAGE_CREATE_SUCCESS: {
      return {
        ...state,
        createdPage: action.payload,
        createPageError: null
      }
    }
    case PAGE_CREATE_FAIL: {
      return {
        ...state,
        createdPage: null,
        createPageError: action.payload
      }
    }

    // GET PAGE
    case PAGE_GET_SUCCESS: {
      return {
        ...state,
        page: action.payload,
        getPageError: null
      }
    }
    case PAGE_GET_FAIL: {
      return {
        ...state,
        page: null,
        getPageError: action.payload
      }
    }

    default:
      return state
  }
}

export default pageReducer
