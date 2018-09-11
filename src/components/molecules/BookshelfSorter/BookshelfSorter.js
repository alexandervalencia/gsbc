import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions';

import BookSortUtil from '../../../utils/BookSortUtil';
import SortOptionsList from '../../../utils/sortingOptions';
import './BookshelfSorter.css';

import { Input, Label } from 'components';

const onSorterChange = event => {
  const sortValue = event.target.value;
  let config;

  SortOptionsList.forEach(option => {
    if (sortValue === option.value) {
      config = option;
    }
  });

  return config;
};

const BookshelfSorter = props => {
  const optionsList = SortOptionsList.map(option => (
    <option key={`${option.type}-${option.dir}`} value={option.value}>
      {option.name}
    </option>
  ));

  return (
    <header className="BookshelfSorter">
      <form className="form-inline" id="bookshelf-sorter">
        <Label className="mr-sm-2" htmlFor="sorter">
          Sort by:&nbsp;
        </Label>

        <Input
          className="custom-select form-control"
          id="sorter"
          name="sorter"
          onChange={onSorterChange}
          type="select"
          value={props.value}
        >
          {optionsList}
        </Input>
      </form>
    </header>
  );
};

BookshelfSorter.propTypes = {
  onSorterChange: PropTypes.func,
  value: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSorterChange: sortValue =>
      dispatch({
        type: actionTypes.SORT_BOOKS,
        payload: sortValue,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookshelfSorter);
