import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './containers/Home/Home'
import Signin from './containers/Signin/Signin'
import Signup from './containers/Signup/Signup'
import authUser from './store/actions/user.auth'
import { useDispatch } from 'react-redux'
import authWrapper from './components/Hoc/authWrapper'

const App = () => {
  // Authenticate user everytime the app starts
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authUser())
  }, [])

  const adminRoute = true
  const publicRoute = false

  return (
    <div className="app">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={authWrapper(Signup, publicRoute)} />
        <Route path="/signin" component={authWrapper(Signin, publicRoute)} />
      </BrowserRouter>
    </div>
  )
}

export default App
