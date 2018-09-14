export const checkForUserRating = (ratings, userId) => {
  let exists = false;

  ratings.forEach(rating => {
    if (rating.user === userId) {
      exists = true;
    }
  });

  return exists;
};

export const getUserRatingId = (ratings, userId) => {
  if (ratings.filter(rating => rating.user === userId).length > 0) {
    return ratings.filter(rating => rating.user === userId).shift().id;
  }

  return null;
};
