import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
/* import socketIOClient from 'socket.io-client' */
import { useDispatch } from 'react-redux'
import './Toolbar.css'
import Axios from 'axios'
import Sidebar from '../Sidebar/Sidebar'
import Backdrop from '../Backdrop/Backdrop'
import { CSSTransition } from 'react-transition-group'
import { Badge, Image } from 'react-bootstrap'
import { FiShoppingCart } from 'react-icons/fi'
import { RiNotification2Line } from 'react-icons/ri'
import { BiExit } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FaBars } from 'react-icons/fa'
import { Spring } from 'react-spring/renderprops'
import Submenu from '../Submenu/Submenu'
import SearchBox from '../SearchBox/SearchBox'
import logoutUser from '../../../store/actions/user.logout'
/* const ENDPOINT = '/' */

const Toolbar = () => {
  const { currentUserInfo, authError } = useSelector((state) => state.user)
  // const { cartItems } = useSelector((state) => state.cart)
  const [notifs, setNotifs] = useState([])
  const [totalNotifs, setTotalNotifs] = useState(0)
  const dispatch = useDispatch()

  const getNotifications = () => {
    if (currentUserInfo && currentUserInfo.isAdmin) {
      Axios.get('/api/notifications/admin?limit=10')
        .then((res) => {
          setTotalNotifs(res.data.count)
          setNotifs(res.data.notifs)
        })
        .catch((e) => console.log(e.message))
    }
    if (currentUserInfo && !currentUserInfo.isAdmin) {
      Axios.get(`/api/notifications/user/${currentUserInfo._id}?limit=10`)
        .then((res) => {})
        .catch((e) => e)
    }
  }

  // PRIVATE LINKS
  const renderPrivateLinks = () => {
    return (
      <div className="toolbar__right__links__signedin">
        {/*  NOTIFICATIONS  */}
        <Spring
          from={{ opacity: 0, marginTop: -500 }}
          to={{ opacity: 1, marginTop: 0 }}
          config={{ delay: 1200, duration: 1000 }}
        >
          {(sprops) => (
            <div style={sprops}>
              <div className="toolbar__link" tabIndex={1}>
                <RiNotification2Line
                  onClick={(e) => toggleSubMenu(e)}
                  size="25px"
                  className="toolbar__link__icon notification"
                />
                <Badge variant="secondary" className="toolbar__badge">
                  {totalNotifs > 0 ? totalNotifs : null}
                </Badge>
              </div>
            </div>
          )}
        </Spring>

        {/*  PROFILE  */}
        <Spring
          from={{ opacity: 0, marginTop: -500 }}
          to={{ opacity: 1, marginTop: 0 }}
          config={{ delay: 1300, duration: 1000 }}
        >
          {(sprops) => (
            <div style={sprops}>
              <Link to="/profile" className="toolbar__link" tabIndex={1}>
                {currentUserInfo.name}{' '}
                <CgProfile size="25px" className="toolbar__link__icon" />
              </Link>
            </div>
          )}
        </Spring>

        {/* LOGOUT */}
        <Spring
          from={{ opacity: 0, marginTop: -500 }}
          to={{ opacity: 1, marginTop: 0 }}
          config={{ delay: 1400, duration: 1000 }}
        >
          {(sprops) => (
            <div style={sprops}>
              <div
                className="toolbar__link"
                tabIndex={1}
                onClick={logoutHandler}
              >
                Logout <BiExit size="25px" className="toolbar__link__icon" />
              </div>
            </div>
          )}
        </Spring>
      </div>
    )
  }

  // PUBLIC LINKS
  const renderPublicLinks = () => (
    <Link to="/signin" className="toolbar__link" tabIndex={1}>
      Login
    </Link>
  )

  useEffect(() => {
    /* getNotifications() */
    /*  const socket = socketIOClient(ENDPOINT)
       socket.on('newNotification', () => getNotifications())
    socket.on('updateNotification', () => getNotifications())
    return () => socket.disconnect()  */
    /* eslint-disable */
  }, [currentUserInfo, authError])

  // HANDLERS
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logoutUser()).then((_) => window.location.reload())
  }

  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const [location, setLocation] = useState({})

  const sideBarToggleHandler = (e) => {
    e.preventDefault()
    setSideBarOpen((prevState) => !prevState)
  }

  // open submenu when mouse hover on icon
  /* const openSubMenu = (e) => {
    const link = e.target.className.animVal.split(' ')[1]
    const tempBtn = e.target.getBoundingClientRect()
    const center = (tempBtn.left + tempBtn.right - 755) / 2
    const bottom = tempBtn.bottom + 15
    setLocation({ center, bottom })
    setSubMenuOpen(true)
  }
  const closeSubMenu = (e) => {
    e.preventDefault()
    setSubMenuOpen(false)
  } */

  // open submenu when clicked
  const toggleSubMenu = (e) => {
    const link = e.target.className.animVal.split(' ')[1]
    const tempBtn = e.target.getBoundingClientRect()
    const center = (tempBtn.left + tempBtn.right - 205) / 2
    const bottom = tempBtn.bottom + 15
    setLocation({ center, bottom })
    setSubMenuOpen((prev) => !prev)
  }

  return (
    <header className="toolbar">
      {/* SIDEBAR */}
      <Sidebar
        sideBarToggleHandler={sideBarToggleHandler}
        show={sideBarOpen}
        notifs={notifs}
        totalNotifs={totalNotifs}
        /*  cartItems={cartItems} */
      />

      {/* SUBMENU */}
      <Submenu
        show={subMenuOpen}
        setSubMenuOpen={setSubMenuOpen}
        location={location}
      />

      {/* BACKDROP */}
      {sideBarOpen && (
        <CSSTransition
          in={sideBarOpen}
          appear={true}
          timeout={100}
          classNames="fade"
        >
          <Backdrop sideBarToggleHandler={sideBarToggleHandler} />
        </CSSTransition>
      )}

      <nav className="toolbar__nav">
        {/* MENU BUTTON */}
        <div className="toolbar__icon">
          <FaBars
            size="30px"
            onClick={sideBarToggleHandler}
            style={{
              color: 'black',
              background: 'white',
              borderRadius: '3px',
              margin: '5px',
              padding: '5px'
            }}
          />
        </div>

        {/* LOGO */}
        <Spring
          from={{ opacity: 0, marginLeft: -100 }}
          to={{ opacity: 1, marginLeft: 0 }}
          config={{ delay: 1500, duration: 500 }}
        >
          {(sprops) => (
            <div style={sprops}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="toolbar__brand">
                  <Image
                    src="https://lh3.googleusercontent.com/pw/ACtC-3eqBeeewn73OBqrscdXJ_y4n0ncalkT3tZnpWuZYDTwdanyCC_7jjVs6WypAIKqQEd-4S5C7tcJRLpPyU03eaDA1FoNGtQc7j4vueewRj8Ae60IEGgMiBnygmyaqkbQRv8UV52vzurCTrJPUhDJgRna=w978-h323-no?authuser=0"
                    style={{
                      objectFit: 'contain',
                      maxWidth: '100%',
                      height: '60px'
                    }}
                  ></Image>
                </div>
              </Link>
            </div>
          )}
        </Spring>

        <Spring
          from={{ opacity: 0, marginLeft: -100 }}
          to={{ opacity: 1, marginLeft: 0 }}
          config={{ delay: 2000, duration: 500 }}
        >
          {(sprops) => (
            <div style={sprops}>
              <div className="toolbar__searchbox">
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
              </div>
            </div>
          )}
        </Spring>

        <div className="spacer"></div>

        {/* LINKS */}
        <div className="toolbar__right__links">
          {/* CART */}
          <Spring
            from={{ opacity: 0, marginRight: -500 }}
            to={{ opacity: 1, marginRight: 0 }}
            config={{ delay: 1000, duration: 1000 }}
          >
            {(sprops) => (
              <div style={sprops}>
                <Link to="/cart" className="toolbar__link" tabIndex={1}>
                  <FiShoppingCart
                    size="25px"
                    className="toolbar__link__icon cart"
                    /*  onMouseOver={(e) => openSubMenu(e)}
                    onMouseOut={(e) => closeSubMenu(e)} */
                  />
                  {/* cart */}
                  <Badge variant="primary" className="toolbar__badge">
                    {/*  {cartItems.length > 0 ? cartItems.length : null} */}
                  </Badge>
                </Link>
              </div>
            )}
          </Spring>

          {currentUserInfo
            ? renderPrivateLinks()
            : authError && renderPublicLinks()}
        </div>
      </nav>
    </header>
  )
}

export default Toolbar
