import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authUser from '../../store/actions/user.auth'

const authWrapper = (Component, adminRoute) => {
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

          //IF AUTHENTICATED
          if (currentUserInfo) {
            // TRYING ADMIN ROUTE BUT NOT ADMIN
            if (currentUserInfo.role === 'user' && adminRoute) {
              return props.history.push('/')
            }

            props.history.push('/')
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
