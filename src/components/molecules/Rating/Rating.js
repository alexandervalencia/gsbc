import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import { connect } from 'react-redux';
import WeDeploy from 'wedeploy';

import { checkForUserRating, getUserRatingId } from 'utils';
import './Rating.css';

class Rating extends Component {
  state = {
    average: 0,
  };

  componentDidMount() {}

  handleRating(event) {
    const data = WeDeploy.data('data-gsbc.wedeploy.io');
    const propsRatings = this.props.ratings;
    const propsMember = this.props.currentMember;

    if (event.type === 'click') {
      if (checkForUserRating(propsRatings, propsMember.id)) {
        const ratingId = getUserRatingId(propsRatings, propsMember.id);

        data
          .update(`ratings/${ratingId}`, {
            rating: event.rating,
          })
          .then(() => {
            this.updateRatings();
          });
      } else {
        data
          .create('ratings', {
            book: this.props.bookId,
            rating: event.rating,
            user: this.props.currentMember.id,
          })
          .then(() => {
            this.updateRatings();
          });
      }
    }

    if (event.type === 'mouseenter') {
      this.setState({ hint: event.rating });
    }
  }

  updateAverage() {
    const ratings = this.state.ratings;
    const ratingsArray = ratings.map(rating => rating.rating);

    if (ratingsArray.length > 0) {
      const sum = ratingsArray.reduce((a, b) => a + b);
      const average = Math.round(((sum / ratings.length) * 2) / 2);

      WeDeploy.data(process.env.REACT_APP_DATABASE)
        .update(`books/${this.props.bookId}`, {
          rating: average,
        })
        .then(() => {
          this.setState({ average });
        });
    }
  }

  updateRatings() {
    WeDeploy.data(process.env.REACT_APP_DATABASE)
      .get('ratings')
      .then(ratings => {
        this.setState({ ratings });

        this.updateAverage();
      });
  }

  render() {
    const average = this.state.average;
    const ratingClassName = average > 0 ? 'rating' : 'no-rating';

    let rateEncouragement = <p />;

    if (!this.state.signedIn) {
      rateEncouragement = <p>Want to rate this book? Sign-in or sign-up!</p>;
    } else if (average <= 0) {
      rateEncouragement = <p>No rating yet, be the first!</p>;
    }

    return (
      <div className={ratingClassName}>
        <Ratings
          rating={average > 0 ? average : 0}
          widgetRatedColors="rgb(255, 237, 133)"
        >
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>

        {rateEncouragement}
      </div>
    );
  }
}

Rating.propTypes = {
  bookId: PropTypes.string,
  currentMember: PropTypes.object,
  currentUser: PropTypes.object,
  members: PropTypes.array.isRequired,
  ratings: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    books: state.books.books,
    members: state.members.members,
    rtngs: state.ratings.ratings,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating);
