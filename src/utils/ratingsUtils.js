export const checkForMemberRating = (memberId, ratings) => {
  return ratings.find(rating => rating.memberId === memberId) !== undefined ? true : false;
};

export const getBookRating = (bookId, ratings) => {
  const bookRatings = getBookRatings(bookId, ratings);

  return bookRatings.map(rating => rating.ratingValue).reduce((a, b) => a + b, 0) / (bookRatings.length || 1);
};

export const getBookRatings = (bookId, ratings) => {
  return ratings.filter(rating => rating.bookId === bookId);
};

export const getMemberRating = (memberId, ratings) => {
  const memberRating = ratings.find(rating => rating.memberId === memberId);

  if (memberRating) {
    return {
      memberRatingId: memberRating.id,
      memberRatingValue: memberRating.ratingValue,
    };
  }

  return {
    memberRatingId: '',
    memberRatingValue: null,
  };
};
