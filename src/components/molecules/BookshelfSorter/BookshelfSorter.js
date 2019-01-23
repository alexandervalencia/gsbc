import React from 'react';
import PropTypes from 'prop-types';

import { sortingOptions } from 'utils';
import './BookshelfSorter.scss';

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
          onChange={e => props.onSorterChange(props.books, e.target.value)}
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

export default BookshelfSorter;
