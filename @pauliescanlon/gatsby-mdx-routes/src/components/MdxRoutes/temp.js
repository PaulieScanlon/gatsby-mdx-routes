export const recursiveMenu = routes => {
  //   console.log(routes)

  const thing = [
    { id: "", navigationLabel: "Home", parent: null },
    { id: "", navigationLabel: "About", parent: null },
    { id: "", navigationLabel: "Contact", parent: null },

    // create a new menu thing and if it's the top level it has no parent
    { id: "sub-pages", navigationLabel: "sub-pages", parent: null },

    {
      id: "sub-page-1",
      navigationLabel: "Sub Page 1",
      parent: "sub-pages",
    },

    // create a new menu thing and see if it has a parnet
    {
      id: "sub-page-items",
      navigationLabel: "sub-page-items",
      parent: "sub-pages",
    },

    {
      id: "sub-page-item-1",
      navigationLabel: "Sub Item 1",
      parent: "sub-page-items",
    },

    // create a new menu thing and see if it has a parent
    {
      id: "sub-page-items-again",
      navigationLabel: "sub-page-items-again",
      parent: "sub-page-items",
    },

    {
      id: "sub-page-item-again-1",
      navigationLabel: "Sub Item Again1",
      parent: "sub-page-items-again",
    },
  ]

  const createMenus = (arr, parent) => {
    var out = []
    for (var i in arr) {
      if (arr[i].parent === parent) {
        var menu = createMenus(arr, arr[i].id)

        if (menu.length) {
          arr[i].menu = menu
        }
        out.push(arr[i])
      }
    }
    return out
  }

  //   console.log(createMenus(thing, null))
  const splitSlugs = routes
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
          id: item.parent,
          navigationLabel: item.parent && item.parent.replace(/-/g, " "),
          parent: paths.length > 2 ? paths[paths.length - 3] : null,
        })
      }

      return items
    }, [])
    .filter(route => route.navigationLabel)

  //   console.log("splitSlugs: ", splitSlugs)

  //   const splitSlugs = routes
  //     .map(route => {
  //       return {
  //         ...route,
  //         paths: route.slug.split("/"),
  //       }
  //     })

  //     .map(route => {
  //       let _paths = route.paths.filter(path => path)
  //       let _parent = _paths[_paths.length - 2] || null

  //       return {
  //         id: _parent === null ? "" : _paths[_paths.length - 1],
  //         navigationLabel: route.navigationLabel,
  //         parent: _parent,
  //         slug: route.slug,
  //       }
  //     })
  //     .reduce((items, item, index) => {
  //       items.push(item)

  //       if (items[index].id && items[index].id !== item.parent) {
  //         items.push({
  //           id: item.parent,
  //           navigationLabel: item.parent,
  //           parent: null,
  //         })
  //       }

  //       return items
  //     }, [])
  //     .filter(item => item.id)

  //   console.log("splitSlugs: ", splitSlugs)

  console.log("createMenus", createMenus(splitSlugs, null))
}

{
  /* <ul>
{menus.map(route =>
  <li key={route.id}>
    {route.id} - {route.name}
    {route.menu && route.menu.length > 0
      ? buildMenu(route.menu)
      : null}
  </li>
)}
</ul> */
}
