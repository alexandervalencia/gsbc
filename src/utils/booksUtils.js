import { format } from 'date-fns';

export const bookSorter = (array, config) => {
  const ARTICLE_REGEX = /(^the|^a|^an) +/i;
  const dir = config.dir;
  const type = config.type;

  const sortBooks = (a, b) => {
    let aSort = a[type];
    let bSort = b[type];
    let aGreaterThan = dir === 'asc' ? 1 : -1;
    let bGreaterThan = dir === 'asc' ? -1 : 1;

    if (type === 'author') {
      aSort = a.author.split(' ').splice(-1)[0];
      bSort = b.author.split(' ').splice(-1)[0];
    }

    if (type === 'title') {
      aSort = a.title.replace(ARTICLE_REGEX, '');
      bSort = b.title.replace(ARTICLE_REGEX, '');
    }

    if (aSort > bSort) {
      return aGreaterThan;
    }

    if (aSort < bSort) {
      return bGreaterThan;
    }

    return 0;
  };

  return array.sort(sortBooks);
};

export const newBookConfig = values => {
  let book = {};

  book.amazonUrl = values.amazonUrl || '';
  book.author = values.author;
  book.coverImg = values.coverImg || '';
  book.dateCreated = format(new Date(), 'x');
  book.datePicked = Number(format(`${values.datePickedMonth} ${values.datePickedYear}`, 'x'));
  book.ratingValue = 0;
  book.subtitle = values.subtitle || '';
  book.title = values.title;
  book.userImg = values.userImg || '';
  book.userPicked = values.userPicked;

  return book;
};
