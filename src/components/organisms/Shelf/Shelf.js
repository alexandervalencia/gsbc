import React from 'react';
import PropTypes from 'prop-types';
import { Book } from 'components';

import './Shelf.css';

const Shelf = ({ books, members }) => (
  <div className="Shelf">
    {books.map(book => (
      <Book bookData={book} key={book.id} userPicked={members.find(member => book.userPicked === member.id)} />
    ))}
  </div>
);

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
};

export default Shelf;
