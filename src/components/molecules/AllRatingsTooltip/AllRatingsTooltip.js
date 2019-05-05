import React, { useContext } from 'react';
import { Button, Tooltip } from 'reactstrap';

import { MembersContext } from '../../../providers/MembersProvider';

import starYellow from '../../../assets/star-yellow.png';
import './AllRatingsTooltip.scss';

const AllRatingsTooltip = ({ bookId, isOpen, ratings, toggleTooltip }) => {
  const members = useContext(MembersContext);

  const ratingsWithMembers = ratings
    .map(rating => {
      const member = members.find(member => member.id === rating.memberId);

      return {
        ...rating,
        memberName: member.nameFirst,
      };
    })
    .sort((a, b) => {
      if (a.memberName < b.memberName) {
        return -1;
      } else if (a.memberName > b.memberName) {
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
          {ratingsWithMembers.map(rating => (
            <li className="all-ratings__item" key={rating.id}>
              <span className="all-ratings__name">{rating.memberName}:</span>{' '}
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
