import React, { useContext } from 'react';

import { BooksContext } from '../../../providers/BooksProvider';
import { UsersContext } from '../../../providers/UsersProvider';
import { Book, Spinner } from 'components';

import './Bookcase.scss';

const Bookcase = () => {
  const { books } = useContext(BooksContext);
  const users = useContext(UsersContext);

  if (books.length > 0 && users.length > 0) {
    return (
      <div className="Bookcase">
        {books.map(book => (
          <Book book={book} key={book.id} />
        ))}
      </div>
    );
  }

  return <Spinner />;
};

export default Bookcase;
