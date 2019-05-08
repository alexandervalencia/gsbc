export const checkForUserRating = (userId, ratings) => {
  return ratings.find(rating => rating.userId === userId) !== undefined ? true : false;
};

export const getUserRating = (userId, ratings) => {
  const userRating = ratings.find(rating => rating.userId === userId);

  return userRating ? userRating.rating : null;
};

export const getUserRatingId = (userId, ratings) => {
  const userRating = ratings.find(rating => rating.userId === userId);

  return userRating ? userRating.id : null;
};
