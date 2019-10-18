import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';

import './BookCover.scss';

const BookCover = ({ bookId, coverImg, link = false, shadow = true, size = 'small', title }) => {
  const publicId = coverImg || 'cover_na_fmljuu.jpg';

  let height = 250;

  if (size === 'large') {
    height = 500;
  }

  const bookCover = (
    <Image alt={title} className={`cover-img ${size} ${shadow ? 'shadow' : null}`} cloudName="gsbc" publicId={publicId}>
      <Transformation height={height} quality="auto:eco" crop="scale" />
    </Image>
  );

  return <div className="BookCover">{link ? <Link to={`/books/${bookId}`}>{bookCover}</Link> : bookCover}</div>;
};

BookCover.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
};

export default BookCover;
