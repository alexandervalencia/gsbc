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

const bookRatings = function(bookId, ratings){
  let filteredRatings = [];

  ratings.forEach(rating => {
    if (rating.book === bookId) {
      filteredRatings.push(rating);
    }
  })

  return filteredRatings;
};

const Shelf = ({books, members, ratings}) => {
  const booksList = books.map(book => {
    return (
      <Book
        book={book}
        key={book.id}
        member={attachMember(book, members)}
        members={members}
        ratings={bookRatings(book.id, ratings)} />
    )
  })
  return <div className="col">{booksList}</div>
}

export default Shelf;
