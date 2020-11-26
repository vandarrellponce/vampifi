import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS
} from '../constants/category'

const initState = {
  categoryList: null,
  categoryListError: null,
  createdCategory: null,
  categoryCreateError: null
}

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    // GET CATEGORIES
    case CATEGORY_LIST_SUCCESS: {
      return {
        ...state,
        categoryList: action.payload
      }
    }
    case CATEGORY_LIST_FAIL: {
      return {
        ...state,
        categoryList: null,
        categoryListError: action.payload
      }
    }

    // CREATE CATEGORY
    case CATEGORY_CREATE_SUCCESS: {
      return {
        ...state,
        createdCategory: action.payload,
        categoryCreateError: null
      }
    }
    case CATEGORY_CREATE_FAIL: {
      return {
        ...state,
        createdCategory: null,
        categoryCreateError: action.payload
      }
    }

    default:
      return state
  }
}

export default categoryReducer
