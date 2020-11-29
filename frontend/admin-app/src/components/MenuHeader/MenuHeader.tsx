import React, { useEffect } from 'react'
import './MenuHeader.css'
import { useSelector, useDispatch } from 'react-redux'
import getCategories from '../../store/actions/category.getCategories'
import renderCategoriesForMenu from '../../helpers/renderCategoriesForMenu'

const MenuHeader = () => {
  const { categoryList } = useSelector((state) => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!categoryList) dispatch(getCategories())
  }, [categoryList, dispatch])
  return (
    <div className="menuheader">
      <ul>
        {categoryList?.length > 0 && renderCategoriesForMenu(categoryList)}
      </ul>
    </div>
  )
}

export default MenuHeader
