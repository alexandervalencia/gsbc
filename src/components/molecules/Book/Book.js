import React from 'react';

import { AmazonIcon, BookCover, BookInfo, UserPicked } from 'components';
import RatingsContainer from '../../../containers/RatingsContainer';

import './Book.scss';

const Book = ({ book }) => {
  return (
    <div className="Book">
      <AmazonIcon amazonUrl={book.amazonUrl} />

      <BookCover bookId={book.id} coverImg={book.coverImg} link title={book.title} />

      <BookInfo
        author={book.author}
        bookId={book.id}
        title={book.title}
        subtitle={book.subtitle}
        datePicked={book.datePicked}
      />

      <RatingsContainer bookId={book.id} rating={book.ratingValue} />

      <UserPicked userId={book.userPicked} />
    </div>
  );
};

export default Book;
