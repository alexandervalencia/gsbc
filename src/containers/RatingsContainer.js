import React, { Component } from 'react';

import AllRatingsTooltip from '../components/molecules/AllRatingsTooltip/AllRatingsTooltip';
import RateZeroTooltip from '../components/molecules/RateZeroTooltip/RateZeroTooltip';
import Ratings from '../components/molecules/Ratings/Ratings';
import RatingStatusTooltip from '../components/molecules/RatingStatusTooltip/RatingStatusTooltip';
import withUser from '../hoc/withUser';

import { checkForUserRating, getUserRating, getUserRatingId } from '../utils/ratingsUtils';
import { collectIdsAndDocs } from '../utils/firebaseUtil';
import { firestore } from '../firebase';

import starRed from '../assets/star-red.png';
import starYellow from '../assets/star-yellow.png';
import './RatingsContainer.scss';

class RatingsContainer extends Component {
  displayName = `RatingsContainer`;

  state = {
    ratings: [],
    tooltips: {
      allRatingsOpen: false,
      rateZeroOpen: false,
      ratingStatusOpen: false,
    },
    userHasRated: null,
    userRating: null,
    userRatingId: null,
  };

  get bookId() {
    return this.props.bookId;
  }

  get bookRef() {
    return firestore.doc(`books/${this.bookId}`);
  }

  get ratingsRef() {
    return this.bookRef.collection('ratings');
  }

  unsubscribeFromRatings = null;

  async componentDidMount() {
    this.unsubscribeFromRatings = firestore
      .collection('books')
      .doc(this.props.bookId)
      .collection('ratings')
      .onSnapshot(snapshot => {
        const ratings = snapshot.docs.map(collectIdsAndDocs);

        this.setState({ ratings });
      });
  }

  componentDidUpdate() {
    const { user } = this.props;
    const { ratings, userHasRated } = this.state;

    if (user !== null && ratings.length > 0 && userHasRated === null) {
      const { uid } = this.props.user;

      const userHasRated = checkForUserRating(uid, ratings);
      const userRating = getUserRating(uid, ratings);

      if (userHasRated) {
        const userRatingId = getUserRatingId(uid, ratings);

        this.setState({ userRatingId });
      }

      this.setState({
        userHasRated,
        userRating,
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromRatings();
  }

  handleRate = rating => {
    const userId = this.props.user.uid;

    if (!this.state.userHasRated) {
      this.ratingsRef.add({ rating, userId });

      this.setState({ userHasRated: true });
    } else {
      this.ratingsRef.doc(this.state.userRatingId).update({ rating });
    }

    this.setState({ userRating: rating });
  };

  toggleTooltip = tooltipName => {
    this.setState({
      tooltips: {
        ...this.state.tooltips,
        [tooltipName]: !this.state.tooltips[tooltipName],
      },
    });
  };

  render() {
    const { bookId, rating, user } = this.props;
    const { ratings, tooltips, userHasRated, userRating } = this.state;
    const { allRatingsOpen, rateZeroOpen, ratingStatusOpen } = tooltips;

    return (
      <div className="Rating">
        <div className="rating-wrapper">
          {userRating === Number(0.5) && (
            <>
              <img
                alt="star"
                className="star star-small star-zero"
                id={`zero_${bookId}`}
                onClick={() => this.handleRate(0)}
                src={starRed}
              />
              <RateZeroTooltip
                bookId={bookId}
                isOpen={rateZeroOpen}
                toggleTooltip={() => this.toggleTooltip('rateZeroOpen')}
              />
            </>
          )}
          <Ratings bookId={bookId} handleRate={this.handleRate} rating={rating} user={user} />
        </div>

        {userHasRated && (
          <div className="rate-info">
            Your rating: {userRating}
            <img alt="star" className="star star-small" src={starYellow} />
            <AllRatingsTooltip
              bookId={bookId}
              isOpen={allRatingsOpen}
              ratings={ratings}
              toggleTooltip={() => this.toggleTooltip('allRatingsOpen')}
            />
          </div>
        )}

        {!userHasRated && (
          <RatingStatusTooltip
            bookId={bookId}
            isOpen={ratingStatusOpen}
            userHasRated={userHasRated}
            rating={rating}
            toggleTooltip={() => this.toggleTooltip('ratingStatusOpen')}
          />
        )}
      </div>
    );
  }
}

export default withUser(RatingsContainer);
