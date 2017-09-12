import React, { Component } from 'react';
import WeDeploy from 'wedeploy';
import Shelf from './shelf';
import Sorter from './sorter';

class Bookshelf extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      members: [],
      ratings: []
    };
  }
  async componentWillMount() {
    const data = WeDeploy.data('data-gsbc.wedeploy.io');

    const books = await data.get('books');
    const members = await data.get('members');
    const ratings = await data.auth('682643b8-2be1-4fc8-8d04-a32ffeb3ecef').get('ratings');

    this.setState({ books, members, ratings })
  }
  render() {
    return (
      <div className="bookshelf">
        <Sorter />
        <Shelf
          books={ this.state.books }
          members={ this.state.members }
          ratings={ this.state.ratings } />
      </div>
    )
  }
}

export default Bookshelf;
