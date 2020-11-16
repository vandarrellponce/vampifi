export const organizeCategory = (categories, parentId = null) => {
  const categoryList = []
  let category

  if (!parentId) {
    category = categories.filter((cat) => cat.parentId === undefined)
  } else {
    category = categories.filter((cat) => cat.parentId === parentId)
  }

  category.forEach((cat) => {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: organizeCategory(categories, cat._id.toString())
    })
  })

  return categoryList
}
