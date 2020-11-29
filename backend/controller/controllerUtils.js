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
      ...cat._doc,
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
      children: organizeCategory(categories, cat._id.toString())
    })
  })

  return categoryList
}
