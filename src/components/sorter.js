import React, { Component } from 'react';
import '../styles/sorter.css'

class Sorter extends Component {
  constructor(props) {
    super(props);

    this.state = {value: 'date-read-new'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <header className="sorter-header">
        <div className="row">
          <div className="col">
            <form className="form-inline sorter" id="bookshelf-sorter">
              <label className="mr-sm-2" htmlFor="sorter">Sort by: </label>
              <select className="custom-select form-control mb-2 mb-sm-0" id="sorter" name="sorter" onChange={this.handleChange} type="select" value={this.state.value}>
                <option value="author-az">Author - A-Z</option>
                <option value="author-za">Author - Z-A</option>
                <option value="date-read-old">Date Read - Oldest to Newest</option>
                <option value="date-read-new">Date Read - Newest to Oldest</option>
                <option value="picked-by-az">Picked By - A-Z</option>
                <option value="picked-by-za">Picked By - Z-A</option>
                <option value="rating-low">Rating - Low to High</option>
                <option value="rating-high">Rating - High to Low</option>
                <option value="title-az">Title - A-Z</option>
                <option value="title-za">Title - Z-A</option>
              </select>
            </form>
          </div>
        </div>
      </header>
    )
  }
}

export default Sorter;
