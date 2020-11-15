import React from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './containers/Home/Home'
import Signin from './containers/Signin/Signin'
import Signup from './containers/Signup/Signup'

const App = () => {
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
