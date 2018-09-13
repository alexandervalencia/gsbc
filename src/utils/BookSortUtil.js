const articleRegEx = /(^the|^a|^an) +/i;

const bookSortUtil = (array, config) => {
  const dir = config.dir;
  const type = config.type;
  let sorted;

  const sortAscending = (a, b) => {
    let aSort = a[type];
    let bSort = b[type];

    if (type === 'author') {
      aSort = a.author.split(' ').splice(-1)[0];
      bSort = b.author.split(' ').splice(-1)[0];
    }

    if (type === 'title') {
      aSort = a.title.replace(articleRegEx, '');
      bSort = b.title.replace(articleRegEx, '');
    }

    if (aSort < bSort) {
      return -1;
    }

    if (aSort > bSort) {
      return 1;
    }

    return 0;
  };

  const sortDescending = (a, b) => {
    let aSort = a[type];
    let bSort = b[type];

    if (type === 'author') {
      aSort = a.author.split(' ').splice(-1)[0];
      bSort = b.author.split(' ').splice(-1)[0];
    }

    if (type === 'title') {
      aSort = a.title.replace(articleRegEx, '');
      bSort = b.title.replace(articleRegEx, '');
    }

    if (aSort > bSort) {
      return -1;
    }

    if (aSort < bSort) {
      return 1;
    }

    return 0;
  };

  if (dir === 'asc') {
    sorted = array.sort(sortAscending);
  } else if (dir === 'desc') {
    sorted = array.sort(sortDescending);
  }

  return sorted;
};

export default bookSortUtil;
