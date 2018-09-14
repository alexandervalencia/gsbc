import React from 'react';
import PropTypes from 'prop-types';
import {
  AmazonIcon,
  BookCover,
  BookInfo,
  UserPicked,
  Rating,
} from 'components';

import './Book.css';

const Book = ({
  bookData,
  currentMember,
  currentUser,
  members,
  ratings,
  userPicked,
}) => {
  return (
    <div className="Book">
      <AmazonIcon amazonUrl={bookData.amazonUrl} />

      <BookCover coverImg={bookData.coverImg} title={bookData.bookTitle} />

      <div className="book-info">
        <Rating
          bookId={bookData.id}
          currentMember={currentMember}
          currentUser={currentUser}
          members={members}
          rating={bookData.rating}
          ratings={ratings}
        />

        <BookInfo
          author={bookData.author}
          title={bookData.title}
          subtitle={bookData.subtitle}
          datePicked={bookData.datePicked}
        />
      </div>

      <UserPicked
        userImg={bookData.userImg}
        userNameFirst={userPicked.nameFirst}
      />
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object,
  currentMember: PropTypes.object,
  currentUser: PropTypes.object,
  members: PropTypes.array,
  ratings: PropTypes.array,
  userPicked: PropTypes.object,
};

export default Book;
