import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as booksActions from '../../store/actions/books';
import * as membersActions from '../../store/actions/members';
import * as ratingsActions from '../../store/actions/ratings';

import { BookshelfSorter, Navbar, Shelf, Spinner } from 'components';

import './Bookcase.css';

class Bookcase extends Component {
  componentDidMount() {
    this.props.onGetBooks(this.props.srtVal);
    this.props.onGetMembers();
    this.props.onGetRatings();
  }

  render() {
    let shelf = this.props.error ? (
      <p>
        We're having some trouble loading the books. Try refreshing the page!
      </p>
    ) : (
      <Spinner />
    );

    if (this.props.bks.length > 0 && this.props.mbrs.length > 0) {
      shelf = (
        <Shelf
          books={this.props.bks}
          currentMember={this.props.currentMember}
          currentUser={this.props.currentUser}
          members={this.props.mbrs}
          ratings={this.props.rtngs}
        />
      );
    }
    return (
      <div className="Bookcase">
        <div className="control-box">
          <BookshelfSorter
            books={this.props.bks}
            onSorterChange={this.props.onSorterChange}
            value={this.props.srtVal}
          />

          <Navbar
            currentUser={this.props.currentUser}
            handleSignOut={this.props.onSignOutCurrentUser}
          />
        </div>

        {shelf}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bks: state.books.books,
    currentUser: state.auth.currentUser,
    currentMember: state.members.currentMember,
    mbrs: state.members.members,
    rtngs: state.ratings.ratings,
    srtVal: state.books.sortValue,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetBooks: sortValue => dispatch(booksActions.getBooks(sortValue)),
    onGetMembers: () => dispatch(membersActions.getMembers()),
    onGetRatings: () => dispatch(ratingsActions.getRatings()),
    onSorterChange: (books, sortValue) =>
      dispatch(booksActions.sortBooks(books, sortValue)),
    onSignOutCurrentUser: () => dispatch(authActions.signOutCurrentUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookcase);
