import {
  PAGE_CREATE_FAIL,
  PAGE_CREATE_SUCCESS,
  PAGE_GET_FAIL,
  PAGE_GET_SUCCESS
} from '../constants/page'

const initState = {
  createdPage: null,
  createPageError: null,

  fetchedPage: null,
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
        fetchedPage: action.payload,
        getPageError: null
      }
    }
    case PAGE_GET_FAIL: {
      return {
        ...state,
        fetchedPage: null,
        getPageError: action.payload
      }
    }

    default:
      return state
  }
}

export default pageReducer
