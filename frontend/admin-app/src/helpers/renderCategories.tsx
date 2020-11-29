import React from 'react'

const renderCategories = (categories) => {
  return categories.map((cat) => {
    return (
      <li key={cat._id}>
        {cat.name}
        {cat.children.length > 0 && <ul>{renderCategories(cat.children)}</ul>}
      </li>
    )
  })
}

export default renderCategories
