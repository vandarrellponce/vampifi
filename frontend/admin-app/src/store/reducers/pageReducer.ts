import { PAGE_CREATE_FAIL, PAGE_CREATE_SUCCESS } from '../constants/page'

const initState = {
  createdPage: null,
  createPageError: null
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

    default:
      return state
  }
}

export default pageReducer
