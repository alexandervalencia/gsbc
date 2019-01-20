import { format } from 'date-fns';

const newBookConfig = values => {
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

export default newBookConfig;
