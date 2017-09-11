import React, { Component } from 'react';
import WeDeploy from 'wedeploy';
import Shelf from './shelf';
import Sorter from './sorter';

class Bookshelf extends Component {
  constructor(props) {
    super(props)

    this.state = { books: [] };
  }
  componentWillMount() {
    WeDeploy.data('data-gsbc.wedeploy.io')
      .get('books')
      .then(books => {
        WeDeploy.data('data-gsbc.wedeploy.io')
          .get('members')
          .then(members => { this.setState({ books, members }) })
          .catch(error => { console.error(error) });
    })
      .catch(error => { console.error(error) });
  }
  render() {
    return (
      <div className="bookshelf">
        <Sorter />
        <Shelf
          books={ this.state.books }
          members={ this.state.members } />
      </div>
    )
  }
}

export default Bookshelf;
