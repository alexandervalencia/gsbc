import React, { useContext } from 'react';
import { Tooltip } from 'reactstrap';
import { UserContext } from '../../../providers/UserProvider';

export const RatingStatusTooltip = ({ bookId, isOpen, memberHasRated, rating, toggleTooltip }) => {
  const user = useContext(UserContext);

  let ratingStatus = '';

  if (!user) {
    ratingStatus = 'Sign in to rate this book!';
  } else if (rating <= 0) {
    ratingStatus = 'No rating yet, be the first!';
  } else if (!memberHasRated) {
    ratingStatus = 'You have not rated this book yet';
  }

  return (
    <Tooltip isOpen={isOpen} placement="bottom" target={`rating_${bookId}`} toggle={toggleTooltip}>
      {ratingStatus}
    </Tooltip>
  );
};

export default RatingStatusTooltip;
