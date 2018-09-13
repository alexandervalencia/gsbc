import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../../store/actions/books';
import * as membersActions from '../../store/actions/members';
import * as ratingsActions from '../../store/actions/ratings';

import { BookshelfSorter, Shelf, Spinner } from 'components';

import './Bookcase.css';

class Bookcase extends Component {
  state = {
    currentMember: {},
    currentUser: {},
  };

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

    if (this.props.bks && this.props.mbrs && this.props.rtngs) {
      shelf = (
        <Shelf
          books={this.props.bks}
          currentMember={this.state.currentMember}
          currentUser={this.state.currentUser}
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

          {/* <Navbar
            currentMember={this.state.currentMember}
            currentUser={this.state.currentUser}
            email={this.state.signInFormEmail}
            handleAddBook={this.handleAddBook}
            handleAddBookModalClose={this.handleAddBookModalClose}
            handleAddBookModalOpen={this.handleAddBookModalOpen}
            handleSignIn={this.handleSignIn}
            handleSignInModalClose={this.handleSignInModalClose}
            handleSignInModalOpen={this.handleSignInModalOpen}
            handleSignOut={this.handleSignOut}
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
            onTitleChange={this.onTitleChange}
            password={this.state.signInFormPassword}
            showModalAddBook={this.state.showModalAddBook}
            showModalSignIn={this.state.showModalSignIn}
          /> */}
        </div>

        {shelf}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bks: state.books.books,
    mbrs: state.members.members,
    rtngs: state.ratings.ratings,
    srtVal: state.books.sortValue,
    // curMember: state.currentMember,
    // curUser: state.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetBooks: sortValue => dispatch(booksActions.getBooks(sortValue)),
    onGetMembers: () => dispatch(membersActions.getMembers()),
    onGetRatings: () => dispatch(ratingsActions.getRatings()),
    onSorterChange: (books, sortValue) =>
      dispatch(booksActions.sortBooks(books, sortValue)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookcase);
