import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './containers/Home/Home'
import Signin from './containers/Signin/Signin'
import Signup from './containers/Signup/Signup'
import authUser from './store/actions/user.auth'
import { useDispatch } from 'react-redux'

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
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </BrowserRouter>
    </div>
  )
}

export default App
