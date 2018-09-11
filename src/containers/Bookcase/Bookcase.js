import React, { Component } from 'react';
import WeDeploy from 'wedeploy';
import { connect } from 'react-redux';

import { BookshelfSorter, Shelf } from 'components';

import './Bookcase.css';

class Bookcase extends Component {
  state = {
    // books: [],
    currentMember: {},
    currentUser: {},
    members: [],
    ratings: [],
  };

  componentDidMount() {
    const data = WeDeploy.data(process.env.REACT_APP_DATABASE);

    // const books = data.get('books');
    const members = data.get('members');
    const ratings = data.get('ratings');

    Promise.all([members, ratings]).then(([members, ratings]) => {
      console.log(members, ratings);
      this.setState({
        members,
        ratings,
      });
    });
  }

  render() {
    return (
      <div className="Bookcase">
        <div className="control-box">
          <BookshelfSorter value={this.state.sortValue} />

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

        <Shelf
          books={this.props.bks}
          currentMember={this.state.currentMember}
          currentUser={this.state.currentUser}
          members={this.state.members}
          ratings={this.state.ratings}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bks: state.books,
    // curMember: state.currentMember,
    // curUser: state.currentUser,
    // members: state.members,
    // ratings: state.ratings,
  };
};

export default connect(mapStateToProps)(Bookcase);
