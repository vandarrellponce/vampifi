import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getPage from '../../../store/actions/page.getPage'
import './PageDisplay.css'

const PageDisplay = (props) => {
  const { page } = useSelector((state) => state.page)
  const dispatch = useDispatch()

  const queries = props.location.search.replace('?', '').split('&')
  const categoryId = queries[0].split('=')[1]
  const displayType = queries[1].split('=')[1]

  useEffect(() => {
    dispatch(getPage({ category: categoryId, type: displayType }))
  }, [])
  return <div>Page Display Component</div>
}

export default PageDisplay
