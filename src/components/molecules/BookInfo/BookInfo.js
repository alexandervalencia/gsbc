import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './BookInfo.css';

const BookInfo = ({ author, datePicked, subtitle, title }) => {
  const date = moment(datePicked, 'x').format('MMMM YYYY');

  return (
    <div className="BookInfo">
      <h1 className="title">{title}</h1>
      <h3 className="subtitle">{subtitle}</h3>
      <h2 className="author">{author}</h2>
      <p className="date-read">{date}</p>
    </div>
  );
};

BookInfo.propTypes = {
  author: PropTypes.string,
  datePicked: PropTypes.number,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default BookInfo;
