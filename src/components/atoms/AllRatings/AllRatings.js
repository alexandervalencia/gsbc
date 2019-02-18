import React from 'react';
import starYellow from '../../../assets/star-yellow.png';

import './AllRatings.scss';

export default function AllRatings({ ratings, members }) {
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
    <ul className="AllRatings">
      {ratingsWithMembers.map(rating => (
        <li className="all-ratings__item" key={rating.id}>
          <span className="all-ratings__name">{rating.memberName}:</span>{' '}
          <span className="all-ratings__value">
            {rating.ratingValue} <img alt="star" className="star star-small" src={starYellow} />
          </span>
        </li>
      ))}
    </ul>
  );
}
