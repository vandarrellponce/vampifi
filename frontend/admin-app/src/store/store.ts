import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'
import categoryReducer from './reducers/categoryReducer'
import productReducer from './reducers/productReducer'
import pageReducer from './reducers/pageReducer'
import cartReducer from './reducers/cartReducer'

// RETREIVING ITEMS FROM STORAGE
const cartItemsFromStorage = localStorage.getItem('flipkart_cartItems')
  ? JSON.parse(localStorage.getItem('flipkart_cartItems'))
  : []

// INITIAL STATE
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage
  }
}
// ROOT REDUCER
const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  page: pageReducer,
  cart: cartReducer
})
// STORE
const middleware = [thunk]
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
