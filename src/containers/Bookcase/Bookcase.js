import React, { Component } from 'react'
import WeDeploy from 'wedeploy'

import { BookshelfSorter } from '../../components'

import BookSortUtil from '../../utils/BookSortUtil'
import SortOptionsList from '../../utils/SortOptionsList'

import './Bookcase.css'

class Bookcase extends Component {
  constructor() {
    super();

    state = {
      books: [],
      currentMember: {},
      currentUser: {},
      members: [],
      ratings: [],
    }
  }

  componentDidMount() {
    const data = WeDeploy.data('data-gsbc.wedeploy.io');

    const books = data.get('books');
    const members = data.get('members');
    const ratings = data.get('ratings');

    Promise.all([books, members, ratings])
      .then(([books, members, ratings]) => {
        this.setState({
          books,
          members,
          ratings,
        });
      });
  }

  onSorterChange(event) {
    const sortValue = event.target.value
    let config

    SortOptionsList.forEach((option) => {
      if (sortValue === option.value) {
        config = option
      }
    })


    const sortedBooks = BookSortUtil(this.state.books, config)

    this.setState({ sortedBooks, sortValue })
  }


  render() {
    return (
      <div className="Bookcase">
        <div className="control-box">
          <BookshelfSorter
            onSorterChange={this.onSorterChange}
            value={this.state.sortValue}
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

        {/* <Shelf
          books={this.state.books}
          currentMember={this.state.currentMember}
          currentUser={this.state.currentUser}
          members={this.state.members}
          ratings={this.state.ratings}
        /> */}
      </div>
    );
  }
}

export default Bookcase;
