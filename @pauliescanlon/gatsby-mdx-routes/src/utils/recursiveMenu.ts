export const recursiveMenu = (routes: any) => {
  const createItemsFromSlugs = routes
    .map((route: any) => {
      let paths = route.slug.split("/").filter((s: any) => s)
      return {
        ...route,
        id: paths.length > 1 ? paths[paths.length - 1] : "",
        parent: paths.length > 1 ? paths[paths.length - 2] : null,
        paths: paths,
        menu: null,
      }
    })
    .reduce((items: any, item: any, index: any) => {
      items.push(item)

      if (items[index].id && items[index].id !== item.parent) {
        const { paths } = item
        items.push({
          navigationLabel: item.parent && item.parent.replace(/-/g, " "),
          id: item.parent,
          slug: null,
          paths: null,
          parent: paths.length > 2 ? paths[paths.length - 3] : null,
        })
      }

      return items
    }, [])
    .filter((route: any) => route.navigationLabel)

  const createRecursiveMenu = (array: any, parent: any) => {
    let result: any = []

    array
      .filter((route: any) => route.parent === parent)
      .forEach((route: any) => {
        route.menu = createRecursiveMenu(array, route.id)
        return result.push(route)
      })

    return result
  }

  return createRecursiveMenu(createItemsFromSlugs, null)
}
