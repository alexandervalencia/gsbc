import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as booksActions from '../../store/actions/books';
import * as membersActions from '../../store/actions/members';
import * as ratingsActions from '../../store/actions/ratings';

import { BookshelfSorter, Navbar, Shelf, Spinner } from 'components';

import './Bookcase.scss';

class Bookcase extends Component {
  componentDidMount() {
    this.props.getBooks(this.props.sortValue);
    this.props.getMembers();
    this.props.getRatings();
  }

  render() {
    let shelf = <Spinner />;

    if (this.props.books.length > 0 && this.props.members.length > 0) {
      shelf = <Shelf books={this.props.books} members={this.props.members} />;
    }

    return (
      <div className="Bookcase">
        <div className="control-box">
          <div className="Meeting">Next Meeting: 2/17 @ 3pm</div>

          <BookshelfSorter
            books={this.props.books}
            onSorterChange={this.props.onSorterChange}
            value={this.props.sortValue}
          />

          <Navbar currentUser={this.props.curUser} handleSignOut={this.props.onSignOutCurrentUser} />
        </div>
        {shelf}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books.books,
    curUser: state.auth.currentUser,
    members: state.members.members,
    sortValue: state.books.sortValue,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBooks: sortValue => dispatch(booksActions.getBooks(sortValue)),
    getMembers: () => dispatch(membersActions.getMembers()),
    getRatings: () => dispatch(ratingsActions.getRatings()),
    onSorterChange: (books, sortValue) => dispatch(booksActions.sortBooks(books, sortValue)),
    onSignOutCurrentUser: () => dispatch(authActions.submitSignOut()),
    setCurrentMember: () => dispatch(membersActions.setCurrentMember()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookcase);
