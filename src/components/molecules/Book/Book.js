import React from 'react';
import { AmazonIcon, BookCover, BookInfo, UserPicked, Rating } from 'components';

import './Book.scss';

const Book = ({ bookData, userPicked = null }) => {
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

      {/* <Rating book={bookData} bookId={bookData.id} /> */}

      <UserPicked userImg={userPicked.userImg} userNameFirst={userPicked.nameFirst} />
    </div>
  );
};

export default Book;
