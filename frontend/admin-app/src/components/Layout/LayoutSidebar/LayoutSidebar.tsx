import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './LayoutSidebar.css'

const LayoutSidebar = (props) => {
  const { currentUserInfo } = useSelector((state) => state.user)
  return (
    <div className="layout__sidebar">
      <nav className="layout__sidebar__container1">
        {currentUserInfo ? (
          <div style={{ width: '100%' }}>
            <div className="layout__sidebar__container1__title">
              User Controls
            </div>
            {/* NOTIFICATION */}
            <Link to="/" className="layout__sidebar__link">
              <div className="layout__sidebar__nav__item" tabIndex={1}>
                &#x1F514; Notifications
                <Badge variant="secondary" className="toolbar__badge">
                  {props.totalNotifs > 0 ? props.totalNotifs : null}
                </Badge>
              </div>
            </Link>

            {/* CART */}
            <Link to="/cart" className="layout__sidebar__link">
              <div className="layout__sidebar__nav__item" tabIndex={1}>
                &#x1F6D2; Cart
                <Badge variant="primary" className="toolbar__badge">
                  {/*  {props.cartItems.length > 0 ? props.cartItems.length : null} */}
                </Badge>
              </div>
            </Link>
            {/* PROFILE */}
            <Link to="/profile" className="layout__sidebar__link">
              <div className="layout__sidebar__nav__item" tabIndex={1}>
                &#x1F973; Profile
              </div>
            </Link>
            <Link
              to="/"
              className="layout__sidebar__link"
              /* onClick={logoutHandler} */
            >
              <div className="layout__sidebar__nav__item" tabIndex={1}>
                &#x1F97A; Logout
              </div>
            </Link>
          </div>
        ) : (
          <Link to="/signin" className="layout__sidebar__link">
            <div className="layout__sidebar__nav__item" tabIndex={1}>
              Login
            </div>
          </Link>
        )}
      </nav>
      {currentUserInfo?.isAdmin && (
        <nav className="layout__sidebar__container1">
          <div className="layout__sidebar__container1__title">
            Admin Controls
          </div>
          <Link to="/admin/page" className="layout__sidebar__link">
            <div className="layout__sidebar__nav__item" tabIndex={1}>
              &#x1F4C4; Page
            </div>
          </Link>
          <Link to="/admin/orderlist" className="layout__sidebar__link">
            <div className="layout__sidebar__nav__item" tabIndex={1}>
              &#x1F911; Orders
            </div>
          </Link>
          <Link to="/admin/productlist" className="layout__sidebar__link">
            <div className="layout__sidebar__nav__item" tabIndex={1}>
              &#x1F964; Products
            </div>
          </Link>
          <Link to="/admin/userlist" className="layout__sidebar__link">
            <div className="layout__sidebar__nav__item" tabIndex={1}>
              &#x1F465; Customers
            </div>
          </Link>
          <Link to="/admin/categorylist" className="layout__sidebar__link">
            <div className="layout__sidebar__nav__item" tabIndex={1}>
              &#x1F5C3; Categories
            </div>
          </Link>
        </nav>
      )}
    </div>
  )
}

export default LayoutSidebar
