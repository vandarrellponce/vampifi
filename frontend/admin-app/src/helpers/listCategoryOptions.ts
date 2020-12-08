const listCategoryOptions = (categories, options = []) => {
  categories.forEach((cat) => {
    options.push({
      value: cat._id,
      name: cat.name,
      parentId: cat.parentId,
      displayType: cat.displayType
    })
    if (cat.children.length) {
      listCategoryOptions(cat.children, options)
    }
  })

  return options
}

export default listCategoryOptions
