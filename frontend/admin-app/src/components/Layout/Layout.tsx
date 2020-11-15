import React from 'react'
import BHeader from '../BHeader/BHeader'
import './Layout.css'

const Layout = (props) => {
  return (
    <div>
      <BHeader />
      {props.children}
    </div>
  )
}

export default Layout
