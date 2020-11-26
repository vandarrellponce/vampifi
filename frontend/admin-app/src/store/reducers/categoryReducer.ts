import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS
} from '../constants/category'

const initState = {
  categoryList: null,
  categoryListError: null
}

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    // USER LOGIN
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

    default:
      return state
  }
}

export default categoryReducer
