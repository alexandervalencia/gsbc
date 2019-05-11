import React from 'react';
import { Link } from 'react-router-dom';

import { AmazonIcon, BookCover, BookInfo, UserPicked } from 'components';
import RatingsContainer from '../../../containers/RatingsContainer';

import './Book.scss';

const Book = ({ book }) => {
  return (
    <div className="Book">
      <AmazonIcon amazonUrl={book.amazonUrl} />

      <Link to={`/books/${book.id}`}>
        <BookCover bookId={book.id} coverImg={book.coverImg} title={book.title} />
      </Link>

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
