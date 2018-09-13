import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as booksActions from '../../../store/actions/books';
import { sortingOptions } from 'utils';
import './BookshelfSorter.css';

import { Input, Label } from 'components';

const BookshelfSorter = props => {
  const optionsList = sortingOptions.map(option => (
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
          onChange={() => props.onSorterChange()}
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

const mapDispatchToProps = dispatch => {
  return {
    onSorterChange: sortValue => dispatch(booksActions.sortBooks(sortValue)),
  };
};

export default connect(mapDispatchToProps)(BookshelfSorter);
