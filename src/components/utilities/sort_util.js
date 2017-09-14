const Sort = (array, config) => {
  const dir = config.dir;
  const type = config.type;

  const sortAscending = (a, b) => {
    if (a[type] < b[type])
      return -1;

    if (a[type] > b[type])
      return 1;

    return 0;
  }

  const sortDescending = (a, b) => {
    if (a[type] > b[type])
      return -1;

    if (a[type] < b[type])
      return 1;

    return 0;
  }

  let sorted;

  if (dir === 'asc') {
    sorted = array.sort(sortAscending);
  }
  else if (dir === 'desc') {
    sorted = array.sort(sortDescending);
  }

  return sorted;
};

export default Sort;
