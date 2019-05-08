import React, { Component } from 'react';

import AllRatingsTooltip from '../components/molecules/AllRatingsTooltip/AllRatingsTooltip';
import Ratings from '../components/molecules/Ratings/Ratings';
import RatingStatusTooltip from '../components/molecules/RatingStatusTooltip/RatingStatusTooltip';
import withUser from '../hoc/withUser';

import { checkForUserRating, getUserRating, getUserRatingId } from '../utils/ratingsUtils';
import { collectIdsAndDocs } from '../utils/firebaseUtil';
import { firestore } from '../firebase';

import starYellow from '../assets/star-yellow.png';
import './RatingsContainer.scss';

class RatingsContainer extends Component {
  displayName = `RatingsContainer`;

  state = {
    ratings: [],
    allRatingsTooltipOpen: false,
    ratingStatusTooltipOpen: false,
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

  componentDidUpdate(prevProps, prevState) {
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

  toggleAllRatingsTooltip = () => {
    this.setState({
      allRatingsTooltipOpen: !this.state.allRatingsTooltipOpen,
    });
  };

  toggleRatingStatusTooltip = () => {
    this.setState({
      ratingStatusTooltipOpen: !this.state.ratingStatusTooltipOpen,
    });
  };

  render() {
    const { bookId, rating, user } = this.props;
    const { allRatingsTooltipOpen, userHasRated, userRating, ratings, ratingStatusTooltipOpen } = this.state;

    return (
      <div className="Rating">
        <div className="rating-wrapper">
          <Ratings bookId={bookId} handleRate={this.handleRate} rating={rating} user={user} />
        </div>

        {this.state.userHasRated && (
          <div className="rate-info">
            Your rating: {userRating}
            <img alt="star" className="star star-small" src={starYellow} />
            <AllRatingsTooltip
              bookId={bookId}
              isOpen={allRatingsTooltipOpen}
              ratings={ratings}
              toggleTooltip={this.toggleAllRatingsTooltip}
            />
          </div>
        )}

        {!this.state.userHasRated && (
          <RatingStatusTooltip
            bookId={bookId}
            isOpen={ratingStatusTooltipOpen}
            userHasRated={userHasRated}
            rating={rating}
            toggleTooltip={this.toggleRatingStatusTooltip}
          />
        )}
      </div>
    );
  }
}

export default withUser(RatingsContainer);
