import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'
import categoryReducer from './reducers/categoryReducer'
import productReducer from './reducers/productReducer'
import pageReducer from './reducers/pageReducer'

// INITIAL STATE
const initialState = {}
// ROOT REDUCER
const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  page: pageReducer
})
// STORE
const middleware = [thunk]
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
