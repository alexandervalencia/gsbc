import React, { Component } from 'react';

import AllRatingsTooltip from '../components/molecules/AllRatingsTooltip/AllRatingsTooltip';
import Ratings from '../components/molecules/Ratings/Ratings';
import RatingStatusTooltip from '../components/molecules/RatingStatusTooltip/RatingStatusTooltip';
import withUser from '../hoc/withUser';

import { checkForMemberRating, getMemberRating } from '../utils/ratingsUtils';
import { collectIdsAndDocs } from '../utils/firebaseUtil';
import { firestore } from '../firebase';

import starYellow from '../assets/star-yellow.png';
import './RatingsContainer.scss';

class RatingsContainer extends Component {
  state = {
    memberHasRated: false,
    ratings: [],
    allRatingsTooltipOpen: false,
    ratingStatusTooltipOpen: false,
    memberRating: 0,
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
          if (this.props.user && this.props.user.id === rating.memberId) {
            this.setState({ memberHasRated: true });
          }
        });

        if (this.props.user) {
          const memberHasRated = checkForMemberRating(this.props.user.id, ratings);
          const memberRating = getMemberRating(this.props.user.id, ratings);

          this.setState({
            memberHasRated,
            memberRating,
          });
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromRatings();
  }

  handleRate = rating => {
    const { user } = this.props;
    const memberId = 238206042415950498;

    if (!this.state.memberHasRated) {
      console.log('add a new rating: ', rating);
      // this.ratingsRef.add({
      //   rating,
      //   memberId,
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
    const { allRatingsTooltipOpen, memberHasRated, memberRating, ratings, ratingStatusTooltipOpen } = this.state;

    return (
      <div className="Rating">
        <div className="rating-wrapper">
          <Ratings bookId={bookId} handleRate={this.handleRate} rating={rating} user={user} />
        </div>

        {this.state.memberHasRated && (
          <div className="rate-info">
            Your rating: {memberRating}
            <img alt="star" className="star star-small" src={starYellow} />
            <AllRatingsTooltip
              bookId={bookId}
              isOpen={allRatingsTooltipOpen}
              ratings={ratings}
              toggleTooltip={this.toggleAllRatingsTooltip}
            />
          </div>
        )}

        {!this.state.memberHasRated && (
          <RatingStatusTooltip
            bookId={bookId}
            isOpen={ratingStatusTooltipOpen}
            memberHasRated={memberHasRated}
            rating={rating}
            toggleTooltip={this.toggleRatingStatusTooltip}
          />
        )}
      </div>
    );
  }
}

export default withUser(RatingsContainer);
