import React, { Component } from 'react';
import WeDeploy from 'wedeploy';
import Shelf from './shelf';
import Sorter from './sorter';
import sortUtil from './utilities/sort_util'
import '../styles/bookshelf.css';

class Bookshelf extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      members: [],
      orderDir: 'desc',
      orderType: 'datePicked',
      ratings: [],
      sortValue: 'date-read-new'
    };

    this.handleChange = this.handleChange.bind(this);
  }
  async fetchAppData() {
    const data = WeDeploy.data('data-gsbc.wedeploy.io');

    const books = await data.get('books');
    const members = await data.get('members');
    const ratings = await data.get('ratings');

    this.setState({ books, members, ratings });
  }
  componentWillMount() {
    this.fetchAppData();
  }
  handleChange(event) {
    this.setState({sortValue: event.target.value});

    sortUtil(this.state.books, JSON.parse(event.target.value));
  }
  render() {
    if (!this.state.books.length > 0) {
      return (
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      )
    }

    return (
      <div className="bookshelf">
        <Sorter handleChange={this.handleChange} value={this.state.sortValue} />
        <Shelf
          books={ this.state.books }
          members={ this.state.members }
          ratings={ this.state.ratings } />
      </div>
    )
  }
}

export default Bookshelf;
