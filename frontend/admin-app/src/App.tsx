import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './containers/Home/Home'
import Signin from './containers/Signin/Signin'
import Signup from './containers/Signup/Signup'
import authUser from './store/actions/user.auth'
import { useDispatch } from 'react-redux'
import authWrapper from './components/Hoc/authWrapper'
import ProductListScreen from './containers/ProductListScreen/ProductListScreen'

const App = () => {
  // Authenticate user everytime the app starts
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authUser())
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        {/* Component, privateRoute, adminRoute */}
        <Route path="/signup" component={authWrapper(Signup, false, false)} />
        <Route path="/signin" component={authWrapper(Signin, false, false)} />

        <Route
          path="/productlist"
          component={authWrapper(ProductListScreen, true, true)}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
