import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const authWrapper = (Component, privateRoute, adminRoute) => {
  const Wrapper = (props) => {
    const { currentUserInfo } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    // null - anyone can access
    // true - needs to login
    // false - needs to logout

    useEffect(() => {
      const check = async () => {
        try {
          /* dispatch(getCart()) */

          if (!currentUserInfo && privateRoute) return props.history.push('/')

          if (currentUserInfo && !privateRoute) return props.history.push('/')

          // TRYING ADMIN ROUTE BUT NOT ADMIN
          if (currentUserInfo) {
            if (currentUserInfo.role === 'user' && adminRoute) {
              return props.history.push('/')
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
      check()
    }, [dispatch, props.history, currentUserInfo])

    /* if (!currentUserInfo) return <div></div> */

    return <Component {...props} user={currentUserInfo} />
  }
  return Wrapper
}

export default authWrapper
