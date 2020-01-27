function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export const recursiveMenu = routes => {
  const createItemsFromSlugs = routes.map(route => {
    let paths = route.slug.split("/").filter(s => s);
    return _objectSpread({}, route, {
      id: paths.length > 1 ? paths[paths.length - 1] : "",
      parent: paths.length > 1 ? paths[paths.length - 2] : null,
      paths: paths,
      menu: null
    });
  }).reduce((items, item, index) => {
    items.push(item);

    if (items[index].id && items[index].id !== item.parent) {
      const {
        paths
      } = item;
      items.push({
        navigationLabel: item.parent && item.parent.replace(/-/g, " "),
        id: item.parent,
        slug: null,
        paths: null,
        parent: paths.length > 2 ? paths[paths.length - 3] : null
      });
    }

    return items;
  }, []).filter(route => route.navigationLabel);

  const createRecursiveMenu = (array, parent) => {
    let result = [];
    array.filter(route => route.parent === parent).forEach(route => {
      route.menu = createRecursiveMenu(array, route.id);
      return result.push(route);
    });
    return result;
  };

  return createRecursiveMenu(createItemsFromSlugs, null);
};