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
  let ratingId;

  ratings.forEach(rating => {
    if (rating.user === userId) {
      ratingId = rating.id;
    }
  });

  return ratingId;
};
