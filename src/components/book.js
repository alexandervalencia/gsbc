import React from 'react';
import AmazonButton from './amazon_button';
import Cover from './cover';
import Info from './info';
import Profile from './profile';
import Rating from './rating';

const Book = (props) => {
  return (
    <div className="book row">
      <AmazonButton bookAmazonUrl={props.book.bookAmazonUrl} />
      <Cover
        bookCoverUrl={props.book.bookCoverUrl}
        bookTitle={props.book.bookTitle} />

      <div className="col-6 col-xl-5">
        <Rating average={props.book.averageRating} />
        <Info
          bookAuthor={props.book.bookAuthor}
          bookTitle={props.book.bookTitle}
          datePicked={props.book.datePicked}  />
      </div>

      <Profile
        userPhotoUrl={props.book.userPhotoUrl}
        userPicked={props.member.nameFirst} />
    </div>
  )
}

export default Book;
