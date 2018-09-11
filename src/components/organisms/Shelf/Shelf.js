import React from 'react';
import PropTypes from 'prop-types';
import { Book } from 'components';

import './Shelf.css';

const attachUserPicked = (book, members) => {
  let bookMember;

  members.forEach(member => {
    if (book.userPicked === member.id) {
      bookMember = member;
    }
  });

  return bookMember;
};

const bookRatings = (bookId, ratings) => {
  const filteredRatings = [];

  ratings.forEach(rating => {
    if (rating.book === bookId) {
      filteredRatings.push(rating);
    }
  });

  return filteredRatings;
};

const Shelf = ({ books, currentMember, currentUser, members, ratings }) => {
  const booksList = books.map(book => {
    return (
      <Book
        bookData={book}
        currentMember={currentMember}
        currentUser={currentUser}
        key={book.id}
        members={members}
        ratings={bookRatings(book.id, ratings)}
        userPicked={attachUserPicked(book, members)}
      />
    );
  });

  return <div className="Shelf">{booksList}</div>;
};

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  currentMember: PropTypes.object,
  currentUser: PropTypes.object,
  members: PropTypes.array.isRequired,
  ratings: PropTypes.array.isRequired,
};

export default Shelf;
