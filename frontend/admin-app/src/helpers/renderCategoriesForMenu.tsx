import React from 'react'

const renderCategoriesForMenu = (categories) => {
  return categories.map((cat) => {
    return (
      <li key={cat._id}>
        {cat.parentId ? (
          <a href={cat.slug}>{cat.name}</a>
        ) : (
          <span>{cat.name}</span>
        )}
        {cat.children.length > 0 && (
          <ul>{renderCategoriesForMenu(cat.children)}</ul>
        )}
      </li>
    )
  })
}

export default renderCategoriesForMenu
