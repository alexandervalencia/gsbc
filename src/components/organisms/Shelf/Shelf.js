import React from 'react';
import PropTypes from 'prop-types';
import { Book } from 'components';

import './Shelf.css';

const Shelf = ({ books, currentMember, currentUser, members, ratings }) => {
  const booksList = books.map(book => {
    return (
      <Book
        bookData={book}
        currentMember={currentMember}
        currentUser={currentUser}
        key={book.id}
        members={members}
        ratings={ratings.filter(rating => rating.book === book.id)}
        userPicked={members.filter(member => book.userPicked === member.id)[0]}
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
