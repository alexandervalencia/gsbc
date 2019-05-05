import React from 'react';

import { AmazonIcon, BookCover, BookInfo, UserPicked } from 'components';
import RatingsContainer from '../../../containers/RatingsContainer';

import './Book.scss';

const Book = ({ bookData }) => {
  return (
    <div className="Book">
      <AmazonIcon amazonUrl={bookData.amazonUrl} />

      <BookCover coverImg={bookData.coverImg} title={bookData.title} />

      <BookInfo
        author={bookData.author}
        title={bookData.title}
        subtitle={bookData.subtitle}
        datePicked={bookData.datePicked}
      />

      <RatingsContainer bookId={bookData.id} rating={bookData.ratingValue} />

      <UserPicked userId={bookData.userPicked} />
    </div>
  );
};

export default Book;
