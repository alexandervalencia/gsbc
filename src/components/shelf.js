import React from 'react';
import Book from './book';

const attachMember = function(book, members) {
  let bookMember;

  members.forEach(member => {
    if (book.userPicked === member.id) {
      bookMember = member
    }
  })

  return bookMember;
};

const Shelf = (props) => {
  const books = props.books.map(book => {
    return <Book
      book={book}
      key={book.id}
      member={attachMember(book, props.members)}
      members={props.members} />
  })
  return <div className="col">{books}</div>
}

export default Shelf;
