import React from 'react';
import ReactRating from 'react-rating';

import './Ratings.scss';

import starGrey from '../../../assets/star-grey.png';
import starOrange from '../../../assets/star-orange.png';
import starYellow from '../../../assets/star-yellow.png';

const Ratings = ({ bookId, handleRate, rating, user }) => {
  return (
    <>
      <ReactRating
        id={`rating_${bookId}`}
        fractions={2}
        onClick={value => handleRate(value)}
        placeholderRating={rating}
        readonly={!user}
        start={0}
        emptySymbol={<img alt="star" src={starGrey} className="star" />}
        fullSymbol={<img alt="star" src={starOrange} className="star" />}
        placeholderSymbol={<img alt="star" src={starYellow} className="star" />}
      />

      {rating > -1 && (
        <div className="book-rating">
          <span className="book-rating-total">{Math.round(rating * 10) / 10}</span>
          <span className="book-rating-max">/5</span>
        </div>
      )}
    </>
  );
};

export default Ratings;
