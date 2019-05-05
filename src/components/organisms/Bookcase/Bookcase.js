import React, { useContext } from 'react';

import { BooksContext } from '../../../providers/BooksProvider';
import { MembersContext } from '../../../providers/MembersProvider';
import { Book, Spinner } from 'components';

import './Bookcase.scss';

const Bookcase = () => {
  const { books } = useContext(BooksContext);
  const members = useContext(MembersContext);

  if (books.length > 0 && members.length > 0) {
    return (
      <div className="Bookcase">
        {books.map(book => (
          <Book bookData={book} key={book.id} />
        ))}
      </div>
    );
  }

  return <Spinner />;
};

export default Bookcase;
