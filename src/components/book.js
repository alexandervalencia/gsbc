import React from 'react';
import AmazonButton from './amazon_button';
import Cover from './cover';
import Info from './info';
import Profile from './profile';
import Rating from './rating';

const Book = ({book, member, members, ratings}) => {
  return (
    <div className="book row">
      <AmazonButton amazonUrl={ book.amazonUrl} />
      <Cover
        coverUrl={ book.coverUrl }
        title={ book.bookTitle } />

      <div className="col-6 col-xl-5">
        <Rating
          average={ book.averageRating }
          members={ members }
          ratings={ ratings } />
        <Info
          author={ book.author }
          title={ book.title }
          datePicked={ book.datePicked } />
      </div>

      <Profile
        userPhotoUrl={ book.userPhotoUrl }
        userPicked={ member.nameFirst } />
    </div>
  )
}

export default Book;
