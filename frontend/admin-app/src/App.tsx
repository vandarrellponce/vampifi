import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Signin from './containers/Signin/Signin'
import Signup from './containers/Signup/Signup'
import authUser from './store/actions/user.auth'
import { useDispatch } from 'react-redux'
import authWrapper from './components/Hoc/authWrapper'
import ProductListScreen from './containers/ProductListScreen/ProductListScreen'
import OrderListScreen from './containers/OrderlistScreen/OrderListScreen'
import UserListScreen from './containers/UserListScreen/UserListScreen'
import CategoryListSceen from './containers/CategoryListScreen/CategoryListSceen'
import ProductEditScreen from './containers/ProductEditScreen/ProductEditScreen'
import AdminHome from './containers/AdminHome/AdminHome'
import Toolbar from './components/Header/Toolbar/Toolbar'
import MenuHeader from './components/MenuHeader/MenuHeader'
import ClientHome from './containers/ClientHome/ClientHome'

const App = () => {
  // Authenticate user everytime the app starts
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authUser())
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        {/* PUBLIC ROUTES */}
        <Toolbar />

        {/* Component, privateRoute, adminRoute */}
        <Route path="/" exact component={ClientHome} />
        <Route path="/signup" component={authWrapper(Signup, false, false)} />
        <Route path="/signin" component={authWrapper(Signin, false, false)} />

        {/* ADMIN ROUTES */}
        <Route
          exact
          path="/admin"
          component={authWrapper(AdminHome, true, true)}
        />
        <Route
          path="/admin/productlist"
          component={authWrapper(ProductListScreen, true, true)}
        />
        <Route
          path="/admin/orderlist"
          component={authWrapper(OrderListScreen, true, true)}
        />
        <Route
          path="/admin/userlist"
          component={authWrapper(UserListScreen, true, true)}
        />
        <Route
          path="/admin/categorylist"
          component={authWrapper(CategoryListSceen, true, true)}
        />
        <Route
          path="/admin/products/:productId/edit"
          component={authWrapper(ProductEditScreen, true, true)}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
