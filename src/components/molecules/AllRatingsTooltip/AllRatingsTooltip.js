import React, { useContext } from 'react';
import { Button, Tooltip } from 'reactstrap';

import { UsersContext } from '../../../providers/UsersProvider';

import starYellow from '../../../assets/star-yellow.png';
import './AllRatingsTooltip.scss';

const AllRatingsTooltip = ({ bookId, isOpen, ratings, toggleTooltip }) => {
  const users = useContext(UsersContext);

  const ratingsWithUsers = ratings
    .map(rating => {
      const user = users.find(user => user.id === rating.userId);

      return {
        ...rating,
        userName: user.nameFirst,
      };
    })
    .sort((a, b) => {
      if (a.userName < b.userName) {
        return -1;
      } else if (a.userName > b.userName) {
        return 1;
      }
      return 0;
    });

  return (
    <>
      <Button color="link" id={`info_${bookId}`} type="button">
        View All Ratings
      </Button>
      <Tooltip
        autohide={false}
        hideArrow={true}
        isOpen={isOpen}
        placement="top"
        target={`info_${bookId}`}
        toggle={toggleTooltip}
      >
        <ul className="AllRatings">
          {ratingsWithUsers.map(rating => (
            <li className="all-ratings__item" key={rating.id}>
              <span className="all-ratings__name">{rating.userName}:</span>{' '}
              <span className="all-ratings__value">
                {rating.rating} <img alt="star" className="star star-small" src={starYellow} />
              </span>
            </li>
          ))}
        </ul>
      </Tooltip>
    </>
  );
};

export default AllRatingsTooltip;
