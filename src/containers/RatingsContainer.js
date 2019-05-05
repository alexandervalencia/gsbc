import React, { Component } from 'react';

import AllRatingsTooltip from '../components/molecules/AllRatingsTooltip/AllRatingsTooltip';
import Ratings from '../components/molecules/Ratings/Ratings';
import RatingStatusTooltip from '../components/molecules/RatingStatusTooltip/RatingStatusTooltip';
import withUser from '../hoc/withUser';

import { checkForUserRating, getUserRating } from '../utils/ratingsUtils';
import { collectIdsAndDocs } from '../utils/firebaseUtil';
import { firestore } from '../firebase';

import starYellow from '../assets/star-yellow.png';
import './RatingsContainer.scss';

class RatingsContainer extends Component {
  state = {
    ratings: [],
    allRatingsTooltipOpen: false,
    ratingStatusTooltipOpen: false,
    userHasRated: false,
    userRating: 0,
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

  componentDidMount() {
    this.unsubscribeFromRatings = firestore
      .collection('books')
      .doc(this.props.bookId)
      .collection('ratings')
      .onSnapshot(snapshot => {
        const ratings = snapshot.docs.map(collectIdsAndDocs);

        this.setState({ ratings });

        ratings.forEach(rating => {
          if (this.props.user && this.props.user.id === rating.userId) {
            this.setState({ userHasRated: true });
          }
        });

        if (this.props.user) {
          const userHasRated = checkForUserRating(this.props.user.id, ratings);
          const userRating = getUserRating(this.props.user.id, ratings);

          this.setState({
            userHasRated,
            userRating,
          });
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromRatings();
  }

  handleRate = rating => {
    const { user } = this.props;
    const userId = 238206042415950498;

    if (!this.state.userHasRated) {
      console.log('add a new rating: ', rating);
      // this.ratingsRef.add({
      //   rating,
      //   userId,
      // });
    } else {
      console.log(`update current rating from ${this.bookRef.collection('ratings')[0].rating} to ${rating}`);
    }
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
