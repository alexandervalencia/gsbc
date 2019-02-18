import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Tooltip } from 'reactstrap';
import ReactRating from 'react-rating';
import isEqual from 'react-fast-compare';

import AllRatings from '../../atoms/AllRatings/AllRatings';

import * as ratingsActions from '../../../store/actions/ratings';
import { updateBookRating } from '../../../store/actions/books';

import { checkForMemberRating, getBookRating, getBookRatings, getMemberRating } from '../../../utils/ratingsUtils';
import './Rating.scss';

import starGrey from '../../../assets/star-grey.png';
import starOrange from '../../../assets/star-orange.png';
import starYellow from '../../../assets/star-yellow.png';

class Rating extends Component {
  state = {
    allRatingsTooltipOpen: false,
    bookRating: 0,
    bookRatings: [],
    encouragementTooltipOpen: false,
    memberHasRated: false,
    memberRating: 0,
    memberRatingId: '',
  };

  componentDidMount() {
    const bookRatings = getBookRatings(this.props.bookId, this.props.rtngs);
    const bookRating = getBookRating(this.props.bookId, bookRatings);

    this.setState({ bookRating: bookRating, bookRatings: bookRatings });

    if (this.props.curMbr) {
      const memberHasRated = checkForMemberRating(this.props.curMbr.id, bookRatings);
      const { memberRatingId, memberRatingValue } = getMemberRating(this.props.curMbr.id, bookRatings);

      this.setState({
        memberHasRated: memberHasRated,
        memberRating: memberRatingValue,
        memberRatingId: memberRatingId,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const newBookRatings = getBookRatings(this.props.bookId, this.props.rtngs);
    const newBookRating = getBookRating(this.props.bookId, newBookRatings);
    const prevBookRatings = getBookRatings(this.props.bookId, prevProps.rtngs);

    if (!isEqual(prevBookRatings, newBookRatings)) {
      this.props.onUpdateBookRating(this.props.book, newBookRating);

      this.setState({ bookRatings: newBookRatings });
    }

    if (this.props.curMbr) {
      const memberHasRated = checkForMemberRating(this.props.curMbr.id, this.state.bookRatings);

      if (memberHasRated && this.state.memberRatingId === '') {
        const { memberRatingId, memberRatingValue } = getMemberRating(this.props.curMbr.id, this.state.bookRatings);

        this.setState({
          memberHasRated: memberHasRated,
          memberRating: memberRatingValue,
          memberRatingId: memberRatingId,
        });
      }
    }
  }

  handleRate(ratingValue) {
    if (this.state.memberHasRated) {
      this.props.onUpdateRating(ratingValue, this.state.memberRatingId);
    } else {
      this.props.onAddRating(this.props.bookId, this.props.curMbr.id, ratingValue);
    }

    this.setState({ memberRating: ratingValue });
  }

  toggleAllRatingsTooltip() {
    this.setState({
      allRatingsTooltipOpen: !this.state.allRatingsTooltipOpen,
    });
  }

  toggleEncouragementTooltip() {
    this.setState({
      encouragementTooltipOpen: !this.state.encouragementTooltipOpen,
    });
  }

  render() {
    const signedIn = this.props.curUser && this.props.curMbr;
    const rating = getBookRating(this.props.bookId, this.state.bookRatings);

    let rateEncouragement = '';

    if (!signedIn) {
      rateEncouragement = 'Sign in to rate this book!';
    } else if (rating <= 0) {
      rateEncouragement = 'No rating yet, be the first!';
    } else if (this.props.curMbr && !this.state.memberRating) {
      rateEncouragement = 'You have not rated this book yet';
    }

    return (
      <div className="Rating">
        <div className="rating-wrapper">
          <ReactRating
            id={`rating_${this.props.bookId}`}
            fractions={2}
            onClick={value => this.handleRate(value)}
            placeholderRating={rating}
            readonly={!signedIn}
            emptySymbol={<img alt="star" src={starGrey} className="star" />}
            fullSymbol={<img alt="star" src={starOrange} className="star" />}
            placeholderSymbol={<img alt="star" src={starYellow} className="star" />}
          />
          {rating > 0 && (
            <div className="book-rating">
              <span className="book-rating-total">{Math.round(rating * 10) / 10}</span>
              <span className="book-rating-max">/5</span>
            </div>
          )}
        </div>
        {this.state.memberHasRated && (
          <div className="rate-info">
            Your rating: {this.state.memberRating}
            <img alt="star" className="star star-small" src={starYellow} />
            <Button color="link" id={`info_${this.props.bookId}`} type="button">
              View All Ratings
            </Button>
            <Tooltip
              autohide={false}
              hideArrow={true}
              isOpen={this.state.allRatingsTooltipOpen}
              placement="top"
              target={`info_${this.props.bookId}`}
              toggle={() => this.toggleAllRatingsTooltip()}
            >
              <AllRatings members={this.props.mbrs} ratings={this.state.bookRatings} />
            </Tooltip>
          </div>
        )}
        {!this.state.memberHasRated && (
          <Tooltip
            isOpen={this.state.encouragementTooltipOpen}
            placement="bottom"
            target={`rating_${this.props.bookId}`}
            toggle={() => this.toggleEncouragementTooltip()}
          >
            {rateEncouragement}
          </Tooltip>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    curMbr: state.members.currentMember,
    curUser: state.auth.currentUser,
    mbrs: state.members.members,
    rtngs: state.ratings.ratings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddRating: (bookId, memberId, ratingValue) => dispatch(ratingsActions.addRating(bookId, memberId, ratingValue)),
    onUpdateBookRating: (book, ratingValue) => dispatch(updateBookRating(book, ratingValue)),
    onUpdateRating: (ratingValue, ratingId) => dispatch(ratingsActions.updateRating(ratingValue, ratingId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating);
