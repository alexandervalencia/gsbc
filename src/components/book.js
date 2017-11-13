import React from 'react'
import PropTypes from 'prop-types'
import AmazonButton from './AmazonButton'
import Cover from './Cover'
import Info from './Info'
import UserPicked from './UserPicked'
import Rating from './Rating'

import '../styles/Book.css'

const Book = ({ book, currentMember, currentUser, members, ratings, userPicked }) => {
  return (
    <div className="Book row">
      <div className="col-1">
        <AmazonButton amazonUrl={book.amazonUrl} />
      </div>
      <div className="col-3">
        <Cover
          coverImg={book.coverImg}
          title={book.bookTitle}
        />
      </div>

      <div className="col-6">
        <Rating
          bookId={book.id}
          currentMember={currentMember}
          currentUser={currentUser}
          members={members}
          rating={book.rating}
          ratings={ratings}
        />
        <Info
          author={book.author}
          title={book.title}
          subtitle={book.subtitle}
          datePicked={book.datePicked}
        />
      </div>
      <div className="col-2">
        <UserPicked
          userImg={book.userImg}
          userNameFirst={userPicked.nameFirst}
        />
      </div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  currentMember: PropTypes.object,
  currentUser: PropTypes.object,
  members: PropTypes.array,
  ratings: PropTypes.array,
  userPicked: PropTypes.object,
}

export default Book
