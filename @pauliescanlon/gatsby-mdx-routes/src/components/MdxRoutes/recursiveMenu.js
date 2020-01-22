export const recursiveMenu = routes => {
  const createItemsFromSlugs = routes
    .map(route => {
      let paths = route.slug.split("/").filter(s => s)

      return {
        ...route,
        id: paths.length > 1 ? paths[paths.length - 1] : "",
        parent: paths.length > 1 ? paths[paths.length - 2] : null,
        paths: paths,
      }
    })
    .reduce((items, item, index) => {
      items.push(item)

      if (items[index].id && items[index].id !== item.parent) {
        const { paths } = item
        items.push({
          navigationLabel: item.parent && item.parent.replace(/-/g, " "),
          id: item.parent,
          parent: paths.length > 2 ? paths[paths.length - 3] : null,
        })
      }

      return items
    }, [])
    .filter(route => route.navigationLabel)

  const createRecursiveMenu = (array, parent) => {
    let result = []
    for (let index in array) {
      if (array[index].parent === parent) {
        let menu = createRecursiveMenu(array, array[index].id)

        if (menu.length) {
          array[index].menu = menu
        }
        result.push(array[index])
      }
    }
    return result
  }
  return createRecursiveMenu(createItemsFromSlugs, null)
}
