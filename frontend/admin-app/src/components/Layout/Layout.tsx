import React from 'react'
import Toolbar from '../Header/Toolbar/Toolbar'
import './Layout.css'

const Layout = (props) => {
  return (
    <div>
      <Toolbar />
      {props.children}
    </div>
  )
}

export default Layout
