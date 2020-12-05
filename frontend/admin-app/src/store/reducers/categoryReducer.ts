import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_SUCCESS
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

    // UPDATE CATEGORY OR CATEGORIES
    case CATEGORY_UPDATE_SUCCESS: {
      return {
        ...state,
        updatedCategory: action.payload,
        categoryUpdateError: null
      }
    }
    case CATEGORY_UPDATE_FAIL: {
      return {
        ...state,
        updatedCategory: null,
        categoryUpdateError: action.payload
      }
    }

    // DELETE CATEGORY OR CATEGORIES
    case CATEGORY_DELETE_SUCCESS: {
      return {
        ...state,
        categoryDeleteResult: action.payload,
        categoryDeleteError: null
      }
    }
    case CATEGORY_DELETE_FAIL: {
      return {
        ...state,
        categoryDeleteResult: null,
        categoryDeleteError: action.payload
      }
    }

    default:
      return state
  }
}

export default categoryReducer
