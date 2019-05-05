export const checkForMemberRating = (memberId, ratings) => {
  return ratings.find(rating => rating.memberId === memberId) !== undefined ? true : false;
};

export const getMemberRating = (memberId, ratings) => {
  const memberRating = ratings.find(rating => rating.memberId === memberId);

  return memberRating ? memberRating.rating : null;
};
