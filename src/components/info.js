import React from 'react';

const Info = ({bookAuthor, bookTitle, datePicked}) => {
  return (
    <div className="info">
      <h1 className="book-title">{bookTitle}</h1>
      <h2 className="book-author">{bookAuthor}</h2>
      <p className="book-date-read">{datePicked}</p>
    </div>
  )
};

export default Info;
