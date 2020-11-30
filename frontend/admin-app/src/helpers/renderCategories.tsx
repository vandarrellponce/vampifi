const renderCategories = (categories) => {
  return categories.map((cat) => {
    return {
      value: cat._id,
      label: cat.name,
      children: cat.children.length > 0 && renderCategories(cat.children)
    }
  })
}

export default renderCategories
