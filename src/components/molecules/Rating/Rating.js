import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'reactstrap';
import ReactRating from 'react-rating';
import isEqual from 'react-fast-compare';

import * as ratingsActions from '../../../store/actions/ratings';
import { updateBookRating } from '../../../store/actions/books';

import { getBookRating, getBookRatings, getMemberRating } from '../../../utils/ratingsUtils';
import './Rating.scss';

import starGrey from '../../../assets/star-grey.png';
import starOrange from '../../../assets/star-orange.png';
import starYellow from '../../../assets/star-yellow.png';

class Rating extends Component {
  state = {
    bookRating: 0,
    bookRatings: [],
    tooltipOpen: false,
    memberRating: 0,
    memberRatingId: '',
  };

  componentDidMount() {
    const bookRatings = getBookRatings(this.props.bookId, this.props.rtngs);
    const bookRating = getBookRating(this.props.bookId, bookRatings);

    this.setState({ bookRating: bookRating, bookRatings: bookRatings });

    if (this.props.curMbr) {
      const { memberRatingId, memberRatingValue } = getMemberRating(this.props.curMbr.id, bookRatings);

      this.setState({ memberRating: memberRatingValue, memberRatingId: memberRatingId });
    }
  }

  componentDidUpdate(prevProps) {
    const newBookRatings = getBookRatings(this.props.bookId, this.props.rtngs);
    const newBookRating = getBookRating(this.props.bookId, newBookRatings);
    const prevBookRatings = getBookRatings(this.props.bookId, prevProps.rtngs);

    if (!isEqual(prevBookRatings, newBookRatings)) {
      this.setState({ bookRatings: newBookRatings });
      this.props.onUpdateBookRating(this.props.book, newBookRating);
    }

    const currentMember = this.props.curMbr;

    if (currentMember.id && this.state.bookRatings.length && this.state.memberRatingId === '') {
      const { memberRatingId, memberRatingValue } = getMemberRating(currentMember.id, this.state.bookRatings);

      this.setState({ memberRating: memberRatingValue, memberRatingId: memberRatingId });
    }
  }

  handleRate(ratingValue) {
    if (this.state.memberRating) {
      this.props.onUpdateRating(ratingValue, this.state.memberRatingId, this.props.book);
    } else {
      this.props.onAddRating(this.props.bookId, this.props.curMbr.id, ratingValue);
    }

    this.setState({ memberRating: ratingValue });
  }

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
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
    } else if (this.state.memberRating) {
      rateEncouragement = (
        <div className="rate-info">
          Your rating: {this.state.memberRating}
          <img alt="star" className="star star-small" src={starYellow} />
        </div>
      );
    } else if (this.props.curMbr && !this.state.memberRating) {
      rateEncouragement = 'You have not rated this book yet';
    }

    return (
      <div className="Rating">
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
        <Tooltip
          isOpen={this.state.tooltipOpen}
          placement="bottom"
          target={`rating_${this.props.bookId}`}
          toggle={() => this.toggleTooltip()}
        >
          {rateEncouragement}
        </Tooltip>
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
    onUpdateRating: (ratingValue, ratingId, book) => dispatch(ratingsActions.updateRating(ratingValue, ratingId, book)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating);
