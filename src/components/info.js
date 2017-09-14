import React from 'react';
import moment from 'moment';

const Info = ({author, title, datePicked}) => {
  const date = moment(datePicked, 'x').format('MMMM YYYY');

  return (
    <div className="info">
      <h1 className="book-title">{title}</h1>
      <h2 className="book-author">{author}</h2>
      <p className="book-date-read">{date}</p>
    </div>
  )
};

export default Info;
