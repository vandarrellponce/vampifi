import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Signin from './containers/Signin/Signin'
import Signup from './containers/Signup/Signup'
import authUser from './store/actions/user.auth'
import { useDispatch, useSelector } from 'react-redux'
import authWrapper from './components/Hoc/authWrapper'
import ProductListScreen from './containers/ProductListScreen/ProductListScreen'
import OrderListScreen from './containers/OrderlistScreen/OrderListScreen'
import UserListScreen from './containers/UserListScreen/UserListScreen'
import CategoryListSceen from './containers/CategoryListScreen/CategoryListSceen'
import ProductEditScreen from './containers/ProductEditScreen/ProductEditScreen'
import AdminHome from './containers/AdminHome/AdminHome'
import Toolbar from './components/Header/Toolbar/Toolbar'
import ClientHome from './containers/ClientHome/ClientHome'
import SlugScreen from './containers/SlugScreen/SlugScreen'
import PageScreen from './containers/PageScreen/PageScreen'
import ProductDetailScreen from './containers/ProductDetailScreen/ProductDetailScreen'
import CartScreen from './containers/CartScreen/CartScreen'

const App = () => {
  // Authenticate user everytime the app starts
  const { currentUserInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!currentUserInfo) dispatch(authUser())
  }, [currentUserInfo])

  return (
    <div className="app">
      {/* Component, privateRoute, adminRoute */}
      <BrowserRouter>
        {/* PUBLIC ROUTES */}
        <Toolbar />

        <Route path="/" exact component={ClientHome} />
        <Route
          exact
          path="/account/signup"
          component={authWrapper(Signup, false, false)}
        />
        <Route
          exact
          path="/account/signin"
          component={authWrapper(Signin, false, false)}
        />
        <Route exact path="/slugs/:slug" component={SlugScreen} />
        <Route
          exact
          path="/products/:slug/:productId"
          component={ProductDetailScreen}
        />

        <Route exact path="/cart" component={CartScreen} />

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
        <Route
          path="/admin/page"
          component={authWrapper(PageScreen, true, true)}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
